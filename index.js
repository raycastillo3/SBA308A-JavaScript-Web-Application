import * as Toasts from "./Toasts.js";
import { getQuote } from "./api.js";


// const btn = document.getElementById("liveToastBtn"); 
// const toastBody = document.getElementById("toastBody");

// async function initialLoad (){
//     if (btn){
//         Toasts.start();
//         let quote = await getQuote();
//         toastBody.innerHTML = quote
//     }
    
// }
// initialLoad();


const submitQuoteBtn = document.getElementById('submitQuoteBtn')

btn.addEventListener('click', async () => {
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
