const inputButton = document.getElementById('input-button');
const inputField = document.getElementById('input-field');
const itemsContainer = document.getElementById('items-container');
const spinners = document.getElementById('spinner-display');
const emptyInput = document.getElementById('empty-input');
const invalidName = document.getElementById('invalid-name');
const itmesDetails = document.getElementById('items-details');



const getAllResult = () => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayResult(data.drinks))
}
getAllResult();

const displayResult = (items) => {
    for (const item of items) {
        const div = document.createElement('div');
        div.className = 'col';
        div.innerHTML = `<div class="card" style="cursor: pointer;" >
        <img src="${item.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title text-center">${item.strDrink}</h5>
        </div>
    </div>`;

        itemsContainer.appendChild(div);
        div.addEventListener('click', function () {
            itmesDetails.textContent = '';
            const div = document.createElement('div');
            div.className = 'col';
            div.innerHTML = `<div class="card" style="cursor: pointer;" >
        <img src="${item.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title text-center">${item.strDrink}</h5>
            <h5 class="text-center">How To Make :</h5>
            <p>${item.strInstructions}</p>
        </div>
    </div>`;
            itmesDetails.appendChild(div)
        })
    }
}



const spinnerToggles = (display) => {
    spinners.style.display = `${display}`
}
const invalidNameWarr = (display) => {
    invalidName.style.display = `${display}`
}

inputButton.addEventListener('click', () => {
    const inputValue = inputField.value;
    itemsContainer.textContent = '';
    itmesDetails.textContent = '';
    if (inputValue.length === 0) {
        emptyInput.style.display = 'block';
        invalidNameWarr('none')
    } else {
        getData(inputValue);
        spinnerToggles('block');
        emptyInput.style.display = 'none';
        invalidNameWarr('none')
    }
    // getData(inputValue)
    inputField.value = '';
    // spinnerToggles('block')
});


const getData = (searchText) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => getItem(data.drinks))
};

const getItem = (itemName) => {
    if (itemName !== null) {
        itemName.forEach(pro => {
            const div = document.createElement('div');
            div.className = 'col';
            div.innerHTML = `<div class="card" style="cursor: pointer;" >
        <img src="${pro.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title text-center">${pro.strDrink}</h5>
        </div>
    </div>`;
            console.log(pro)
            itemsContainer.appendChild(div);
            div.addEventListener('click', function () {
                itmesDetails.textContent = '';
                const div = document.createElement('div');
                div.className = 'col';
                div.innerHTML = `<div class="card" style="cursor: pointer;" >
            <img src="${pro.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center">${pro.strDrink}</h5>
                
        <h5 class="text-center">How To Make :</h5>
                <p>${pro.strInstructions}</p>
            </div>
        </div>`;
                itmesDetails.appendChild(div)
            })
        });
        spinnerToggles('none')
    } else {
        spinnerToggles('none');
        console.log(invalidName)
        invalidNameWarr('block')
    }
}