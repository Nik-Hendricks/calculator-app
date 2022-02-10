import {View} from '/views/View.js';

class SettingsView extends View{
    constructor(){
        super();
    }

    connectedCallback(){
        this.classList.add('view')
        this.innerHTML =    `<color-picker></color-picker>
                            </br>
                            <list-item icon="info" text="Add function"></list-item>`


        window.DP.dispatch("VIEW_LOAD")
    }

}

window.customElements.define('settings-view', SettingsView);
export{SettingsView};