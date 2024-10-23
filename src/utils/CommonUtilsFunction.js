export function isEmpty(value) {
    if (value === undefined || value === null) {
        return true;
    }
    if (typeof value === 'string' || Array.isArray(value)) {
        return value.length === 0;
    }
    return false;
}

export function isNotEmpty(value) {
    return !isEmpty(value);
}
