let baseImages = [ 
    {
        id: 1,
        atributos: {
            src: './imagens/barata.jpg',
            className: 'img'
        }
    },
    {
        id: 2,
        atributos: {
            src: './imagens/dog.jpg',
            className: 'img'
        }
    }, 
    {
        id: 3,
        atributos: {
            src: './imagens/ovelha.jpg',
            className: 'img'
        }
    }, 
    {
        id: 4,
        atributos: {
            src: './imagens/picapau.jpg',
            className: 'img'
        }
    }, 
    {
        id: 5,
        atributos: {
            src: './imagens/mickey.jpeg',
            className: 'img'
        }
    },
    {
        id: 6,
        atributos: {
            src: './imagens/unicornio.jpg',
            className: 'img'
        }
    }
];

const main = document.getElementById('main');
const body = document.getElementsByTagName('body')[0];
const header = document.getElementsByTagName('header')[0];
const menuInicial = document.getElementById('menu');

let cardSelectId = {};


const setCards = (arrImgs) => {
    arrImgs.forEach(img => {
        main.append(createElementHtml(
            'img',
            {
                className: 'img',
                src: img.atributos.src
            }
        ));
    });
}

const createElementHtml = (nameTag, attributes) => {
    let element = document.createElement(nameTag);
    if (!attributes) {
        return element;
    }
    Object.keys(attributes).forEach( att => {
        element[att] = attributes[att]
    })
    return element;

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

const validGame = (arr) => {
    if ( !cardSelectId?.card1 || !cardSelectId?.card2 ) {
        return false;
    }
    const elem1 = arr[cardSelectId.card1].id;
    const elem2 = arr[cardSelectId.card2].id;
    if (elem1 == elem2) {
        return true;
    } else {
        return false;
    }
}

const playGame = (array) => {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        let block = createElementHtml('div', {
            className: 'cardImage',
            id: i,
            onclick: (event) => {
                if ( cardSelectId?.card1 && cardSelectId?.card2 ) {
                    return;
                }
                const id = event.srcElement.id;
                const img = createElementHtml('img', {
                    className: 'imageCard',
                    src: element.atributos.src
                });
                const block = document.getElementById(id);
                if (!cardSelectId?.card1) {
                    cardSelectId.card1 = id;
                    block.append(img);
                } else if (cardSelectId.card1 && !cardSelectId.card2 ) {
                    cardSelectId.card2 = id;
                    block.append(img);
                    if ( !validGame(array) ) {
                        alert('Tururu');
                        setTimeout( () => {
                            block.removeChild(img);
                            const card1Element = document.getElementById(cardSelectId.card1);
                            removeAllChilds(card1Element);
                            cardSelectId.card1 = null;
                            cardSelectId.card2 = null;
                        }, 990);
                    } else {
                        alert('Boaaa!');
                        cardSelectId.card1 = null;
                        cardSelectId.card2 = null;
                    }
                    
                }
            
            }
        })
        main.append(block)
    }
}

const initGame = () => {
    header.style.display = 'none'
    menuInicial.style.display = 'none'
    removeAllChilds(main);
    const newBaseArray = [...baseImages, ...baseImages];
    const cardsArray = shuffle(newBaseArray);
    cardsArray.forEach(img => {
        let image = createElementHtml('img', img.atributos);
        main.append(image);
    });
    setTimeout( () => {
        removeAllChilds(main);
        playGame(cardsArray);
    }, 3000);
}

setCards(baseImages);

document.getElementById('init--button').addEventListener('click', initGame)
