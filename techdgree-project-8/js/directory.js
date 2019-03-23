/* jshint esversion: 6 */

let index = 0;//used to keep track of the current array index being viewed

const userSearch = document.querySelector('#user-search');

//EMPLOYEE LIST VARS
let employeeList = []; // an array used to store the returned array or employees
const employeeContainer = document.querySelector('#employees');//USED TO STORE THE GENERATED LIST OF EMPLOYEES IN


//OVERLAY VARS
const overlay = document.querySelector('#overlay');
const overlayImage = document.querySelector('.overlay-image');
const overlayName = document.querySelector('.overlay-name');
const overlayEmail = document.querySelector('.overlay-email');
const overlayCity = document.querySelector('.overlay-city');
const overlayTelephone = document.querySelector('.overlay-telephone');
const overlayAddress = document.querySelector('.overlay-address');
const overlayBirthday = document.querySelector('.overlay-birthday');
const overlayExit = document.querySelector('.overlay-exit');
const nextImage = document.querySelector('.next-image');
const prevImage = document.querySelector('.previous-image');

employeeContainer.addEventListener('click', event => {
	'use strict';
	displayOverLay(event);
});

fetchData('https://randomuser.me/api/?results=12&nat=CA');

function fetchData (url) {
	'use strict';
	fetch(url)
	.then(response => response.json())
	.then(data => generateEmployeeList(data));
}

function generateEmployeeList (data) {
	'use strict';
	employeeList = data.results;
	generateEmployees(employeeList);
}

function generateEmployees (array) {
	'use strict';
	
	employeeContainer.innerHTML = '';
	
	let employeeListHTML = '<ul class="employees__list">';
	
	for (let i = 0; i < array.length; i++) {
		
		const pictureURL = array[i].picture.large;
		const employeeName = array[i].name.first + ' ' + array[i].name.last;
		const employeeEmail = array[i].email;
		const employeeCity = array[i].location.city;
		
		employeeListHTML += '<li class="employees__list--item ' + i + '">';
		employeeListHTML += '<img src='+ pictureURL + ' alt=' + employeeName +' class="employee-image">';
		employeeListHTML += '<h2 class="employee-name">'+ employeeName +'</h2>';
		employeeListHTML += '<p class="employee-email">'+ employeeEmail +'</p>';
		employeeListHTML += '<p class="employee-city">' + employeeCity + '</p>';
		employeeListHTML += '</li>';
		
	}
	employeeListHTML += '</ul>';
	employeeContainer.innerHTML = employeeListHTML;
}

function displayOverLay (event) {
	'use strict';

	let clickedElement;
	if (event.target.tagName === 'LI' || event.target.parentNode.tagName === 'LI') {
		if (overlay.style.display !== 'block') {
			overlay.style.display = "block";
		} 
	}
	
	if (event.target.tagName === 'LI') {
		clickedElement = event.target;
	} else if (event.target.parentNode.tagName === 'LI') {
		clickedElement = event.target.parentNode;   
	}
	
	index = parseInt(clickedElement.classList[1]);
	generateCardInfo();
	
}

function generateCardInfo () {
	'use strict';
	overlayImage.src = employeeList[index].picture.large;
	overlayImage.alt = employeeList[index].name.first + ' ' + employeeList[index].name.last;
	overlayName.textContent = employeeList[index].name.first + ' ' + employeeList[index].name.last;
	overlayEmail.textContent = employeeList[index].email;
	overlayCity.textContent = employeeList[index].location.city;
	overlayTelephone.textContent = employeeList.cell;
	overlayAddress.textContent = employeeList[index].location.street + ', ' +  employeeList[index].location.state + ' ' + employeeList[index].location.postcode;
	const birthdayHolder = employeeList[index].dob.date;
	overlayBirthday.textContent = "Birthday: " + birthdayHolder[5] + birthdayHolder[6] + "/" + birthdayHolder[8] + birthdayHolder[9] + "/" + birthdayHolder[1] + birthdayHolder[2];
}

overlayExit.addEventListener('click', event => closeOverlay(event));

overlay.addEventListener('click', event => closeOverlay(event));

function closeOverlay (event) {
	'use strict';
	if (event.target.classList.contains('overlay-exit') || event.target.id === 'overlay') {
		if (overlay.style.display !== 'none') {
			overlay.style.display = "none";
		} 
	}
}

nextImage.addEventListener('click', () => {
	'use strict';
	if (index !== employeeList.length) {
		index += 1;
	} else {
		index = 0;
	}
	generateCardInfo();
});

prevImage.addEventListener('click', () => {
	'use strict';
	if (index !== 0) {
		index -= 1;
	} else {
		index = employeeList.length;
	}
	generateCardInfo();
});


userSearch.addEventListener('keyup', filterResults);

function filterResults () {
	'use strict';
	
	const searchValue = String(userSearch.value);
	const searchArray = [];
	
	for (let i = 0; i < employeeList.length; i++) {
		
		const name = employeeList[i].name.first + ' ' + employeeList[i].name.last;
		
		let nameFound = true;
		
		for (let x = 0; x < searchValue.length; x++) {
			if (searchValue[x] !== name[x]) {
				nameFound = false;
			} 
		}
		if (nameFound) {
			searchArray.push(employeeList[i]);
		}
		
	}

	if (searchValue !== '') {
		generateEmployees(searchArray);
	} else {
		generateEmployees(employeeList);
	}
}

