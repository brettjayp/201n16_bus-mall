/* eslint-disable indent */ /* eslint-disable no-trailing-spaces */ /* eslint-disable no-unused-vars */ /* eslint-disable no-multi-spaces */
'use strict';

// DOM objects
const displayEl = document.getElementById('displayContainer');
let catalog = [];
let lastThree = [-1, -1, -1];
let newThree = [-1, -1, -1];
let rounds = [0, 25]; // [current round, total rounds]

// Here we build out catalog of products
new Product('bag', 'bag.jpg', 'An R2-D2 suitcase');
new Product('banana', 'banana.jpg', 'A banana slicer');
new Product('bathroom', 'bathroom.jpg', 'A tablet mount on a toilet paper holder');
new Product('boots', 'boots.jpg', 'A pair of pointless rain boots with open toes');
new Product('breakfast', 'breakfast.jpg', 'An all-in-one breakfast machine');
new Product('bubblegum', 'bubblegum.jpg', 'Bubblegum designed to look like meatballs');
new Product('chair', 'chair.jpg', 'A very uncomfortable tall chair');
new Product('cthulhu', 'cthulhu.jpg', 'An action figure of Cthulhu');
new Product('dog-duck', 'dog-duck.jpg', 'na');
new Product('dragon', 'dragon.jpg', 'na');
new Product('pen', 'pen.jpg', 'na');
new Product('pet-sweep', 'pet-sweep.jpg', 'na');
new Product('scissors', 'scissors.jpg', 'na');
new Product('shark', 'shark.jpg', 'na');
new Product('sweep', 'sweep.png', 'na');
new Product('tauntaun', 'tauntaun.jpg', 'na');
new Product('unicord', 'unicorn.jpg', 'na');
new Product('usb', 'usb.gif', 'na');
new Product('water-can', 'water-can.jpg', 'na');
new Product('wine-glass', 'wine-glass.jpg', 'na');

// // // CALL OUR FEATURE FUNCTION // // //
showThree();
// // // CALL OUR FEATURE FUNCTION // // //

// PIMARY CONSTRUCTOR FUNCTION: This is our constructor function to build new products for the main feature. They each will be pushed to the catalog[] array.
function Product(title, source, alt){
  this.title = title;
  this.alt = alt;
  this.src = `../assets/${source}`;
  
  this.displayCount = 0;
  this.clickCount = 0;
  
  catalog.push(this);
}
// EVENTS: We'll add an event listener that is active while our overall click count does not exceed our determined rounds. Upon reaching the limit, we will remove it.
displayEl.addEventListener('click', onClick);
// EVENTS: FUNCTION: On a valid click, we'll identify the object, increase its clickCount, increase the round count, and show three new products. If we've arrived at our round limit, we'll remove the event listener after rendering the
function onClick(event){
  let clickedId = event.target.id;
  let position = 0;
  if(clickedId === 'imageOne'){
    position = 1;
  } else if(clickedId === 'imageTwo'){
    position = 2;
  }
  ++catalog[newThree[position]].clickCount;
  ++rounds[0];
  if(rounds[0] < rounds[1]){
    showThree();
  } else if(rounds[0] >= rounds[1]){
    displayEl.removeEventListener('click', onClick);
    console.clear();
    console.table(catalog);
    console.log('We\'ve reached the end of the rounds.');
  }
}
// PRIMARY FUNCTION: Show three new products to the page. They will not repeat any of the previous round's images, and there will be no duplicates displayed. We also reset the newThree[] array and overwrite the lastThree[] array for tracking and to assist in avoiding repeats and duplicates.
// For now, we're also displaying a table in the console of our catalog[] items for visibility in tracking. This will clear and update every time we show new products.
function showThree(){
  lastThree = [newThree[0], newThree[1], newThree[2]];
  newThree = [-1, -1, -1];

  displayEl.innerHTML = '';

  randomProduct(0);
  randomProduct(1);
  randomProduct(2);

  console.clear();
  console.table(catalog);
}
// PRIMARY FUNCTION: By using renderProduct() and randomMinMax(), select a random product and render it to the page, dependent on position (0, 1, 2). Also set the current newThree[] position to reflect which image is being shown, and increment that image's displayCount value.
function randomProduct(position){
  let integer = randomMinMax(0, catalog.length);
  if(position === 0){
    while(integer === lastThree[0] || integer === lastThree[1] || integer === lastThree[2]){
      integer = randomMinMax(0, catalog.length);
    }
  } else if(position === 1){
    while(integer === lastThree[0] || integer === lastThree[1] || integer === lastThree[2] || integer === newThree[0]){
      integer = randomMinMax(0, catalog.length);
    }
  } else if(position === 2){
    while(integer === lastThree[0] || integer === lastThree[1] || integer === lastThree[2] || integer === newThree[0] || integer === newThree[1]){
      integer = randomMinMax(0, catalog.length);
    }
  }
  newThree[position] = integer;
  renderProduct(catalog[integer], position);
  ++catalog[integer].displayCount;
}
// PRIMARY FUNCTION: Render a product image to the page, dependent on position (0, 1, 2).
function renderProduct(source, position){
  let newImg = document.createElement('img');
  if(position === 0){
    newImg.id = 'imageZero';
    newImg.src = source.src;
    newImg.alt = source.alt;
    newImg.title = source.title;
    displayEl.appendChild(newImg);
  } else if(position === 1){
    newImg.id = 'imageOne';
    newImg.src = source.src;
    newImg.alt = source.alt;
    newImg.title = source.title;
    displayEl.appendChild(newImg);
  } else if(position === 2){
    newImg.id = 'imageTwo';
    newImg.src = source.src;
    newImg.alt = source.alt;
    newImg.title = source.title;
    displayEl.appendChild(newImg);
  } else{
    console.log('Hey dummy, you added the wrong position to an image. You should find it and fix it.');
  }
  return newImg;
}
// HELPER FUNCTION: Add a new element.
function addEl(element, content, parent){
  let newElement = document.createElement(element);
  if(content){
      let newContent = document.createTextNode(content);
      newElement.appendChild(newContent);
      // newElement.textContent = content; // could also do it this way
  }
  parent.appendChild(newElement);
  return newElement;
}
// HELPER FUNCTION: Return a random integer within given parameters.
function randomMinMax(min, max){
  return Math.floor((Math.random() * ((max - min))) + min); // could include a '+1' but it sometimes breaks here
}
