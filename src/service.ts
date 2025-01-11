
export default {
	async fetch(request, env, ctx): Promise<Response> {
		switch (`${request.method} ${new URL(request.url).pathname}`) {
			case 'POST /api/all':
				return setupDatabaseTables(env)
			case 'GET /api/cats':
				return listAllCats(env)
			case 'POST /api/cats':
				return addCat(request, env)
			case 'DELETE /api/cats':
				return removeCat(request, env)
			case 'PATCH /api/cats':
				return updateCatInfo(request, env)
			case 'GET /api/observations':
				return listAllObservations(env)
			case 'POST /api/observations':
				return addObservation(request, env)
			default:
				return new Response(null, {status: 404, statusText: 'Not Found'})
		}
	},
} satisfies ExportedHandler<Env>;

/* General database endpoints */

async function setupDatabaseTables(env: Env) {
	const db = env.DB

	await db.batch([
		db.prepare('CREATE TABLE IF NOT EXISTS cat (id INTEGER PRIMARY KEY ASC, name TEXT UNIQUE NOT NULL, birthdate INTEGER)'),
		db.prepare('CREATE TABLE IF NOT EXISTS observation (id INTEGER PRIMARY KEY ASC, logged_date INTEGER NOT NULL, observed_date INTEGER NOT NULL, notes TEXT NOT NULL, cat_id INTEGER, FOREIGN KEY(cat_id) REFERENCES cat(id) ON DELETE CASCADE ON UPDATE CASCADE)')
	])

	return new Response(null, {status: 200, statusText: 'OK'})
}

/* Cat management endpoints */

async function listAllCats(env: Env) {
	const { results: cats } = await env.DB
		.prepare('SELECT id, name, birthdate FROM cat')
		.all();

	return Response.json(cats);
}

async function addCat(request: Request, env: Env) {
	const {name, birthdate} = await request.json() as {name: string, birthdate: string};
	const db = env.DB;

	const [_, {results}] = await db.batch([
		db.prepare('INSERT INTO cat (name, birthdate) VALUES (?, ?) ON CONFLICT(name) DO UPDATE SET birthdate = ?').bind(name, birthdate, birthdate),
		db.prepare('SELECT id, name, birthdate FROM cat WHERE name = ?').bind(name),
	]);

	return Response.json(results[0])
}

async function removeCat(request: Request, env: Env) {
	const {id} = await request.json() as {id: number};
	await env.DB.prepare('DELETE FROM cat WHERE id = ?').bind(id).run();

	return new Response();
}

async function updateCatInfo(request: Request, env: Env) {
	// TODO allow modifying cat name and birthdate?
	return new Response();
}

/* Observation management endpoints */

async function listAllObservations(env: Env) {
	// TODO filter based on selected cat
	const { results: observations } = await env.DB
		.prepare('SELECT id, logged_date, observed_date, notes, cat_id FROM observation ORDER BY observed_date DESC')
		.all();

	return Response.json(observations.map(_convertDatabaseObservation));
}

async function addObservation(request: Request, env: Env) {
	const {loggedDate, observedDate, notes, catId} = await request.json() as {loggedDate: string, observedDate: string, notes: string, catId: number};
	const db = env.DB;

	const data = await db.prepare('INSERT INTO observation (logged_date, observed_date, notes, cat_id) VALUES (?, ?, ?, ?) RETURNING *')
		.bind(loggedDate, observedDate, notes, catId)
		.first()

	return Response.json(_convertDatabaseObservation(data))
}

function _convertDatabaseObservation(data: any) {
	return {
		id: data.id,
		loggedDate: data.logged_date,
		observedDate: data.observed_date,
		notes: data.notes,
		catId: data.cat_id,
	}
}
