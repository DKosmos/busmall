'use strict';

//create constructor for each product
function Product(name, url) {
  this.name = name;
  this.url = url;
  this.timesclicked = 0;
  this.timesselected = 0;
}

//create methods (create img tag)
Product.prototype.createImgTag = function () {
  var tag = document.createElement('img');
  tag.setAttribute('src', this.url);
  return tag;
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
//create functions that captures user responses, progresses through products, etc

//create functions that tally the answers and presents the data
