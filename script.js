const firebaseConfig = {
  apiKey: "AIzaSyDLKvcfJyDmuVCyhst-osOjJEm4dcEMQsA",
  authDomain: "grievanceportal-85e26.firebaseapp.com",
  databaseURL: "https://grievanceportal-85e26-default-rtdb.firebaseio.com",
  projectId: "grievanceportal-85e26"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
  .then(userCred => userCred.user.getIdTokenResult(true))
  .then(idTokenResult => {
    if (idTokenResult.claims.admin) {
      window.location.href = "admin.html";
    } else {
      window.location.href = "form.html";
    }
  })
  .catch(err => {
    document.getElementById("error").innerText = "❌ " + err.message;
  });

}

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("🩷 Signed up successfully!");
    })
    .catch(err => {
      document.getElementById("error").innerText = "❌ " + err.message;
    });
}

function submitGrievance() {
  const mood = document.getElementById("mood").value;
  const complaint = document.getElementById("complaint").value;
  const time = new Date().toLocaleString();

  db.ref("grievances").push({ mood, complaint, time })
    .then(() => {
      alert("💔 Oopsie! Your pain has been noted. Admin will now cry in silence 😢");
      document.getElementById("complaint").value = "";
    });
}

if (window.location.pathname.includes("admin.html")) {
  auth.onAuthStateChanged(async user => {
    if (!user) return location.href = "index.html";
    const idTokenResult = await user.getIdTokenResult(true);
    if (!idTokenResult.claims.admin) return location.href = "form.html";

    db.ref("grievances").once("value", snapshot => {
      const data = snapshot.val();
      const list = document.getElementById("list");
      if (!data) return (list.innerHTML = "<p>No grievances yet 🎉</p>");
      Object.values(data).forEach((entry, i) => {
        list.innerHTML += `<div><h3>${i + 1}. ${entry.mood}</h3><p>${entry.complaint}</p><small>🕒 ${entry.time}</small></div><hr>`;
      });
    });
  });
}
