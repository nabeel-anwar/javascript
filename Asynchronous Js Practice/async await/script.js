'use strict';

/* Your tasks:
PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value ('lat') 
and a longitude value ('lng') (these are GPS coordinates, examples are in test 
data below).
2. Do “reverse geocoding” of the provided coordinates. Reverse geocoding means 
to convert coordinates to a meaningful location, like a city and country name. 
Use this API to do reverse geocoding: https://geocode.xyz/api. The AJAX call 
will be done to a URL with this format: 
https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and 
promises to get the data. Do not use the 'getJSON' function we created, that 
is cheating �
3. Once you have the data, take a look at it in the console to see all the attributes 
that you received about the provided location. Then, using this data, log a 
message like this to the console: “You are in Berlin, Germany”
4. Chain a .catch method to the end of the promise chain and log errors to the 
console
5. This API allows you to make only 3 requests per second. If you reload fast, you 
will get this error with code 403. This is an error with the request. Remember, 
fetch() does not reject the promise in this case. So create an error to reject 
the promise yourself, with a meaningful error message
PART 2
6. Now it's time to use the received data to render a country. So take the relevant 
attribute from the geocoding API result, and plug it into the countries API that 
we have been using.
7. Render the country and catch any errors, just like we have done in the last 
lecture (you can even copy this code, no need to type the same code)
The Complete JavaScript Course 31
Test data:
§ Coordinates 1: 52.508, 13.381 (Latitude, Longitude)
§ Coordinates 2: 19.037, 72.873
§ Coordinates 3: -33.933, 18.474
GOOD LUCK �
*/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountryData = function (data, neighbour) {
  const html = `
        <article class="country ${neighbour}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)} People</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1
}

// //With Promises
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then((response) => {
//       if (!response.ok)
//         throw new Error(`Country not found ${response.status}`);
//       return response.json();
//     })
//     .then((data) => {
//       renderCountryData(data[0]);

//       const neighbour = data[0].borders[0];
//       if (!neighbour)
//         throw new Error('No Neighbour');

//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then((response) => response.json())
//     .then((data) => renderCountryData(data, 'neighbour'))
//     .catch(err => console.log(err))
//     .finally(() => countriesContainer.style.opacity = 1);
// }


///////////////////////////////////////

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// const whereAmI = function () {
//   getPosition().then(pos => {
//     const { latitude: lat, longitude: lng } = pos.coords;

//     return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//   }).then(response => {
//     if (!response.ok)
//       throw new Error(`Problem in geocoding ${response.status}`);
//     return response.json();
//   }).then(data => {
//     console.log(`You are in ${data.city} ${data.country}`);
//     return fetch(`https://restcountries.com/v2/name/${data.country}`)
//   }).then((response) => {
//     if (!response.ok)
//       throw new Error(`Country not found ${response.status}`);
//     return response.json();
//   })
//     .then((data) => {
//       renderCountryData(data[0]);
//     })
//     .catch(err => console.log(`${err.message}`))
//     .finally(() => countriesContainer.style.opacity = 1);
// }


const whereAmI = async function () {
  try {
    const pos = await getPosition();

    const { latitude: lat, longitude: lng } = pos.coords;

    const geoCode = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!geoCode.ok) throw new Error('Problem with GeoCoding');

    const geoCodeData = await geoCode.json();

    const countryCode = await fetch(`https://restcountries.com/v2/name/${geoCodeData.countrys}`);
    if (!countryCode.ok) throw new Error('Problem with Country Coding');

    const countryData = await countryCode.json();

    renderCountryData(countryData[0]);
    return `You are in ${geoCodeData.city} ${geoCodeData.country}`;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


btn.addEventListener('click', whereAmI);

console.log('1. Start');
// whereAmI().then(res => console.log(res))
//   .catch(err => console.log(err))
//   .finally(() => console.log('3. End'));


(async function () {
  try {
    const res = await whereAmI();
    console.log(res);
  } catch (error) {
    console.error(error);
  }
  console.log('3. End');
})();