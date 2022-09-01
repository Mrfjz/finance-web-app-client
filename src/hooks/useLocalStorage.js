import { useState, useEffect } from 'react';

const getLocalValue = (key, initValue) => {
    if (typeof window === 'undefined') return initValue; // Compatible with Next.js

    const localValue = JSON.parse(localStorage.getItem(key));
    if (localValue) return localValue;

    if (initValue instanceof Function) return initValue(); // if initValue is a function, call the function.

    return initValue;
}

const useLocalStorage = (key, initValue) => {
    const [value, setValue] = useState(() => getLocalValue(key, initValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value)); // if key or value changed, update the localstorage
    }, [key, value])

    return [value, setValue];
}

export default useLocalStorage