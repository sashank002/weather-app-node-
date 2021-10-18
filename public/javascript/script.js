const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const msg1 = document.querySelector("#msg-1");
const msg2 = document.querySelector("#msg-2");

console.log("hello");

const fetchData = function (address) {
  fetch(`http://localhost:3000/weather?address=${address}`)
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((resJson) => {
      if (resJson.error) {
        msg1.textContent = resJson.error;
      } else {
        msg1.textContent = resJson.location;
        msg2.textContent = resJson.weather;
      }
    });
};

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const address = input.value;

  console.log("DABAYU TAME");
  fetchData(address);
});
