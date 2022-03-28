document.getElementById("playBtn").addEventListener("click", function (event) { // al click del tasto...
    play(); // ...attivo la funzione play
});

// funzione play() che viene attivata al click:
function play() {
    console.log("game started...");
    document.querySelector("main").innerHTML = "";
    const attempts = [];

    const levelSelector = document.getElementById("difficolta");
    const level = parseInt(levelSelector.value);
    console.log(levelSelector.value);
    const bombs_number = 16;
    let cellsNumber;
    let cellsPerSide;

    switch (level) {
        case 1:
        default:
            cellsNumber = 100;
            cellsPerSide = 10;
            break;

        case 2:
            cellsNumber = 81;
            cellsPerSide = 9;
            break;

        case 3:
            cellsNumber = 49;
            cellsPerSide = 7;
            break;
    }

    const MAX_ATTEMPTS = cellsNumber - bombs_number;
    const bombs = generateBombs();

    function generateBombs() {
        const generatedBombs = [];

        while (generatedBombs.length < bombs_number) {
            const bomb = getRandomInt(1, cellsNumber);
            if (!generatedBombs.includes(bomb)) {
                generatedBombs.push(bomb);
            }
        }

        // Riordino il pacchetto di bombe
        generatedBombs.sort((a, b) => a - b);
        console.log("Il pacchetto di bombe: ", generatedBombs);

        return generatedBombs;
    }


    generatePlayground();

    function generatePlayground() {
        const grid = document.createElement("div");
        grid.className = "grid";

        for (let i=1; i<= cellsNumber; i++) {
            const cell = createGridItem(i);
            cell.addEventListener("click", handleCellClick);
            grid.append(cell);
        }

        document.getElementsByTagName("main")[0].append(grid);
    }

    function handleCellClick(event) {
        const cellValue = parseInt(this.querySelector("span").textContent, 10);
        if (bombs.includes(cellValue)) {
            endGame();
        } else if (!attempts.includes(cellValue)) {
            this.classList.add("safe");
            attempts.push(cellValue);
            this.removeEventListener("click", handleCellClick);

            if (attempts.length === MAX_ATTEMPTS) {
                endGame();
            }
        }
    }

    function createGridItem(num) {
        const cell = document.createElement("div");
        cell.classList.add("square");
        const sideLength = `calc(100% / ${cellsPerSide})`;
        cell.style.width = sideLength;
        cell.style.height = sideLength;
        cell.innerHTML = `<span class="cell-number">${num}</span>`;
        return cell;
    }

    function endGame() {
        const squares = document.querySelectorAll(".square");
        for (let i=1, squaresNum = squares.length; i <= squaresNum; i++) {
            const square = squares[i - 1];
            if (bombs.includes(i)) {
                square.classList.add("bomb");
            }

            square.removeEventListener("click", handleCellClick);
        }

        // const messageEl = document.createElement("div");

        // let finalMessage = document.getElementById("final-message");
        // const messageEl = finalMessage.createElement("div");
        // finalMessage.append(messageEl);
        // messageEl.className = "message";
        

        // let finalMessage = document.getElementById("final-message");
        // let messageEl = document.createElement("div");
        // finalMessage.append(messageEl);
        // finalMessage.className = "message";

        
        // document.getElementById('final-message').appendChild(messageEl);
        // const messageEl = document.getElementById("final-message");
        const messageEl = document.createElement("div");
        messageEl.className = "message";

        let message = "Complimenti, hai vinto! Gioca ancora...";
        if (attempts.length < MAX_ATTEMPTS) {
            message = `Peccato, hai perso! Hai azzeccato ${attempts.length} tentativi. Ricarica la pagina e gioca ancora... `;
        }
        messageEl.textContent = message;
        document.querySelector("footer").append(messageEl);
    }
}













function getRandomInt(min, max) {
    min = Math.ceil(min) || 0;
    max = Math.floor(max) || Number.MAX_SAFE_INTEGER;
    let result = Math.floor(Math.random() * (max - min + 1)) + min;
    return result;
}

// // Seleziono il bottone per iniziare
// let start = document.getElementById('playBtn');

// // Seleziono l'input della scelta difficoltà
// let select = document.getElementById('difficolta');

// // Seleziono la griglia di gioco
// let grid = document.getElementById('griglia');

// // Seleziono box
// let box = document.createElement('div');

// // Creo un array vuoto che verrà riempito
// // di numeri casuali da 1 a 100
// let array2 =[];

// // Inserisco la funzione generica che genera numeri random
// // e che richiamerò più tardi
// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
// }


// // INIZIO DEL GIOCO: TUTTO CIò CHE ACCADE AL CLICK
// // Creo l'evento di creazione griglia al click
// start.addEventListener('click', function() { // con il click si attiva la macrofunzione

//     // Faccio un reset del contenuto interno della griglia
//     // per nuova partita
//     grid.innerHTML = '';

//     // Attribuisco una classe con la griglia all'elemento grid
//     grid.classList.add('griglia');
//     // Rendo visualizzabile la griglia togliendogli la classe "none"
//     grid.classList.remove('none');


