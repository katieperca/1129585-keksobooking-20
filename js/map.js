'use strict';

(function () {
  var renderPins = function (container, data) {
    for (var i = 0; i < data.length; i++) {
      container.appendChild(window.pin.createPin(data[i]));
    }
  };

  var renderCards = function (container, data) {
    var filtersContainer = document.querySelector('.map__filters-container');
    container.insertBefore(window.card.createCard(data), filtersContainer);
  };

  window.map = {
    renderPins: renderPins,
    renderCards: renderCards
  };

})();

