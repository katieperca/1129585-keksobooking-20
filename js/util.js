'use strict';

(function () {
  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomValue = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var getRandomTitle = function () {
    var randomAdjectives = ['Уютный', 'Заброшенный', 'Проклятый старый', 'Старинный', 'Комфортный'];
    var randomNouns = ['дом', 'барак', 'сарай', 'дворец', 'хлев'];
    var randomCharacteristic = ['для самоизоляции', 'в заросшем парке', 'с жутко злым дедом', 'с площадкой для барбекю', 'для уточки Медведева'];

    var randomTitle = [window.util.getRandomValue(randomAdjectives), window.util.getRandomValue(randomNouns), window.util.getRandomValue(randomCharacteristic)].join(' ');

    return randomTitle;
  };

  window.util = {
    getRandomIntInclusive: getRandomIntInclusive,
    getRandomValue: getRandomValue,
    getRandomTitle: getRandomTitle
  };
})();
