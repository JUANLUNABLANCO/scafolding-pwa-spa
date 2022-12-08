export const Storage = {
    setItem: (key, value) => {
        localStorage.setItem(key, value);
    },

    getItem: (key) => {
        const storedItem = localStorage.getItem(key);
        // si no existe
        if (!storedItem) return null;
        // este proceso puede fallar
        try {
            const item = storedItem;
            return item;
        } catch (error) {
            console.log('Error: ', error.message);
        }
    },
    removeItem: (key) => {
        localStorage.removeItem(key);
    },
    getAllItems: () => {
        var items = [];

        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            // console.log("###### KEY: ", key); // string
            var value = Number(localStorage[key]);
            // console.log("###### VALUE: ", typeof value); // string
            var objItem = JSON.parse(`{ "${key}": ${value} }`);
            // console.log("###### objeto item: ", objItem); // object
            items.push(objItem);
            // console.log(objScore);
            // console.log(key + " => " + value);
        }
        return items;
    },

    clearAllItems: () => {
        localStorage.clear();
        console.log('Storage borrado');
    }
}