import * as bootstrap from "bootstrap";
import { getQuote } from "./api";

async function start(){
  const toastTrigger = document.getElementById('liveToastBtnRandomQuote');
  const toastLiveExample = document.getElementById('liveToast');
  if (toastTrigger){
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastTrigger.addEventListener('click', async () => {
      await getQuote();
      toastBootstrap.show();
    })
  }
 
}

export {start}