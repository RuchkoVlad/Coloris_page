// DATA for testing events in calendar
const data = [
    {
        date: '22.02.2020',
        test: 'Тест',
        status: 'planning',
        type: 'Тест',
        goal: 'Стати краще вже сьогодні'
    },
    {
        date: '10.02.2020',
        course: 'Курс',
        status: 'planning',
        type: 'Курс',
        goal: 'Стати краще вже сьогодні'
    },
    {
        date: '13.02.2020',
        meeting: 'Захід',
        status: 'over',
        type: 'Вебінар',
        goal: 'Стати краще вже сьогодні'
    },
    {
        date: '05.02.2020',
        webinar: 'Вебінар',
        course: 'Курс',
        test: 'Тест',
        meeting: 'Мітинг',
        type: 'Мітинг',
        status: 'now',
        goal: 'Стати краще вже сьогодні'
    }];

// Global variables for calendar
let namesOfDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД']; // just header for calendar
let tableForWeek; // month array with arrays of week
let currentDay = 1; //start position for rendering daily-calendar
let currentWeekNumber = 1; //start position for rendering weeks-calendar
let currentMonthNumber; // index for rendering name of month in daily-calendar
let currentYearDaily; //number of year for rendering daily-calendar
let setMonth = new Date().getMonth() + 1; // define current month
let setYear = new Date().getFullYear(); // define current year
const monthNames = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
const monthNamesForWeek = ['Січня', 'Лютого', 'Березня', 'Квітня', 'Травня', 'Червня', 'Липня', 'Серпня', 'Вересня', 'Жовтня', 'Листопада', 'Грудня'];


