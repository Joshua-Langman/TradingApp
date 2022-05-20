//waits for browser to completely load, then call updateUI.
window.addEventListener('load', () => {
    renderHistory();
  })

function generateTable(data) {
    let table = document.createElement('table');
    let tr = document.createElement('tr');   

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');

    let text1 = document.createTextNode(data.estimatedEPS);
    let text2 = document.createTextNode(data.fiscalDateEnding);
    let text3 = document.createTextNode(data.reportedDate);
    let text4 = document.createTextNode(data.reportedEPS);
    let text5 = document.createTextNode(data.surprisePercentage);

    td1.appendChild(text1);
    td2.appendChild(text2);
    td3.appendChild(text3);
    td4.appendChild(text4);
    td5.appendChild(text5);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    table.appendChild(tr);
    document.body.appendChild(table);

}

function renderHistory(){
    fetch("/history/stock")
    .then(response => response.json())
    .then(data => {
        for (const key in data) {
            if(key == 'symbol') {
                document.getElementById("title").innerText += ` ${data[key]}`;
            }
            if (key == 'quarterlyEarnings') {
                document.getElementById("table-history").innerHTML += `
                <thead>
                    <tr class="heading">
                        <th>Earnings Per Share</th>
                        <th>Fiscal Date Closure</th>
                        <th>Report Date</th>
                        <th>Reported EarningsPerShare</th>
                        <th>Percentage Diff</th>
                    </tr>
                </thead>`;
                data[key].forEach(element => {
                    generateTable(element);
                });
            }
        }
    });
}