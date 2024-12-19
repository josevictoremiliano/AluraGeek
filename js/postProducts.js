import { postProduct } from './api.js';

const form = document.querySelector('[data-form]');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = event.target.querySelector('[data-name]').value;
    const image = event.target.querySelector('[data-image]').value;
    const price = event.target.querySelector('[data-price]').value;

    if (!name || !image || !price) {
        alert('Preencha todos os campos');
        return;
    }

    const product = {
        name,
        image,
        price
    };

    const data = await postProduct(product.image, product.name, product.price);

    if (data) {
        alert('Produto cadastrado com sucesso');
        form.reset();
    } else {
        alert('Erro ao cadastrar o produto');
    }
});

