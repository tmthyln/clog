
export async function onRequestGet(context) {
    // TODO filter based on selected cat
    const { results: observations } = await context.env.DB
        .prepare('SELECT id, logged_date, observed_date, notes, cat_id FROM observation')
        .all();

    return Response.json(observations);
}

export async function onRequestPost(context) {
    const {loggedDate, observedDate, notes, catId} = await context.request.json();
    const db = context.env.DB;

    await db.prepare('INSERT INTO observation (logged_date, observed_date, notes, cat_id) VALUES (?, ?, ?, ?)')
        .bind(loggedDate, observedDate, notes, catId)
        .run()

    return new Response()
}

