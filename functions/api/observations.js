
export async function onRequestGet(context) {
    // TODO filter based on selected cat
    const { results: observations } = await context.env.DB
        .prepare('SELECT id_hash, logged_date, observed_date, notes, cat_id FROM observation')
        .all();

    return Response.json(observations);
}

export async function onRequestPost(context) {
    // TODO: add new observation to the log for a cat
}

