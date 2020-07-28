'use strict';

(function () {
  var advertsCounter = 8;
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapFilters = map.querySelectorAll('.map__filter');
  var pinContainer = map.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('.ad-form__element');
  var advertsData = window.card.createAdverts(advertsCounter);
  var pinsCreated = false;

  var activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.activateForm(adFormFieldsets, mapFilters);
  };

  var init = function (evt) {
    if ((evt.button === 0 || evt.key === 'Enter') && !pinsCreated) {
      activatePage();
      window.form.setAddressField();
      window.map.renderPins(pinContainer, advertsData);
      window.map.renderCards(map, advertsData[0]);
      window.form.checkRooms(window.form.roomNumberSelect.value);
      pinsCreated = true;
    }
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    init(evt);
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    init(evt);
  });

  window.form.setAddressField();

})();
