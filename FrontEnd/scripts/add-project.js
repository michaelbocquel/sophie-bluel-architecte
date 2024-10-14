import { getCategories } from "./get-categories.js";

const modalForm = document.querySelector(".modal__form");
const modalFormPhoto = document.querySelector(".modal__form__photo");
const modalFormButton = document.querySelector(".modal__form__button");
const modalFormSizeInfo = document.querySelector(".modal__form__size__info");
const modalTitleInput = document.querySelector(".modal__title__input");
const modalCategorySelect = document.querySelector(".modal__category__select");
const modalImageInput = document.querySelector(".modal__image__input");

const token = localStorage.getItem("token");

modalImageInput.addEventListener("change", (event) => {
	modalFormPhoto.src = window.URL.createObjectURL(event.target.files[0]);
	modalFormButton.classList.add('hidden')
	modalFormSizeInfo.classList.add('hidden')
});

getCategories().then((data) => {
	for (let i = 0; i < data.length; i++) {
		const modalCategoryOption = document.createElement("option");
		modalCategoryOption.value = i + 1;
		modalCategoryOption.innerHTML = data[i].name;
		modalCategorySelect.append(modalCategoryOption);
	}
});

export const addProject = (e) => {
	e.preventDefault();
	let formData = new FormData();
	formData.append("title", modalTitleInput.value);
	formData.append("category", parseInt(modalCategorySelect.value));
	formData.append("image", modalImageInput.files[0]);
	fetch("http://localhost:5678/api/works", {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: formData,
	}).then((response) => {
		if (response.status === 201) {
			window.location.reload();
		}
	});
};
modalForm.onsubmit = (e) => {
	e.preventDefault();
	addProject(e);
};
