export const setItem = (key, value) => {
    if (typeof value === 'object') {
        return localStorage.setItem(key, JSON.stringify(value));
    }

    return   localStorage.setItem(key, value);
};

export const getItem = (key) => {
    const value = localStorage.getItem(key);

    if (value) {
        try {
            return JSON.parse(value);
        } catch (error) {
            return value;
        }
    }

    return null;
};

export const removeItem = (key) => {
    return localStorage.removeItem(key);
};