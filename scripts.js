document.addEventListener('DOMContentLoaded', function() {
    const basket = JSON.parse(localStorage.getItem('basket')) || {};
    const specialRequests = localStorage.getItem('specialRequests') || '';

    function updateBasketDisplay() {
        const itemsContainer = document.querySelector('.items');
        const totalPriceElement = document.getElementById('total-price');
        const commentDisplay = document.getElementById('comment-display') || document.createElement('div');
        if (!document.getElementById('comment-display')) {
            commentDisplay.id = 'comment-display';
            document.querySelector('.basket').appendChild(commentDisplay);
        }

        itemsContainer.innerHTML = '';
        let total = 0;

        Object.keys(basket).forEach(name => {
            const item = basket[name];
            const itemContainer = document.createElement('div');
            itemContainer.className = 'item-container';

            const itemName = document.createElement('span');
            itemName.textContent = `${name} x${item.count} - £${(item.price * item.count).toFixed(2)}`;
            itemName.className = 'item-name';

            const controlContainer = document.createElement('div');
            controlContainer.className = 'control-container';

            const addButton = document.createElement('button');
            addButton.textContent = '+';
            addButton.className = 'item-button';
            addButton.onclick = () => { changeItemQuantity(name, 1); };

            const removeButton = document.createElement('button');
            removeButton.textContent = '-';
            removeButton.className = 'item-button';
            removeButton.onclick = () => { changeItemQuantity(name, -1); };

            controlContainer.appendChild(removeButton);
            controlContainer.appendChild(addButton);
            itemContainer.appendChild(itemName);
            itemContainer.appendChild(controlContainer);
            itemsContainer.appendChild(itemContainer);

            total += item.price * item.count;
        });

        totalPriceElement.textContent = `£${total.toFixed(2)}`;
        commentDisplay.textContent = specialRequests;
    }

    function changeItemQuantity(name, change) {
        if (basket[name]) {
            basket[name].count += change;
            if (basket[name].count <= 0) {
                delete basket[name];
            }
            localStorage.setItem('basket', JSON.stringify(basket));
            updateBasketDisplay();
        }
    }

    function clearBasketAndComments() {
        if (Object.keys(basket).length === 0) {
            alert('Your basket is empty.');
        } else {
            localStorage.clear();
            window.location.href = 'pay.html'; // Redirect to pay.html in the same window
        }
    }

    const checkoutButton = document.querySelector('.checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', clearBasketAndComments);
    }

    document.querySelectorAll('.header-button').forEach(button => {
        if (button.textContent.includes('Logout')) {
            button.addEventListener('click', function() {
                clearBasketAndComments();
                window.location.href = 'Login.html'; // Redirect to Login.html after logout
            });
        }
    });

    document.querySelectorAll('.add-to-basket').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.textContent.split('- £')[1]);
            if (!basket[name]) {
                basket[name] = { count: 1, price: price };
            } else {
                basket[name].count++;
            }
            localStorage.setItem('basket', JSON.stringify(basket));
            updateBasketDisplay();
        });
    });

    const commentBox = document.getElementById('special-requests');
    const commentButton = document.querySelector('.comment-box button');
    if (commentButton) {
        commentButton.addEventListener('click', function() {
            const comment = commentBox.value.trim();
            if (comment) {
                localStorage.setItem('specialRequests', comment);
                alert('Comment added to your order.');
                location.reload(); // Refresh page to show comment updates immediately
            } else {
                alert('Please enter a comment before adding.');
            }
        });
    }

    updateBasketDisplay();
});













// // This code works with opening the pay.html in a new window and clearing the basket

// document.addEventListener('DOMContentLoaded', function() {
//     const basket = JSON.parse(localStorage.getItem('basket')) || {};
//     const specialRequests = localStorage.getItem('specialRequests') || '';

//     function updateBasketDisplay() {
//         const itemsContainer = document.querySelector('.items');
//         const totalPriceElement = document.getElementById('total-price');
//         const commentDisplay = document.getElementById('comment-display') || document.createElement('div');
//         if (!document.getElementById('comment-display')) {
//             commentDisplay.id = 'comment-display';
//             document.querySelector('.basket').appendChild(commentDisplay);
//         }

//         itemsContainer.innerHTML = '';
//         let total = 0;

//         Object.keys(basket).forEach(name => {
//             const item = basket[name];
//             const itemContainer = document.createElement('div');
//             itemContainer.className = 'item-container';

//             const itemName = document.createElement('span');
//             itemName.textContent = `${name} x${item.count} - £${(item.price * item.count).toFixed(2)}`;
//             itemName.className = 'item-name';

//             const controlContainer = document.createElement('div');
//             controlContainer.className = 'control-container';

//             const addButton = document.createElement('button');
//             addButton.textContent = '+';
//             addButton.className = 'item-button';
//             addButton.onclick = () => { changeItemQuantity(name, 1); };

//             const removeButton = document.createElement('button');
//             removeButton.textContent = '-';
//             removeButton.className = 'item-button';
//             removeButton.onclick = () => { changeItemQuantity(name, -1); };

