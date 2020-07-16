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
        description: 'Строка с описанием',
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

var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var createPin = function (data) {
  var pin = templatePin.cloneNode(true);
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

var typeToText = function (type) {
  if (type === 'palace') {
    return 'Дворец';
  } else if (type === 'flat') {
    return 'Квартира';
  } else if (type === 'house') {
    return 'Дом';
  } else {
    return 'Бунгало';
  }
};

var templateCard = document.querySelector('#card').content.querySelector('.map__card');
var createCard = function (data) {
  var card = templateCard.cloneNode(true);
  var popupAvatar = card.querySelector('.popup__avatar');
  if (!data['author']['avatar']) {
    popupAvatar.style.display = 'none';
  } else {
    popupAvatar.src = data['author']['avatar'];
  }
  var popupTitle = card.querySelector('.popup__title');
  if (!data['offer']['title']) {
    popupTitle.style.display = 'none';
  } else {
    popupTitle.textContent = data['offer']['title'];
  }
  var popupTextAddress = card.querySelector('.popup__text--address');
  if (!data['offer']['address']) {
    popupTextAddress.style.display = 'none';
  } else {
    popupTextAddress.textContent = data['offer']['address'];
  }
  var popupTextPrice = card.querySelector('.popup__text--price');
  if (!data['offer']['price']) {
    popupTextPrice.style.display = 'none';
  } else {
    popupTextPrice.textContent = data['offer']['price'] + '₽/ночь';
  }
  var popupType = card.querySelector('.popup__type');
  if (!data['offer']['type']) {
    popupType.style.display = 'none';
  } else {
    popupType.textContent = typeToText(data['offer']['type']);
  }
  var popupTextCapacity = card.querySelector('.popup__text--capacity');
  if (!data['offer']['rooms'] || !data['offer']['guests']) {
    popupTextCapacity.style.display = 'none';
  } else {
    popupTextCapacity.textContent = data['offer']['rooms'] + ' комнаты для ' + data['offer']['guests'] + ' гостей';
  }
  var popupTextTime = card.querySelector('.popup__text--time');
  if (!data['offer']['checkin'] || !data['offer']['checkout']) {
    popupTextTime.style.display = 'none';
  } else {
    popupTextTime.textContent = 'Заезд после ' + data['offer']['checkin'] + ', выезд до ' + data['offer']['checkout'];
  }
  var popupFeatures = card.querySelector('.popup__features');
  if (!data['offer']['features'] || !ALL_FEATURES) {
    popupFeatures.style.display = 'none';
  } else {
    for (var i = 0; i < ALL_FEATURES.length; i++) {
      popupFeatures.children[i].textContent = ALL_FEATURES[i];
    }
  }
  var popupDescription = card.querySelector('.popup__description');
  if (!data['offer']['description']) {
    popupDescription.style.display = 'none';
  } else {
    popupDescription.textContent = data['offer']['description'];
  }

  var popupPhotoContainer = card.querySelector('.popup__photos');
  if (!data['offer']['photos'] || !PHOTOS) {
    popupPhotoContainer.style.display = 'none';
  } else {
    for (var j = 0; j < PHOTOS.length; j++) {
      var popupPhoto = popupPhotoContainer.querySelector('.popup__photo');
      if (j === 0) {
        popupPhoto.src = PHOTOS[j];
      } else {
        var popupPhotoClone = popupPhoto.cloneNode(true);
        popupPhotoClone.src = PHOTOS[j];
        popupPhotoContainer.appendChild(popupPhotoClone);
      }
    }
  }

  return card;
};

var cardContainer = document.querySelector('.map');
var filtersContainer = document.querySelector('.map__filters-container');
var renderCards = function (container, data) {
  // for (var i = 0; i < data.length; i++) {
  container.insertBefore(createCard(data[0]), filtersContainer);
  // }
};

renderCards(cardContainer, advertsData);
