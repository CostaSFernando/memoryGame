let baseImages = [ 
    {
        id: 1,
        atributos: {
            src: './imagens/barata.jpg',
            className: 'cardImage'
        }
    },
    {
        id: 2,
        atributos: {
            src: './imagens/dog.jpg',
            className: 'cardImage'
        }
    }, 
    {
        id: 3,
        atributos: {
            src: './imagens/ovelha.jpg',
            className: 'cardImage'
        }
    }, 
    {
        id: 4,
        atributos: {
            src: './imagens/picapau.jpg',
            className: 'cardImage'
        }
    }, 
    {
        id: 5,
        atributos: {
            src: './imagens/mickey.jpeg',
            className: 'cardImage'
        }
    },
    {
        id: 6,
        atributos: {
            src: './imagens/unicornio.jpg',
            className: 'cardImage'
        }
    },
    {
        id: 7,
        atributos: {
            src: './imagens/minie.png',
            className: 'cardImage'
        }
    },
    {
        id: 8,
        atributos: {
            src: './imagens/bob.jpg',
            className: 'cardImage'
        }
    },
    {
        id: 9,
        atributos: {
            src: './imagens/minion.jpg',
            className: 'cardImage'
        }
    },
];

const main = document.getElementById('main');
const body = document.getElementsByTagName('body')[0];
const header = document.getElementsByTagName('header')[0];
const menuInicial = document.getElementById('menu');
const footer = document.getElementsByTagName('footer')[0];

let cardsSelected = [];

let cardSelectId = {};

const setCards = (arrImgs) => {
    arrImgs.forEach(img => {
        main.append(createElementHtml('img', img.atributos));
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

const finalizarJogo = () => {
    removeAllChilds(main);
    header.style.display = 'flex';
    menuInicial.style.display = 'flex';
    footer.style.display = 'block';
    main.classList.remove ('main-game')
    cardsSelected = [];
    setCards(baseImages);
}

const playGame = (array) => {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        let block = createElementHtml('div', {
            className: 'cardImage',
            id: i,
            onclick: (event) => {
                const id = event.srcElement.id;
                const objectCard = array[id];
                if ( !objectCard || cardsSelected.includes(objectCard.id) || (cardSelectId?.card1 && cardSelectId?.card2) ) {
                    return;
                }
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
                        setTimeout( () => {
                            block.removeChild(img);
                            const card1Element = document.getElementById(cardSelectId.card1);
                            removeAllChilds(card1Element);
                            cardSelectId.card1 = null;
                            cardSelectId.card2 = null;
                        }, 990);
                    } else {
                        cardSelectId.card1 = null;
                        cardSelectId.card2 = null;
                        cardsSelected.push(objectCard.id)
                        if ( cardsSelected.length === baseImages.length ) {
                            finalizarJogo();
                        }
                    }
                    
                }
            
            }
        })
        main.append(block)
    }
}

const initGame = () => {
    header.style.display = 'none'
    menuInicial.style.display = 'none';
    footer.style.display = 'none';
    main.classList.add ('main-game')
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

document.getElementById('init--button').addEventListener('click', initGame);
