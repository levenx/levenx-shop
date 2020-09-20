function getOwnPropertyStatics(_obj) {
    const KNOWN_STATICS = {
        name: true,
        length: true,
        prototype: true,
        caller: true,
        callee: true,
        arguments: true,
        arity: true
    };

    let result = [];

    let keys = Object.getOwnPropertyNames(_obj);
    keys = keys.concat(Object.getOwnPropertySymbols(_obj));
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (!KNOWN_STATICS[key]) {
            result.push(key)
        }
    }

    return result;
}