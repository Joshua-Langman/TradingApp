let cells = new Array();

for (let i = 1; i < 12; i++) {
  cells.push(document.getElementById("symbol" + i));
}

//waits for browser to completely load, then call updateUI.
window.addEventListener('load', () => {
  updateUI();
})

function updateUI(){
  fetch("/market/prices")
  .then(response => response.json())
  .then(data => {
    if(Object.keys(data).length != 0){
      let i = 0;
      for (const key in data) {
        let UIKey = cells[i].children[0]
        let UIValue = cells[i].children[1]
        UIKey.textContent = key.toLocaleUpperCase();
        UIValue.textContent = data[key].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        i++;
      }
    }
  });
}

