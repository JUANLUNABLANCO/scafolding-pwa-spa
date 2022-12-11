import { Storage } from '../../infraestructure/localStorage/storage.js';

const setLogedUser = (nickName) => {
    Storage.setItem('currentUserLoged', nickName);
}
const getLogerUser = () => {
    return Number(Storage.getItem('currentUserLoged'));
}
const set = (nickName, newScore) => {
    // console.log('TIPO: ', typeof newScore);
    // DEBUG newScore= 1000
    // newScore = 500;
    // si existe y newScore es mayor
    let user = {
        nickName: nickName,
        highScore: newScore
    }


    if (Storage.getItem(nickName)) {
        const highScore = Number(Storage.getItem(nickName));
        if (newScore > highScore) {
            user.highScore = newScore;
        } else {
            user.highScore = highScore;
        }
    }
    Storage.setItem(user.nickName, Number(user.highScore));

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
    var arrayKeys = Storage.getAllItems();
    var users = [];
    console.log("### ARRAY Names: ", arrayKeys);


    for (var i = 0; i < arrayKeys.length; i++) {
        if (arrayKeys[i] != 'currentUserLoged') {
            let userNickName = arrayKeys[i];
            console.log('arraykeys[i]=', arrayKeys[i]);
            let userHighScore = Number(Storage.getItem(arrayKeys[i]));
            let oneUser = {
                nickName: userNickName,
                highScore: userHighScore
            }
            users.push(oneUser);
        }
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
    setLogedUser,
    getLogerUser,
    set,
    get,
    remove,
    getAll,
    clearAll
}