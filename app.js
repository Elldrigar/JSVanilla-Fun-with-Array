const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMlnBTN = document.getElementById('show-mln');
const sortBtn = document.getElementById('sort');
const calculateBTN = document.getElementById('calculate-all');
const reset = document.getElementById('reset');

let data = [];

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

function doubleMoney() {
	data = data.map(user => {
		return {...user, money: user.money * 2 }
	});
	updateDOM();
}

function sortByRichest() {
	data.sort((a,b) => b.money - a.money);
	updateDOM();
}

function showMillionaires() {
	data = data.filter(user => user.money > 1000000);
	updateDOM();
}

function calculateTotal() {
	const total = data.reduce((acc, user) => (acc += user.money), 0);
	const totalEl = document.createElement('div');
	totalEl.innerHTML = `<h3>Suma: <strong>${formatMoney(total)}</strong></h3>`;
	main.appendChild(totalEl);
}

function addData(obj) {
	data.push(obj);
	updateDOM();
}

function resetAll() {
	data = [];
	updateDOM();
}

function updateDOM(providedData = data) {
	main.innerHTML = '<h2><strong>Osoba:</strong> Kasa:</h2>';
	providedData.forEach(item => {
		const element = document.createElement('div');
		element.classList.add('person');
		element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
		main.appendChild(element);
	});
}

function formatMoney(money) {
return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

//EVENT LISTENERS
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
reset.addEventListener('click', resetAll);
showMlnBTN.addEventListener('click', showMillionaires);
calculateBTN.addEventListener('click', calculateTotal);