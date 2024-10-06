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

const token = localStorage.getItem("token");

export const displayModalGallery = () => {
	getData().then((data) => {
		for (let i = 1; i <= data.length; i++) {
			console.log(i);
			const image = document.createElement("img");
			const iconDiv = document.createElement("div");
			const icon = document.createElement("i");

			image.classList.add("modal__image");
			iconDiv.classList.add("icon__div");
			icon.classList.add("fa-solid");
			icon.classList.add("fa-trash-can");

			image.src = data[i].imageUrl;

			modalPhotoGallery.append(image);
			modalPhotoGallery.append(iconDiv);
			iconDiv.append(icon);

			iconDiv.addEventListener("click", () => {
				fetch("http://localhost:5678/api/works/" + i, {
					method: "DELETE",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}).then((res) => console.log(res));
			});
		}
	});
};

displayModalGallery();

modal.addEventListener("click", (event) => {
	if (event.target === modal) {
		modal.close();
	}
});
