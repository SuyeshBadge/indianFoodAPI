console.log(`this is favorite`);
console.log();
const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
const page = document.querySelector('#page');
const data = document.querySelector('#data');
console.log(prev.href);
console.log(next.href);
console.log(page.value);
if (!data.value) history.back();
if (+page.value) {
  prev.addEventListener('click', (e) => {
    e.preventDefault();
    location.assign(`${prev.href}?page=${+page.value - 1}`);
  });
  next.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(next.href);
    location.assign(`${next.href}?page=${+page.value + 1}`);
  });
}
// btnOk.addEventListener('click', async (e) => {
//   //   const data = await axios.get(`${cuisineVal.value}/`);
//   this.location.replace(`localhost:8080/c/${cuisineVal.value}`);
//   console.log(data);
// });