//             controlContainer.appendChild(removeButton);
//             controlContainer.appendChild(addButton);
//             itemContainer.appendChild(itemName);
//             itemContainer.appendChild(controlContainer);
//             itemsContainer.appendChild(itemContainer);

//             total += item.price * item.count;
//         });

//         totalPriceElement.textContent = `£${total.toFixed(2)}`;
//         commentDisplay.textContent = specialRequests;
//     }

//     function changeItemQuantity(name, change) {
//         if (basket[name]) {
//             basket[name].count += change;
//             if (basket[name].count <= 0) {
//                 delete basket[name];
//             }
//             localStorage.setItem('basket', JSON.stringify(basket));
//             updateBasketDisplay();
//         }
//     }

//     function clearBasketAndComments() {
//         localStorage.clear();
//         window.open('pay.html', '_blank'); // Open pay.html in a new tab
//         location.reload(); // Refresh display after clearing storage and showing alert
//     }

//     const checkoutButton = document.querySelector('.checkout');
//     if (checkoutButton) {
//         checkoutButton.addEventListener('click', clearBasketAndComments);
//     }

//     document.querySelectorAll('.header-button').forEach(button => {
//         if (button.textContent.includes('Logout')) {
//             button.addEventListener('click', function() {
//                 clearBasketAndComments();
//                 window.location.href = 'Login.html'; // Redirect to Login.html after logout
//             });
//         }
//     });

//     document.querySelectorAll('.add-to-basket').forEach(button => {
//         button.addEventListener('click', () => {
//             const name = button.getAttribute('data-name');
//             const price = parseFloat(button.textContent.split('- £')[1]);
//             if (!basket[name]) {
//                 basket[name] = { count: 1, price: price };
//             } else {
//                 basket[name].count++;
//             }
//             localStorage.setItem('basket', JSON.stringify(basket));
//             updateBasketDisplay();
//         });
//     });

//     const commentBox = document.getElementById('special-requests');
//     const commentButton = document.querySelector('.comment-box button');
//     if (commentButton) {
//         commentButton.addEventListener('click', function() {
//             const comment = commentBox.value.trim();
//             if (comment) {
//                 localStorage.setItem('specialRequests', comment);
//                 alert('Comment added to your order.');
//                 location.reload(); // Refresh page to show comment updates immediately
//             } else {
//                 alert('Please enter a comment before adding.');
//             }
//         });
//     }

//     updateBasketDisplay();
// });












// // // New code to adjust for the better display of - & + signs in the basket.
// // With a redirection to the Login page when logged out

// document.addEventListener('DOMContentLoaded', function() {
//     const basket = JSON.parse(localStorage.getItem('basket')) || {};
//     const specialRequests = localStorage.getItem('specialRequests') || '';

//     function updateBasketDisplay() {
//         const itemsContainer = document.querySelector('.items');
//         const totalPriceElement = document.getElementById('total-price');
//         const commentDisplay = document.getElementById('comment-display') || document.createElement('div');
//         if (!document.getElementById('comment-display')) {
//             commentDisplay.id = 'comment-display';
//             document.querySelector('.basket').appendChild(commentDisplay);
//         }

//         itemsContainer.innerHTML = '';
//         let total = 0;

//         Object.keys(basket).forEach(name => {
//             const item = basket[name];
//             const itemContainer = document.createElement('div');
//             itemContainer.className = 'item-container';

//             const itemName = document.createElement('span');
//             itemName.textContent = `${name} x${item.count} - £${(item.price * item.count).toFixed(2)}`;
//             itemName.className = 'item-name';

//             const controlContainer = document.createElement('div');
//             controlContainer.className = 'control-container';

//             const addButton = document.createElement('button');
//             addButton.textContent = '+';
//             addButton.className = 'item-button';
//             addButton.onclick = () => { changeItemQuantity(name, 1); };

//             const removeButton = document.createElement('button');
//             removeButton.textContent = '-';
//             removeButton.className = 'item-button';
//             removeButton.onclick = () => { changeItemQuantity(name, -1); };

//             controlContainer.appendChild(removeButton);
//             controlContainer.appendChild(addButton);
//             itemContainer.appendChild(itemName);
//             itemContainer.appendChild(controlContainer);
//             itemsContainer.appendChild(itemContainer);

//             total += item.price * item.count;
//         });

//         totalPriceElement.textContent = `£${total.toFixed(2)}`;
//         commentDisplay.textContent = specialRequests;
//     }

//     function changeItemQuantity(name, change) {
//         if (basket[name]) {
//             basket[name].count += change;
//             if (basket[name].count <= 0) {
//                 delete basket[name];
//             }
//             localStorage.setItem('basket', JSON.stringify(basket));
//             updateBasketDisplay();
//         }
//     }

//     function clearBasketAndComments() {
//         localStorage.clear();
//         alert('Checkout complete. Thank you for your order!');
//         location.reload(); // Refresh display after clearing storage and showing alert
//     }

//     const checkoutButton = document.querySelector('.checkout');
//     if (checkoutButton) {
//         checkoutButton.addEventListener('click', clearBasketAndComments);
//     }

