import { getData } from "./get-data.js";
import { getCategories } from "./get-categories.js";

const filterButtons = document.querySelectorAll(".filter__button");

export const filterGallery = () => {
	getCategories().then((data) => {
		for (let i = 0; i < data.length; i++) {
			filterButtons[i].innerHTML = data[i].name;
		}
	});

	getData().then((data) => {
		const resetButton = document.querySelector(".reset__button");
		resetButton.addEventListener("click", () => {
			figures.forEach((figure) => {
				figure.classList.remove("hidden");
			});
		});
		const gallery = document.querySelector(".gallery");
		const figures = document.querySelectorAll(".gallery__figure");
		filterButtons.forEach((filterButton) => {
			filterButton.addEventListener("click", () => {
				for (let n = 0; n < data.length; n++) {
					if (data[n].category.name !== filterButton.textContent) {
						gallery.childNodes[n].classList.add("hidden");
					} else {
						gallery.childNodes[n].classList.remove("hidden");
					}
				}
			});
		});
	});
};
filterGallery();
