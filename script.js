const newQoute = document.getElementById('new-quote');
const categories = document.querySelectorAll('.category input');
const quote = document.getElementById('quote');
const author =  document.getElementById('author')
const addQuoteButton = document.getElementById('add-quote');
const addNewQuote = document.getElementById('new-content')
const addNewQuoteAuther = document.getElementById('new-author')

async function fetchNewQoute() {
    let selectedCategories = Array.from(categories).filter(value => value.checked).map(val => val.value);
    console.log(selectedCategories);
    
    let url = 'http://api.quotable.io/random';
    if(selectedCategories.length > 0){
        url += `?tags=${selectedCategories.join(',')}`;
    }    
    
    try{
        const response = await fetch(url)
        console.log(response);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayQuote(data)
    } catch {
        console.log("error");
        
    }
}


function displayQuote(data) {
    quote.textContent = data.content;
    author.textContent = `- ${data.author}`;
}

function savePreferences() {
    const preferences = Array.from(categories).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
    
    localStorage.setItem('quotePreferences', JSON.stringify(preferences));
    console.log(localStorage);
    
}


newQoute.addEventListener('click', () => {
    fetchNewQoute()
    savePreferences()
})



addQuoteButton.addEventListener('click', () => {
    if(addNewQuote.value && addNewQuoteAuther.value){
        const newContent = []
        const content = addNewQuote.value.trim();
        const author = addNewQuoteAuther.value.trim();
    
        newContent.push({content, author})
        
        localStorage.setItem('userQuotes', JSON.stringify(newContent));
        
        alert('Your quote has been added in localstorage')
    } else {
        alert('Please fill out both fields.');
    }
})

function sendDailyQuoteNotification() {
    if (Notification.permission === 'granted') {
        const randomQuote = "This is your daily quote reminder!";
        new Notification('Daily Quote', {
            body: randomQuote,
            icon: 'path/to/icon.png'
        });
    } else {
        alert('Enable notifications for daily quotes!');
    }
}

// Request Notification Permission
if (Notification.permission !== 'granted') {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Notifications enabled.');
        }
    });
}


setTimeout(sendDailyQuoteNotification,2000)