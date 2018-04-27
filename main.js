var keys = {
    '0': ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    '1': ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    '2': ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    'length': 3
}

var hash = {
    'q': 'qq.com',
    'w': 'weibo.com',
    'e': 'ele.me',
    'r': 'renren.com',
    't': 'tianya.com',
    'y': 'youtube.com',
    'u': 'uc.com',
    'i': 'iqiyi.com',
    'o': 'opera.com',
    'p':  undefined,
    'a': 'acfun.tv',
    's': 'sohu.com',
    'z': 'zhihu.com',
    'm': 'meituan.com'
}

var hashInLocalStorage = JSON.parse(localStorage.getItem('copy') || 'null');
if (hashInLocalStorage) {
    hash = hashInLocalStorage;
}

index = 0;
while (index < keys['length']) {
    div = document.createElement('div');
    div.className = 'row';
    main.appendChild(div);

    index2 = 0;
    row = keys[index];
    // console.log(row);
    while (index2 < row.length) {
        kbd = document.createElement('kbd');
        kbd.className = 'key';

        span = document.createElement('span');  //给字母添加一个span和类名
        span.textContent =  row[index2];
        span.className = 'text';

        img = document.createElement('img');     //给键盘添加对应网址的图标
        if (hash[row[index2]]){
            img.src = 'http://' + hash[row[index2]] + '/favicon.ico';
        }else{
            img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
        }

        img.onerror = function(e){
            e.target.src =  '//i.loli.net/2017/11/10/5a05afbc5e183.png'; 
        }
       

        button = document.createElement('button');
        button.textContent = '编辑';
        button.id = row[index2];

        button.onclick = function (e) {
            // console.log(e);
            // console.log(e.target.id);
            button2 = e.target;
            key = button2.id;

            img2 = button2.previousSibling;

            userinput = prompt('给我一个网址');
            // console.log(userinput);
            hash[key] = userinput;       //变更哈希了

            img2.src = 'http://'+ userinput + '/favicon.ico';
            console.log(img2.src);
            img2.onerror = function(e){
                e.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png';
            }

            localStorage.setItem('copy', JSON.stringify(hash));
        }

        kbd.appendChild(span);
        kbd.appendChild(img);
        kbd.appendChild(button);
        div.appendChild(kbd);
        index2 = index2 + 1;
    }
    index = index + 1;
}

document.onkeypress = function (e) {
    // console.log(ygm['key'])
    key = e['key'];
    website = hash[key];
    // location.href = 'http://' + website;
    window.open('http://' + website, '_blank');
}
