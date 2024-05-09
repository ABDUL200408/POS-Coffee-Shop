document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const pinInput = document.getElementById('pin');

  const users = {
    "user1": "123456",
    "user2": "234567",
    "user3": "345678",
    "user4": "456789",
    "user5": "567890"
  };

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = usernameInput.value.trim();
    const pin = pinInput.value.trim();

    if (!username || !pin) {
      alert("Please fill in all fields.");
      return;
    }

    if (/(\w)\1{2,}/.test(username)) {
      alert("Username cannot have more than two consecutive repeating characters.");
      return;
    }

    if (!/^\d{6}$/.test(pin) || pin === "000000") {
      alert("Invalid pin. Ensure it's 6 digits long and not all zeros.");
      return;
    }

    if (users[username] === pin) {
      alert("You have successfully logged in.");
      window.location.href = 'homePage.html'; // Redirect to homePage.html after successful login
    } else {
      alert("Username or pin is incorrect.");
    }
  });
});