//     document.querySelectorAll('.header-button').forEach(button => {
//         if (button.textContent.includes('Logout')) {
//             button.addEventListener('click', function() {
//                 clearBasketAndComments();
//                 window.location.href = 'Login.html'; // Redirect to Login.html after logout
//             });
//         }
//     });

//     document.querySelectorAll('.add-to-basket').forEach(button => {
//         button.addEventListener('click', () => {
//             const name = button.getAttribute('data-name');
//             const price = parseFloat(button.textContent.split('- £')[1]);
//             if (!basket[name]) {
//                 basket[name] = { count: 1, price: price };
//             } else {
//                 basket[name].count++;
//             }
//             localStorage.setItem('basket', JSON.stringify(basket));
//             updateBasketDisplay();
//         });
//     });

//     const commentBox = document.getElementById('special-requests');
//     const commentButton = document.querySelector('.comment-box button');
//     if (commentButton) {
//         commentButton.addEventListener('click', function() {
//             const comment = commentBox.value.trim();
//             if (comment) {
//                 localStorage.setItem('specialRequests', comment);
//                 alert('Comment added to your order.');
//                 location.reload(); // Refresh page to show comment updates immediately
//             } else {
//                 alert('Please enter a comment before adding.');
//             }
//         });
//     }

//     updateBasketDisplay();
// });















// // New code to adjust for the better display of - & + signs in the basket

// document.addEventListener('DOMContentLoaded', function() {
//     const basket = JSON.parse(localStorage.getItem('basket')) || {};
//     const specialRequests = localStorage.getItem('specialRequests') || '';

//     function updateBasketDisplay() {
//         const itemsContainer = document.querySelector('.items');
//         const totalPriceElement = document.getElementById('total-price');
//         const commentDisplay = document.getElementById('comment-display') || document.createElement('div');
//         if (!document.getElementById('comment-display')) {
//             commentDisplay.id = 'comment-display';
//             document.querySelector('.basket').appendChild(commentDisplay);
//         }

//         itemsContainer.innerHTML = '';
//         let total = 0;

//         Object.keys(basket).forEach(name => {
//             const item = basket[name];
//             const itemContainer = document.createElement('div');
//             itemContainer.className = 'item-container';

//             const itemName = document.createElement('span');
//             itemName.textContent = `${name} x${item.count} - £${(item.price * item.count).toFixed(2)}`;
//             itemName.className = 'item-name';

//             const controlContainer = document.createElement('div');
//             controlContainer.className = 'control-container';

//             const addButton = document.createElement('button');
//             addButton.textContent = '+';
//             addButton.className = 'item-button';
//             addButton.onclick = () => { changeItemQuantity(name, 1); };

//             const removeButton = document.createElement('button');
//             removeButton.textContent = '-';
//             removeButton.className = 'item-button';
//             removeButton.onclick = () => { changeItemQuantity(name, -1); };

//             controlContainer.appendChild(removeButton);
//             controlContainer.appendChild(addButton);
//             itemContainer.appendChild(itemName);
//             itemContainer.appendChild(controlContainer);
//             itemsContainer.appendChild(itemContainer);

//             total += item.price * item.count;
//         });

//         totalPriceElement.textContent = `£${total.toFixed(2)}`;
//         commentDisplay.textContent = specialRequests;
//     }

//     function changeItemQuantity(name, change) {
//         if (basket[name]) {
//             basket[name].count += change;
//             if (basket[name].count <= 0) {
//                 delete basket[name];
//             }
//             localStorage.setItem('basket', JSON.stringify(basket));
//             updateBasketDisplay();
//         }
//     }

//     function clearBasketAndComments() {
//         localStorage.clear();
//         alert('Checkout complete. Thank you for your order!');
//         location.reload(); // Refresh display after clearing storage and showing alert
//     }

//     const checkoutButton = document.querySelector('.checkout');
//     if (checkoutButton) {
//         checkoutButton.addEventListener('click', clearBasketAndComments);
//     }

//     document.querySelectorAll('.header-button').forEach(button => {
//         if (button.textContent.includes('Logout')) {
//             button.addEventListener('click', clearBasketAndComments);
//         }
//     });

//     document.querySelectorAll('.add-to-basket').forEach(button => {
//         button.addEventListener('click', () => {
//             const name = button.getAttribute('data-name');
//             const price = parseFloat(button.textContent.split('- £')[1]);
//             if (!basket[name]) {
//                 basket[name] = { count: 1, price: price };
//             } else {
//                 basket[name].count++;
//             }
//             localStorage.setItem('basket', JSON.stringify(basket));
//             updateBasketDisplay();
//         });
//     });

//     const commentBox = document.getElementById('special-requests');
//     const commentButton = document.querySelector('.comment-box button');
//     if (commentButton) {
//         commentButton.addEventListener('click', function() {
//             const comment = commentBox.value.trim();
//             if (comment) {
//                 localStorage.setItem('specialRequests', comment);
//                 alert('Comment added to your order.');
//                 location.reload(); // Refresh page to show comment updates immediately
//             } else {
//                 alert('Please enter a comment before adding.');
//             }
//         });
//     }

//     updateBasketDisplay();
// });