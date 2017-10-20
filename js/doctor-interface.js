import { Doctor } from './../js/doctor.js';

$(document).ready(function() {
  $('#input').submit(function(event) {
    $('#results').text("")
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
      let type = $('#searchType').val();
      let doctorQuery = doctor.doctorApi(lat, lng, query, type);
      $('#results').append("<h3>Finding Doctors</h3><img src = 'img/loading.gif'>")

      doctorQuery.then(function(response) {
        $('#results').text('')
        let body = JSON.parse(response);
        debugger;
        if (body.data.length > 0) {
        body.data.forEach(function(data) {
          data.practices.forEach(function(practice) {
            $('#results').append('<tr><td>')
            $('#results').append(`<h3>${practice.name}</h3><p><strong>Address:</strong></p> <p>${practice.visit_address.street}</p><p>${practice.visit_address.city}, ${practice.visit_address.state} ${practice.visit_address.zip}</p>`);
            practice.phones.forEach(function(phone){
              $('#results').append(`<p><strong>${phone.type}:  </strong>${phone.number}</p>`)
            });
            $('#results').append('</td></tr>')
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
