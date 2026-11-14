const form = document.querySelector("form");
const errorMessage = document.querySelector("#login-error");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#mdp").value;

    fetch("http://localhost:5678/api/users/login", {
    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        email: email,
        password: password
    })

    })

    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
        errorMessage.textContent = "Erreur dans l'identifiant ou le mot de passe.";
        }
    })

    .then(data => {
        if (data) {
            console.log(data);
            localStorage.setItem("token", data.token);
            window.location.href = "index.html";
        }
    });

});