/* eslint-disable no-console */
import $ from 'jquery';

// user data object made for gather the data from form and quiz
export const userData = {
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

// function for handle answers to the user data object
// and switch block  and making post request
export function slideHandler(page, choiseNum) {
  const { answers } = userData;

  if (page === 4) {
    answers[`Question-${page}`] = $(`#choise${choiseNum}`).data();
    $('.data__questions').hide();
    $('#solutions').show();

    // sending data after 4-th answer
    postData('http://ptsv2.com/t/piy3c-1609321473/post', userData);
  };

  answers[`Question-${page}`] = $(`#choise${choiseNum}`).data();

  // sending data after 1-st answer
  if (page === 1) {
    postData('http://ptsv2.com/t/piy3c-1609321473/post', userData);
  };

  $(`#quiz_${page}`).hide();
  $(`#quiz_${page}`).off();
  $(`#page${page + 1}`).addClass('active');
  $(`#line${page}`).addClass('active');
  $(`#quiz_${page + 1}`).show();
};

// help function for hendeling the quiz answers
export function switchHendl(id, quiz) {
  const choisesNum = [];
  let count = 1 + (quiz * 4 - 4);

  for (let i = 0; i < 4; i++) {
    choisesNum.push(count);

    count++;
  }

  switch (id) {
    case `choise${choisesNum[0]}`:
      return slideHandler(quiz, choisesNum[0]);
    case `choise${choisesNum[1]}`:
      return slideHandler(quiz, choisesNum[1]);
    case `choise${choisesNum[2]}`:
      return slideHandler(quiz, choisesNum[2]);
    case `choise${choisesNum[3]}`:
      return slideHandler(quiz, choisesNum[3]);
    default:
      break;
  }
};

// function for posting data
export function postData(url, dataObj) {
  $.post(url, dataObj)
    .done(function(data) {
      console.log('Data Loaded: ' + data);
    });
};
