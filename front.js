const quotes = [
    "Debugging is like being the detective in a crime movie where you are also the murderer.",
    "First, solve the problem. Then, write the code.",
    "The best error message is the one that never shows up.",
    "It's not a bug, it's a feature!"
];

let index = 0;
const quoteElement = document.getElementById("quote");

function typeQuote(quote) {
    let i = 0;
    quoteElement.innerHTML = "";
    quoteElement.style.opacity = 1;

    function typing() {
        if (i < quote.length) {
            quoteElement.innerHTML += quote.charAt(i);
            i++;
            setTimeout(typing, 80);
        } else {
            setTimeout(() => {
                quoteElement.style.opacity = 0;
                setTimeout(showNextQuote, 1000);
            }, 2000);
        }
    }

    typing();
}

function showNextQuote() {
    index = (index + 1) % quotes.length;
    typeQuote(quotes[index]);
}

// Start animation loop
showNextQuote();
const canvas = document.getElementById("magicCircle");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

let radius = 150;
let angle = 0;
let opacity = 1;
let showText = false;

function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(200, 200, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(128, 0, 128, ${opacity})`;
    ctx.lineWidth = 5;
    ctx.shadowBlur = 20;
    ctx.shadowColor = "purple";
    ctx.stroke();

    radius -= 1;
    opacity -= 0.01;

    if (radius > 0) {
        requestAnimationFrame(drawCircle);
    } else {
        showText = true;
        document.querySelector(".container").style.opacity = "1";
    }
}

drawCircle();