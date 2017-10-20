import { Doctor } from './../js/doctor.js';

$(document).ready(function() {
  $('#input').submit(function(event) {
    $('#list').text("")
    event.preventDefault();

    let doctor = new Doctor();
    let location = $('#location').val();
    let sort = $('#sort').val();
    let locationQuery = doctor.locationApi(location);

    locationQuery.then(function(response) {
      let body = JSON.parse(response);
      let lat = body.results[0].geometry.location.lat;
      let lng = body.results[0].geometry.location.lng;
      let query = $('#query').val();
      let doctorQuery = doctor.doctorApi(lat, lng, query);
      $('#list').append("EARTHQUAKETRON LOADING<img src = 'img/loading.gif'>")

      doctorQuery.then(function(response) {
        $('#results').text('')
        let body = JSON.parse(response);
        debugger;
        if (body.data.length > 0) {
        body.data.forEach(function(data) {
          data.practices.forEach(function(practice) {
            $('#results').append(`<tr><td>${practice.name}</tr></td>`)
          });
        });
      } else {
        $('#results').text("No practices found");
      }
        }, function(error) {
        $('#results').text(`There has been an error with your doctor API query: ${error.message}`);
      });
      }, function(error) {
      $('#results').text(`There has been an error with your location API query: ${error.message}`);
    });
  });
});
