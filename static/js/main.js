
var ctx = document.getElementById('chart1');
var ctx2 = document.getElementById('chart2');

var ctx3 = document.getElementById('chart3');
var ctx4 = document.getElementById('chart4');
var ctx5 = document.getElementById('chart5');
var ctx6 = document.getElementById('chart6');

var graphData = {
    type: 'line',
    data: {
        labels: ['', '', '', '', '', '', ''],
        datasets: [{
            label: 'datas',
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            borderWidth: 5,
            fill: true
        }]
    },
    options: {
        scales: {
            x: {
                ticks: {
                    // Include dynamic date in x axe
                    callback: function(value, index, values) {
                        var date = new Date();
                        return ((date.getDate() )) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear() + '-' + date.getHours() + ':' + date.getMinutes() +':' + date.getSeconds(); 
                    }
                }
            }
        }
    }
}

var graphData2 = {
    type: 'bar',
    data: {
        labels: ['Red'],
        datasets: [{
            label: 'Label',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsible: false,
        scales: {
            y: {
                display: false,
            },
            
            x: {
                display: false,
                ticks: {
                    // Include dynamic date in x axe
                    callback: function(value, index, values) {
                        var date = new Date();
                        return ((date.getDate() )) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear() + '-' + date.getHours() + ':' + date.getMinutes() +':' + date.getSeconds(); 
                    }
                }
            }
        }
    }
}

var graphData3 = {
    type: 'line',
    data: {
        labels: ['', '', '', '', '', '', ''],
        datasets: [{
            label: 'datas',
            data: [0, 0, 0, 0, 0, 0, 0],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
            ],
            fill: true
        }]
    },
    options: {
        bezierCurve: true,
        scales: {
            x: {
                ticks: {
                    // Include dynamic date in x axe
                    callback: function(value, index, values) {
                        var date = new Date();
                        return ((date.getDate() )) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear() + '-' + date.getHours() + ':' + date.getMinutes() +':' + date.getSeconds(); 
                    }
                }
            }
        }
    }
}



var myChart = new Chart(ctx, graphData);
var myChart2 = new Chart(ctx2, graphData2);

var myChart3 = new Chart(ctx3, graphData);
var myChart4 = new Chart(ctx4, graphData);
var myChart5 = new Chart(ctx5, graphData);
var myChart6 = new Chart(ctx6, graphData);

var socket = new WebSocket('ws://localhost:8000/ws/graph/')

function addDataBar(chart, label, data) {

    chart.data.labels.shift(label);
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
        dataset.data.push(data);
    });
    
    chart.update();
}

function addDataLinear(chart, label, data) {

    var newGraphData = graphData.data.datasets[0].data;
    newGraphData.shift();
    newGraphData.push(data);
    graphData.data.datasets[0].data = newGraphData;
    myChart.update();
    myChart3.update();
    myChart4.update();
    myChart5.update();
    myChart6.update();

}

var count = 0;
socket.onmessage = function(e){
    var djangoData = JSON.parse(e.data);

    addDataLinear(myChart, 1, djangoData.value)
    addDataLinear(myChart3, 1, djangoData.value)
    addDataLinear(myChart4, 1, djangoData.value)
    addDataLinear(myChart5, 1, djangoData.value)
    addDataLinear(myChart6, 1, djangoData.value)

    addDataBar(myChart2, 1, djangoData.value)

}