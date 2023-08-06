var contextMenuItem = {
    "id" : "spendMoney",  // The unique id of the context menu item.
    "title": "SpendMoney",  // The text that is displayed in the context menu.
    "contexts": ["selection"]  // Specifies the contexts in which the menu item will appear. Here it appears when some text is selected.
};
chrome.contextMenus.create(contextMenuItem);  // Create a context menu item.

function isInt(value){  // Function to check if a value is an integer.
    return !isNaN(value) &&  // Check if value is not NaN (Not a Number).
    parseInt(Number(value)) == value &&  // Check if the parsed integer value is equal to the given value.
    !isNaN(parseInt(value, 10))  // Check if the value parsed as an integer (base 10) is not NaN.
}

chrome.contextMenus.onClicked.addListener(function(clickData){  // Add an event listener for the 'click' event on the context menu.
    if (clickData.menuItemId == "spendMoney" && clickData.selectionText){  // If the clicked menu item's id is 'spendMoney' and there is some selected text.
        if (isInt(clickData.selectionText)){  // If the selected text is an integer.
            chrome.storage.sync.get(['total', 'limit'], function(budget){  // Retrieve the 'total' and 'limit' values from chrome's storage.
                var newTotal = 0;  // Initialize a new total variable to 0.
                if(budget.total){  // If total from chrome's storage is not empty or undefined.
                    newTotal += parseInt(budget.total)  // Add total from chrome's storage to newTotal after converting it to integer.
                }
                newTotal += parseInt(clickData.selectionText);  // Add the selected text to newTotal after converting it to integer.
                chrome.storage.sync.set({'total': newTotal}, function(){  // Set the 'total' in chrome's storage with the new total.
                    if(newTotal >= budget.limit){  // If the new total exceeds the limit.
                        var notifOptions = {
                            type: 'basic',  // Type of notification to display.
                            iconUrl: 'windows.jpg',  // URL of the image to use as an icon.
                            title: 'Limit reached!',  // The title of the notification.
                            message: 'gangem'  // The message to display to the user.
                        }
                        chrome.notifications.create('limitNotif', notifOptions)  // Create and display the notification.
                    }
                })
            })
        }

        chrome.storage.onChanged.addListener(function(changes,storageName){  // Add an event listener for the 'change' event on chrome's storage.
            chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()})  // Set the badge text for the extension's browser action with the new total.
        })
    }
})
