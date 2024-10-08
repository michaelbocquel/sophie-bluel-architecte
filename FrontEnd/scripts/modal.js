import { getData } from "./get-data.js";

const modal = document.querySelector(".modal");
const modalPhotoGallery = document.querySelector(".modal__photo__gallery");
const modalPhotoGalleryTitle = document.querySelector(
	".modal__photo__gallery__title"
);
const modalPhotoAdd = document.querySelector(".modal__photo__add");
const portfolioModifyButton = document.querySelector(
	".portfolio__modify__button"
);
const modalPhotoGalleryAddButton = document.querySelector(
	".modal__photo__gallery__add__button"
);
const backArrow = document.querySelector(".fa-arrow-left");

portfolioModifyButton.addEventListener("click", () => {
	modal.showModal();
});

modalPhotoGalleryAddButton.addEventListener("click", () => {
	modalPhotoGallery.classList.add("hidden");
	modalPhotoAdd.classList.remove("hidden");
});

backArrow.addEventListener("click", () => {
	modalPhotoGallery.classList.remove("hidden");
	modalPhotoAdd.classList.add("hidden");
});

const token = localStorage.getItem("token");

export const displayModalGallery = () => {
	getData().then((data) => {
		for (let i = 0; i <= data.length; i++) {
			const image = document.createElement("img");
			const iconDiv = document.createElement("div");
			const icon = document.createElement("i");

			image.classList.add("modal__image");
			iconDiv.classList.add("icon__div");
			icon.classList.add("fa-solid");
			icon.classList.add("fa-trash-can");

			image.src = data[i].imageUrl;

			modalPhotoGalleryAddButton.addEventListener("click", () => {
				image.classList.add("hidden");
				iconDiv.classList.add("hidden");
				modalPhotoGalleryTitle.classList.add("hidden");
				modalPhotoGalleryAddButton.classList.add("hidden");
			});

			backArrow.addEventListener("click", () => {
				image.classList.remove("hidden");
				iconDiv.classList.remove("hidden");
				modalPhotoGalleryTitle.classList.remove("hidden");
				modalPhotoGalleryAddButton.classList.remove("hidden");
			});

			modalPhotoGallery.append(image);
			modalPhotoGallery.append(iconDiv);
			iconDiv.append(icon);

			iconDiv.addEventListener("click", () => {
				const response = fetch(
					"http://localhost:5678/api/works/" + `${data[i].id}`,
					{
						method: "DELETE",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				).then((res) => {
					if (res.status === 204) {
						image.remove();
						iconDiv.remove();
					}
				});
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
