


// 1. 初始化数据
var hashA = init();
var keys = hashA['keys'];
var hash = hashA['hash'];


// 2. 生成键盘
generateKeyboard(keys, hash);


// 3. 监听用户动作
ListenToUser(hash);



// 下面是封装的工具函数


// 简化取缓存的方法
function getFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name) || 'null');
}

// 简化 创建标签元素
function tag(tagname) {
    return document.createElement(tagname);
}

//  简化span的生成
function createSpan(textContent) {
    var span = tag('span');
    span.textContent = textContent;
    span.className = 'text'; // S10.S1 给字母添加一个span和类名,以便绝对定位 
    return span;
}

// 简化button的生成
function createButton(id) {
    var button = tag('button');
    button.textContent = '编辑';   // S7.S1
    button.id = id;  //S7.S4 赋予的id就是键盘字母

    button.onclick = function (e) {  // S7.S3 监听按钮的点击事件
        // console.log(e);  
        // prompt('请给我一个网址');      S7.S3 

        // console.log(e.target.id);   
        // key = e.target.id;        S7.S4 获取按钮字母

        var button2 = e.target // S15.S1 获取点击的按钮
        var img2 = button2.previousSibling; // S15.S2 获取按钮前的img

        var key = button2.id   //S7.S4 获取按钮字母
        var userinput = prompt('请给我一个网址'); // S7.S3 获取输入的网页

        hash[key] = userinput;   //S7.S4 修改存储的 hash值

        // S15.S3 变更图片的src指向为更改后的路径
        img2.src = 'http://' + userinput + '/favicon.ico';
        img2.onerror = function (e) {   // S15.S4 同样还是要做错误处理
            e.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
        }

        //S8.S1 保存修改后的hash
        localStorage.setItem('copy', JSON.stringify(hash));
    }
    return button;
}

// 简化image的设置
function createImage(domain) {
    var img = tag('img');  //S10.S2 添加img标签
    if (domain) {     // S11 当填写路径时，正确设置img的src值
        img.src = 'http://' + domain + '/favicon.ico';
    } else {
        img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
    }
    img.onerror = function (e) {  //S13.S1 当路径填写后还有问题，设置图片src指向
        e.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
    }

    return img;
}


// 简化初始化数据
function init() {
    var keys = {
        '0': ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        '1': ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        '2': ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
        'length': 3  // S2.S1生成 键盘字母的数据结构，以便后来生成数据 (哈希+数组);
    }

    var hash = {         //S6.S1 设置字母和网页的默认结构
        'q': 'qq.com',
        'w': 'weibo.com',
        'y': 'youtube.com',
        'i': 'iqiyi.com',
        'o': 'opera.com',
        'p': undefined,
        'z': 'zhihu.com'
    }

    var hashInLocalStorage = getFromLocalStorage('copy');
    if (hashInLocalStorage) {   //S8.S2 初始化的时候，就从localStorage缓存里读取数据
        hash = hashInLocalStorage;
    }

    return {
        "keys": keys,
        "hash": hash
    }
}

function generateKeyboard(keys, hash) {
    for (var index = 0; index < keys['length']; index = index + 1) {
        var div = tag('div');
        div.className = 'row';  // S9.S1 给每行的div + 每个kbd设置类名
        main.appendChild(div);    //S2.S2

        var row = keys[index] // S3.S1 获取每排的按钮数组 (通过它,就可知里面 每排按钮个数)
        // console.log(row);  S3.S1 调试，查看是否取到了每排数组

        for (var index2 = 0; index2 < row.length; index2 = index2 + 1) {

            var span = createSpan(row[index2]);

            var img = createImage(hash[row[index2]]);

            var button = createButton(row[index2]);

            var kbd = tag('kbd'); // S3.S2
            kbd.className = 'key';  // S9.S1 

            kbd.appendChild(span);     // S10.S1
            kbd.appendChild(img);      //S10.S2
            kbd.appendChild(button);   // S7.S1

            div.appendChild(kbd);
        }
    }
}

function ListenToUser(hash) {
    document.onkeypress = function (e) {
        var key = e.key;    //S6.S2 获取用户点击的键盘字母信息(点击的是哪个字母键)
        // console.log(key);
        var website = hash[key];  //S6.S3 获取点击字母键对应的网页

        window.open('http://' + website, '_blank');  //S6.S4 打开该网页
    }
}
