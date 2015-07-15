// ! ! !
// Three Bugs
/*
First, in the function, calculateSTI, the array referrences needed to be "array[1][x]", where x is the proper position 
for what is being looked for. I think that's two mistakes in one. 

Where it said "return basePercent - 1;", the "- 1" was a bug and removing it fixed it. 

I also made it round for newArray[3]

And where it's calling newArray[2], I rewrote the formula so we don't get those long decimals.

That's 4 or 5 bugs? hm. 

Then I took a break before cracking into the deep stuff.

*/

var arrayAtticus = ["Atticus", "2405", "47000", 3];
var arrayJem = ["Jem", "62347", "63500", 4];
var arrayBoo = ["Boo", "11435", "54000", 3];
var arrayScout = ["Scout", "6243", "74750", 5];

var array = [arrayAtticus, arrayJem, arrayBoo, arrayScout];

//Create variables used to write to the DOM
var newEl, newText, position;
//Capture the position of insertion into the DOM
position = document.getElementById('content');

//Loop the array, extracting each array and writing information to the DOM
//Note that the information is not 'clean'
for(var i = 0; i < array.length; i++){
	array[i] = calculateSTI(array);
 	newEl = document.createElement('li');
	newText = document.createTextNode(array[i]);
	newEl.appendChild(newText);
	position.appendChild(newEl);
}

function calculateSTI(array){
  var newArray = [];
// I had it reference the sub array's position below. now we only get one iteration of the array.
// Then I changed the first reference to 'i', but not on the next line - a problem.
  newArray[0] = array[i][0];

  var employeeNumber = array[i][1];
  var baseSalary = array[i][2];
  var reviewScore = array[i][3];
// console.log(array[i][0]); used to see if this above was working, it was
  var bonus = getBaseSTI(reviewScore) + getYearAdjustment(employeeNumber) - getIncomeAdjustment(baseSalary);
  if(bonus > 0.13){
    bonus = 0.13;
  }

  newArray[1] = bonus;
//changed the string to a number, replaced the "1.0 + bonus" to "(baseSalary * bonus)".
//this got rid of the decimals after the total salary.  
  newArray[2] = parseInt(baseSalary) + (baseSalary * bonus); 
// added Math.round to fix that per the instructions.
  newArray[3] = Math.round(baseSalary * bonus);

 console.log(newArray[0] + " " + newArray[1] + " " + newArray[2] + " " + newArray[3]);
  return newArray;
}

function getBaseSTI(reviewScore){
  var basePercent;
  switch(reviewScore){
    case 1:
      basePercent = 0;
      break;
    case 2:
      basePercent = 0;
      break;
    case 3:
      basePercent = 0.04;
      break;
    case 4:
      basePercent = 0.06;
      break;
    case 5:
      basePercent = 0.10;
      break;
  }
  // console.log(basePercent); Used to see if "basePercent - 1" was a problem, it was.
  return basePercent;
}

function getYearAdjustment(employeeNumber){
  var yearAdjustment = 0;
  if(employeeNumber.length == 4){
    yearAdjustment = 0.05;
  }
  return yearAdjustment;
}

function getIncomeAdjustment(salary){
  var incomeAdjustment = 0;
  salary = parseInt(salary);
  if(salary > 65000){
    incomeAdjustment = 0.01;
  }
  return incomeAdjustment;
}