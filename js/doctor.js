var apiKey = require('./../.env').apiKey;

export class Doctor {

  locationApi(location) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBb-6lyykgnZhSEv_FdW6BWi_7BjznhOmw`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }

  doctorApi(lat, lng, query, type, sort) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url;
      if (type === "disease") {
        url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${query}&location=${lat},${lng},50&sort=${sort}&user_key=${apiKey}`
      } else if (type === "name") {
        url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${query}&location=${lat},${lng},50&sort=${sort}&user_key=${apiKey}`
      }
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
