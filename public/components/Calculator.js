import {Component} from '/components/Component.js';

String.prototype.insert = function(index, string) {
  if (index > 0) {
    return this.substring(0, index) + string + this.substr(index);
  }
  return string + this;
};

String.prototype.replaceBetween = function(start, end, what) {
  return this.substring(0, start) + what + this.substring(end);
};

class Calculator extends Component{
    constructor(){
        super();
    }

    connectedCallback(){
        this.functions = {
            'resin':{
                equation:'',
            }
        }

        this.buttons = {
            "_AC":{
                onclick: () => {
                    this.calculator_output.value = ''
                }
            },
            "_rad":{
                onclick: (e) => {
                    this.calc_mode_toggle(e);
                    

                }
            },
            "_%":{
                onclick: () => {
                    this.calculator_output.value += ' % '
                }
            },
            "_/":{
                onclick: () => {
                    this.calculator_output.value += ' / '
                }
            },
            "_7":{
                onclick: () => {
                    this.calculator_output.value += '7'
                }
            },
            "_8":{
                onclick: () => {
                    this.calculator_output.value += '8'
                }
            },
            "_9":{
                onclick: () => {
                    this.calculator_output.value += '9'
                }
            },
            "_*":{
                onclick: () => {
                    this.calculator_output.value += ' * '
                }
            },
            "_4":{
                onclick: () => {
                    this.calculator_output.value += '4'
                }
            },
            "_5":{
                onclick: () => {
                    this.calculator_output.value += '5'
                }
            },
            "_6":{
                onclick: () => {
                    this.calculator_output.value += '6'     
                }
            },   
            "_-":{
                onclick: () => {
                    this.calculator_output.value += ' - '
                }
            },
            "_1":{
                onclick: () => {
                    this.calculator_output.value += '1'
                }
            },
            "_2":{
                onclick: () => {
                    this.calculator_output.value += '2'
                }
            },
            "_3":{
                onclick: () => {
                    this.calculator_output.value += '3'
                }
            },
            "_+":{
                onclick: () => {
                    this.calculator_output.value += ' + '
                }
            },
            "_0":{
                onclick: () => {
                    this.calculator_output.value += '0'
                }
            },
            "_.":{
                onclick: () => {
                    this.calculator_output.value += '.'
                }
            },
            "_=":{
                onclick: () => {
                    var eval_string = this.calculator_output.value.toLowerCase();
                    var result = eval_string.replace(/resin\((\d+\.?\d*)\)/g, (_, x) => parseInt(392.9 * parseFloat(x)))
                        
                    var each_resin = eval_string.match(/(?<=resin\()(.*?)(?=\))/g)
                    console.log(each_resin)
                    var each_resin_result = []
                    for(var i = 0; i < each_resin.length; i++){
                        console.log(each_resin[i])
                        window.API2.evaluate(each_resin[i]).then(res => {
                            each_resin_result.push(res.result * 392.9)
                        })                    
                    }

                    setTimeout(() => {
                        console.log(each_resin_result)
                    }, 500)

                    

                    

                    if(this.calc_mode == 'deg'){   
                        console.log(`Pre Parse: ${result}`)
                        //result = result.replace(/(\d)(?!.*\\)(?!.*\d)/, x => `${x}deg`) // gets last ocurance regardless
                        //result = result.replace(/\d+(?:\.\d+)?/g, x => `${x}deg`)
                        //result = result.replace(/\)/g,'deg)')
                        //result = result.replace(/([\d\.]+)(\))/g,'$1deg)')
                        //result = result.replace(/([\d\.]+)(\))/g,'$1deg)')
                        //result = result.replace(/([\d\.]+)(?!.\d)/g, '($1deg)')
                        //result = result.replace(/([\d\.]+)(?!.d)/g, '($1deg)')
                        
                        result = result.replace(/(?<![.\d])(?<number>\d*(?:\.\d+)?)\s*\)/g,(match, number) => 
                            `${ number }deg)`
                        )
                        console.log(`Parse 1 result: ${result}`)
        
                    }
                    console.log(`Parsed result: ${result}`) 
                    window.API2.evaluate(result).then(res => {
                        if(res.result){
                            this.calculator_history.innerHTML += `<div class="history-item"><p class="primary">${eval_string}</p><p class="secondary">${res.result}</p><p class="calculator-mode">${this.calc_mode}</p></div><hr>`
                            localStorage.setItem(eval_string, [res.result, this.calc_mode])
                        }
                        if(res.error){
                            this.calculator_error.innerHTML += `<p>${res.error}</p>`
                            this.calculator_error.classList.add('opened')
                            setTimeout(() => {
                                this.calculator_error.classList.remove('opened')
                                this.calculator_error.innerHTML = ''
                            }, 2500);
                        }

                    })
                },
                class:'double',
            }
        }

        this.calc_mode = 'rad'


        this.innerHTML = `  <div id="calculator-error" class="calculator-error"></div>
                            <input id="calculator-output" class="calculator-output" type="text"/>
                            <div id="calculator" class="calculator">

                            </div>
                            <div id="calculator-history" class="calculator-history">
                            </div>
                            `

        this.calculator = document.getElementById('calculator')
        this.calculator_output = document.getElementById('calculator-output');
        this.calculator_history = document.getElementById('calculator-history');
        this.calculator_error = document.getElementById('calculator-error')

        for(var key in this.buttons){
            var btn = document.createElement('div');
            btn.classList.add('calculator-btn')
            if(this.buttons[key].class){
                btn.classList.add(this.buttons[key].class)
            }
            btn.onclick = this.buttons[key].onclick
            btn.innerHTML = `<p>${key.slice(1)}</p>`
            this.calculator.appendChild(btn)
        }
    }

    calc_mode_toggle(e){
        if(this.calc_mode == "deg"){
            this.calc_mode = "rad"
        }else{
            this.calc_mode = "deg"
        }
        e.path[0].innerHTML = this.calc_mode
    }

    grab_numbers_from_string(string){
        return string.match(/\d+/g)   
    }

    is_numeric(str){
        return /^\d+$/.test(str);
    }

    find_closing_paren(text, openPos) {
        var closePos = openPos;
        var counter = 1;
        while (counter > 0) {
            var c = text[++closePos];
            if (c == '(') {
                counter++;
            }
            else if (c == ')') {
                counter--;
            }
        }
        return closePos;
    }


}
window.customElements.define('custom-calculator', Calculator);
export {Calculator}
