'use strict';

var MIN_X = 320;
var MAX_X = 1100;
var MIN_Y = 130;
var MAX_Y = 630;
var PRICES = [1000, 2000, 5000, 10000, 20000, 50000];
var MAINPIN_X = 570;
var MAINPIN_Y = 375;
var MAINPIN_WIDTH = 65;
var MAINPIN_HEIGHT = 84;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var ALL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var advertsCounter = 8;

var mapPinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
// var mapFilter = document.querySelector('.map__filters');
var mapFilters = document.querySelectorAll('.map__filter');
var mapFeatures = document.querySelector('.map__features');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('.ad-form__element');
var addressField = adForm.querySelector('#address');
var roomNumberSelect = adForm.querySelector('#room_number');
var capacitySelect = adForm.querySelector('#capacity');
var timeInInput = document.querySelector('#timein');
var timeOutInput = document.querySelector('#timeout');
var housingTypeSelect = adForm.querySelector('#type');
var priceForNightInput = adForm.querySelector('#price');
var roomValues = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};
var housingMinPrice = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
var pinsCreated = false;

var deactivateForm = function (fieldsets, filters) {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', 'disabled');
  }
  for (var j = 0; j < filters.length; j++) {
    filters[j].setAttribute('disabled', 'disabled');
  }
  mapFeatures.setAttribute('disabled', 'disabled');
};

deactivateForm(adFormFieldsets, mapFilters);

var activateForm = function (fieldsets, filters) {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }
  for (var j = 0; j < filters.length; j++) {
    filters[j].removeAttribute('disabled');
  }
  mapFeatures.removeAttribute('disabled');
};

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  activateForm(adFormFieldsets, mapFilters);
};

var setAddressField = function () {
  addressField.value = (MAINPIN_X + Math.floor(MAINPIN_WIDTH / 2)) + ', ' + (MAINPIN_Y + MAINPIN_HEIGHT);
};

setAddressField();

