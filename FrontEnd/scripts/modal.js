import { getData } from "./get-data.js";

const modal = document.querySelector(".modal");
const modalPhotoGallery = document.querySelector(".modal__photo__gallery");
const modalPhotoAdd = document.querySelector(".modal__photo__add");
const portfolioModifyButton = document.querySelector(
	".portfolio__modify__button"
);
const modalPhotoGalleryAddButton = document.querySelector(
	".modal__photo__gallery__add__button"
);

portfolioModifyButton.addEventListener("click", () => {
	modal.showModal();
});

modalPhotoGalleryAddButton.addEventListener("click", () => {
	modalPhotoGallery.classList.add("hidden");
	modalPhotoAdd.classList.remove("hidden");
});

export const displayModalGallery = () => {
	getData().then((data) => {
		data.forEach((element) => {
			const image = document.createElement("img");

			image.classList.add("modal__image");

			image.src = element.imageUrl;

			modalPhotoGallery.append(image);
		});
	});
};

displayModalGallery();

modal.addEventListener("click", (event) => {
	if (event.target === modal) {
		modal.close();
	}
});
