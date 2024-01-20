
function convertDatabaseObservation(data) {
    return {
        id: data.id,
        loggedDate: data.logged_date,
        observedDate: data.observed_date,
        notes: data.notes,
        catId: data.cat_id,
    }
}

export async function onRequestGet(context) {
    // TODO filter based on selected cat
    const { results: observations } = await context.env.DB
        .prepare('SELECT id, logged_date, observed_date, notes, cat_id FROM observation ORDER BY observed_date DESC')
        .all();

    return Response.json(observations.map(convertDatabaseObservation));
}

export async function onRequestPost(context) {
    const {loggedDate, observedDate, notes, catId} = await context.request.json();
    const db = context.env.DB;

    const data = await db.prepare('INSERT INTO observation (logged_date, observed_date, notes, cat_id) VALUES (?, ?, ?, ?) RETURNING *')
        .bind(loggedDate, observedDate, notes, catId)
        .first()

    return Response.json(convertDatabaseObservation(data))
}

