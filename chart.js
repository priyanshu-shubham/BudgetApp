//updateChart(income,expense)
//SELECT chart ELEMENT
const chart = document.querySelector(".chart")

//CREATE CANVAS
const canvas=document.createElement("canvas");
canvas.width = 50;
canvas.height = 50;

//APPEND CANVAS TO CHART ELEMENT
chart.appendChild(canvas);
const ctx = canvas.getContext("2d");

//change linewidth
ctx.lineWidth = 8;

//RADIUS OF CIRCLE
const radius=20;
function drawCircle(color,ratio,anticlockwise) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2,radius,0, 2 * Math.PI*ratio, anticlockwise);
    ctx.stroke();
}

function updateChart(income,expense) {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ratio=income/(income+ expense);
    drawCircle("#FFFFFF", ratio, true);
    drawCircle("#F0624D",1-ratio,false);
}
