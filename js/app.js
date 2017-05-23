'use strict';

var counter = 0;
//create constructor for each product
function Product(name, url) {
  this.name = name;
  this.url = url;
  this.timesclicked = 0;
  this.timesselected = 0;
}

//create methods (create img tag)
Product.prototype.createImgTag = function () {
  var tag = '<img id="' + this.name.toLowerCase() + '" src="' + this.url + '">';
  return tag;
};

Product.prototype.pickedMe = function () {
  counter++;
  this.timesclicked++;
};

Product.prototype.beenChosen = function () {
  this.timesselected++;
};

//create array of product objects
var bag = new Product('Bag', './img/bag.jpg');
var banana = new Product('Banana', './img/banana.jpg');
var bathroom = new Product('Bathroom', './img/bathroom.jpg');
var boots = new Product('Boots', './img/boots.jpg');
var breakfast = new Product('Breakfast', './img/breakfast.jpg');
var bubblegum = new Product('Bubblegum', './img/bubblegum.jpg');
var chair = new Product('Chair', './img/chair.jpg');
var cthulhu = new Product('Cthulhu', './img/cthulhu.jpg');
var dogduck = new Product('Dog-Duck', './img/dog-duck.jpg');
var dragon = new Product('Dragon', './img/dragon.jpg');
var pen = new Product('Pen', './img/pen.jpg');
var petsweep = new Product('Pet-sweep', './img/pet-sweep.jpg');
var scissors = new Product('Scissors', './img/scissors.jpg');
var shark = new Product('Shark', './img/shark.jpg');
var sweep = new Product('Sweep', './img/sweep.png');
var tauntaun = new Product('Tauntaun', './img/tauntaun.jpg');
var unicorn = new Product('Unicorn', './img/unicorn.jpg');
var usb = new Product('USB', './img/usb.gif');
var watercan = new Product('Water-can', './img/water-can.jpg');
var wineglass = new Product('Wine-glass', './img/wine-glass.jpg');

var productArray = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogduck, dragon, pen, petsweep, scissors, shark, sweep, tauntaun, unicorn, usb, watercan, wineglass];

//create array for participant answers
var userSelectionHistory = [];
var excludedNumbers = [];
var resultsTallyArray = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
//create functions that captures user responses, progresses through products, etc
function generateRandom(){
  var arrayIndex = Math.floor(Math.random() * productArray.length);
  return arrayIndex;
}

function generateSelectionIndexes(){
  for (var i=0; i<3; i++){
    do{
      var indexNum = generateRandom();
    } while (indexNum === excludedNumbers[0] || indexNum === excludedNumbers[1] || indexNum === excludedNumbers[2] || indexNum === excludedNumbers[3] || indexNum === excludedNumbers[4] || indexNum === excludedNumbers[5]);
    excludedNumbers[i] = indexNum;
  }
  return excludedNumbers;
}

function logPreviousSelection(){
  for (var i=0; i<3; i++){
    var j = i + 3;
    excludedNumbers[j] = excludedNumbers[i];
  }
}

function generateSelectionImgTags(){
  var tagsArray = [];
  for (var i=0; i<3; i++){
    tagsArray.push(productArray[excludedNumbers[i]].createImgTag());
  }
  return tagsArray;
}

function placeImgTagsInDom(){
  var container = document.getElementById('selectionimages');
  var tagsArray = generateSelectionImgTags();
  for (var i=0; i<3; i++){
    container.children[i].innerHTML = tagsArray[i];
    productArray[excludedNumbers[i]].beenChosen();
  }
}

function userSelection(){
  var imgSelected = this.getAttribute('src');
  var productSelected = imgSelected.split('/')[1].split('.')[0];
  return productSelected;
}

function logUserSelections(){
  for (var i=0; i<3; i++){
    userSelectionHistory.push(productArray[excludedNumbers[i]]);
  }
  console.log(userSelectionHistory);
}

function updatedCounterHtml(){
  var container = document.getElementById('participantcounter');
  var newCounterInfo = 'You\'ve made ' + counter + ' selections!';
  container.children[0].innerHTML = newCounterInfo;
}

function createEventListeners(){
  var container = document.getElementById('selectionimages');
  for (var i=0; i<3; i++){
    container.children[i].children[0].addEventListener('click', function(){
      var source = this.getAttribute('src');
      var productSelected = source.split('/')[2].split('.')[0];
      console.log(productSelected);
      productSelected = productSelected.replace('-','');
      window[productSelected].pickedMe();
      logUserSelections();
      updatedCounterHtml();
      userSelectionHistory.push(productSelected);
      logPreviousSelection();
      generateSelectionIndexes();
      placeImgTagsInDom();
      if (counter<25){
        createEventListeners();
      } else {
        createResultTags();
      }
    });
  }
}

function createResultTags(){
  var title = document.getElementById('results');
  title.innerHTML = 'Results';
  var resultsList = document.getElementById('resultlist');
  var resultsTagArray = [];
  for (var i=0; i<resultsTallyArray.length; i++){
    var listItems = '<li>' + productArray[i].name + ' was selected ' + productArray[i].timesselected + ' times and clicked ' + productArray[i].timesclicked + ' times.</li>';
    resultsTagArray.push(listItems);
  }
  resultsList.innerHTML = resultsTagArray.join('');
}


generateSelectionIndexes();
placeImgTagsInDom();
logPreviousSelection();
createEventListeners();
//create functions that tally the answers and presents the data
