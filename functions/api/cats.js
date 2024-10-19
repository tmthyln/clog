
export async function onRequestGet(context) {
    const { results: cats } = await context.env.DB
        .prepare('SELECT id, name, birthdate FROM cat')
        .all();

    return Response.json(cats);
}

export async function onRequestPost(context) {
    const {name, birthdate} = await context.request.json();
    const db = context.env.DB;
    const [_, {results}] = await db.batch([
        db.prepare('INSERT INTO cat (name, birthdate) VALUES (?, ?) ON CONFLICT(name) DO UPDATE SET birthdate = ?').bind(name, birthdate, birthdate),
        db.prepare('SELECT id, name, birthdate FROM cat WHERE name = ?').bind(name),
    ]);

    return Response.json(results[0])
}

export async function onRequestDelete(context) {
    const {id} = await context.request.json();
    await context.env.DB.prepare('DELETE FROM cat WHERE id = ?').bind(id).run();

    return new Response();
}

export async function onRequestPatch(context) {
    // TODO allow modifying cat name and birthdate
}

