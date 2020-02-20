function createCalendar(year, month) {

    let table = [namesOfDays]; // initialize array of weeks arrays [ [..names day], [..number of days], [],[] ...]
    let amountDaysInMonth = getDaysInMonth(month, year); // define amount of days in month
    let currentRow = 1; // start position for [..number of days] in array - 'table'
    //array creation
    for (let i = 1; i <= amountDaysInMonth; i++) {
        const currentDate = new Date(year, month - 1, i);
        let currentDay = currentDate.getDay();

        if (currentDay === 0) { // change first day of english calendar - Sunday to last day of calendar
            currentDay = 7;
        }

        if (table[currentRow] === undefined) {  // create array for new week
            table[currentRow] = [];
        }

        table[currentRow][currentDay - 1] = i; // set number of day

        if (currentDay === 7) { // when week is full going to new week array (this new array will be undefined, so I fix it checking before *line 42*)
            currentRow++;
        }
    }

    while (table[table.length - 1].length < 7) { // adding empty string to the end of last week in month for 7 days week for empty cells
        table[table.length - 1].push(' ');
    }

    for (let i = 0; i < table[1].length; i++) { // adding empty string before first date of first week for empty cells
        if (table[1][i] === undefined) {
            table[1][i] = ' ';
        }
    }
    if (month === 13) { // if number of month more than 12 use this function again with next year
        setYear++;
        year++;
        setMonth = 1;
        month = 1;

    } else if (month === 0) { // if number of month less than 1 use this function again with previous year
        setYear--;
        setMonth = 12;
        month = 12;
    }

    tableForWeek = table; // set array of weeks arrays for Weekly-Calendar

    currentMonthNumber = month; // set current month for rendering name of month in daily-calendar
    currentYearDaily = year; // set current month for rendering name of month in daily-calendar
    calendarRendering(table); // use function for rendering Month-Calendar

    return table; //return month array with weeks inside
}

function getDaysInMonth(month, year) { // just getting amount days of necessary month
    return new Date(year, month, 0).getDate();
}


function calendarRendering(table) {  // rendering Month-Calendar from array - 'table'
    $('.current-month').html(`${monthNames[setMonth - 1]} ${setYear}`);
    $('#calendar').children().remove();
    table.map((element) => {
        $('#calendar').append(` 
        <div class="row">
           ${element.map((el, index) => {
            if (el === new Date().getDate()) {
                return `<div class="cell-current 
                               ${index === 5 ? 'weekend' : ''} 
                               ${index === 6 ? 'weekend' : ''}">
                               <span class="day-date ${el}">${el}</span>
                               </div>`
            } else return `<div class="cell 
                               ${index === 5 ? 'weekend' : ''} 
                               ${index === 6 ? 'weekend' : ''}">
                               <span class="day-date ${el}">${el}</span>
                          </div>`
        }).join('')}
        </div>
    `);
    });
    addingEvents(data);  // use function which render events in necessary cells  || data it`s array of objects with info about events in this period
}

function addingEvents(data) {  // use function which render events in necessary cells  || data it`s array of objects with info about events in this period
    data.map((element) => {
        let trimmerDate = element.date[0] === '0' ? +element.date[1] : element.date[0] + element.date[1];
        $(`.${trimmerDate}`).parent().html(`
           <p class="calendar-event calendar-meeting  ${element.status === undefined ? '' : element.status}"> 
                ${element.meeting === undefined ? '' :
            '<img src="https://img.icons8.com/dotty/80/000000/appointment-scheduling.png" class="square">' + element.meeting}
           </p>
           
           <p class="calendar-event calendar-webinar ${element.status === undefined ? '' : element.status}">
                ${element.webinar === undefined ? '' :
            '<img src="https://img.icons8.com/ios/50/000000/headphones.png" class="square">' + element.webinar}
           </p>
           
           <p class="calendar-event calendar-course ${element.status === undefined ? '' : element.status}">
                ${element.course === undefined ? '' :
            '<img src="https://img.icons8.com/dotty/80/000000/courses.png" class="square">' + element.course}
           </p>
           
           <p class="calendar-event calendar-test ${element.status === undefined ? '' : element.status}">
                ${element.test === undefined ? '' :
            '<img src="https://img.icons8.com/dotty/80/000000/syllabus.png" class="square">' + element.test}
           </p>
        `);
    });
    addMonthlyStyles();
}

function addMonthlyStyles() {
    $('#calendar-week').css('display', 'none'); // hide weekly calendar
    $('#calendar-day').css('display', 'none'); // hide daily calendar
    $('.month-navigate').css('display', 'flex'); // show month calendar
    $('.calendar__wrapper').css('display', 'block'); // show month calendar
    $('.day').removeClass('active-calendar-btn');  // deactivate button 'on day' calendar
    $('.week').removeClass('active-calendar-btn'); // deactivate button 'on week' calendar
    $('.month').addClass('active-calendar-btn'); // activate button 'on month' calendar
}

function nextMonth() { // just use function - createCalendar() with new parameters for next month
    $('#calendar').children().remove();
    setMonth++;
    createCalendar(setYear, setMonth);
}

function previousMonth() { // just use function - createCalendar() with new parameters for previous month
    $('#calendar').children().remove();
    setMonth--;
    let calendarReturn = createCalendar(setYear, setMonth);
    return calendarReturn; // return data of previous month for function createWeeklyCalendar() if we want a last week of previous month in function createWeeklyCalendar()
}

createCalendar(setYear, setMonth); // get started :)
