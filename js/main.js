'use strict';

var MIN_X = 320;
var MAX_X = 1100;
var MIN_Y = 130;
var MAX_Y = 630;
var PRICES = [1000, 2000, 5000, 10000, 20000, 50000];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var ALL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var advertsCounter = 8;

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomValue = function (values) {
  return values[Math.floor(Math.random() * values.length)];
};

var getRandomWord = function (words) {
  return words[Math.floor(Math.random() * words.length)];
};

var getRandomTitle = function () {
  var randomAdjectives = ['Уютный', 'Заброшенный', 'Проклятый старый', 'Старинный', 'Комфортный'];
  var randomNouns = ['дом', 'барак', 'сарай', 'дворец', 'хлев'];
  var randomCharacteristic = ['для самоизоляции', 'в заросшем парке', 'с жутко злым дедом', 'с площадкой для барбекю', 'для уточки Медведева'];

  var randomTitle = [getRandomWord(randomAdjectives), getRandomWord(randomNouns), getRandomWord(randomCharacteristic)].join(' ');

  return randomTitle;
};

var createAdverts = function (count) {
  var adverts = [];

  for (var i = 0; i < count; i++) {
    var locationX = getRandomIntInclusive(MIN_X, MAX_X);
    var locationY = getRandomIntInclusive(MIN_Y, MAX_Y);

    adverts[i] = {
      author: {
        avatar: 'img/avatars/user0' + [i + 1] + '.png'
      },
      offer: {
        title: getRandomTitle(),
        address: locationX + ', ' + locationY,
        price: getRandomValue(PRICES),
        type: getRandomValue(TYPES),
        rooms: getRandomIntInclusive(1, 5),
        guests: getRandomIntInclusive(1, 20),
        checkin: getRandomValue(CHECKINS),
        checkout: getRandomValue(CHECKOUTS),
        features: getRandomValue(ALL_FEATURES),
        description: 'строка с описанием',
        photos: PHOTOS
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  }
  return adverts;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var advertsData = createAdverts(advertsCounter);

var template = document.querySelector('#pin').content.querySelector('.map__pin');
var createPin = function (data) {
  var pin = template.cloneNode(true);
  pin.style.left = data['location']['x'] + 'px';
  pin.style.top = data['location']['y'] + 'px';
  pin.children[0].src = data['author']['avatar'];
  pin.children[0].alt = data['offer']['title'];

  return pin;
};

var pinContainer = document.querySelector('.map__pins');

var renderPins = function (container, data) {
  for (var i = 0; i < data.length; i++) {
    container.appendChild(createPin(data[i]));
  }
};

renderPins(pinContainer, advertsData);
