import Dispatcher from '/js/dispatcher.js';
import API2 from '/js/API2.js'
import ViewManager from '/js/viewManager.js';


//import all components
import {MenuBarBottom} from '/components/MenuBarBottom.js';
import {MenuBarTop} from '/components/MenuBarTop.js';
import {MainContent} from '/components/MainContent.js';
import {LoadingSpinner} from '/components/loadingSpinner.js';
import {SideScroller} from '/components/sidescroller.js';
import {Card} from '/components/Card.js';
import {WideButton} from '/components/widebutton.js';
import {IconButton} from '/components/iconbutton.js';
import {GridContainer} from '/components/GridContainer.js';
import {ImageSlider} from '/components/ImageSlider.js';
import {ListItem} from '/components/ListItem.js';
import {PostCard} from '/components/PostCard.js';
import {ContextMenu} from '/components/ContextMenu.js';
import {CodeFormat} from '/components/CodeFormat.js';
import{ColorPicker} from '/components/ColorPicker.js';
import {MusicPlayer} from '/components/MusicPlayer.js';
import {SliderInput} from '/components/SliderInput.js';
import {Calculator} from '/components/Calculator.js';
//import all views
import {CalculatorView} from '/views/CalculatorView.js';
import {SettingsView} from '/views/SettingsView.js';
import {HistoryView} from '/views/HistoryView.js';
import {AddFunctionView} from '/views/AddFunctionView.js';



window.onload = () => {
    register_service_worker();
    register_views();

    window.DP.on("VIEW_LOAD", () => {
        window.loadingSpinner.hide();
        
    })
    
    window.DP.on('API_LOAD', () => {
        window.VM.get_view_from_url();
        window.loadingSpinner.hide();
        if(getMobileOperatingSystem() == "iOS"){
            if(window.navigator.standalone == true){
                document.body.style.paddingTop = "40px";
                document.getElementsByTagName("main-content")[0].style.top = "100px"
            }
        }
    })

    window.DP.on('NO_AUTH', () => {

    })   


}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

function register_service_worker(){
    console.log('service worker registration')
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/worker').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    }
}



function register_views(){
    var theme_primary_color = '';
    var theme_secondary_color = '';

    var routes = {
        "":{
            title: 'Calculator',
            view:`<calculator-view></calculator-view>`
        },
        "History":{
            title:"History",
            view:`<history-view></history-view>`
        },
        "Settings":{
            title:"Settings",
            view:`<settings-view></settings-view>`,
            subViews:{
                "AddFunction":{
                    title:"Add Function",
                    view:`<add-function-view></add-function-view>`
                }
            }
        },
        "Calculator":{
            title:"Calculator",
            view:`<calculator-view></calculator-view>`
        }
    }
    
    window.VM.register(routes)

    
}


