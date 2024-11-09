import axios from "axios";

const API_HEADERS = {
    headers: {
        Authorization: `Token token="${process.env.API_KEY}"`,
        'Content-Type': 'application/json'
    }
};

export async function getTags() {
  try {
    const response = await axios.get('https://favqs.com/api/quotes', API_HEADERS);
    const tags = response.data.quotes.tags;

    const dropdown = document.getElementById('quoteDropdown');
    dropdown.innerHTML = '<option selected>Select a quote</option>';

    tags.forEach(tag => {
      const option = document.createElement('option');
      option.value = tag;
      option.textContent = tag;
      dropdown.appendChild(option);
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
    const response = await axios.get(`https://favqs.com/api/quotes/`, API_HEADERS);
    const quotes = response.data.quotes.slice(0, 5);

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

const API_URL = 'https://favqs.com/api/quotes';

export async function submitQuote (author, quote) {
  try {
    const response = await axios.post(
      API_URL,
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
    console.log('Quote added successfully:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error adding quote:', err);
  }
};

export async function getQuote (){
    try {
        //commented this because API need to be authenticated by CORS
        // const response = await axios.get(`https://favqs.com/api/quotes/`)
        // let randomIdx = Math.floor(Math.random() * response.data.quotes.length);
        // const quote = response.data.quotes[randomIdx]; 
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
          <strong class="me-auto">Oprah W</strong>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
         “Create the highest, grandest vision possible for your life because you become what you believe.”
        </div>
      `;
        randomQuoteToast.appendChild(toast);
    } catch (err) {
        console.error(err);
    }
}