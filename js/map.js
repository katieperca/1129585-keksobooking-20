'use strict';

(function () {
  var PINS_COUNT = 5;
  var PINTIP_HEIGHT = 22;
  var MIN_X = 290;
  var MAX_X = 1200;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var map = document.querySelector('.map');
  var mapPin = map.querySelector('.map__pin--main');
  var pinContainer = map.querySelector('.map__pins');

  var renderData = function (data, showCard) {
    renderPins(pinContainer, data.slice(0, PINS_COUNT));
    if (showCard) {
      renderCards(map, data[0]);
    }
  };

  var renderPins = function (container, data) {
    for (var i = 0; i < data.length; i++) {
      container.appendChild(window.pin.createPin(data[i]));
    }
  };

  var clearMap = function () {
    pinContainer.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (item) {
      if (item) {
        item.remove();
      }
    });

    map.querySelectorAll('.map__card').forEach(function (item) {
      if (item) {
        item.remove();
      }
    });
  };

  var renderCards = function (container, data) {
    if (data) {
      var filtersContainer = document.querySelector('.map__filters-container');
      container.insertBefore(window.card.createCard(data), filtersContainer);
    }
  };

  var getPinCoords = function () {
    if (map.classList.contains('map--faded')) {
      var coordinateX = Math.floor(mapPin.offsetLeft + mapPin.offsetWidth / 2);
      var coordinateY = Math.floor(mapPin.offsetTop + mapPin.offsetHeight / 2);
    } else {
      coordinateX = Math.floor(mapPin.offsetLeft + mapPin.offsetWidth / 2);
      coordinateY = Math.floor(mapPin.offsetTop + mapPin.offsetHeight + PINTIP_HEIGHT);
    }
    var coordinates = coordinateX + ', ' + coordinateY;

    return coordinates;
  };

  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newPinCoords = {
        x: mapPin.offsetLeft - shift.x,
        y: mapPin.offsetTop - shift.y
      };

      var getNewCoords = function (coords) {
        return {
          x: coords.x + mapPin.offsetWidth / 2,
          y: coords.y + (mapPin.offsetHeight + PINTIP_HEIGHT)
        };
      };

      var newCoords = getNewCoords(newPinCoords);

      if (newCoords.x <= MAX_X && newCoords.x >= MIN_X) {
        mapPin.style.left = newPinCoords.x + 'px';
      }
      if (newCoords.y <= MAX_Y && newCoords.y >= MIN_Y) {
        mapPin.style.top = newPinCoords.y + 'px';
      }

      window.form.setAddressField(getPinCoords(newCoords));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mapPin.removeEventListener('click', onClickPreventDefault);
        };
        mapPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    renderPins: renderPins,
    renderCards: renderCards,
    getPinCoords: getPinCoords,
    renderData: renderData,
    clearMap: clearMap
  };
})();
