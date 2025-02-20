const quotes = [
    "Debugging is like being the detective in a crime movie where you are also the murderer.",
    "First, solve the problem. Then, write the code.",
    "The best error message is the one that never shows up.",
    "It's not a bug, it's a feature!"
  ];
  
  let index = 0;
  const quoteElement = document.getElementById("quote");
  
  // Start the quote animation loop
  if (quoteElement) {
    showNextQuote();
  }
  
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
    index = Math.floor(Math.random() * quotes.length); // Randomize quote selection
    typeQuote(quotes[index]);
  }
  
  // 🚀 Floating Words Animation on Explore Click
  document.querySelector(".explore").addEventListener("click", () => {
    const buttonRect = document.querySelector(".explore").getBoundingClientRect();
  
    // Words that will float up
    const words = ["Bug", "Fix", "Debug", "Code", "Review", "Optimize", "Deploy", "AI", "Logic", "Refactor"];
  
    words.forEach((word, i) => {
      // Create word element
      const wordElement = document.createElement("div");
      wordElement.classList.add("floating-word");
      wordElement.innerText = word;
      document.body.appendChild(wordElement);
  
      // Create laser trail element
      const laserTrail = document.createElement("div");
      laserTrail.classList.add("laser-trail");
      document.body.appendChild(laserTrail);
  
      // Position words evenly across the page width (zig-zag pattern)
      const spacing = window.innerWidth / words.length; // Distribute evenly
      const leftSpacing = i * spacing + spacing / 2; // Center each word
      const zigZagOffset = (i % 2 === 0) ? -40 : 40; // Alternate up/down
  
      wordElement.style.left = `${leftSpacing}px`;
      wordElement.style.top = `${buttonRect.top + zigZagOffset}px`;
  
      // Position laser trail behind the word
      laserTrail.style.left = `${leftSpacing}px`;
      laserTrail.style.top = `${buttonRect.top + zigZagOffset}px`;
  
      // Delay for smooth "wave" effect
      wordElement.style.animationDelay = `${i * 0.1}s`;
      laserTrail.style.animationDelay = `${i * 0.1}s`;
  
      // Remove elements after animation
      setTimeout(() => {
        wordElement.remove();
      }, 1200); // Words disappear fast
  
      setTimeout(() => {
        laserTrail.remove();
      }, 2000); // Laser trail fades out slowly
    });
  
    // After the floating words effect, redirect to index.html
    setTimeout(() => {
      window.location.href = "index.html"; // <--- Go to the login/register page
    }, 1500);
  });
  