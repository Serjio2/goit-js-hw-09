import Notiflix from 'notiflix';

const formEl = document.querySelector(".form");

// console.log(formEl);


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve( {position, delay} );
      } else {
        reject( {position, delay} );
      }
    }, delay);
  });
}


formEl.addEventListener("submit", event => {
  event.preventDefault();

  let step = Number(event.target.step.value);
  let amount = Number(event.target.amount.value);
  let delay = Number(event.target.delay.value);
 

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
    .then(( {position, delay} ) => {
        // console.log(`Fulfilled promise ${position} in ${delay}ms`)
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);

      })
    .catch(( {position, delay} ) => {
        // console.log(`Rejected promise ${position} in ${delay}ms`)
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);

      });
    delay += step;
  }
});

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });