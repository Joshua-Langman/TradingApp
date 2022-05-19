//TODO: Add allowed pairs dict to dynamically populate the select


const fontColor="#c5c5c5";
const backgroundColor="#3b3b3b";
const lineColor="#c5c5c5";
const fontFamily="Helvetica, sans-serif";

function convertToChartData(rawDataArray){
    const cryptoWatchDatapoints=[];

    rawDataArray.reduce((accum,curr)=>{
        accum.push(
            {
                x:new Date(curr[0]*1000),
                y:curr.slice(1,5),
                color: curr[1] < curr[4] ? "green" : "red"
            }
        )
        return accum;
    },cryptoWatchDatapoints);

    return cryptoWatchDatapoints;
}

function convertToVolumeData(rawDataArray){
        const cryptoWatchDatapoints=[];

        rawDataArray.reduce((accum,curr)=>{
            accum.push(
                {
                    x:new Date(curr[0]*1000),
                    y:curr[6],
                    color: curr[1] < curr[4] ? "green" : "red"
                }
            )
            return accum;
        },cryptoWatchDatapoints);
    
        return cryptoWatchDatapoints;
}

function convertToSliderData(rawDataArray){
    const cryptoWatchDatapoints=[];

    rawDataArray.reduce((accum,curr)=>{
        accum.push(
            {
                x:new Date(curr[0]*1000),
                y:curr[4]
            }
        )
        return accum;
    },cryptoWatchDatapoints);

    return cryptoWatchDatapoints;
}

function buildFullDataArray(data){
    let fullDataArray=[];

    fullDataArray=fullDataArray.concat(data[300]);
    
    return fullDataArray;
}

async function updateChart(pair="BTCZAR"){
    let dataPoints1 = [], dataPoints2 = [], dataPoints3 = [];

    //URL building
    baseUrl="/market/candles/";//TODO: Change environment variable for cloud

    const paramsObject={
        exchange:"luno",
        pair:pair
        
    };
    const params=Object.entries(paramsObject).map(([k,v])=>{
        return `${k}=${v}`
    }).join("&");

    fetch(`${baseUrl}?${params}`, {
    })
    .then(response => response.json())
    .then(data => {
        fullDataArray=buildFullDataArray(data);
        // //Set the chart datapoints
        dataPoints1=convertToChartData(fullDataArray);
        //Set volume datapoints
        dataPoints2=convertToVolumeData(fullDataArray);
        //Set the navigator datapoints
        dataPoints3=convertToSliderData(fullDataArray);
  
        // Styling after rendering the graph
        // document.getElementById("chart-container").style.border=`0.1rem solid ${fontColor}`;

        const stockChart = new CanvasJS.StockChart("chart-container",{            
            exportEnabled: true,
            theme: "dark1",
            title:{
            text:`${pair.substring(0,3)}/${pair.substring(3)}`//TODO: change this
            },
            charts: [{
            toolTip: {
                shared: true
            },
            
            axisX: {
                lineThickness: 5,
                tickLength: 0,
                labelFormatter: function(e) {
                return "";
                },
                crosshair: {
                enabled: true,
                snapToDataPoint: true,
                labelFormatter: function(e) {
                    return ""
                }
                }
            },
            axisY2: {
                title: `${pair.substring(0,3)} Price`, //TODO: Change this
                prefix: "R"
            },
            legend: {
                verticalAlign: "top",
                horizontalAlign: "left"
            },
            data: [{
                name: "Price (in ZAR)",
                yValueFormatString: "R#,###.##",
                axisYType: "secondary",
                type: "candlestick",
                risingColor: "green",
                fallingColor: "red",
                // color:"black",
                dataPoints : dataPoints1
            }]
            },{
            height: 100,
            toolTip: {
            shared: true
            },
            axisX: {
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
            },
            axisY2: {
            prefix: "R",
            title: `${pair.substring(0,3)}/${pair.substring(3)}`//TODO: Change this
            },
            legend: {
            horizontalAlign: "left"
            },
            data: [{
            yValueFormatString: "R#,###.##",
            axisYType: "secondary",
            name: `${pair.substring(0,3)}/${pair.substring(3)}`,
            dataPoints : dataPoints2
            }]
            }],
            navigator: {
                data: [{
                    color: "grey",
                    dataPoints: dataPoints3
                }],
            },
            rangeSelector: {
                selectedRangeButtonIndex: 2,
                buttonStyle: {
                  backgroundColorOnHover: "#6b5b95",
                  backgroundColorOnSelect: "#6b5b95"
                },
                buttons: [
                    {
                        label: "1hr",
                        range: 1,
                        rangeType: "hour"
                    },
                    {
                        label: "4hr",
                        range: 4,
                        rangeType: "hour"
                    },
                    {
                        label: "1day",
                        range: 1,
                        rangeType: "day"
                    },
                    {            
                        rangeType: "all",
                        label: "Show All" //Change it to "All"
                    }
                  ]
            },
        });
    
        stockChart.render();

    
    }).catch((e)=>{
        console.log(e)
    }); 
}