var checkRooms = function (quantity) {
  var capacityOptions = capacitySelect.querySelectorAll('option');
  capacityOptions.forEach(function (option) {
    option.disabled = true;
  });
  roomValues[quantity].forEach(function (setAmount) {
    capacityOptions.forEach(function (option) {
      if (Number(option.value) === setAmount) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};

var inAndOutInputChange = function (evt) {
  timeInInput.value = evt.target.value;
  timeOutInput.value = evt.target.value;
};

timeInInput.addEventListener('change', inAndOutInputChange);

timeOutInput.addEventListener('change', inAndOutInputChange);

roomNumberSelect.addEventListener('change', function () {
  checkRooms(roomNumberSelect.value);
});

housingTypeSelect.addEventListener('change', function () {
  priceForNightInput.placeholder = housingMinPrice[housingTypeSelect.value];
  priceForNightInput.setAttribute('min', housingMinPrice[housingTypeSelect.value]);
});

mapPinMain.addEventListener('mousedown', function (evt) {
  init(evt);
});

mapPinMain.addEventListener('keydown', function (evt) {
  init(evt);
});

var init = function (evt) {
  if ((evt.button === 0 || evt.key === 'Enter') && !pinsCreated) {
    activatePage();
    setAddressField();
    renderPins(pinContainer, advertsData);
    renderCards(cardContainer, advertsData[0]);
    checkRooms(roomNumberSelect.value);
    pinsCreated = true;
  }
};

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

var advertsData = createAdverts(advertsCounter);

var openCard = function (data) {
  var isMapCard = map.querySelector('.map__card');
  if (isMapCard) {
    isMapCard.remove();
  }
  renderCards(cardContainer, data);
};

var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var createPin = function (data) {
  var pin = templatePin.cloneNode(true);
  pin.style.left = data['location']['x'] + 'px';
  pin.style.top = data['location']['y'] + 'px';
  pin.children[0].src = data['author']['avatar'];
  pin.children[0].alt = data['offer']['title'];

  pin.addEventListener('click', function () {
    openCard(data);
  });

  pin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openCard(data);
    }
  });

  return pin;
};

var pinContainer = document.querySelector('.map__pins');
var renderPins = function (container, data) {
  for (var i = 0; i < data.length; i++) {
    container.appendChild(createPin(data[i]));
  }
};

var housingTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var fillElement = function (value, container, attribute) {
  if (!value) {
    container.setAttribute('style', 'display: none');
  } else {
    container[attribute] = value;
  }

  return container;
};

var renderList = function (data, container, arr) {
  if (!data || !arr) {
    container.setAttribute('style', 'display: none');
  } else {
    container.innerHTML = '';
    for (var i = 0; i < arr.length; i++) {
      var li = document.createElement('li');
      li.classList.add('popup__feature', 'popup__feature--' + arr[i]);
      container.appendChild(li);
    }
  }

  return container;
};

var renderPhotos = function (data, container, arr) {
  if (!data || !arr) {
    container.setAttribute('style', 'display: none');
  } else {
    container.innerHTML = '';
    for (var i = 0; i < arr.length; i++) {
      var img = document.createElement('img');
      img.classList.add('popup__photo');
      img.setAttribute('src', PHOTOS[i]);
      img.setAttribute('width', '45');
      img.setAttribute('height', '40');
      img.setAttribute('alt', 'Фотография жилья');
      container.appendChild(img);
    }
  }
  return container;
};

var templateCard = document.querySelector('#card').content.querySelector('.map__card');
var createCard = function (data) {
  var card = templateCard.cloneNode(true);
  var popupAvatar = card.querySelector('.popup__avatar');
  fillElement(data['author']['avatar'], popupAvatar, 'src');

  var popupTitle = card.querySelector('.popup__title');
  fillElement(data['offer']['title'], popupTitle, 'textContent');

  var popupTextAddress = card.querySelector('.popup__text--address');
  fillElement(data['offer']['address'], popupTextAddress, 'textContent');

  var popupTextPrice = card.querySelector('.popup__text--price');
  var priceForNight = '';
  if (!data['offer']['price']) {
    priceForNight = data['offer']['price'] + '₽/ночь';
  }
  fillElement(priceForNight, popupTextPrice, 'textContent');

  var popupType = card.querySelector('.popup__type');
  fillElement(housingTypes[data['offer']['type']], popupType, 'textContent');

  var popupTextCapacity = card.querySelector('.popup__text--capacity');
  var roomsForGuests = '';
  if (data['offer']['rooms'] && data['offer']['guests']) {
    roomsForGuests = data['offer']['rooms'] + ' комнаты для ' + data['offer']['guests'] + ' гостей';
  }
  fillElement(roomsForGuests, popupTextCapacity, 'textContent');

  var popupTextTime = card.querySelector('.popup__text--time');
  var checkinAndCheckout = '';
  if (data['offer']['checkin'] && data['offer']['checkout']) {
    checkinAndCheckout = 'Заезд после ' + data['offer']['checkin'] + ', выезд до ' + data['offer']['checkout'];
  }
  fillElement(checkinAndCheckout, popupTextTime, 'textContent');

  var popupDescription = card.querySelector('.popup__description');
  fillElement(data['offer']['description'], popupDescription, 'textContent');

  var popupFeaturesContainer = card.querySelector('.popup__features');
  renderList(data['offer']['features'], popupFeaturesContainer, ALL_FEATURES);

  var popupPhotoContainer = card.querySelector('.popup__photos');
  renderPhotos(data['offer']['photos'], popupPhotoContainer, PHOTOS);

  var popupClose = card.querySelector('.popup__close');
  var closeCard = function () {
    card.remove();
  };

  popupClose.addEventListener('click', function () {
    closeCard();
  });

  popupClose.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closeCard();
    }
  });

  return card;
};

var cardContainer = document.querySelector('.map');
var filtersContainer = document.querySelector('.map__filters-container');
var renderCards = function (container, data) {
  container.insertBefore(createCard(data), filtersContainer);
};
