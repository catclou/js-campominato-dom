// Creo 100 numeri mescolati tra loro in modo che
// non si ripetano

/*
let array100num = [];

for (j=1; j < 100 + 1; j++) {
    array100num.push(j);
}

// console.log(array100num)

function shuffle(array100num) {
    return array100num.sort(() => Math.random() - 0.5);
}

array100num = shuffle(array100num);
// console.log(array100num);

let griglia = document.getElementById("griglia");


// Genero 100 box
for (let i=1; i<=100; i++) {

    let box = document.createElement("div");
    // All'interno di ciascuna box attribuisco un 
    // numero random richiamando la funzione generica
    box.innerHTML += parseInt( shuffle(array100num) );
    box.classList.add("box");
    griglia.appendChild(box);

    // Al click attribuisco una classe speciale all'elemento
    // circoscrivendolo con il this
    box.addEventListener('click', function(){
        console.log(this);
        this.classList.add("clicked");
    });
    
}
*/

// NOTA: RIVEDERE TUTTA LA LOGICA DIETRO I NUMERI 
// GENERATI RANDOMICAMENTE (NON DEVONO MAI RIPETERSI),
// PROVARE CON UN SORT DEI 100 NUMERI.
// DOVRANNO POI ESSERE GENERATI RANDOMICAMENTE
// I 16 NUMERI "BOMBA", ANCH'ESSI NON RIPETUTI.

// Uso una funzione generica per creare randomicamente
// dei numeri
/*
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max= Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
*/

// let array100num = [];

// for (j=1; j < 100 + 1; j++) {
//     array100num.push(j);
// }

// console.log(array100num);

// function mescola(array100num) {
//     return array100num.sort();
// }


// DA CHIAMARE DOPO:
// mescola(array100num);

// Genero 100 box e ci stampo i numeri mescolati


// for (let i=0; i<100; i++) {
//     let griglia = document.getElementById("griglia");
//     let box = document.createElement("div");
//     box.classList.add("box");
//     griglia.appendChild(box);

//     box.innerHTML += parseInt(array100num);

//     // Al click attribuisco una classe speciale all'elemento
//     // circoscrivendolo con il this
//     box.addEventListener('click', function(){
//         console.log(this);
//         this.classList.add("clicked");
//     });
// }

// Seleziono il bottone per iniziare
let start = document.getElementById('playBtn');

// Seleziono l'input della scelta difficoltà
let select = document.getElementById('difficolta');

// Seleziono la griglia di gioco
let grid = document.getElementById('griglia');

// Seleziono box
let box = document.createElement('div');

// Creo un array vuoto che verrà riempito
// di numeri casuali da 1 a 100
let array2 =[];

// Creo l'evento di creazione griglia al click
start.addEventListener('click', function() {

    // Faccio un reset del contenuto interno della griglia
    // per nuova partita
    grid.innerHTML = '';

    // Attribuisco una classe con la griglia all'elemento grid
    grid.classList.add('griglia');
    // Rendo visualizzabile la griglia togliendogli la classe "none"
    grid.classList.remove('none');

    // Creo le condizioni che modificheranno le griglie di gioco 
    // in base alla selezione iniziale
    let numeroCelle;
    
    if (select.value == "facile") {
        numeroCelle = 100;
    } else if (select.value == "media") {
        numeroCelle = 81;
    } else {
        numeroCelle = 49;
    }

    // Genero i numeri e li inserisco nella griglia 
    for (i = 1; i < numeroCelle + 1; i++) {
        array2.push(i);
    }

    function mescola(array2) {
        return array2.sort( () => Math.random() - 0.5 );
    }

    array2 = mescola(array2);
    console.log(array2);

    for (let j = 0; j < numeroCelle; j++) {
        let grid = document.getElementById('griglia');
        let box = document.createElement('div');
        grid.appendChild(box);
    
        if (numeroCelle == 100) {
            box.classList.add('box-10');
        } else if (numeroCelle == 81) {
            box.classList.add('box-9');
        } else {
            box.classList.add('box-7');
        }
    
        box.innerHTML = `<span>${array2[j]}</span>`;
    
        box.addEventListener('click', function () {
            this.classList.add('clicked');
        });
    }

    
})


