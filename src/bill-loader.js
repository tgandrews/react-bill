export default {
  load: (action) => {
    return new Promise((resolve) => {
      let xhr = new window.XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200) {
            let json;
            try {
              json = JSON.parse(this.responseText);
            }
            catch (e) {
              resolve(e);
            }

            resolve(json);
          }
          resolve(new Error('Non 200 error code'));
        }
      };
      xhr.open('GET', 'https://still-scrubland-9880.herokuapp.com/bill.json');
      xhr.send();
    })
    .then((response) => {
      if (response instanceof Error) {
        action.createError();
      }
      else {
        action.createSuccess(response);
      }
    });
  }
};
