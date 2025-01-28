let counter = 0;

if (localStorage.getItem("counter") ) {
    counter = Number(localStorage.getItem('counter'));
} else {
    localStorage.setItem('counter', 0);
}

function createProduct(card) {
    counter++;
    localStorage.setItem('counter', counter);
    card.data = counter
    localStorage.setItem(`card ${counter}`, JSON.stringify(card));
}

function appendProducts() {
    let products = document.querySelector(".products");
    let keys = Object.keys(localStorage);
    keys = keys.sort();
    keys = keys.reverse();
    for(let key of keys) {
        if (key != "counter") {
            infoCard = JSON.parse(localStorage.getItem(key));

            let productsCard = document.createElement('div');
            productsCard.className = "products__card";
            productsCard.innerHTML = `<div class="delete__image-block">
                            <img src="img/delete.svg" class="card__delete" data=${infoCard["data"]}>
                        </div>
                        <div class="card__image-block">
                            <img src="${infoCard["card__image"]}" class="card__image">
                        </div>
                        <div class="card__description">
                            <div class="card__meta">
                                <div class="card__rating">${infoCard["card__rating"]}</div>
                                <div class="card__value">${infoCard["card__value"]}</div>
                            </div>
                            <div class="card__name">${infoCard["card__name"]}</div>
                            <div class="card__cost">${infoCard["card__cost"]}</div>
                        </div>`
            products.append(productsCard);
        }
    }
}

let addCard = document.querySelector('.products__add');
let addImg = document.querySelector('.add_card');
let formFields = document.querySelector('.form__fields');
let addForm = document.querySelector('.add__form');
let addButton = document.querySelector('.form__button');

addCard.addEventListener('click', function() {
  addImg.classList.add("hide");
  formFields.classList.add("show");
})

addButton.addEventListener('click', function(event) {
    let formImagePath = document.querySelector('.form__image-path');
    let formRating = document.querySelector('.form__rating');
    let formValue = document.querySelector('.form__value');
    let formName = document.querySelector('.form__name');
    let formCost = document.querySelector('.form__cost');
    event.preventDefault();
    if(!addForm.checkValidity()){
        console.log("Form data is not valid");
    }
    createProduct(
        {
        card__image: formImagePath.value,
        card__rating: formRating.value,
        card__value: formValue.value,
        card__name: formName.value,
        card__cost: formCost.value
        }
    );
    location.reload();
})
appendProducts();

let cardDelete = document.querySelectorAll('.card__delete');
let modal = document.querySelector('.modal');

for (let i = 0; i < cardDelete.length ; i++) {
    cardDelete[i].addEventListener('click', function() {
        let deleteData = cardDelete[i].getAttribute("data");
        modal.classList.add('active');
        modal.classList.remove('closed');

        let buttonNo = document.querySelector('#no');
        buttonNo.addEventListener('click', function() {
                modal.classList.add('closed');
                modal.classList.remove('active');
        })

        let buttonYes = document.querySelector('#yes');
        buttonYes.addEventListener('click', function() {
                modal.classList.add('closed');
                modal.classList.remove('active');
                localStorage.removeItem(`card ${deleteData}`);
                setTimeout(function(){
                    location.reload();
                }, 600);
        })
    })
}

