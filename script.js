function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

    window.location.href = "admin.html";
  } else {
    alert("🚫 Invalid credentials! Try again, sweetie 💔");
  }
}
