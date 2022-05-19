function renderWatchList() {
    const watchList = document.getElementById('watchlist');
    watchList.replaceChildren([]);

    pairs.forEach((pair) => {
        let li = document.createElement("li");
        li.innerText = pair.name;
        li.addEventListener("click", (e) => setSelectedPair(pair));
        li.className = 'watch-list-item';

        if (selectedPair == pair) {
            li.className += ' selected';
        }
        watchList.appendChild(li);
    });
}

function renderChart() {
    updateChart(selectedPair.code);
}

function renderOrderForm() {
    document.getElementById('order-form-title').innerHTML = `Place ${selectedPair.name} Order`;
}

function setSelectedPair(pair) {
    selectedPair = pair;

    // re-render all dependants
    renderWatchList();
    renderChart();
    renderOrderForm();
}

// program starts here...
let pairs = [
    {
        name: 'BTC/ZAR',
        code: 'BTCZAR',
        valS1: 69,
        valS2: 420,
        incrSinceLastS1: false,
        incrSinceLastS2: true,
    },
    {
        name: 'ETH/ZAR',
        code: 'ETHZAR',
        valS1: 69,
        valS2: 420,
        incrSinceLastS1: false,
        incrSinceLastS2: true,
    },
    {
        name: 'LTC/ZAR',
        code: 'LTCZAR',
        valS1: 69,
        valS2: 420,
        incrSinceLastS1: false,
        incrSinceLastS2: true,
    },
    {
        name: 'XRP/ZAR',
        code: 'XRPZAR',
        valS1: 69,
        valS2: 420,
        incrSinceLastS1: false,
        incrSinceLastS2: true,
    },
];

let selectedPair = undefined;
window.onload = ((e) => {
    setSelectedPair(pairs[0]); // todo be better
});