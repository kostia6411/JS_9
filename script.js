let counter = 0;

if (localStorage.getItem("counter") ) {
    counter = Number(localStorage.getItem('counter'));
} else {
    localStorage.setItem('counter', 0);
}

function createProdcut(card) {
    counter++;
    localStorage.setItem('counter', counter);
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

            let products__card = document.createElement('div');
            products__card.className = "products__card";
            products__card.innerHTML = `<div class="card__image-block">
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
            products.append(products__card);
        }
    }
}

createProdcut(
    {
    card__image: "img/tomatoes.webp",
    card__rating: 5,
    card__value: '200 ккал',
    card__name: 'Помидоры',
    card__cost: 350
    }
);
appendProducts();