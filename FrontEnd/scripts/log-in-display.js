const loginLink = document.querySelector(".login__link");
const portfolio = document.querySelector(".portfolio");
const portfolioTitle = document.querySelector(".portfolio__title");
const filterButtonMenu = document.querySelector(".filter__button__menu");

loginLink.innerHTML = "login";

const token = localStorage.getItem("token");

if (token) {
	loginLink.innerHTML = "logout";
	loginLink.href = "";
	filterButtonMenu.classList.add("hidden");

	const editDiv = document.createElement("div");
	editDiv.classList.add("edit");
	const editIcon = document.createElement("i");
	editIcon.classList.add("fa-regular");
	editIcon.classList.add("fa-pen-to-square");
	const editText = document.createElement("p");
	editText.classList.add("edit__text");
	editText.innerHTML = "Mode édition";
	const portfolioModifyDiv = document.createElement("div");
	portfolioModifyDiv.classList.add("portfolio__modify__div");
	const portfolioModifyIcon = document.createElement("i");
	portfolioModifyIcon.classList.add("portfolio__modify__icon");
	portfolioModifyIcon.classList.add("fa-regular");
	portfolioModifyIcon.classList.add("fa-pen-to-square");
	const portfolioModifyText = document.createElement("p");
	portfolioModifyText.classList.add("portfolio__modify__text");
	portfolioModifyText.innerHTML = "modifier";

	editDiv.append(editIcon);
	editDiv.append(editText);
	document.body.prepend(editDiv);
	document.body.append(portfolioModifyDiv);
	portfolioTitle.after(portfolioModifyDiv);
	portfolioModifyDiv.append(portfolioModifyIcon);
	portfolioModifyDiv.append(portfolioModifyText);
}

loginLink.addEventListener("click", () => {
	localStorage.removeItem("token");
});
