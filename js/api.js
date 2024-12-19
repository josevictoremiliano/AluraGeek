async function getProduct() {
    try {
        const response = await fetch(' http://localhost:3000/products');
        if (!response.ok) {
            throw new Error('Erro na resposta da API');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar o produto:', error);
    }
}

async function postProduct(image, name, price) {
    try {
        const response = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                id: Date.now() + Math.random(),
                name: name, 
                price: price,
                image: image
             })
        });
        if (!response.ok) {
            throw new Error('Erro ao enviar o produto');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao enviar o produto:', error);
    }
}

async function searchProduct(termo) {
    try {
        const response = await fetch(`http://localhost:3000/products?q=${termo}`);
        if (!response.ok) {
            throw new Error('Erro na resposta da API');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar o produto:', error);
    }
}

async function deleteProduct(id) {
    try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Erro ao deletar o produto');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao deletar o produto:', error);
    }
}

export { getProduct, postProduct, searchProduct, deleteProduct };