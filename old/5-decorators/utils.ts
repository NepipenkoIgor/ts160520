export function LogEventValue(_target: object, _key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalFn = descriptor.value;
    return {
        ...descriptor,
        value: (e: Event) => {
            const inputRef = e.target as HTMLInputElement;
            console.log(inputRef.value);
            originalFn(e);
        }
    }
}

export function SentToSentry(_target: object, _key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalFn = descriptor.value;
    return {
        ...descriptor,
        value: (e: Event) => {
            try {
                originalFn(e);
            } catch (err) {
                // http to server
                console.log(err)
            }

        }
    }
}

export function Debounce(ms: number) {
    let timeId: number | null;
    return (_target: object, _key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
        const originalFn = descriptor.value;
        return {
            ...descriptor,
            value: (...args: unknown[]) => {
                if (timeId) {
                    clearTimeout(timeId);
                }
                timeId = setTimeout(() => {
                    originalFn(...args);
                }, ms)
            }
        }
    }
}
