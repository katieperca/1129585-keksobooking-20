'use strict';

(function () {
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
  var housingTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var createAdverts = function (counter) {
    var adverts = [];

    for (var i = 0; i < counter; i++) {
      var locationX = window.util.getRandomIntInclusive(MIN_X, MAX_X);
      var locationY = window.util.getRandomIntInclusive(MIN_Y, MAX_Y);

      adverts[i] = {
        author: {
          avatar: 'img/avatars/user0' + [i + 1] + '.png'
        },
        offer: {
          title: window.util.getRandomTitle(),
          address: locationX + ', ' + locationY,
          price: window.util.getRandomValue(PRICES),
          type: window.util.getRandomValue(TYPES),
          rooms: window.util.getRandomIntInclusive(1, 5),
          guests: window.util.getRandomIntInclusive(1, 20),
          checkin: window.util.getRandomValue(CHECKINS),
          checkout: window.util.getRandomValue(CHECKOUTS),
          features: window.util.getRandomValue(ALL_FEATURES),
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

  var fillElement = function (value, container, attribute) {
    if (!value) {
      container.setAttribute('style', 'display: none');
    } else {
      container[attribute] = value;
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
        img.setAttribute('src', window.card.PHOTOS[i]);
        img.setAttribute('width', '45');
        img.setAttribute('height', '40');
        img.setAttribute('alt', 'Фотография жилья');
        container.appendChild(img);
      }
    }
    return container;
  };

  var renderFeaturesList = function (data, container, arr) {
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
    renderFeaturesList(data['offer']['features'], popupFeaturesContainer, window.card.ALL_FEATURES);

    var popupPhotoContainer = card.querySelector('.popup__photos');
    renderPhotos(data['offer']['photos'], popupPhotoContainer, window.card.PHOTOS);

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

  window.card = {
    MIN_X: MIN_X,
    MAX_X: MAX_X,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    PRICES: PRICES,
    TYPES: TYPES,
    CHECKINS: CHECKINS,
    CHECKOUTS: CHECKOUTS,
    ALL_FEATURES: ALL_FEATURES,
    PHOTOS: PHOTOS,
    housingTypes: housingTypes,
    createAdverts: createAdverts,
    fillElement: fillElement,
    createCard: createCard,
    renderPhotos: renderPhotos,
    renderFeaturesList: renderFeaturesList
  };

})();
