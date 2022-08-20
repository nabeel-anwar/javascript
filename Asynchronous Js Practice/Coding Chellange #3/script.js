'use strict';

/* Your tasks:
PART 1
1. Write an async function 'loadNPause' that recreates Challenge #2, this time 
using async/await (only the part where the promise is consumed, reuse the 
'createImage' function from before)
2. Compare the two versions, think about the big differences, and see which one 
you like more
3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
in the dev tools Network tab
PART 2
1. Create an async function 'loadAll' that receives an array of image paths 
'imgArr'
2. Use .map to loop over the array, to load all the images with the 
'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array �
5. Add the 'parallel' class to all the images (it has some CSS styles)
Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img3.jpg']. To test, turn off the 'loadNPause' function
GOOD LUCK �
*/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const imgArr = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  })
}


const imageContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imageContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject('Image not found🤔');
    });
  });
};

let currentImg;

// createImage('img/img-1.jpg').then(img => {
//   console.log('Image 1 loaded');
//   currentImg = img;
//   return wait(2);
// }).then(() => {
//   currentImg.style.display = 'none';
//   return wait(2);
// }).then(() => createImage('img/img-2.jpg'))
//   .then(img => {
//     console.log('Image 2 loaded');
//     currentImg = img;
//     return wait(2);
//   }).then(() => {
//     currentImg.style.display = 'none';
//     return wait(2);
//   }).then(() => createImage('img/img-3.jpg'))
//   .then(img => {
//     console.log('Image 3 loaded');
//     currentImg = img;
//     return wait(2);
//   }).then(() => {
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));


const loadNPause = async function () {
  try {
    let img = await createImage('img/img-1.jpg');
    await wait(2);

    img.style.display = 'none';
    await wait(2);

    img = await createImage('img/img-2.jpg');
    await wait(2);

    img.style.display = 'none';
    await wait(2);

    img = await createImage('img/img-3.jpg');
    await wait(2);

    img.style.display = 'none';

  } catch (error) {
    console.log(error);
  }

}
// loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async (imgPath) => await createImage(imgPath));
    console.log(imgs);

    const imgEl = await Promise.all(imgs); //getting response from all promises
    console.log(imgEl);

    imgEl.forEach((img) => img.classList.add('parallel'));
  } catch (error) {

  }
}

loadAll(imgArr);