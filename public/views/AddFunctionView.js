import {View} from '/views/View.js';

class AddFunctionView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML =    `<input type="text" placeholder="name"></input>`


        window.DP.dispatch("VIEW_LOAD")
    }

}

window.customElements.define('add-function-view', AddFunctionView);
export{AddFunctionView};