// Элементы на странице
let birthDate = document.querySelector('#birthDate');
let dayOfWeek = document.querySelector('#dayOfWeek');
let yearIsLeap = document.querySelector('#yearIsLeap');
let ageByDate = document.querySelector('#ageByDate');

// Функция для проверки на действительность введённой даты
function isValidDate(day, month, year) {
	const dayNum = parseInt(day);
	const monthNum = parseInt(month);
	const yearNum = parseInt(year);

	if(dayNum < 1 || dayNum > 31 || monthNum < 1 || monthNum > 12 || yearNum < 1900 || yearNum > 2025){
		return false;
	}

	const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
	if(dayNum > daysInMonth){
		return false;
	}

	const today = new Date();
	const inputDate = new Date(yearNum, monthNum - 1, dayNum);
	if(inputDate > today){
		return false;
	}

	return true;
}

// Функция для определения дня недели по введённой дате
function getDayOfWeek(day, month, year){
	const dayNum = parseInt(day);
	const monthNum = parseInt(month);
	const yearNum = parseInt(year);

	let date = new Date(yearNum, monthNum-1, dayNum);
	const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
	let result = days[date.getDay()];
	return result;
}

// Функция проверяет является ли введённый год високосным
function isYearLeap(year){
	const yearNum = parseInt(year);
	const isLeap = (yearNum % 4 === 0 && yearNum % 100 !== 0) || (yearNum % 400 === 0);

	if(isLeap){
		return `${yearNum} год - високосный`;
	}else{
		return `${yearNum} год не високосный`;
	}
}

// Функция определяет возраст пользователя по введённой дате
function countAge(day, month, year){
	const dayNum = parseInt(day);
	const monthNum = parseInt(month);
	const yearNum = parseInt(year);

	let dateBirth = new Date(yearNum, monthNum-1, dayNum);
	let diff_ms = Date.now() - dateBirth.getTime();
	let age_dt = new Date(diff_ms);

	return Math.abs(age_dt.getUTCFullYear() - 1970);
}

// Функция подбирает правильное выражение возраста пользователя
function getAgeWord(age){
	if(age % 10 === 1 && age % 100 !== 11){
		return ' год';
	}else if([2, 3, 4].includes(age % 10) && ![12, 13, 14].includes(age % 100)){
		return ' года';
	}else{
		return ' лет';
	}
}

// Функция создаёт образ цифры как на электронном табло
function createStarDigit(digit){
	const patterns = {
		'0': [
			' *** ',
			'*   *',
			'*   *',
			'*   *',
			' *** '
		],
		'1': [
			'  * ',
			'  * ',
			'  * ',
			'  * ',
			'  * '
		],
		'2': [
			' *** ',
			'    *',
			' *** ',
			'*    ',
			' *** '
		],
		'3': [
			' *** ',
			'    *',
			'  ** ',
			'    *',
			' *** '
		],
		'4': [
			'*   *',
			'*   *',
			'*****',
			'    *',
			'    *'
		],
		'5': [
			'**** ',
			'*    ',
			'**** ',
			'   * ',
			'**** '
		],
		'6': [
			' *** ',
			'*    ',
			'**** ',
			'*   *',
			' *** '
		],
		'7': [
			'*****',
			'   * ',
			'  *  ',
			' *   ',
			'*    '
		],
		'8': [
			' *** ',
			'*   *',
			' *** ',
			'*   *',
			' *** '
		],
		'9': [
			' *** ',
			'*   *',
			' ****',
			'    *',
			' *** '
		]
	};

	return patterns[digit] || ['     ', '     ', '     ', '     ', '     '];
}

// Функция для отображения даты рождения в консоли как на электронном табло
function displayDateWithStars(day, month, year){
	const formattedDay = day.padStart(2, '0');
	const formattedMonth = month.padStart(2, '0');

	const dateString = `${formattedDay} ${formattedMonth} ${year}`;

	let output = `Дата рождения: ${formattedDay}.${formattedMonth}.${year}\n\n`;

	const chars = dateString.split('');

	for(let row = 0; row < 5; row++){
		let line = '';
		for(let char of chars){
			if(char === ' '){
				line += '   ';
			}else if(/\d/.test(char)){
				line += createStarDigit(char)[row] + ' ';
			}
		}
		output += line + '\n';
	}
	console.log(output);
}

// Запрашиваем у пользователя день, месяц и год рождения
let day = prompt("Введите день своего рождения:");
let month = prompt("Введите номер месяца своего рождения:");
let year = prompt("Введите год своего рождения:");

// Проверяем дату на действительность
if(isValidDate(day, month, year)){

	// Выводим дату рождения на страницу
	birthDate.innerHTML = `Дата рождения: ${day.padStart(2, '0')}.${month.padStart(2, '0')}.${year}`;
	
	// День недели
	dayOfWeek.innerHTML = getDayOfWeek(day, month, year);
	
	// Високосный год
	yearIsLeap.innerHTML = isYearLeap(year);
	
	// Возраст пользователя
	ageByDate.innerHTML = countAge(day, month, year) + getAgeWord(countAge(day, month, year));
	
	// Отображаем дату рождения в консоли как на электронном табло
	displayDateWithStars(day, month, year);
}else{
	// Если дата не корректная, то выводим сообщение об ошибке
	alert(`Некорректная дата рождения!
Введите правильную дату рождения.`);
	// После этого перезагружаем страницу для повторного ввода данных.
	location.reload();
}