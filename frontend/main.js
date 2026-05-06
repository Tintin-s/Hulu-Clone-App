let isLogin = true;

function toggleForm() {
  isLogin = !isLogin;

  document.getElementById("form-title").innerText = isLogin ? "Login" : "Sign Up";
  document.querySelector("button").innerText = isLogin ? "Login" : "Sign Up";

  document.getElementById("toggle-text").innerHTML = isLogin
    ? `Don’t have an account? <span onclick="toggleForm()">Sign up</span>`
    : `Already have an account? <span onclick="toggleForm()">Login</span>`;

   document.getElementById("message").innerText = "";

}

function handleSubmit() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const url = isLogin
    ? "http://localhost:5000/login"
    : "http://localhost:5000/signup";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.text())
    .then(data => {
      // overwrite message 
      const messageEl = document.getElementById("message");
      messageEl.innerText = data;

      // optional: color feedback
      if (
        data === "Login successful" ||
        data === "User saved to database"
      ){
        messageEl.style.color = "lightgreen";
      } else {
        messageEl.style.color = "red";
      }

      // redirect after login
      if (data === "Login successful") {
        setTimeout(() => {
          window.location.href = "home.html";
        }, 1000);
      }
    })
    .catch(err => {
      document.getElementById("message").innerText = "Server error";
      console.error(err);
    });
}