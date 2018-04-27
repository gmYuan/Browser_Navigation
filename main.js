
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

var hashInLocalStorage = JSON.parse(localStorage.getItem('copy') || 'null');
if (hashInLocalStorage){   //S8.S2 初始化的时候，就从localStorage缓存里读取数据
    hash = hashInLocalStorage;
}

var index = 0;
while (index < keys['length']) {    //S2.S2 生成 三排div(通过循环)
    var div = document.createElement('div');
    div.className = 'row';  // S9.S1 给每行的div + 每个kbd设置类名
    main.appendChild(div);    //S2.S2
  
    row = keys[index]  // S3.S1 获取每排的按钮数组 (通过它,就可知里面 每排按钮个数)
    // console.log(row);  S3.S1 调试，查看是否取到了每排数组

    var index2 = 0;
    while (index2 < row.length) { // S3.S2 根据每排按钮数，生成对应个数的 kbd元素
        var kbd = document.createElement('kbd'); // S3.S2
        // kbd.textContent = row[index2];  S4 生成kbd对应的键盘字母
        kbd.className = 'key';  // S9.S1 

        var span = document.createElement('span');
        span.textContent = row[index2];
        span.className = 'text'; // S10.S1 给字母添加一个span和类名,以便绝对定位

        var img = document.createElement('img');  //S10.S2 添加img标签
        
        if (hash[row[index2]]){     // S11 当填写路径时，正确设置img的src值
            img.src = 'http://' +  hash[row[index2]] + '/favicon.ico';
        } else{
             img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
        }

        img.onerror = function(e){  //S13.S1 当路径填写后还有问题，设置图片src指向
            e.target.src =  '//i.loli.net/2017/11/10/5a05afbc5e183.png'; 
        }


        // S7.S1 在kbd里 添加一个“编辑”按钮
        var button = document.createElement('button');
        button.textContent = '编辑';   // S7.S1
        
        button.id = row[index2];  //S7.S4 赋予的id就是键盘字母

        button.onclick = function (e) {  // S7.S3 监听按钮的点击事件
            // console.log(e);  
            // prompt('请给我一个网址');      S7.S3 

            // console.log(e.target.id);   
            // key = e.target.id;        S7.S4 获取按钮字母

            button2 = e.target // S15.S1 获取点击的按钮
            img2 = button2.previousSibling; // S15.S2 获取按钮前的img

            key = button2.id   //S7.S4 获取按钮字母
            userinput =  prompt('请给我一个网址'); // S7.S3 获取输入的网页
            hash[key] = userinput;   //S7.S4 修改存储的 hash值

            // S15.S3 变更图片的src指向为更改后的路径
            img2.src = 'http://' + userinput + '/favicon.ico';
            img2.onerror = function(e){   // S15.S4 同样还是要做错误处理
                e.target.src =  '//i.loli.net/2017/11/10/5a05afbc5e183.png'; 
            }
            
            //S8.S1 保存修改后的hash
            localStorage.setItem('copy' , JSON.stringify(hash));
        }

        kbd.appendChild(span);     // S10.S1
        kbd.appendChild(img);      //S10.S2
        kbd.appendChild(button);   // S7.S1

        div.appendChild(kbd);     // S3.S2 
        index2 = index2 + 1;
    }
    index = index + 1;
}

document.onkeypress = function (e) {
    key = e.key;    //S6.S2 获取用户点击的键盘字母信息(点击的是哪个字母键)
    // console.log(key);
    website = hash[key];  //S6.S3 获取点击字母键对应的网页

    window.open('http://' + website, '_blank');  //S6.S4 打开该网页
}


