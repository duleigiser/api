import axios from 'axios'

const parseCookie = cookies => {
    let cookie = ''
    Object.keys(cookies).forEach(item => {
        cookie+= item + '=' + cookies[item] + '; '
    })
    return cookie
}

module.exports = {
    get(url, params, cookies = {}) {
        const cookie = parseCookie(cookies)
        //console.log(cookie)
        return axios({
            method: 'get',
            url,
            params,
            headers: {
                //'Host':"",
                'X-Requested-With': 'XMLHttpRequest',
                cookie
            }
        }).catch(function (error) {
            console.log(error);
        })
    },
    post(url,params,cookies= {}){
        const _cookie = parseCookie(cookies)
        console.log(_cookie)
        return axios({
            method:"post",
            url,
            params,
            headers:{
                //'X-Requested-With': 'XMLHttpRequest',
                _cookie
            }

        }).catch(function (error) {
            console.log(error);
        })
    }
}