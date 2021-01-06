import $ from 'jquery';
import 'jquery-validation';
import countryTelephoneCode from 'country-telephone-code';

const userData = {
  name: '',
  mail: '',
  phone: null,
  country: '',
  answers: {
    'Question-1': '',
    'Question-2': '',
    'Question-3': '',
    'Question-4': '',
  },
};

function slideHandler(page, choiseNum) {
  const { answers } = userData;

  if (page === 4) {
    answers[`Question-${page}`] = $(`#choise${choiseNum}`).data();
    $('.data__questions').hide();
    $('#solutions').show();
  };

  answers[`Question-${page}`] = $(`#choise${choiseNum}`).data();

  $(`#quiz_${page}`).hide();
  $(`#quiz_${page}`).off();
  $(`#page${page + 1}`).addClass('active');
  $(`#line${page}`).addClass('active');
  $(`#quiz_${page + 1}`).show();
};

function switchHendl(id, quiz) {
  const choisesNum = [];
  let count = 1 + (quiz * 4 - 4);

  for (let i = 0; i < 4; i++) {
    choisesNum.push(count);
    count++;
  }

  if (id === `choise${choisesNum[0]}`) {
    return slideHandler(quiz, choisesNum[0]);
  } else if (id === `choise${choisesNum[1]}`) {
    return slideHandler(quiz, choisesNum[1]);
  } else if (id === `choise${choisesNum[2]}`) {
    return slideHandler(quiz, choisesNum[2]);
  } else if (id === `choise${choisesNum[3]}`) {
    return slideHandler(quiz, choisesNum[3]);
  }
};

$.getJSON('http://ip-api.com/json', function(response) {
  $('#default').text(response.country);
  $('#default').val(response.country);

  const phoneCode = countryTelephoneCode(response.countryCode);

  $('#phone').val(`${phoneCode}`);
});

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

$('.access__quiz_button').on('click', function() {
  $('.data__access').hide();
  $('.data__questions').show();
  $('#quiz_1').show();
  $('#page1').addClass('active');
  $('.access__quiz_button').off();
});

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
