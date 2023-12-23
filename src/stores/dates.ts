
type GenericDate = string | number | Date;

function isString(unknown: GenericDate): unknown is string {
    return typeof unknown === 'string';
}

function isNumeric(unknown: GenericDate): unknown is number {
    return typeof unknown === 'number';
}

function isDate(unknown: GenericDate): unknown is Date {
    return unknown instanceof Date;
}

export function numericDate(date: GenericDate) {
    if (isString(date)) {
        return parseInt(date.replaceAll('-', ''))
    } else if (isDate(date)) {
        return parseInt(`${date.getFullYear()}${date.getMonth()+1}${date.getDate()}`)
    } else return date
}

export function stringDate(date: GenericDate) {
    if (isNumeric(date)) {
        const source = String(date);
        return `${source.slice(0, 4)}-${source.slice(4,6)}-${source.slice(6,8)}`;
    } else if (isDate(date)) {
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    } else return date
}

export function objectDate(date: GenericDate) {
    if (isDate(date)) return date

    const stringifiedDate = String(isString(date) ? numericDate(date) : date);
    return new Date(
        parseInt(stringifiedDate.slice(0, 4)),
        parseInt(stringifiedDate.slice(4, 6))-1,
        parseInt(stringifiedDate.slice(6, 8)),
    )
}
