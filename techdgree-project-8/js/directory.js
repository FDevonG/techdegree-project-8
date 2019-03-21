/* jshint esversion: 6 */

let employeeList = [];
const employeeContainer = document.querySelector('#employees');//USED TO STORE THE GENERATED LIST OF EMPLOYEES IN

fetch('https://randomuser.me/api/?results=12')
.then(response => response.json())
.then(data => generateEmployeeList(data));

function generateEmployeeList (data) {
	'use strict';
	employeeList = data.results;
	let employeeListHTML = '<ul class="employees__list">';
	
	for (let i = 0; i < data.results.length; i++) {
		
		const pictureURL = employeeList[i].picture.large;
		const employeeName = employeeList[i].name.first + ' ' + employeeList[i].name.last;
		const employeeEmail = employeeList[i].email;
		const employeeCity = employeeList[i].location.city;
		
		employeeListHTML += '<li class="employees__list--item">';
		employeeListHTML += '<img src='+ pictureURL + ' alt=' + employeeName +' class="employeeImage">';
		employeeListHTML += '<h2>'+ employeeName +'</h2>';
		employeeListHTML += '<p>'+ employeeEmail +'</p>';
		employeeListHTML += '<p>' + employeeCity + '</p>';
		employeeListHTML += '</li>';
		
	}
	employeeListHTML += '</ul>';
	employeeContainer.innerHTML = employeeListHTML;
}