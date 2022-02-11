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
                    var result = eval_string
                    var get_resin = /(resin\()/g , match;
                    var sub_evals = {}

                    while ((match = get_resin.exec(eval_string)) != null) {
                        var actual_index = parseInt(match.index + 5)
                        var sub_eval_string = this.get_bracket_param(eval_string, actual_index);
                        window.API2.evaluate(sub_eval_string).then(res => {
                            var start = actual_index + 1;
                            var end = actual_index + sub_eval_string.length + 1;
                            result = eval_string.replaceBetween(start, end, res.result)
                        })        
                    }

                    //now we update the string
                    setTimeout(() => {
                        console.log(result)

                        result = result.replace(/resin\((\d+\.?\d*)\)/g, (_, x) => parseInt(392.9 * parseFloat(x)))
         
                        console.log(result)
                        
                        if(this.calc_mode == 'deg'){   
                            console.log(`Pre Parse: ${result}`)                      
                            result = result.replace(/(?<![.\d])(?<number>\d*(?:\.\d+)?)\s*\)/g,(match, number) => `${ number }deg)`)
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
                    }, 800)
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

    get_bracket_param(str, pos){
        var closing_pos = this.find_closing_bracket_index(str, pos)
        return(str.substring(pos + 1, closing_pos))
    }

    find_closing_bracket_index(str, pos) {
        if (str[pos] != '(') {
            throw new Error("No '(' at index " + pos);
        }
        let depth = 1;
        for (let i = pos + 1; i < str.length; i++) {
            switch (str[i]) {
            case '(':
                depth++;
                break;
            case ')':
                if (--depth == 0) {
                    return i;
                }
                 break;
            }   
        }
        return -1;    // No matching closing parenthesis
    }


}
window.customElements.define('custom-calculator', Calculator);
export {Calculator}
