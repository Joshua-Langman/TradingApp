const queryParameters = new URLSearchParams(window.location.search);
const errorMessage = queryParameters.get('errorMessage');

if(errorMessage) {
   const errorMessageElement = document.getElementById('error-message');
   errorMessageElement.innerText = errorMessage;
}
