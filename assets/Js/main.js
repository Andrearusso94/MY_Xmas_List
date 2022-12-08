/*-------------
Operazioni Iniziali
-----------*/

//prepariamo una chiave local storage
const STOREGE_KEY = '__bool-xmas-list__';

//raccogliamo gli elementi di interesse del nostro index
const totalSlot = document.querySelector('.total-slot');
const giftsListElement = document.querySelector('.gift-list');
const form = document.querySelector('#gift-form');
const nameField = document.querySelector('#name-field');
const priceField = document.querySelector('#price-field');
const descriptionField = document.querySelector('#description-field');

/*Lista regali*/

//creo variabile array vuoto
let gifts = [];
console.log(gifts);

//!controllo se ci sono elementi salvati nello storege

const prevList = localStorage.getItem(STOREGE_KEY);

//se trovi questi elementi
if (prevList) {

    //utilizziamo la lista al posto di quella precedentemente vuota e la trasformo nuovamente in array con parse
    gifts = JSON.parse(prevList);

    //ricalcolo il totale
    calculateTotal();
    //ripopolo la lista
    renderList();
}


//rendo reattivo il form
form.addEventListener('submit', function (event) {

    //blocco il ricaricamento della pagina
    event.preventDefault();

    //tengo i dati inseriti nei campi
    const name = nameField.value.trim();
    const price = priceField.value.trim();
    const description = descriptionField.value.trim();
    console.log(name, price, description);

    //aggiungi il regalo alla lista
    addGift(name, price, description);

    //ripuliamo il form
    form.reset()

    //cursore sul primo campo
    nameField.focus();

    console.log('inviato');
});




/*Funzioni*/

//funzione per aggiungere un regalo alla lista

function addGift(name, price, description) {
    //creo oggetto regalo
    const newGift = {
        name,
        price: Number(price),
        description,
    };

    //aggiungo oggetto alla lista
    gifts.push(newGift);
    console.log(gifts);

    // ! Aggiornare il localStorage

    localStorage.setItem(STOREGE_KEY, JSON.stringify(gifts));

    //calcolo il totale
    calculateTotal()

    //stampo l'oggetto(renderizzo) nella lista
    renderList()
}








//funzione per calcolare il totale

function calculateTotal() {
    //inizio a calcolare
    let total = 0;

    //per ogni regalo
    for (let i = 0; i < gifts.length; i++) {
        //aggiungo il prezzo al totale
        total += gifts[i].price;

    }

    //prendo il totale e lo inserisco(renderizzo) in pagina

    totalSlot.innerText = formatAmount(total);
}








//funzione per formattare una cifra

function formatAmount(amount) {
    return amount.toFixed(2) + '€';
}







// funzione per renderizzare lista regali
function renderList() {
    //svuotiamo lista precedente
    giftsListElement.innerHTML = '';



    //per tutti i regali
    for (let i = 0; i < gifts.length; i++) {

        //creo codice per singolo elemento lista
        const giftElement = createListElement(i);

        //aggancio la lista in pagina
        giftsListElement.innerHTML += giftElement;
    }

    // rendo cliccabili i bottoni
    setDeleteButtons();
}


//funzione per creare un elemento della lista
function createListElement(i) {
    const gift = gifts[i]
    //restituisce codice per il regalo
    return `
    
    
     <li class="gift my-2 d-flex">
    <div class="gift-info">
        <h3>${gift.name}</h3>
        <p>${gift.description}</p>
    </div>
    <div class="gift-price">${formatAmount(gift.price)}</div>
    <button class="gift-button" data-index="${i}">❌</button>
</li>
`;
}


//funzione per attivare cancellazione bottoni
function setDeleteButtons() {
    //recupero i bottoni dei regali
    const deleteButtons = document.querySelectorAll('.gift-button');

    //per ognuno dei bottoni ciclo...
    for (let i = 0; i < deleteButtons.length; i++) {
        //recupero singolo bottone

        const button = deleteButtons[i];

        //aggiungo eventlistner

        button.addEventListener('click', function () {
            // individuo il regalo singolo (index)

            const index = button.dataset.index;

            //elimino dalla lista il singolo regalo
            removeGift(index);
        });

    }
}


//funzione per rimuovere regalo dalla lista
function removeGift(index) {


    //rimuovo il regalo dalla lista
    gifts.splice(index, 1);
    console.log(gifts);


    // ! Aggiornare il localStorage

    localStorage.setItem(STOREGE_KEY, JSON.stringify(gifts));


    //ricalcolare il totale 
    calculateTotal();

    //renderizzare nuovamente la lista
    renderList();

}



/*Section counter Natale*/

/*------------------
    DOM ELEMENTS
-------------------*/
const daysElm = document.querySelector('#days');
const hoursElm = document.querySelector('#hours');
const minutesElm = document.querySelector('#minutes');
const secondsElm = document.querySelector('#seconds');
const panelElm = document.querySelector('.panel');

// daysElm.innerHTML = 25;

// data di natale
const endDate = new Date("December 25 2022");
const endDateInMs = endDate.getTime();

// tabella in ms
const secondInMs = 1000;
const minuteInMs = 60 * secondInMs;
const hourInMs = 60 * minuteInMs;
const dayInMs = 24 * hourInMs;

const counterTimer = setInterval(timer, 1000);

function timer() {
    // oggi in ms
    const nowInMs = new Date().getTime();

    const diff = endDateInMs - nowInMs;

    if( diff > 0 ) {
        daysElm.innerHTML = Math.floor( diff / dayInMs);
        hoursElm.innerHTML = Math.floor( (diff % dayInMs) / hourInMs );
        minutesElm.innerHTML = Math.floor( (diff % hourInMs ) / minuteInMs );
        secondsElm.innerHTML = Math.floor( (diff % minuteInMs ) / secondInMs );
    } else {
        clearInterval(timer);
        panelElm.innerHTML = "<h1>Buon Natale!🎅🏻</h1>";
    }
}