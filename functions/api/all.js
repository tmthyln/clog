/**
 * Endpoint that can be called to ensure the database exists and is set up properly.
 */
export async function onRequestPost(context) {
    const db = context.env.DB;
    await db.batch([
        db.prepare('CREATE TABLE IF NOT EXISTS cat (id INTEGER PRIMARY KEY ASC, name TEXT UNIQUE NOT NULL, birthdate INTEGER)'),
        db.prepare('CREATE TABLE IF NOT EXISTS observation (id INTEGER PRIMARY KEY ASC, logged_date INTEGER NOT NULL, observed_date INTEGER NOT NULL, notes TEXT NOT NULL, cat_id INTEGER, FOREIGN KEY(cat_id) REFERENCES cat(id) ON DELETE CASCADE ON UPDATE CASCADE)')
    ])

    return new Response()
}
