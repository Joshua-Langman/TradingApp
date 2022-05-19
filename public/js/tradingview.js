let selectedPair = undefined;
let pairs = [];

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

function renderChart() {
    updateChart(selectedPair.code);
}

function renderOrderForm() {
    // title
    document.getElementById('order-form-title').innerHTML = `Place ${selectedPair.name} Order`;

    // options
        
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

