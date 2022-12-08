import { Storage } from '../../infraestructure/localStorage/storage.js';

const set = (nickName, newScore) => {
    // DEBUG newScore= 1000
    // newScore = 500;
    // si existe y newScore es mayor
    let user = {
        nickName: nickName,
        highScore: newScore
    }
    if (Storage.getItem(nickName)) {
        const highScore = Storage.getItem(nickName);
        if (newScore > highScore) {
            user.highScore = newScore;
        } else {
            user.highScore = highScore;
        }
    }
    Storage.setItem(user.nickName, user.highScore);

    return user;
};
const get = (nickName) => {
    if (Storage.getItem(nickName))
        return Number(Storage.getItem(nickName));
    else return null;
};
const remove = (nickName) => {
    Storage.removeItem(nickName);
};
const clearAll = () => {
    Storage.clearAllItems();
};
const getAll = () => {
    var arrayItems = Storage.getAllItems();

    console.log("### ARRAY ITEMS: ", arrayItems);
    var users = [];

    for (var i = 0; i < arrayItems.length; i++) {
        let key = Object.keys(arrayItems[i])[0];
        let value = arrayItems[i][key];
        // console.log(value);
        let stringObject = getObjectGame(key, value);
        // console.log('##### String object: ', stringObject);

        users[i] = stringObject;
    }
    console.log('#### users: ', users);
    return users;
}
const getObjectGame = (key, value) => {
    // si por algún motivo cambiamos los indices del juego, solo hay que modificarlos aquí
    // también podríamos usar un modelo o interfaz de user = { nickName: string, highScore: Number}
    return JSON.parse(`{ "nickName": "${key}", "highScore": ${value} }`);
}

export const ScoresService = {
    set,
    get,
    remove,
    getAll,
    clearAll
}