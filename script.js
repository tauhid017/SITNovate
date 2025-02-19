// script.js
document.addEventListener("DOMContentLoaded", () => {
    const signUpButton = document.getElementById("signUpButton");
    const signInButton = document.getElementById("signInButton");
    const signupContainer = document.getElementById("signup");
    const signInContainer = document.getElementById("signIn");
  
    // Show Sign Up form and hide Sign In form
    signUpButton.addEventListener("click", () => {
      signupContainer.style.display = "block";
      signInContainer.style.display = "none";
    });
  
    // Show Sign In form and hide Sign Up form
    signInButton.addEventListener("click", () => {
      signupContainer.style.display = "none";
      signInContainer.style.display = "block";
    });
  
    // Optionally, you can default to showing one of them:
    signInContainer.style.display = "block"; // Show sign in on load
  });
  