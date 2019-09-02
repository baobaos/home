const express = require('express');
const cheerio = require('cheerio');
const request = require("request");
const fs = require("fs");
const path = require("path");
const app = express();

let count = 0; 
let url = 'https://www.17k.com/list/493239.html';
let list = []; 
let booksName = '';
let firstUrl = 'https://www.17k.com'

const books =  () =>{
    request(url, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            console.log(`获取小说基本信息成功·······`)
            booksQuery(body);
        } else {
            console.log('err:' + err)
        }
    })
}

const booksQuery =  (body) => {
    $ = cheerio.load(body);
    booksName = $('.Main').find('h1').text();
    $('.Volume dd').find('a').each(function (i, e) { 
        list.push($(e).attr('href'))
    });
    createFolder(path.join(__dirname, `/book/${booksName}.txt`)); 
    fs.createWriteStream(path.join(__dirname, `/book/${booksName}.txt`)) 
    console.log(`开始写入《${booksName}》·······`)
    getBody();

}


const getBody = function () {
    let primUrl = firstUrl + list[count];
    // console.log(primUrl)
    request(primUrl, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            toQuery(body);
        } else {
            console.log('err:' + err)
        }
    })
};

const toQuery = function (body) {
    $ = cheerio.load(body);
    const title = $('div.readAreaBox h1').text(); 
    console.log(title)
    let content = []
    $('div.p p').each(function (i, e) { 
        content.push(Trim($(e).text(), 'g'))
    });
   let texts =  content.join(',')
    writeFs(title, texts);
}

const writeFs = function (title, content) {
    // 添加数据
    fs.appendFile(path.join(__dirname, `/book/${booksName}.txt`), title, function (err) {
        if (err) throw err;
    });
    fs.appendFile(path.join(__dirname, `/book/${booksName}.txt`), content, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log(title + '········保存成功')
            if (count + 1 < list.length) { 
                count = count + 1;
                getBody();
            }
        }
    });
}


const createFolder = function (to) { 
    var sep = path.sep
    var folders = path.dirname(to).split(sep);
    var p = '';
    while (folders.length) {
        p += folders.shift() + sep;
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p);
        }
    }
};

const Trim = function (str, is_global) {

    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g")
    {
        result = result.replace(/\s/g, "");
    }
    return result;
}

books()

app.get('/', function (req, res) {
   res.send(list)
});

let server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Your App is running at http://%s:%s', host, port);
});