
let button = document.getElementById("btn");
console.log(button)

let cells = new Array();

for (let i = 1; i < 12; i++) {
  cells.push(document.getElementById("symbol" + i));
}

// First always returns null for some reason??
updateUI()
updateUI()

button.addEventListener("click", updateUI)

function updateUI(){
  //Fetch Market prices
  fetch("/market/prices")
  .then(response => response.json())
  .then(data => {
    if(Object.keys(data).length != 0){
      console.log(data)
      let i = 0;
      for (const key in data) {
        let UIKey = cells[i].children[0]
        let UIValue = cells[i].children[1]
        UIKey.textContent = key.toLocaleUpperCase();
        UIValue.textContent = data[key].toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
        // UIValue.textContent = data[key].toLocaleString('en-US', {
        //   style: 'currency'
        // });
        i++;
      }
    }
  });
}

