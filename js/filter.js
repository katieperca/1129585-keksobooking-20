'use strict';

(function () {
  var DEFAULT_HOUSING_TYPE = 'any';
  var filterForm = document.querySelector('.map__filters');
  var housingTypeSelect = filterForm.querySelector('#housing-type');

  var makeFilter = function (item) {
    return (
      item.offer.type === housingTypeSelect.value ||
      housingTypeSelect.value === DEFAULT_HOUSING_TYPE
    );
  };

  var showFiltredData = function () {
    var filtredData = window.data.filter(makeFilter);
    window.map.clearMap();
    window.map.renderData(filtredData);
  };

  housingTypeSelect.addEventListener('change', function () {
    showFiltredData();
  });
})();
