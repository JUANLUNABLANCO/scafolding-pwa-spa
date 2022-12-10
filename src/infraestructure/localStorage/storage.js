export const Storage = {
    setItem: (key, value) => {
        localStorage.setItem(key, value);
    },

    getItem: (key) => {
        const storedItem = localStorage.getItem(key);
        // si no existe
        return storedItem != null ? storedItem : null;
    },
    removeItem: (key) => {
        localStorage.removeItem(key);
    },
    getAllItems: () => {
        var items = [];

        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);

            items.push(key);

        }
        return items;
    },

    clearAllItems: () => {
        localStorage.clear();
        console.log('Storage borrado');
    }
}