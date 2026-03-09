// console.log("On y va ?");

function loginForm() {
  const form = document.querySelector(".loading");
  const errorMessage = document.querySelector("#error-message");

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const emailInput = document.querySelector('input[name="email"]');
      const passwordInput = document.querySelector('input[name="password"]');

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      if (!email || !password) {
        if (errorMessage) {
          errorMessage.textContent = "Veuillez remplir tous les champs.";
        }
        return;
      }

      try {
        const response = await fetch("http://localhost:5678/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (!response.ok) {
          if (errorMessage) {
            errorMessage.textContent = "Email ou mot de passe incorrect.";
          }
          return;
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
      } catch (error) {
        if (errorMessage) {
          errorMessage.textContent =
            "Une erreur est survenue. Réessaie plus tard.";
        }
        console.error("Erreur de connexion :", error);
      }
    });
  }
}

loginForm();

