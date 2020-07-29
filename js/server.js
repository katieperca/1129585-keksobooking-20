'use strict';

(function () {
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var URL_UPLOAD = 'https://javascript.pages.academy/keksobooking1';
  var METHOD_LOAD = 'GET';
  var METHOD_UPLOAD = 'POST';
  var TIMEOUT_IN_MS = 10000;
  var statusCode = {
    OK: 200
  };

  var createRequest = function (url, method, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);
    xhr.send(data);
  };

  var loadData = function (onSuccess, onError) {
    createRequest(URL_LOAD, METHOD_LOAD, onSuccess, onError);
  };

  var uploadData = function (data, onSuccess, onError) {
    createRequest(URL_UPLOAD, METHOD_UPLOAD, onSuccess, onError, data);
  };

  window.server = {
    loadData: loadData,
    uploadData: uploadData
  };
})();
