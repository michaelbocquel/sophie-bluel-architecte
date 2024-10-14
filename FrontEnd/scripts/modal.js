import { getData } from "./get-data.js";

const modal = document.querySelector(".modal");
const modalPhotoGalleryDiv = document.querySelector(
	".modal__photo__gallery__div"
);
const modalPhotoGallery = document.querySelector(".modal__photo__gallery");
const modalPhotoGallerySeparator = document.querySelector(
	".modal__photo__gallery__separator"
);
const modalPhotoGalleryTitle = document.querySelector(
	".modal__photo__gallery__title"
);
const modalPhotoAdd = document.querySelector(".modal__photo__add");
const portfolioModifyDiv = document.querySelector(".portfolio__modify__div");
const modalPhotoGalleryAddButton = document.querySelector(
	".modal__photo__gallery__add__button"
);
const backArrow = document.querySelector(".fa-arrow-left");

modalPhotoGalleryAddButton.addEventListener("click", () => {
	modalPhotoGallery.style.display = "none";
	modalPhotoAdd.classList.remove("hidden");
});

backArrow.addEventListener("click", () => {
	modalPhotoGallery.style.display = "flex";
	modalPhotoAdd.classList.add("hidden");
});

const token = localStorage.getItem("token");

if (token) {
	portfolioModifyDiv.addEventListener("click", () => {
		modal.showModal();
	});
}

export const displayModalGallery = () => {
	getData().then((data) => {
		for (let i = 0; i < data.length; i++) {
			const image = document.createElement("img");
			const iconDiv = document.createElement("div");
			const icon = document.createElement("i");

			image.classList.add("modal__image");
			iconDiv.classList.add("icon__div");
			icon.classList.add("fa-solid");
			icon.classList.add("fa-trash-can");

			image.src = data[i].imageUrl;

			modalPhotoGalleryAddButton.addEventListener("click", () => {
				modalPhotoGalleryDiv;
				image.classList.add("hidden");
				iconDiv.classList.add("hidden");
				icon.classList.add("hidden");
				modalPhotoGalleryTitle.classList.add("hidden");
				modalPhotoGallerySeparator.classList.add("hidden");
				modalPhotoGalleryAddButton.classList.add("hidden");
			});

			backArrow.addEventListener("click", () => {
				image.classList.remove("hidden");
				iconDiv.classList.remove("hidden");
				icon.classList.remove("hidden");
				modalPhotoGalleryTitle.classList.remove("hidden");
				modalPhotoGallerySeparator.classList.remove("hidden");
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
						window.location.reload();
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
