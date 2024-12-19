import { getProduct, searchProduct, deleteProduct } from './api.js';

const list = document.querySelector("[data-lista]");
const input = document.querySelector('[data-search]');
const formDelete = document.querySelector('[data-form-delete]');
const selectProduct = document.querySelector('[data-select]');

input.addEventListener('input', async (event) => {
    const termo = event.target.value;
    const products = await searchProduct(termo);
    list.innerHTML = '';
    products.forEach(product => {
        listaProdutos(product.image, product.name, product.price, product.id);
    });
});

formDelete.addEventListener('submit', async (event) => {
    event.preventDefault();
    const productId = selectProduct.value;
    if (productId) {
        await deleteProduct(productId);
        renderProducts();
        populateSelect();
    }
});

function listaProdutos(image, name, price, id){
    const productCard = document.createElement('div');
    productCard.classList.add('card');
    productCard.innerHTML = `
                <img src="${image}" alt="${name}" class="image-product">
                    <div class="card-container--info">
                        <p class="product-name">${name}</p>
                        <div class="card-container--value">
                            <p> ${price} R$</p>
                            <button class="delete-button" data-id="${id}">
                                <img src="./img/trash.svg" alt="Deletar produto">
                            </button>
                        </div>
                    </div>
    `;
    list.appendChild(productCard);

    const deleteButton = productCard.querySelector('.delete-button');
    deleteButton.addEventListener('click', async () => {
        await deleteProduct(id);
        renderProducts();
        populateSelect();
    });

    return productCard;
}

async function renderProducts(){
    const products = await getProduct();
    list.innerHTML = '';
    products.forEach(product => {
        listaProdutos(product.image, product.name, product.price, product.id);
    });
}

async function populateSelect() {
    const products = await getProduct();
    selectProduct.innerHTML = '<option value="" selected>Selecione um produto</option>';
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        selectProduct.appendChild(option);
    });
}

renderProducts();
populateSelect();
