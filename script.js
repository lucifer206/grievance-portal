function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user === "GF" && pass === "IloveYou") {
    window.location.href = "gf.html";
  } else if (user === "Admin" && pass === "God") {
    window.location.href = "admin.html";
  } else {
    alert("🚫 Invalid credentials! Try again, sweetie 💔");
  }
}
