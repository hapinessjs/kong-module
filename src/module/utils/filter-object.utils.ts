export function filterAllowedKeyInObject(allowedKeys: string[], obj: { [key: string]: any }): {[key: string]: any } {
    return Object.assign({}, ...Object.keys(obj).filter(o => allowedKeys.includes(o)).map(k => ({ [k]: obj[k] })));
}
