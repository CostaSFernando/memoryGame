let baseImages = [{path: 'barata.jpg', id: 1},{path: 'dog.jpg', id: 2}, {path: 'ovelha.jpg', id: 3}, {path: 'picapau.jpg', id: 4}];

const main = document.getElementById('main');
const body = document.getElementsByTagName('body')[0];
const header = document.getElementsByTagName('header')[0];
const menuInicial = document.getElementById('menu');

const setCards = (arrImgs) => {
    arrImgs.forEach(img => {
        main.append(createImage(`./imagens/${img.path}`, {className: 'img'}));
    });
}

const createImage = (src, attributes = undefined) => {
    let img = document.createElement('img');
    img.src = src;
    if (!attributes) {
        return img;
    }
    Object.keys(attributes).forEach( att => {
        img[att] = attributes[att]
    })
    return img
}

const removeAllChilds = (element) => {
    const elementosHtml = [...element.children]
    elementosHtml.forEach(elem => {
        element.removeChild(elem);
    })
}

const shuffle = (array) => {
    let m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}

const initGame = (...prop) => {
    console.log('iniciar o jogo');
    header.style.display = 'none'
    menuInicial.style.display = 'none'
    removeAllChilds(main);
    const newBaseArray = [...baseImages, ...baseImages];
    setCards(shuffle(newBaseArray));
}

setCards(baseImages);

document.getElementById('init--button').addEventListener('click', initGame)
