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
    'p': undefined,
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
        kbd.textContent = row[index2];
        kbd.className = 'key';

        button = document.createElement('button');
        button.textContent = '编辑';
        button.id = row[index2];

        button.onclick = function (e) {
            // console.log(e);
            // console.log(e.target.id);
            key = e.target.id;
            userinput = prompt('给我一个网址');
            // console.log(userinput);
            hash[key] = userinput;       //变更哈希了
            localStorage.setItem('copy', JSON.stringify(hash));
        }

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
