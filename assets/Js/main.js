/*-------------
Operazioni Iniziali
-----------*/

//raccogliamo gli elementi di interesse del nostro index
const totalSlot = document.querySelector('.total-slot');
const giftListElement = document.querySelector('.gift-list');
const form = document.querySelector('#gift-form');
const nameField = document.querySelector('#name-field');
const priceField = document.querySelector('#price-field');
const descriptionField = document.querySelector('#description-field');

/*Lista regali*/

//creo variabile array vuoto
let gifts= [];


//rendo reattivo il form
form.addEventListener('submit', function(event){

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

function addGift(name, price, description){
    //creo oggetto regalo

    //aggiungo oggetto alla lista

    //calcolo il totale

    //stampo l'oggetto(renderizzo) nella lista
}
