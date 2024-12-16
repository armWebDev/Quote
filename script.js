const newQoute = document.getElementById('new-quote');
const categories = document.querySelectorAll('.category input');
const quote = document.getElementById('quote');
const author =  document.getElementById('author');
const addQuoteButton = document.getElementById('add-quote');
const addNewQuote = document.getElementById('new-content');
const addNewQuoteAuther = document.getElementById('new-author');

async function fetchNewQoute() {
    let selectedCategories = Array.from(categories).filter(value => value.checked).map(val => val.value);
    let url = 'http://api.quotable.io/random';
    if(selectedCategories.length > 0){
        url += `?tags=${selectedCategories.join(',')}`;        
    }    
    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayQuote(data);
    } catch {
        console.log("error");
        alert('Please select 1 categores there is not any quote from your selection (')
    }
}

function displayQuote(data) {
    quote.textContent = data.content;
    author.textContent = `- ${data.author}`;
}

function savePreferences() {
    const preferences = Array.from(categories).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
    localStorage.setItem('quotePreferences', JSON.stringify(preferences));
}

newQoute.addEventListener('click', () => {
    fetchNewQoute();
    savePreferences();
});

addQuoteButton.addEventListener('click', () => {
    if(addNewQuote.value && addNewQuoteAuther.value){
        const newContent = [];
        const content = addNewQuote.value.trim();
        const author = addNewQuoteAuther.value.trim();
        newContent.push({content, author});
        localStorage.setItem('userQuotes', JSON.stringify(newContent));
        alert('Your quote has been added in localstorage');
    } else {
        alert('Please fill out both fields.');
    }
});


function scheduleNotification() {
    alert("Dont forget motivate every day with us!")
}


setInterval(() => {
    scheduleNotification()
}, 50000)

const languageSelector = document.getElementById('language');

async function translateWithLingva(text, targetLang) {
    const response = await fetch(`https://lingva.ml/api/v1/en/${targetLang}/${encodeURIComponent(text)}`);

    if (!response.ok) {
        console.error(`Translation failed: ${response.status}`);
        translatedTextElement.textContent = "Translation failed.";
        return null;
    }

    const data = await response.json();
    return data.translation;
}

languageSelector.addEventListener('change', async (event) => {
    const targetLang = event.target.value; 

    const translatedText = await translateWithLingva(quote.textContent, targetLang);
    if (translatedText) {
        quote.textContent = translatedText;
    }
});
