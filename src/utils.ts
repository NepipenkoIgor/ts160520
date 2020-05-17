export function SavePersistence(target: any, key: string): void {
    const localKey = `${target.constructor.name}_${key}`;

    const getter = () => {
        // console.log(`GET: ${key} => ${val}`);
        return localStorage.getItem(localKey);
    }
    const setter = (newVal: any) => {
        // console.log(`GET: ${key} => ${val}`);
        localStorage.setItem(localKey, newVal);
    }

    Object.defineProperty(target, key, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    })
}
