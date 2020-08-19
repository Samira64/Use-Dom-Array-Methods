const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


let data = [];

function getRandomUser() {
	fetch(`https://randomuser.me/api`)
	.then(res => res.json())
	.then(function(data){
		const user = data.results[0];

		const newUser = {
			name: user.name.first + user.name.last,
			money: Math.floor(Math.random() * 1000000)
		};
		addData(newUser);
	});
}


//Doubles everyone's money
function doubleMoney() {
	data = data.map(user => {
		return { ...user, money: user.money * 2 };
	});
	
	addUserToDOM();
}


//Add new user to data array
function addData(user) {
	data.push(user);

	addUserToDOM();
}


//Add the new user to the DOM
function addUserToDOM(someData = data) {
	main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;

	someData.forEach(item => {
		const element = document.createElement("div");
		element.className += "person";
		const formattedMoney = formatMoney(item.money);

		element.innerHTML = `<strong>${item.name}</strong>${formattedMoney}`;

		main.appendChild(element);
	});		
}


//Filter richer users
function filterUsers() {
	const filtered = data.filter(user => user.money > 1000000);
	addUserToDOM(filtered);
}


//Sort millionairs in descending order
function sortUsers() {
	const sortedUsers = data.sort((a,b) => b.money - a.money);
	addUserToDOM(sortedUsers);
}

//Calculate total wealth
function calculateWealth() {
	const totalWealth = data.reduce(function(memoizer, currentItem) {
		return memoizer + currentItem.money; 
	}, 0);

	const wealthElement = document.createElement("div");
		
	const formattedMoney = formatMoney(totalWealth);
	wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formattedMoney}</strong></h3>`;

	main.appendChild(wealthElement);
}

//Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
showMillionairesBtn.addEventListener("click", filterUsers);
sortBtn.addEventListener("click", sortUsers);
calculateWealthBtn.addEventListener("click", calculateWealth);


function formatMoney(number) {
	return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}




























