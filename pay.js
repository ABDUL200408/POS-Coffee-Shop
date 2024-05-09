document.addEventListener('DOMContentLoaded', function() {
  const cardNumberInput = document.getElementById('cardNumber');
  const cardNameInput = document.getElementById('cardName');
  const cardMonthSelect = document.getElementById('cardMonth');
  const cardYearSelect = document.getElementById('cardYear');
  const cardCvvInput = document.getElementById('cardCvv');
  const submitButton = document.querySelector('.card-form__button');

  // Function to format the card number input
  function formatCardNumber(value) {
    let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.join(' ').slice(0, 19); // Ensure no more than 16 digits plus spaces
  }

  cardNumberInput.addEventListener('input', function() {
    this.value = formatCardNumber(this.value);
  });

  // Populate month and year selects
  function populateSelect(element, start, count) {
    for (let i = start; i < start + count; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i < 10 ? '0' + i : i;
      element.appendChild(option);
    }
  }

  populateSelect(cardMonthSelect, 1, 12);
  populateSelect(cardYearSelect, new Date().getFullYear(), 10);

  // CVV should only allow numeric input and up to 4 digits
  cardCvvInput.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 4);
  });

  // Validate expiration date
  function isCardExpired(month, year) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    return year < currentYear || (year === currentYear && month < currentMonth);
  }

  // Validate card number start
  function isValidCardStart(number) {
    return ['3', '4', '5', '6'].includes(number.charAt(0));
  }

  // Enhanced CVV validation
  function isValidCvv(cvv) {
    return (cvv.length === 3 || cvv.length === 4) && !/^0{3,4}$/.test(cvv);
  }

  // Form submission logic with validation
  submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    if (!cardNumberInput.value || !cardNameInput.value || !cardMonthSelect.value || !cardYearSelect.value || !cardCvvInput.value) {
      alert('Please fill in all fields.');
      return;
    }
    const cleanedCardNumber = cardNumberInput.value.replace(/\s/g, '');
    if (cleanedCardNumber.length !== 16) {
      alert('Invalid card number. Please enter a 16-digit card number.');
      return;
    }
    if (!isValidCardStart(cleanedCardNumber)) {
      alert('Invalid card number start. Please enter a card number starting with 3, 4, 5, or 6.');
      return;
    }
    if (isCardExpired(parseInt(cardMonthSelect.value), parseInt(cardYearSelect.value))) {
      alert('The credit card is expired.');
      return;
    }
    if (!isValidCvv(cardCvvInput.value)) {
      alert('Invalid CVV. Please enter a valid CVV.');
      return;
    }
    alert('Payment successfully completed!');
    window.location.href = 'homePage.html';
    //window.location.reload(); // Reload the page to reset the form
  });
});
