export const getData = async () =>
	await fetch("http://localhost:5678/api/works").then((response) => response.json());
