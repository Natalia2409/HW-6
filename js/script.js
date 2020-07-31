const students = [{
	name: 'Tanya',
	course: 3,
	subjects: {
		math: [4, 4, 3, 4],
		algorithms: [3, 3, 3, 4, 4, 4],
		data_science: [5, 5, 3, 4]
	}
}, {
	name: 'Victor', 
	course: 4,
	subjects: {
		physics: [5, 5, 5, 3],
		economics: [2, 3, 3, 3, 3, 5],
		geometry: [5, 5, 2, 3, 5]
	}
}, {
	name: 'Anton', 
	course: 2,
	subjects: {
		statistics: [4, 5, 5, 5, 5, 3, 4, 3, 4, 5],
		english: [5, 3],
		cosmology: [5, 5, 5, 5]
	}
}];

function getSubjects(parameter) {
	let subjects = Object.keys(JSON.parse(JSON.stringify(parameter.subjects)));
	let newSubjects = subjects.map(subject => subject.charAt(0).toUpperCase() + subject.slice(1));
	let lastSubjects = newSubjects.map(subject => subject.replace(/_/g, ' '));
	return lastSubjects;
}



/*function getAverageMark(parameter) {
	let marks = Object.values(JSON.parse(JSON.stringify(parameter.subjects)));
	let reducer = (total, value) => total + value;
	let newMarks = marks.map(mark => (mark.reduce(reducer) / mark.length));
	let averageMarks = (newMarks.reduce(reducer) / newMarks.length).toFixed(2);
	console.log(averageMarks);
	return averageMarks;
}
getAverageMark(students[0]);*/ // Теж працює, але сумує по-інакшому і результат 3,83

function getAverageMark(parameter) {
	let marks = Object.values(JSON.parse(JSON.stringify(parameter.subjects))).flat();
	let reducer = (total, value) => total + value;
	let averageMarks = (marks.reduce(reducer) / marks.length).toFixed(2);
	return averageMarks;
}



function getStudentInfo(parameter) {
	let newInfo = JSON.parse(JSON.stringify(parameter));
	newInfo['averageMarks'] = getAverageMark(newInfo);
	delete newInfo.subjects;
	return newInfo;
}


function getStudentsName(parameter) {
	let arrayCopy = JSON.parse(JSON.stringify(parameter));
	let students = Object.values(arrayCopy);
	let studentsName = students.map(student => student.name).sort();
	return studentsName;
}


function getBestStudent(parameter) {
	let arrCopy = JSON.parse(JSON.stringify(parameter));
	let allMarks = [];
	for (let i = 0; i < arrCopy.length; i++) {
		let mark = getStudentInfo(arrCopy[i]);
		allMarks.push(mark);
	}
	let mark = 0;
	let name;
	for (let k = 0; k < allMarks.length; k++) {
		if (Number(allMarks[k].averageMarks) > mark) {
			mark = allMarks[k].averageMarks;
			name = allMarks[k].name;
		}
	}
	return name;
}


function calculateWordLetters(str) {
	let word = str.split('').sort();
		count = 1;
		i = 1;
		result = {};

	while (i < word.length) {
		if (word[i - 1] === word[i]) {
			count++;
		} else {
			result[word[i - 1]] = count;
			count = 1;
		}
		i++;
	}
	result[word[i - 1]] = count;
	return result;
}



let btnSubject = document.querySelectorAll('.subject');
let resultSubject = document.getElementById('result__subject');

for (let i = 0; i < btnSubject.length; i++) {
	btnSubject[i].addEventListener('click', () => {
		let subject = getSubjects(students[i]);
		resultSubject.innerHTML = `Предмети ${students[i].name}: ${subject}`
	});
}


let btnAverage = document.querySelectorAll('.average');
let resultAverage = document.getElementById('result__average');

for (let i = 0; i < btnAverage.length; i++) {
	btnAverage[i].addEventListener('click', () => {
		let average = getAverageMark(students[i]);
		resultAverage.innerHTML = `Середня оцінка ${students[i].name}: ${average}`
	});
}


let btnInfo = document.querySelectorAll('.info');
let resultInfo = document.getElementById('result__info');

for (let i = 0; i < btnInfo.length; i++) {
	btnInfo[i].addEventListener('click', () => {
		let newInfo = getStudentInfo(students[i]);
		let newArray = [];
		for (const [key, value] of Object.entries(newInfo)) {
			newArray.push(`${key}: ${value}`);
		}
		resultInfo.innerHTML = `Інформація про ${students[i].name}: ${newArray}`
	});
}


let btnName = document.querySelector('.name');
let resultName = document.getElementById('result__name');

btnName.addEventListener('click', () => {
	let name = getStudentsName(students);
	resultName.innerHTML = `${name}`
});


let btnBest = document.querySelector('.best');
let resultBest = document.getElementById('result__best');

btnBest.addEventListener('click', () => {
	let best = getBestStudent(students);
	resultBest.innerHTML = `${best}`
});


let btnWord = document.querySelector('.word');
let resultWord = document.getElementById('result__word');

btnWord.addEventListener('click', () => {
	let word = calculateWordLetters('антарктида');
	let newArray = [];
	for (const [key, value] of Object.entries(word)) {
		newArray.push(`${key}: ${value}`);
	}
	resultWord.innerHTML = `${newArray}`
});
