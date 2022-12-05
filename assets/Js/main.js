/*-------------
Operazioni Iniziali
-----------*/

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
        price:Number(price),
        description,
    };

    //aggiungo oggetto alla lista
    gifts.push(newGift);
    console.log(gifts);
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
        total +=  gifts[i].price;
        
    }
    
    //prendo il totale e lo inserisco(renderizzo) in pagina

    totalSlot.innerText = formatAmount(total);
}








//funzione per formattare una cifra

function formatAmount(amount){
    return amount.toFixed(2) + '€';
}







// funzione per renderizzare lista regali
function renderList(){
//svuotiamo lista precedente
giftsListElement.innerHTML = '';



    //per tutti i regali
    for (let i = 0; i < gifts.length; i++) {

        //creo codice per singolo elemento lista
        const giftElement = createListElement(i);
    
        //aggancio la lista in pagina
        giftsListElement.innerHTML += giftElement;
    }
}


//funzione per creare un elemento della lista
function createListElement(i){
    const gift = gifts[i]
    return
    //restituisce codice per il regalo
     `
     <li class="gift d-flex">
    <div class="gift-info">
        <h3>${gift.name}</h3>
        <p>${gift.description}</p>
    </div>
    <div class="gift-price">${formatAmount(gift.price)}</div>
    <button class="gift-button" data-index="${i}">❌</button>
</li>
`;
}

