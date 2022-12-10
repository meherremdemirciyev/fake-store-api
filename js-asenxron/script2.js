let input = document.querySelector('#input');
let filter = document.querySelector('select');
let ratingfilter = false;

if (sessionStorage.getItem('deleteitems') === null) {
    sessionStorage.setItem('deleteitems', JSON.stringify([]))
}
let deleteitems = JSON.parse(sessionStorage.getItem('deleteitems'));

function GetProducts() {
    let value = input.value;
    let filValue = filter.value.toLowerCase();
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {;
            let newdeletedata;
            let new2data;
            let newdata;

            if (deleteitems.length == 0) {
                newdeletedata = data;
            } else {
                newdeletedata = data.filter(x => !deleteitems.includes(x.id.toString()));
            }

            if (filValue == 'all') {
                new2data = newdeletedata
            } else {
                new2data = newdeletedata.filter(x => x.category.includes(filValue))
            }

            if (!value.length) {
                newdata = new2data
            } else {
                newdata = new2data.filter(x => x.title.toLowerCase().includes(value.toLowerCase()))
            }


            let html = ''
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
                        <i onclick="Delete(this)" id="delete" class="fa-solid fa-trash"></i>
                        <p class="d-none">${element.id}</p>
                        <p class="rated d-none">${element.rating.rate}</p>
                    </div>
                    </div>
                    </div>`
            })
            let error = document.getElementById('error')

            if (newdata.length === 0) {

                error.classList.add('d-block');
            } else {
                error.classList.remove('d-block');
            }
            document.getElementById('products').innerHTML = html;
            if (ratingfilter == true) {
                let rated = document.querySelectorAll('.rated');
                rated.forEach(function (x) {
                    if (Number(x.innerHTML) > 4) {
                        x.previousElementSibling.previousElementSibling.previousElementSibling.classList.toggle('active2')
                    }
                })
            }
        })
}
GetProducts();


input.addEventListener('keyup', async () => {
    let value = input.value;
    GetProducts();
})
filter.addEventListener('change', async () => {
    let filtValue = filter.value.toLowerCase();
    GetProducts()

})

let Delete = function (x) {
    deleteitems.push(x.nextElementSibling.innerHTML);
    sessionStorage.setItem('deleteitems', JSON.stringify(deleteitems));
    GetProducts();
}

let btn = document.getElementById('filter')
btn.addEventListener('click', function () {
    this.classList.toggle('active');
    if (ratingfilter == false) {
        ratingfilter = true;
    } else {
        ratingfilter = false;
    }
    GetProducts();
})

