import { getData } from "./get-data.js";

const modal = document.querySelector(".modal");
const portfolioModifyButton = document.querySelector(
	".portfolio__modify__button"
);

portfolioModifyButton.addEventListener("click", () => {
	modal.showModal();
});

export const displayModalGallery = () => {
	getData().then((data) => {
		data.forEach((element) => {
			console.log(element);
			const image = document.createElement("img");

			image.classList.add("modal__image");

			image.src = element.imageUrl;

			modal.append(image)
		});
	});
};

displayModalGallery();