
export async function onRequestGet(context) {
    const { results: cats } = await context.env.DB
        .prepare('SELECT id, name, birthdate FROM cat')
        .all();

    return Response.json(cats);
}


export async function onRequestPost(context) {
    // TODO add new cat
}

export async function onRequestDelete(context) {
    // TODO delete cat AND delete their observations
}

export async function onRequestPatch(context) {
    // TODO allow modifying cat name and birthdate
}

