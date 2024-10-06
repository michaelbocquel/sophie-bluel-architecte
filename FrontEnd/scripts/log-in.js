const formSubmit = document.querySelector(".form__submit");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const loginErrorMessage = document.querySelector("#login-error-msg");
const loginLink = document.querySelector(".login__link");

async function logIn() {
	const response = await fetch("http://localhost:5678/api/users/login", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email: email.value, password: password.value }),
	});
	if (response.ok === true) {
		window.location.href = "../pages/index.html";
		return response.json();
	} else {
		loginErrorMessage.style.opacity = 1;
		throw new Error("Impossible de contacter le serveur");
	}
}

formSubmit.addEventListener("click", (e) => {
	e.preventDefault();
	logIn().then((log) => {
		localStorage.setItem("token", log.token);
		const token = localStorage.getItem("token");
		console.log(token);
		if (token) {
			loginLink.innerHTML = "logout";
		}
	});
});
