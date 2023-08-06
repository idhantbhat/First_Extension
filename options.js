$(function(){
    chrome.storage.sync.get('limit', function(budget){  // Retrieve the 'limit' value from chrome's storage.
        $('#limit').val(budget.limit);  // Set the value of the input field with id 'limit' with the retrieved value.
    })
    $('#saveLimit').click(function(){  // Event handler for the 'click' event on the element with id 'saveLimit'.
        var limit= $('#limit').val();  // Get the value from the input field with id 'limit'.
        if(limit){  // If limit is not empty or undefined.
            chrome.storage.sync.set({'limit': limit}, function(){  // Set the 'limit' in chrome's storage with the new limit.
                close();  // Close the current window (options page).
            })
        }
    })
    $('#resetTotal').click(function(){  // Event handler for the 'click' event on the element with id 'resetTotal'.
        chrome.storage.sync.set({'total': 0}, function(){  // Reset the 'total' in chrome's storage to 0.
            var notifOptions = {
                type: 'basic',  // Type of notification to display.
                iconUrl: 'windows.jpg',  // URL of the image to use as an icon.
                title: 'Total Reset',  // The title of the notification.
                message: 'total done been reset to 0'  // The message to display to the user.
            }
            chrome.notifications.create('limitNotif', notifOptions)  // Create and display the notification.
        }); 
    })
})
