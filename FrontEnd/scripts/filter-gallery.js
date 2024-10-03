import { getData } from "./get-data.js";

export const filterGallery = () => {
	getData().then((data) => {
		const categories = [];
		data.forEach((element) => {
			categories.push(element.category.name);
		});
		let uniqueCategories = Array.from(new Set(categories));

		const figures = document.querySelectorAll(".gallery__figure");
		const gallery = document.querySelector(".gallery");

		const portfolioTitle = document.querySelector(".portfolio__title");
		const filterButtonMenu = document.createElement("div");
		filterButtonMenu.classList.add("filter__button__menu");
		const resetButton = document.createElement("button");
		resetButton.classList.add("reset__button");
		portfolioTitle.append(filterButtonMenu);
		filterButtonMenu.appendChild(resetButton);
		resetButton.innerHTML = "Tous";

		const token = localStorage.getItem("token");
		
		if (token) {
			filterButtonMenu.style.display = "none";
		}

		uniqueCategories.forEach((element) => {
			const filterButton = document.createElement("button");
			filterButton.classList.add("filter__button");
			filterButtonMenu.appendChild(filterButton);
			filterButton.innerHTML = element;
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

		resetButton.addEventListener("click", () => {
			figures.forEach((figure) => {
				figure.classList.remove("hidden");
			});
		});
	});
};

filterGallery();