$(function(){

    chrome.storage.sync.get(['total', 'limit'], function(budget){  // Retrieve the 'total' and 'limit' values from chrome's storage.
        $('#total').text(budget.total);  // Set the text of the element with id 'total' with the retrieved total.
        $('#limit').text(budget.limit)  // Set the text of the element with id 'limit' with the retrieved limit.
    })
    $('#spendAmount').click(function(){  // Event handler for the 'click' event on the element with id 'spendAmount'.
        chrome.storage.sync.get(['total', 'limit'], function(budget){  // Retrieve the 'total' and 'limit' values from chrome's storage.
            var newTotal = 0;  // Initialize a new total variable to 0.
            if(budget.total){  // If total from chrome's storage is not empty or undefined.
                newTotal += parseInt(budget.total) ;  // Add total from chrome's storage to newTotal after converting it to integer.
            }
            var amount = $('#amount').val();  // Get the value from the input field with id 'amount'.
            if(amount){  // If amount is not empty or undefined.
                newTotal += parseInt(amount);  // Add the amount to newTotal after converting it to integer.
            }
            chrome.storage.sync.set({'total': newTotal}, function(){  // Set the 'total' in chrome's storage with the new total.
                if (amount && newTotal >= budget.limit){  // If the new total exceeds the limit.
                    var notifOptions = {
                        type: 'basic',  // Type of notification to display.
                        iconUrl: 'windows.jpg',  // URL of the image to use as an icon.
                        title: 'Limit reached!',  // The title of the notification.
                        message: 'gangem'  // The message to display to the user.
                    }
                    chrome.notifications.create('limitNotif', notifOptions)  // Create and display the notification.
                }
            });
            $('#total').text(newTotal);  // Update the text of the element with id 'total' with the new total.
            $('#amount').val('');  // Clear the input field with id 'amount'.
        })
    })
})
