import { getData } from "./get-data.js";

const modalFormSubmit = document.querySelector(".modal__form__submit");

const token = localStorage.getItem("token");

export const addProject = () => {
	getData().then((data) => {
		modalFormSubmit.addEventListener("click", () => {
			fetch("http://localhost:5678/api/works", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					image: image.value,
					title: title.value,
					category: category.value,
				}),
			}).then((res) => {
				console.log(res)
			});
		});
	});
};
