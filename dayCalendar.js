let amountDays;

function createDailyCalendar() { // make array with amount day in month and numbers of this day
    amountDays = tableForWeek.flat().slice(7).join(' ').trim().split(' '); // get array with days in month
    amountDays = Number(amountDays[amountDays.length - 1]); // get max day in month from array days in month and turn into type - Number
    currentDay = 1;

    addEventsInDailyCalendar();
}

function addEventsInDailyCalendar() {

    $('.goal').remove();


    data.map((el) => {
        let dateDay = Number(el.date[0] + el.date[1]);
        if (currentDay === dateDay) {
            $('.day-goals__wrapper').append(`
            <div class="goal">
                <div class="goal__type-wrapper">
                   <img src="https://img.icons8.com/color/48/000000/task-completed.png" class="goal__img">
                    <span class="goal__item goal__type">${el.type}</span>
                </div>
                <span class="goal__item goal__start">${el.date}</span>
            <span class="goal__item goal__end">${el.date}</span>
            <span class="goal__item goal__name">${el.goal}</span>
                <span class="goal__item goal__teacher">Дартенко Вейдер Петрович</span>
            </div>`);
        }
    });
    $('.current-day').html(`${currentDay}-e ${monthNamesForWeek[currentMonthNumber - 1]}`); // show current day and month

    if($('.goal').length === 0) { // show/hide information on current day
        $('.day-goals__wrapper').html(`<div class="no-data"><img src="https://img.icons8.com/cotton/64/000000/clipboard-1.png">Данні за поточний період відсутні</div>`);
    }   else {
        $('.no-data').remove();
    }
    addDailyStyles();
}

function addDailyStyles() {
    $('.month-navigate').css('display', 'none'); // hide others calendars (for month and day);
    $('.calendar__wrapper').css('display', 'none'); // hide monthly calendar
    $('#calendar-week').css('display', 'none'); // hide weekly calendar
    $('#calendar-day').css('display', 'block'); // show weekly calendar
    $('.month').removeClass('active-calendar-btn'); // deactivate button 'on month' calendar
    $('.week').removeClass('active-calendar-btn'); // deactivate button 'on week' calendar
    $('.day').addClass('active-calendar-btn');  // activate button 'on day' calendar
}

function previousDay() { //just use createDailyCalendar() with parameter( day`s number) for previous day
    if (currentDay - 1 === 0) {
        previousMonth();
        createDailyCalendar();
        currentDay = amountDays;
        addEventsInDailyCalendar();
    } else {
        currentDay--;
        addEventsInDailyCalendar();
    }
}

function nextDay() { //just use createDailyCalendar() with parameter( day`s number) for next day
    if (currentDay + 1 === amountDays) {
        nextMonth();
        createDailyCalendar();
    } else {
        currentDay++;
        addEventsInDailyCalendar();
    }
}

function filterForDailyTasks() { // filtering events in current period
    let allGoalsDay = [...$('.goal__type')];

    if ($('#typeOfTaskDay').val() === 'all') { // if current filter 'all' show all events
        allGoalsDay.map((element) => {
            element.parentElement.parentElement.style = 'display: flex;'; // showing all events
        });
    } else {
        allGoalsDay.map((element) => { // if current filter not 'all'  show current filter events and hide other
            element.parentElement.parentElement.style = 'display: flex;';
        });

        allGoalsDay.map((element) => {
            if (element.innerText !== $('#typeOfTaskDay').val()) {
                element.parentElement.parentElement.style = 'display: none;';
            }
        })
    }
}