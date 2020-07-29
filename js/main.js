'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapFilters = map.querySelectorAll('.map__filter');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('.ad-form__element');
  // var advertsCounter = 8;
  // var advertsData = window.card.createAdverts(advertsCounter);
  var pinsCreated = false;

  var deactivatePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.form.setAddressField(window.map.getPinCoords());
  };

  deactivatePage();

  var activatePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.form.activateForm(adFormFieldsets, mapFilters);
  };

  var init = function (evt) {
    if ((evt.button === 0 || evt.key === 'Enter') && !pinsCreated) {
      window.server.loadData(function (data) {
        window.data = data;
        activatePage();
        window.form.setAddressField(window.map.getPinCoords());
        window.map.renderData(window.data, true);
        window.form.checkRooms(window.form.roomNumberSelect.value);
        pinsCreated = true;
      },
      function () {
        // console.log(errorText);
      });
    }
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    init(evt);
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    init(evt);
  });
})();
