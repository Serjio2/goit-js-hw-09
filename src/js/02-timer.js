import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

const inputTimerEl = document.querySelector('#datetime-picker');
const startTimerBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startTimerBtn.disabled = true;

flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates[0] - Date.now() < 0) {
      Report.failure('Warning', 'Please choose a date in the future', 'OK');
      // window.alert("Please choose a date in the future");
      return;
    }
    startTimerBtn.disabled = false;
    startTimerBtn.addEventListener('click', () => {
      const timerId = setInterval(() => {
        const timerDate = convertMs(selectedDates[0] - Date.now());

        if (
          timerDate.days === 0 &&
          timerDate.hours === 0 &&
          timerDate.minutes === 0 &&
          timerDate.seconds === 0
        ) {
          clearInterval(timerId);
        }

        // console.log(timerDate);
        daysEl.textContent = addLeadingZero(timerDate.days);
        hoursEl.textContent = addLeadingZero(timerDate.hours);
        minutesEl.textContent = addLeadingZero(timerDate.minutes);
        secondsEl.textContent = addLeadingZero(timerDate.seconds);
      }, 1000);
    });
  },
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
