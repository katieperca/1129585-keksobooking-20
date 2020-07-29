'use strict';

(function () {
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
  var adForm = document.querySelector('.ad-form');
  var mapFeatures = document.querySelector('.map__features');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var addressField = adForm.querySelector('#address');
  var capacitySelect = adForm.querySelector('#capacity');
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  var housingTypeSelect = adForm.querySelector('#type');
  var priceForNightInput = adForm.querySelector('#price');

  var deactivateForm = function (fieldsets, filters) {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', 'disabled');
    }
    for (var j = 0; j < filters.length; j++) {
      filters[j].setAttribute('disabled', 'disabled');
    }
    mapFeatures.setAttribute('disabled', 'disabled');
  };

  var activateForm = function (fieldsets, filters) {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute('disabled');
    }
    for (var j = 0; j < filters.length; j++) {
      filters[j].removeAttribute('disabled');
    }
    mapFeatures.removeAttribute('disabled');
  };

  var setAddressField = function (coords) {
    addressField.value = coords;
  };

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

  window.form = {
    roomNumberSelect: roomNumberSelect,
    activateForm: activateForm,
    deactivateForm: deactivateForm,
    setAddressField: setAddressField,
    checkRooms: checkRooms
  };

})();
