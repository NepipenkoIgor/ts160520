import 'reflect-metadata'

const RANGE_KEY = 'design:RANGE_KEY';

export function Range(min: number, max: number): ParameterDecorator {
    return (target, key, index) => {
        const existingRange = Reflect.getMetadata(RANGE_KEY, target, key) ?? {};
        existingRange[index] = [min, max];
        Reflect.defineMetadata(RANGE_KEY, existingRange, target, key)
    }
}

export function Validate(target: any, key: string, desc: PropertyDescriptor): void {
    const originalFn = desc.value;
    desc.value = (...args: unknown[]) => {
        const existingRange = Reflect.getMetadata(RANGE_KEY, target, key) ?? {};
        for (const [paramIndex, range] of Object.entries(existingRange)) {
            const [min, max] = range as [number, number];
            const paramValue = args[Number(paramIndex)];
            if (Number(paramValue) < min || Number(paramValue) > max) {
                throw new Error(`Error in ${target.constructor.name} instance.
                Parameter of method ${key} on position ${Number(paramIndex) + 1} out of range [${[min, max]}].
                Current value ${paramValue}
                 `)
            }
        }
        return originalFn(...args);
    }
}
