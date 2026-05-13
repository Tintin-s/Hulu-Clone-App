function signup() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  const messageEl = document.getElementById("message");

  // Password match check
  if (password !== confirmPassword) {
    messageEl.innerText = "Passwords do not match";
    messageEl.style.color = "red";
    return;
  }

  // Minimum password length
  if (password.length < 6) {
    messageEl.innerText = "Password must be at least 6 characters";
    messageEl.style.color = "red";
    return;
  }

  fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      email,
      password
    })
  })
    .then(res => res.text())
    .then(data => {
      messageEl.innerText = data;

      if (
        data.includes("successful") ||
        data.includes("saved")
      ) {
        messageEl.style.color = "lightgreen";

        // Redirect to login page
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1000);

      } else {
        messageEl.style.color = "red";
      }
    })
    .catch(err => {
      messageEl.innerText = "Server error";
      messageEl.style.color = "red";
      console.error(err);
    });
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const messageEl = document.getElementById("message");

  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(res => res.text())
    .then(data => {
      messageEl.innerText = data;

      if (data === "Login successful") {
        messageEl.style.color = "lightgreen";

        // Redirect to homepage
        setTimeout(() => {
          window.location.href = "home.html";
        }, 1000);

      } else {
        messageEl.style.color = "red";
      }
    })
    .catch(err => {
      messageEl.innerText = "Server error";
      messageEl.style.color = "red";
      console.error(err);
    });
}

function resetPassword() {

  const email =
    document.getElementById("email").value;

  const newPassword =
    document.getElementById("new-password").value;

  const confirmPassword =
    document.getElementById("confirm-password").value;

  const messageEl =
    document.getElementById("message");

  // Confirm password check
  if (newPassword !== confirmPassword) {

    messageEl.innerText =
      "Passwords do not match";

    messageEl.style.color = "red";

    return;
  }

  // Password length check
  if (newPassword.length < 6) {

    messageEl.innerText =
      "Password must be at least 6 characters";

    messageEl.style.color = "red";

    return;
  }

  fetch("http://localhost:5000/reset-password", {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      email,
      newPassword
    })
  })
    .then(res => res.text())
    .then(data => {

      messageEl.innerText = data;

      if (data.includes("successful")) {

        messageEl.style.color = "lightgreen";

        setTimeout(() => {
          window.location.href = "login.html";
        }, 1000);

      } else {

        messageEl.style.color = "red";
      }
    })
    .catch(err => {

      console.error(err);

      messageEl.innerText = "Server error";

      messageEl.style.color = "red";
    });
}