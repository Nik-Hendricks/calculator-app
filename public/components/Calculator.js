import {Component} from '/components/Component.js';

String.prototype.insert = function(index, string) {
  if (index > 0) {
    return this.substring(0, index) + string + this.substr(index);
  }
  return string + this;
};

class Calculator extends Component{
    constructor(){
        super();
    }

    connectedCallback(){
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
                    console.log(this.calc_mode)
                    //convert all instances of "resin(x)" to "asin(x)"

   
                    var result = eval_string.split('resin(').join('asin(');
                    console.log(result)
                    if(this.calc_mode == 'deg'){
                
                        //var nums = this.grab_numbers_from_string(result.replace(/\D/g, " "));
                        //var new_nums = [];
                        result = result.replace(/\d+(?:\.\d+)?/g, x => x * 180 / Math.PI)
                        //for(var i = 0; i < nums.length; i++){
                        //    var n = nums[i] * (180/Math.PI)
                        //    new_nums[i] = n
                        //}
                        //console.log(new_nums)
                        //var res;
                        //for(var i = 0; i < nums.length; i++){
                        //    console.log(result.indexOf(nums[i]))
                        //    res = result.replace(result.indexOf(nums[i]), new_nums[i])
                        //}



                        //result = result.split('cos(').join('cos(180/pi * ').split('sin(').join('sin(180/pi * ')
                    }
                  
                    console.log(result)
    
                    window.API2.evaluate(result).then(res => {
                        if(res.result){
                            this.calculator_history.innerHTML += `<div class="history-item"><p class="primary">${eval_string}</p><p class="secondary">${res.result}</p><p class="calculator-mode">${this.calc_mode}</p></div><hr>`
                            localStorage.setItem(eval_string, [res.result, this.calc_mode])
                        }

                    })
                },
                class:'double',
            }
        }

        this.calc_mode = 'rad'


        this.innerHTML = `<input id="calculator-output" class="calculator-output" type="text"/>
                            <div id="calculator" class="calculator">

                            </div>
                            <div id="calculator-history" class="calculator-history">
                            </div>
                            `

        this.calculator = document.getElementById('calculator')
        this.calculator_output = document.getElementById('calculator-output');
        this.calculator_history = document.getElementById('calculator-history');

        for(var key in this.buttons){
            console.log(this.buttons[key].class)
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
        console.log('toggle')
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


}
window.customElements.define('custom-calculator', Calculator);
export {Calculator}
