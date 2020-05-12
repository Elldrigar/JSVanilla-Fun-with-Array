const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMlnBTN = document.getElementById('show-mln');
const sortBtn = document.getElementById('sort');
const calculateBTN = document.getElementById('calculate-all');

let data = [];
getRandomUser();

async function getRandomUser() {
	const result = await fetch('https://randomuser.me/api');
	const data = await result.json();
	const user = data.results[0];
	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000),
	}

	addData(newUser);
}

function addData(obj) {
	data.push(obj);
	updateDOM();
}

function updateDOM(providedData = data) {
	main.innerHTML = '<h2><strong>Osoba:</strong> Kasa:</h2>';
	providedData.forEach(item => {
		const element = document.createElement('div');
		element.classList.add('person');
		element.innerHTML = `<strong>${item.name}</strong> ${item.money}`;
		main.appendChild(element);
	});
}

