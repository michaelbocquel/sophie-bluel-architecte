const loginFormSubmit = document.querySelector(".login__form__submit");
const loginFormEmailInput = document.querySelector(
	".login__form__email__input"
);
const loginFormPasswordInput = document.querySelector(
	".login__form__password__input"
);
const loginFormErrorMessage = document.querySelector(
	".login__form__error__message"
);

const logIn = async () => {
	await fetch("http://localhost:5678/api/users/login", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: loginFormEmailInput.value,
			password: loginFormPasswordInput.value,
		}),
	})
		.then((response) => {
			if (response.status === 200) {
				window.location.href = "../pages/index.html";
				return response.json();
			} else {
				loginFormErrorMessage.style.opacity = 1;
			}
		})
		.then((data) => localStorage.setItem("token", data.token));
};

loginFormSubmit.addEventListener("click", (e) => {
	e.preventDefault();
	logIn();
});
