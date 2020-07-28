'use strict';

(function () {
  var openCard = function (data) {
    var isMapCard = document.querySelector('.map__card');
    var cardContainer = document.querySelector('.map');
    if (isMapCard) {
      isMapCard.remove();
    }
    window.map.renderCards(cardContainer, data);
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

  window.pin = {
    openCard: openCard,
    createPin: createPin
  };

})();
