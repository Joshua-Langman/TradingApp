const fontColor="#c5c5c5";
const backgroundColor="#3b3b3b";
const lineColor="#c5c5c5";
const fontFamily="Helvetica, sans-serif";

const title={
    text: "IBM Stock Prices for June & July 2014",
    fontColor:fontColor,
    fontFamily:fontFamily
};

const toolTip= {
    fontColor:fontColor,
    backgroundColor:backgroundColor,
};

const axisY= {
    crosshair:{
        enabled:true
    },
    includeZero:false,
    // prefix: "R ",
    lineColor: lineColor,
    tickColor:lineColor,
    gridColor:lineColor,
    labelFontColor:fontColor,
    labelFontFamily:fontFamily,
    titleFontColor:fontColor
};

const axisX= {
    crosshair:{
        enabled:true
    },
    interval:1,
    valueFormatString: "MMM-DD",    
    labelAngle: -90,
    lineColor: lineColor,
    tickColor:lineColor,
    gridColor:lineColor,
    labelFontColor:fontColor,
    labelFontFamily:fontFamily,
    titleFontColor:fontColor
};

const data= [
    {
        type: "candlestick",
        risingColor:"green",
        fallingColor: "red",
        color:"black",
        dataPoints: [   // Y: [Open, High ,Low, Close]
            {x: new Date(2014,05,2 ), y:[184.76, 186.28, 184.67, 185.69]}, //{label: CanvasJS.formatDate(new Date(), "HH:mm"),y:[5198, 5629, 5159, 5385]},
            {x: new Date(2014,05,3 ), y:[185.55, 185.76, 184.12, 184.37]},
            {x: new Date(2014,05,4 ), y:[184.71, 185.45, 184.20, 184.51]},
            {x: new Date(2014,05,5 ), y:[184.66, 186.09, 183.92, 185.98]},
            {x: new Date(2014,05,6 ), y:[186.47, 187.65, 185.90, 186.37]},
            {x: new Date(2014,05,9 ), y:[186.22, 187.64, 185.96, 186.22]},
            {x: new Date(2014,05,10), y:[186.20, 186.22, 183.82, 184.29]},
            {x: new Date(2014,05,11), y:[183.64, 184.20, 182.01, 182.25]},
            {x: new Date(2014,05,12), y:[182.48, 182.55, 180.91, 181.22]},
            {x: new Date(2014,05,13), y:[182.00, 183.00, 181.52, 182.56]},
            {x: new Date(2014,05,16), y:[182.40, 182.71, 181.24, 182.35]},
            {x: new Date(2014,05,17), y:[181.90, 182.81, 181.56, 182.26]},
            {x: new Date(2014,05,18), y:[182.04, 183.61, 181.79, 183.60]},
            {x: new Date(2014,05,19), y:[184.12, 184.47, 182.36, 182.82]},
            {x: new Date(2014,05,20), y:[182.59, 182.67, 181.40, 181.55]},
            {x: new Date(2014,05,23), y:[181.92, 182.25, 181.00, 182.14]},
            {x: new Date(2014,05,24), y:[181.50, 183.00, 180.65, 180.88]},
            {x: new Date(2014,05,25), y:[180.25, 180.97, 180.06, 180.72]},
            {x: new Date(2014,05,26), y:[180.87, 181.37, 179.27, 180.37]},
            {x: new Date(2014,05,27), y:[179.77, 182.46, 179.66, 181.71]},
            {x: new Date(2014,05,30), y:[181.33, 181.93, 180.26, 181.27]},
            {x: new Date(2014,06,1 ), y:[181.70, 187.27, 181.70, 186.35]},
            {x: new Date(2014,06,2 ), y:[186.35, 188.99, 186.17, 188.39]},
            {x: new Date(2014,06,3 ), y:[188.39, 188.81, 187.35, 188.53]},
            {x: new Date(2014,06,7 ), y:[187.61, 188.27, 187.44, 188.04]},
            {x: new Date(2014,06,8 ), y:[187.65, 188.08, 186.37, 187.22]},
            {x: new Date(2014,06,9 ), y:[187.68, 188.90, 186.89, 188.42]},
            {x: new Date(2014,06,10), y:[186.44, 188.05, 186.21, 187.70]},
            {x: new Date(2014,06,11), y:[187.73, 188.35, 186.70, 188.00]},
            {x: new Date(2014,06,14), y:[188.53, 190.44, 188.53, 189.86]},
            {x: new Date(2014,06,15), y:[189.38, 190.08, 188.21, 188.49]},
            {x: new Date(2014,06,16), y:[192.20, 193.36, 190.76, 192.36]},
            {x: new Date(2014,06,17), y:[192.36, 195.95, 192.00, 192.49]},
            {x: new Date(2014,06,18), y:[191.96, 193.44, 190.00, 192.50]},
            {x: new Date(2014,06,21), y:[191.30, 191.70, 189.25, 190.85]},
            {x: new Date(2014,06,22), y:[191.56, 194.72, 191.56, 194.09]},
            {x: new Date(2014,06,23), y:[194.11, 194.90, 193.57, 193.63]},
            {x: new Date(2014,06,24), y:[193.95, 195.62, 193.75, 195.24]},
            {x: new Date(2014,06,25), y:[195.30, 195.90, 193.79, 194.40]},
            {x: new Date(2014,06,28), y:[194.30, 196.40, 193.65, 195.78]},
            {x: new Date(2014,06,29), y:[195.30, 195.89, 194.54, 194.57]},
            {x: new Date(2014,06,30), y:[195.20, 195.99, 192.90, 194.00]}
        ]
    }
];

const config={
    title:title,
    toolTip,
    backgroundColor: "#3b3b3b",
    zoomEnabled: true,
    axisY:axisY,
    axisX:axisX,
    data:data
};

//TODO: Add allowed pairs dict to dynamically populate the select

const chart = new CanvasJS.Chart("chart-container", config);
chart.render(); 
// Styling after rendering the graph
document.getElementById("chart-container").style.border=`0.1rem solid ${fontColor}`;



//Parse date of format of new Date() as parameter
function convertDateToUnix(cDate){
    let seconds = Math.floor(cDate / 1000);
    return seconds;
}

//Parse time as Unix time as parameter
function convertUnixtoTime(cUnix){
    cUnix*=1000;

    let cDate=new Date(cUnix);
    return cDate.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',hour12:false});
}

function updateChart(){

    //One day back
    let startDate=new Date();
    startDate.setDate(startDate.getDate()-1);
    startDate=convertDateToUnix(startDate);

    //URL building
    baseUrl="/market/candles/";//TODO: Change environment variable for cloud

    const paramsObject={
        exchange:"luno",
        pair:document.getElementById("select-pair").value,
        after:startDate,
        periods:3600,
    };

    const params=Object.entries(paramsObject).map(([k,v])=>{
        return `${k}=${v}`
    }).join("&");

    if(paramsObject.pair!=="select-pair"){
        
        fetch(`${baseUrl}?${params}`, {
        }).then(response=>{
            console.log(response);
        });
    }

        

    // const chart = new CanvasJS.Chart("chart-container", config);
    // chart.render;

    // // Styling after rendering the graph
    // document.getElementById("chart-container").style.border=`0.1rem solid ${fontColor}`;
}

// console.log(CanvasJS.formatDate(startDate, "HH:mm"));

// document.getElementById("render").addEventListener("click",()=>{
//     console.log(config.data[0].dataPoints.shift());
//     chart.render();
// });

