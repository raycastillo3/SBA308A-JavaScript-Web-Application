import * as Toasts from "./Toasts.js";
import axios from "axios";

const btn = document.getElementById("liveToastBtn"); 

function initialLoad (){
    if (btn){
        Toasts.start();
    }
}
initialLoad();
