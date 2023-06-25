import Notiflix from 'notiflix';

const formEl = document.querySelector(".form");


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

formEl.addEventListener("submit", event => {
  event.preventDefault();
  let { delay, step, amount } = event.target.elements;
  delay = delay.value;
  step = step.value;
  amount = amount.value;
  if (amount <= 0 || delay < 0 || step < 0) {
    Notiflix.Notify.failure("Input correct values");
    return;
  }
  

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
  formEl.reset();
});