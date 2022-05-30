import { storageService } from './basic/async-storage.service'
import { utilService } from './basic/util.service'
// import { httpService } from './basic/http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'


const LOCAL_STORAGE_USER_DB = 'userDB'
const LOCAL_STORAGE_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    getLoggedinUser,
    signup,
    login,
    logout,
    // getUserById,
}

window.userService = userService

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(LOCAL_STORAGE_LOGGEDIN_USER) || 'null')
    // const user = JSON.parse(sessionStorage.getItem(LOCAL_STORAGE_LOGGEDIN_USER) || 'null')
    // console.log(user);
    // return user
}

// function getUserById(userId) {
//     const users = JSON.parse(sessionStorage.getItem(LOCAL_STORAGE_LOGGEDIN_USER)
//     console.log(userId);
// }

async function signup(userCred, onGoOn) {
    userCred.color = utilService.getRandomColor()
    const user = await storageService.post(LOCAL_STORAGE_USER_DB, userCred)
    // user._id = utilService.makeId()
    login(user)
    onGoOn()
}

async function login(userCred, onGoOn) {
    const users = await storageService.query(LOCAL_STORAGE_USER_DB)
    const user = users.find(user => user.username === userCred.username && user.password === userCred.password)
    if (user) {
        // delete user._id
        // delete user.firstName
        // delete user.lastName
        _saveLocalUser(user)
        onGoOn()
    }
}

async function logout() {
    sessionStorage.removeItem(LOCAL_STORAGE_LOGGEDIN_USER)
}


function _saveLocalUser(user) {
    sessionStorage.setItem(LOCAL_STORAGE_LOGGEDIN_USER, JSON.stringify(user))
    return user
}


; (async () => {
    // await userService.signup({ _id: 'u101', firstName: 'Eytan', lastName: 'Silberberg', username: 'eytan', password: 'eytan', imgUrl: 'https://res.cloudinary.com/di5o0obqy/image/upload/v1653742446/eytan_vl7skf.jpg' })
    // await userService.signup({ _id: 'u102', firstName: 'Itay', lastName: 'Zonshine', username: 'itay', password: 'itay', imgUrl: 'https://res.cloudinary.com/di5o0obqy/image/upload/v1653742446/itay_brzaf1.jpg'})
    // await userService.signup({ _id: 'u103', firstName: 'Offir', lastName: 'Carmi', username: 'offir', password: 'offir', imgUrl: 'https://res.cloudinary.com/di5o0obqy/image/upload/v1653742446/offir_ixxjf7.jpg' })
    // await userService.signup({ _id: 'u104', firstName: 'Idan', lastName: 'Gez', username: 'idan', password: 'idan', imgUrl: 'https://media-exp1.licdn.com/dms/image/C4E03AQHS2IrCTjh7kQ/profile-displayphoto-shrink_800_800/0/1645011912408?e=1658966400&v=beta&t=ztcm1v1QLUsANcPVcXF8c-2icQB51oLyQ5hgK5sn-VQ' })
})()


    // This is relevant when backend is connected
    // ;(async () => {
        //     var user = getLoggedinUser()
        //     if (user) socketService.emit('set-user-socket', user._id)
        // })()