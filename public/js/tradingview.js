let orderVolume = 0.0;
let selectedPair = undefined;
let pairs = [];

var modal = document.getElementById("notify-modal");
var span = document.getElementById("modal-close");
span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function renderWatchList() {
    const watchList = document.getElementById('watchlist');
    watchList.replaceChildren([]);

    pairs.forEach((pair) => {
        let li = document.createElement("li");
        li.addEventListener("click", (e) => setSelectedPair(pair));
        li.className = 'watch-list-item';
        if (selectedPair == pair) {
            li.className += ' selected';
        }

        let liContent = `
            <div class='flex-fill'>${pair.name}</div>
            <div>${pair.price}</div>
        `;

        li.innerHTML = liContent;
        watchList.appendChild(li);
    });
}

function onVolumeChanged(e) {
    orderVolume = e.target.value;

    renderOrderForm();
}

function showSuccessNotification(isBuy) {
    modal.style.display = "block";

    let sym1 = selectedPair.name.split('/')[0];
    let sym2 = selectedPair.name.split('/')[1];
    
    document.getElementById('modal-header').innerHTML = `${isBuy? 'Buy' : 'Sell'} order placed successfully`;
    document.getElementById('modal-descr').innerHTML = `${isBuy? 'Bought' : 'Sold'} ${orderVolume} ${sym1} @ (${selectedPair.price} ${sym2} per ${sym1})`;
}

function renderChart() {
    updateChart(selectedPair.code);
}

function renderOrderForm() {
    // title
    document.getElementById('order-form-title').innerHTML = `Place ${selectedPair.name} Order`;

    // options
    let price1 = orderVolume * selectedPair.price;
    document.getElementById('symbol-pair').innerHTML = `${orderVolume} ${selectedPair.name.split('/')[0]} / ${price1} ${selectedPair.name.split('/')[1]}`;

}

function setSelectedPair(pair) {
    selectedPair = pair;

    // re-render all dependants
    renderWatchList();
    renderChart();
    renderOrderForm();
}


async function refreshPairs() {
    try {
        let priceResponse = await fetch('/market/prices');
        let pairPrices = await priceResponse.json();

        pairs = [];
        Object.keys(pairPrices).forEach(key => pairs.push({
            name: (key.slice(0, 3) + " / " + key.slice(3)).toUpperCase(),
            code: key,
            price: pairPrices[key],
        }))

        setSelectedPair(pairs[0]);
    } catch (error) {
        console.error(error);
        alert('Faield to fecth markets...');
    }
}

window.onload = (async (e) => {
    refreshPairs();
});

