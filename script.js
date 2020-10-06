'use strict';

// Get repository list
function getRepositoryList(inputValue) {
  let requiredUrl = `https://api.github.com/users/${inputValue}/repos`;
  fetch(requiredUrl)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => displayResults(responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  })
}

// Display results
function displayResults(responseJson) {
  console.log(responseJson);
  // Clear previous list
  $('#results-list').empty();
  for (let i = 0; i < responseJson.length; i++) {
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}">${responseJson[i].name}</a></h3>
      <p>Description : ${responseJson[i].description}</p>   
      </li>`
  )};
  $('#results').removeClass('hidden');
}


// Create event listener
function search() {
  $('#js-user-form').submit(event => {
    event.preventDefault();
    let inputValue = $('#js-user-input').val();
    getRepositoryList(inputValue);
  })
}

$(function() {
  console.log("App loaded! Waiting for submit!");
  search();
})