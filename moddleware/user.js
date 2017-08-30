const request = require('request-promise-native').defaults({jar: true});
const fs = require('node-fs-extra');
const path = require('path');
const tough = require('tough-cookie');
const cheerio = require('cheerio');
const config = require('./config');
const db = require('./db');

module.exports = {
    login: login,
    like: like,
    getCollection: getUserCollection
};

const headers = {
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4,fr;q=0.2',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Host': 'www.luoo.net',
    'Save-Data': 'on',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
};
let cookieJar = request.jar();

async function login(mail, password) {
    config.init();
    _getLoginCookie();
    _putCookie();

    const resCookie = _formatCookie((await request({
        method: 'POST',
        uri: 'http://www.luoo.net/login/',
        jar: cookieJar,
        form: {
            name: mail,
            password: password,
            remember: 'on'
        },
        headers: Object.assign(headers, {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Referer': 'http://www.luoo.net/',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'DNT': 1,
        }),
        gzip: true,
        resolveWithFullResponse: true
    })).headers['set-cookie'][0]);

    cookie = new tough.Cookie({
        key: "lult",
        value: resCookie.lult,
        path: resCookie.path,
        'Max-Age': resCookie['Max-Age']
    });
    config.set({ lult: cookie });
    cookieJar.setCookie(cookie, 'http://www.luoo.net');

    _putCookie();
    const res = JSON.parse(await request({
        method: 'GET',
        uri: 'http://www.luoo.net/login/user',
        jar: cookieJar,
        headers: Object.assign(headers, {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }),
        gzip: true
    }));
    if (res.data) {
        await _getUserData(res.data);
        config.set({
            mail: mail,
            password: password
        })
    }
    else throw new Error('Login failed')
}

async function getUserCollection() {
    if (!config.get('mail')) return;
    _putCookie();
    const likedVols = await _getLikedVols();
    const likedTracks = await _getLikedTracks();
    config.set({
        likedVols: likedVols || [],
        likedTracks: likedTracks || []
    })
}

async function like(option) {
    if (!config.get('mail')) return;
    _putCookie();
    const form = {
        id: option.id,
        res: option.type === 'vol' ?
            "1" : "3"
    };
    if (option.type !== 'vol') {
        form['form[0][app_id]'] = option.type === 'single' ?
            "14" : "1";
        form['form[0][res_id]'] = option.from
    }
    const res = JSON.parse(await request({
        method: 'POST',
        uri: 'http://www.luoo.net/user/like',
        jar: cookieJar,
        form: form,
        headers: Object.assign(headers, {
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
        }),
        gzip: true,
    }));
    return res.status === 1 || res.status === 2;
}

async function _getLikedVols() {
    let likedVols = [];
    const $ = cheerio.load(await _getData(`http://www.luoo.net/user/vols/${config.get('id')}?p=1`));
    likedVols = likedVols.concat(getFromPage($));

    const pages = $('.page');
    if (pages.length === 0) return;
    const lastPage = parseInt(pages[pages.length - 1].children[0].data);
    for (let i=2; i<=lastPage; i++)
        likedVols = likedVols.concat(
            getFromPage(cheerio.load(await _getData(
                `http://www.luoo.net/user/vols/${config.get('id')}?p=${i}`
            ))));
    return likedVols;

    function getFromPage($) {
        const likedVols = [];
        const vol = $('.op-bar .share.btn-action-share').map(function () {
            return $(this).attr('data-id')
        }).get();

        for (let i=0; i<vol.length; i++)
            likedVols.push(parseInt(vol[i]))

        return likedVols
    }
}

async function _getLikedTracks() {
    let likedTracks = [];
    const $ = cheerio.load(await _getData(`http://www.luoo.net/user/singles/${config.get('id')}?p=1`));
    likedTracks = likedTracks.concat(getFromPage($));

    const pages = $('.page');
    if (pages.length === 0) return;
    const lastPage = parseInt(pages[pages.length - 1].children[0].data);
    for (let i=2; i<=lastPage; i++)
        likedTracks = likedTracks.concat(
            getFromPage(cheerio.load(await _getData(
                `http://www.luoo.net/user/singles/${config.get('id')}?p=${i}`
            ))));
    return likedTracks;

    function getFromPage($) {
        const likedTracks = [];
        const id = $('.track-item.rounded').map(function () {
            return $(this).attr('id').replace('track', '')
        });

        for (let i=0; i<id.length; i++)
            likedTracks.push(parseInt(id[i]))

        return likedTracks;
    }
}

async function _getUserData(data) {
    _putCookie();
    typeof data === 'string' &&
        (data = JSON.parse(data));
    config.set({
        name: data.user_name,
        id: data.uid,
        avatar: data.user_avatar
    });
    await new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: data.user_avatar,
            jar: cookieJar,
        }).pipe(
            fs.createWriteStream(
                path.join(__dirname, '../../user/avatar.jpg'))
        ).on('close', resolve)
    })
}

async function _getLoginCookie() {
    const resCookie = _formatCookie((await request({
        method: 'GET',
        uri: 'http://www.luoo.net/',
        headers: headers,
        gzip: true,
        resolveWithFullResponse: true
    })).headers['set-cookie'][0]);
    const cookie = new tough.Cookie({
        key: "LUOOSESS",
        value: resCookie.LUOOSESS,
        domain: resCookie.domain,
        path: resCookie.path
    });
    config.set({ LUOOSESS: cookie });
    return cookie;
}

function _putCookie() {
    !isObjectEmpty(config.get('LUOOSESS')) &&
    cookieJar.setCookie(new tough.Cookie({
        key: "LUOOSESS",
        value: config.get('LUOOSESS').value,
        domain: config.get('LUOOSESS').domain,
        path: config.get('LUOOSESS').path
    }), 'http://www.luoo.net');
    !isObjectEmpty(config.get('lult')) &&
    cookieJar.setCookie(new tough.Cookie({
        key: "lult",
        value: config.get('lult').value,
        domain: config.get('lult').domain,
        path: config.get('lult').path
    }), 'http://www.luoo.net');
}

async function _getData(url) {
    return await request({
        method: 'GET',
        uri: url,
        jar: cookieJar,
        headers: headers,
        gzip: true,
    })
}

function _formatCookie(cookies) {
    if (typeof cookies === 'string')
        return _format(cookies);
    for (let i of cookies.keys())
        cookies[i] = _format(cookies[i]);
    return cookies;

    function _format(cookie) {
        const result = { };
        for (let each of cookie.split('; '))
            result[each.split('=')[0]] = each.split('=')[1];
        return result
    }
}

function isObjectEmpty(obj) {
    for (let key in obj)
        if (Object.prototype.hasOwnProperty.call(obj, key))
            return false;
    return true;
}
