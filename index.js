import * as Toasts from "./Toasts.js";
import { getTags, submitQuote} from "./api.js";

async function initialLoad (){
    Toasts.start();
    await getTags();
}
initialLoad();


const submitQuoteBtn = document.getElementById('submitQuoteBtn')

submitQuoteBtn.addEventListener('click', async () => {
    const author = document.getElementById('authorName').value;
    const quote = document.getElementById('quoteText').value;

    if (author.trim() === '' || quote.trim() === '') {
      alert('Please fill out both fields.');
      return;
    }

    await submitQuote(author, quote);

    document.getElementById('quoteForm').reset();
    const quoteModal = new bootstrap.Modal(document.getElementById('quoteModal'));
    quoteModal.hide();
  });
