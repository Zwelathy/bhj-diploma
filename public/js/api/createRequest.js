/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  if (options) {
    const xhr = new XMLHttpRequest;
    let formData = new FormData();
    let sentURL = options.url;
    
    if (options.method !== 'GET') {
      Object.entries(options.data).forEach(([key, value]) => formData.append(key, value));
    }
    else {
      formData = '';
      
      if (!sentURL.includes('/account')) {
        sentURL += '?';
        Object.entries(options.data).forEach(([key, value]) => sentURL += `${key}=${value}&`);
        sentURL = sentURL.slice(0, -1);  
      }
    }

    try {
      xhr.open(options.method, sentURL);
      xhr.send(formData);       
    }
    catch (err) {
      options.callback(err, null);
    }

    xhr.responseType = 'json';
    xhr.addEventListener('readystatechange', function() {
      if (xhr.status === 200 && xhr.readyState === xhr.DONE) {           
        options.callback(null, xhr.response);       
      }
    });

  }
};