import $ from 'jquery';
import 'jquery-validation';
import { userData, switchHendl } from './helpFunctions';
import countryTelephoneCode from 'country-telephone-code';

// getting the country of visitor and phone code,
// setting to the default form input values
$.getJSON('http://ip-api.com/json', function(response) {
  $('#default').text(response.country);
  $('#default').val(response.country);

  const phoneCode = countryTelephoneCode(response.countryCode);

  $('#phone').val(`${phoneCode}`);
});

// validating the form data
$(function() {
  $('#userform').validate({
    rules: {
      name: {
        required: true,
        minlength: 3,
      },
      email: {
        email: true,
        required: true,
      },
      phone: {
        required: true,
        minlength: 11,
        number: true,
      },
      agree: 'required',
    },
    messages: {
      name: {
        minlength: 'Name must be at least 3 characters',
      },
      email: 'Enter a valid email',
      phone: {
        minlength: 'Phone must be at least 11 characters',
      },
      agree: 'Confirm your input',
    },
    submitHandler: function(form, event) {
    // do other things for a valid form
      event.isDefaultPrevented();

      userData.name = $('#name').val();
      userData.mail = $('#email').val();
      userData.phone = $('#phone').val();
      userData.country = $('#country').val();

      $('#userform').hide();
      $('.data__title').hide();
      $('.data').addClass('data-height');
      $('.data__access').show();
    },
  });
});

// page after form
$('.access__quiz_button').on('click', function() {
  $('.data__access').hide();
  $('.data__questions').show();
  $('#quiz_1').show();
  $('#page1').addClass('active');
  $('.access__quiz_button').off();
});

// quiz answers logic
$('#quiz_1').on('click', function(event) {
  switchHendl(event.target.id, 1);
});

$('#quiz_2').on('click', function(event) {
  switchHendl(event.target.id, 2);
});

$('#quiz_3').on('click', function(event) {
  switchHendl(event.target.id, 3);
});

$('#quiz_4').on('click', function(event) {
  switchHendl(event.target.id, 4);
});
