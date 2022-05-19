//TODO: Add allowed pairs dict to dynamically populate the select


const fontColor="#c5c5c5";
const backgroundColor="#3b3b3b";
const lineColor="#c5c5c5";
const fontFamily="Helvetica, sans-serif";

const title={
    text: "",
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
        dataPoints: []//{label: CanvasJS.formatDate(new Date(), "HH:mm"),y:[5198, 5629, 5159, 5385]}
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

function convertToChartData(rawDataArray){
    console.log(rawDataArray);
    const cryptoWatchDatapoints=[];

    rawDataArray.reduce((accum,curr)=>{
        accum.push(
            {
                label:CanvasJS.formatDate(curr[0]*1000, "HH:mm"),
                y:curr.slice(1,5)
            }
        )
        return accum;
    },cryptoWatchDatapoints);

    return cryptoWatchDatapoints;
}

function updateChart(pair){

    //One day back
    let startDate=new Date();
    startDate.setDate(startDate.getDate()-1);
    startDate=convertDateToUnix(startDate);

    //URL building
    baseUrl="/market/candles/";//TODO: Change environment variable for cloud

    const paramsObject={
        exchange:"luno",
        pair:pair,
        after:startDate,
        periods:3600,
    };

    const params=Object.entries(paramsObject).map(([k,v])=>{
        return `${k}=${v}`
    }).join("&");

    if(paramsObject.pair!=="select-pair"){
        
        fetch(`${baseUrl}?${params}`, {
        })
        .then(response => response.json())
        .then(data => {
            //Set the datapoints
            config.data[0].dataPoints=convertToChartData(data[3600]);
            //Set the title
            config.title.text=paramsObject.pair;
            //Re-render the chart
            let chart = new CanvasJS.Chart("chart-container", config);
            chart.render(); 
            // Styling after rendering the graph
            document.getElementById("chart-container").style.border=`0.1rem solid ${fontColor}`;
        });
    }
}
