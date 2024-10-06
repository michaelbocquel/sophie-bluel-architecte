import { getData } from "./get-data.js";

const loginLink = document.querySelector(".login__link");
const editionModeDisplay = document.querySelector(".edition__mode__display");

loginLink.innerHTML = "login";

const token = localStorage.getItem("token");

loginLink.addEventListener("click", () => {
	localStorage.removeItem("token");
});

if (token) {
	loginLink.innerHTML = "logout";
	editionModeDisplay.classList.remove("hidden");
}

export const displayPortfolioGallery = () => {
	getData().then((data) => {
		data.forEach((element) => {
			const gallery = document.querySelector(".gallery");
			const figure = document.createElement("figure");
			const image = document.createElement("img");
			const figcaption = document.createElement("figcaption");

			figure.classList.add("gallery__figure");
			image.classList.add("gallery__image");
			figcaption.classList.add("gallery__figcaption");

			image.src = element.imageUrl;
			figcaption.innerHTML = element.title;

			figure.append(image);
			figure.append(figcaption);
			gallery.append(figure);
		});
	});
};

displayPortfolioGallery();