//     // Creo le condizioni che modificheranno le griglie di gioco 
//     // in base alla selezione iniziale
//     let numeroCelle;
    
//     if (select.value == "facile") {
//         numeroCelle = 100;
//     } else if (select.value == "media") {
//         numeroCelle = 81;
//     } else {
//         numeroCelle = 49;
//     }

//     // Genero i numeri e li inserisco nella griglia 
//     for (i = 1; i < numeroCelle + 1; i++) {
//         array2.push(i);
//     }

//     function ordina(array2) {
//         return array2.sort( () => Math.random() - 0.5 );
//     }

//     array2 = ordina(array2);
//     console.log(array2);

//     // ho tagliato da qui 

//     let numeroBombe = 16; // Stabilisco il numero di bombe da inserire

//     let tentativiMassimi = numeroCelle - numeroBombe; // Stabilisco il numero di tentativi massimi
//     let bombe = generaBombe(); // Richiamo la funzione che genera le bombe

//     function generaBombe() { // Scrivo una funzione che generi le bombe
//         let bombeGenerate = []; // creo un array vuoto dove verranno pushate le bombe
//         while (bombeGenerate.length < numeroBombe) { // uso un ciclo while che vada avanti finché non termina il numero di bombe da generare (16)
//             let bomba = getRandomInt(1, numeroCelle); // assegno la bomba a numeri random che partono da 1 e hanno come limite massimo il numero totale di celle per griglia
//             if (!bombeGenerate.includes(bomba)) {
//                 bombeGenerate.push(bomba); // pusho il numero bomba nell'array vuoto, a patto che non sia già inclusa in quell'array
//             }
//         }
//         console.log(bombeGenerate); // controllo che nell'array vengano effettivamente pushati 16 numeri casuali e non ripetuti
//     }

    

//     // Incollo qui la creazione della griglia
//     for (let j = 0; j < numeroCelle; j++) {
//         let grid = document.getElementById('griglia');
//         let box = document.createElement('div');
//         box.classList.add("square");
//         grid.appendChild(box);
    
//         if (numeroCelle == 100) {
//             box.classList.add('box-10');
//         } else if (numeroCelle == 81) {
//             box.classList.add('box-9');
//         } else {
//             box.classList.add('box-7');
//         }
    
//         box.innerHTML = `<span>${array2[j]}</span>`;
    
//     }

//     // // Determino il comportamento del gioco in base al click su una bomba o su una cella normale
//     // function handleCellClick(click) {
//     //     const valoreCella = parseInt(this.querySelector("span").textContent, 10); // "catturo" il valore della cella
//     //     if (pacchettoBombe.includes(valoreCella)) { // se il valore della cella fa parte del pacchetto bombe...
//     //         endGame(); // ...avvio la funzione che termina il gioco
//     //     } else if (!attempts.includes(valoreCella)) { // se la cella cliccata non fa già parte dei tentativi andati a buon fine...
//     //         this.classList.add("safe"); // ...le attribuisco la classe che la marca come sicura e...
//     //         attempts.push(valoreCella); // ...la inserisco nell'array dei tentativi già fatti...
//     //         this.removeEventListener("click", handleCellClick); // ...le tolgo la possibilità di essere nuovamente cliccata...
//     //         if (attempts.length === tentativiMassimi) { // se abbiamo raggiunto il numero massimo di tentativi...
//     //             endGame(); // ...facciamo terminare il gioco
//     //         } 
//     //     }
//     // }

//     box.addEventListener('click', function () {
//         // Determino il comportamento del gioco in base al click su una bomba o su una cella normale
//         function handleCellClick(click) {
//         const valoreCella = parseInt(this.querySelector("span").textContent, 10); // "catturo" il valore della cella
//         if (pacchettoBombe.includes(valoreCella)) { // se il valore della cella fa parte del pacchetto bombe...
//             endGame(); // ...avvio la funzione che termina il gioco
//         } else if (!attempts.includes(valoreCella)) { // se la cella cliccata non fa già parte dei tentativi andati a buon fine...
//             this.classList.add("safe"); // ...le attribuisco la classe che la marca come sicura e...
//             attempts.push(valoreCella); // ...la inserisco nell'array dei tentativi già fatti...
//             this.removeEventListener("click", handleCellClick); // ...le tolgo la possibilità di essere nuovamente cliccata...
//             if (attempts.length === tentativiMassimi) { // se abbiamo raggiunto il numero massimo di tentativi...
//                 endGame(); // ...facciamo terminare il gioco
//             } 
//         }
//         console.log(valoreCella);
//     }});

//     // RIVEDERE, PERCHé NON FA SCATTARE LA BOMBA
//     // Funzione che fa terminare il gioco: 
//     function endGame () {
//         const squares = document.querySelectorAll(".square"); // definisco come squares tutto ciò che ha classe ".square"
//         for (let i=1, squaresNum = squares.length; i<= squaresNum; i++) {
//             const square = squares[i - 1];
//             if (bombe.includes(i)) {
//                 square.classList.add("boom");
//             }
//             square.removeEventListener("click", handleCellClick);
//             }
//     }

    
// });



