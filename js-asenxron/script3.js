let input = document.querySelector('#input');
const select = document.querySelector('select');

function GetProducts(value, selectValue) {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            let newdata;
            newdata = data.filter(x => x.title.toLowerCase().includes(value.toLowerCase()))

            let html = '';
            newdata.map(element => {
                html += `
                    <div class="col-lg-3">
                    <div class="card">
                    <div class="ig">
                    <img src=${element.image} class="card-img-top" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${element.title.slice(0, 20)}</h5>
                        <p class="card-text">${element.description.slice(0, 90)}...</p>
                        <span class="price">${element.price} AZN</span>
                    </div>
                    </div>
                    </div>`
            })
            document.getElementById('products').innerHTML = html;
        })
}
GetProducts();

input.addEventListener('keyup', async () => {
    let value = input.value;
    GetProducts(value);
})

