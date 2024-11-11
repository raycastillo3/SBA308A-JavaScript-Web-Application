import axios from "axios";

const API_HEADERS = {
    headers: {
        Authorization: `Token token="${process.env.API_KEY}"`,
        'Content-Type': 'application/json'
    }
};
const testURL = "https://76431f32-72ff-43f1-b1dd-777c89dbf976.mock.pstmn.io/getQuotes";
export async function getTags() {
  try {
    const response = await axios.get(testURL);
    // console.log(response.data.quotes);
    const tagsArr = response.data.quotes;
    // console.log(tags);
    const dropdown = document.getElementById('quoteDropdown');
    dropdown.innerHTML = '<option selected>Select a quote</option>';
    tagsArr.forEach(tags => {
    // console.log(tags.tags);
      tags.tags.forEach(tag => {
        // console.log(tag);
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        dropdown.appendChild(option);
      });
    });

    dropdown.addEventListener('change', async (event) => {
      const selectedTag = event.target.value;
      if (selectedTag !== "Select a quote") {
        await displayQuotesByTag(selectedTag);
      }
    });
  } catch (err) {
    console.error('Error fetching tags:', err);
  }
};
async function displayQuotesByTag(tag) {
  try {
    const response = await axios.get(testURL);
    const quotes = shuffleQuote(response.data.quotes, tag);
    
    const toastContainer = document.querySelector('.toast-container');
    toastContainer.innerHTML = '';

    quotes.forEach((quote, index) => {
      const toast = document.createElement('div');
      toast.className = 'toast show';
      toast.role = 'alert';
      toast.setAttribute('aria-live', 'assertive');
      toast.setAttribute('aria-atomic', 'true');

      toast.innerHTML = `
        <div class="toast-header">
          <strong class="me-auto">${quote.author}</strong>
          <small class="text-muted">Quote ${index + 1}</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
          ${quote.body}
        </div>
      `;
      toastContainer.appendChild(toast);
    });
  } catch (err) {
    console.error('Error fetching quotes:', err);
  }
};

function shuffleQuote(arrOfQuotes, theme){
  const quotes = []
  arrOfQuotes.forEach(quote => quote.tags.filter(item => {
    if (item.includes(theme)){
      quotes.push(quote);
    }}))
  // console.log(quotes);
  return quotes;
}
// const API_URL = 'https://favqs.com/api/quotes';

export async function submitQuote (author, quote) {
  try {
    const response = await axios.post(
      testURL,
      {
        quote: {
          author: author,
          body: quote
        }
      },
      {
        headers: {
          Authorization: `Token token="${process.env.API_KEY}"`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.info('Quote added successfully:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error adding quote:', err);
  }
};

export async function getQuote (){
    try {
        const response = await axios.get(testURL)
        let randomIdx = Math.floor(Math.random() * response.data.quotes.length);
        const quote = response.data.quotes[randomIdx]; 
        console.log(quote);
        const randomQuoteToast = document.getElementById("random-quote-toast-container");
        randomQuoteToast.innerHTML = '';
          // console.log(quote);
          // quote.author
          // quote.body
          const toast = document.createElement('div');
          toast.className = 'toast show';
          toast.role = 'alert';
          toast.setAttribute('aria-live', 'assertive');
          toast.setAttribute('aria-atomic', 'true');
      
          toast.innerHTML = `
        <div class="toast-header">
          <strong class="me-auto">${quote.author}</strong>
          <small class="text-muted">Quote ${randomIdx}</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
         ${quote.body}
        </div>
      `;
        randomQuoteToast.appendChild(toast);
    } catch (err) {
        console.error(err);
    }
}