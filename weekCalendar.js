// WEEKLY CALENDAR
function createWeeklyCalendar() {

    if (tableForWeek.length === currentWeekNumber) { // checking if its last week of month get data for a next month and set start position fo week from 1
        nextMonth();
        currentWeekNumber = 1;
    } else if (currentWeekNumber === 0) { // checking if its first week of month get data for a previous month and set start position fo week from end
        let prevMonthReturn = previousMonth(); // get weeks arrays of previous month
        currentWeekNumber = prevMonthReturn.length - 1;  //set position to last week of month
        tableForWeek = prevMonthReturn;
    }

    $('.day-of-week').remove(); //remove old data in <div class="day-of-week"></div>
    $('.goal').remove(); //remove old data in <div class="goal"></div>

    tableForWeek[currentWeekNumber].map((el, index) => {
        if (el !== ' ') {
            $('.goals__wrapper').append(`
                <div class="day-of-week date${el}">${namesOfDays[index]} <span class="date-of-day">${el}</span> ${monthNamesForWeek[setMonth - 1]} ${setYear}</div>
        `);
        }
    });

    // rendering current period for weekly-calendar
    let startPeriodOfWeek = $('.day-of-week:first-child').text().slice(0, -4);
    let endPeriodOfWeek = $('.day-of-week:last-child').text().slice(0, -4);
    let allPeriod = startPeriodOfWeek === endPeriodOfWeek ? startPeriodOfWeek : startPeriodOfWeek + ' - ' + endPeriodOfWeek; // if starting period and ending period equal show only one period
    $('.current-week').html(allPeriod);

    addEventsInWeeklyCalendar();
}

function addEventsInWeeklyCalendar() {  // add events after checking data.element.date === classes of date+el.date
    data.map((el) => {   //el.date[0] just first number of date like 25.11.2020
        let dateForClass = el.date[0] === '0' ? el.date[1] : el.date[0] + el.date[1]; // if date started with '0' like '05.10.2020' use only '5'
        $('.date' + dateForClass).after(`
        <div class="goal">
            <div class="goal__type-wrapper">
                <img src="https://img.icons8.com/color/48/000000/task-completed.png" class="goal__img">
                <span class="goal__item goal__type">${el.type}</span>
            </div>
            <span class="goal__item goal__start">${el.date}</span>
            <span class="goal__item goal__end">${el.date}</span>
            <span class="goal__item goal__name">${el.goal}</span>
            <span class="goal__item goal__teacher">Дартенко Вейдер Петрович</span>
        </div>
            `);
    });
    addWeeklyStyles();
}

function addWeeklyStyles() {
    $('.month-navigate').css('display', 'none'); // hide month calendar
    $('.calendar__wrapper').css('display', 'none'); // hide month calendar
    $('#calendar-day').css('display', 'none'); // hide daily calendar
    $('#calendar-week').css('display', 'block'); // show weekly calendar
    $('.month').removeClass('active-calendar-btn'); // deactivate button 'on month' calendar
    $('.day').removeClass('active-calendar-btn');  // deactivate button 'on day' calendar
    $('.week').addClass('active-calendar-btn'); // activate button 'on week' calendar
}

function previousWeek() { //just use createWeeklyCalendar() with parameter(position of week array in month array) of previous week
    createWeeklyCalendar(currentWeekNumber--);
}

function nextWeek() { //just use createWeeklyCalendar() with parameter(position of week array in month array) of next week
    createWeeklyCalendar(currentWeekNumber++);
}

function filterForWeeklyTasks() { // filtering events in current period

    let allGoals = [...$('.goal__type')];

    if ($('#typeOfTask').val() === 'all') {  // if current filter 'all' show all events
        allGoals.map((element) => {
            element.parentElement.parentElement.style = 'display: flex;'; // showing all events
        });
    } else {
        allGoals.map((element) => {  // if current filter not 'all'  show current filter events and hide other
            element.parentElement.parentElement.style = 'display: flex;';
        });

        allGoals.map((element) => {
            if (element.innerText !== $('#typeOfTask').val()) {
                element.parentElement.parentElement.style = 'display: none;';
            }
        })
    }
}
