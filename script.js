const data=
{
    operandOne:'',
    operandTwo:'',
    sign:''
};
let dotCounter=0;
let flag=true;
function add(a,b)
{
    let result=a+b;
    return result;
}
function subtract(a,b)
{
    let result=a-b;
    return result;
}
function multiply(a,b)
{
    let result=a*b;
    return result;
}
function divide(a,b)
{
    let result=(a*1.0)/b;
    return result;
}
function giveRemainder(a,b)
{
    let result =a%b;
    return result;
}
const inputscreen=document.querySelector('.screen .input');
const resultscreen=document.querySelector('.screen .result');
function addEvents()
{
    let digits=document.querySelectorAll('.digit');
    digits.forEach(digit=>digit.addEventListener('click',getInput));
    let operators=document.querySelectorAll('.operator')
    operators.forEach(operator=>operator.addEventListener('click',getInput));
}
addEvents();
function getInput(e)
{  
    let input=e.target.getAttribute('data-key');
    let inputType=processInput(input);
    displayOnScreen(inputType,input);

}
function processInput(input)
{
    if(!isNaN(input)||input==='.')
    {
        return 'number/point';
    }
    else
    {
       return 'operator';
    }
}    
function displayOnScreen(inputType,input)
{
    if(!isNaN(input)||(input==='.'&&dotCounter===0))
    {   
        inputscreen.textContent+=input;
    }
    else
    {  
       generateCalculationSequence(input,flag);
    }
}
function getInputScreenStatus()
{
    return (inputscreen.textContent!=='')?true:false;
}
function generateCalculationSequence(sign)//
{
    if(flag)//only for 1st registering 1st entry of operandone after page load
    {   if(sign!=='='&&getInputScreenStatus())//allows only arthmetic operators to act after operandone input
        {
            //read operand one from screen
            data.operandOne=inputscreen.textContent;
            inputscreen.textContent='';
            resultscreen.textContent=data.operandOne;
            //register the operator sign and store it
            data.sign=sign;
            resultscreen.textContent+=data.sign;
            flag=false;
        }
        else 
        {
            return;
        }
    }
    else//calculation after the second operand has been typed
    {
        if(getInputScreenStatus())
        {
            data.operandTwo=inputscreen.textContent;
            inputscreen.textContent='';
            data.operandOne=generateResult();
            resultscreen.textContent=data.operandOne;
            data.operandTwo='';
            //if sign is not '=' then update the operator
            if(sign!=='=')
            {
               data.sign=sign;
               resultscreen.textContent+=data.sign;
            }
            //if  sign is '=' reintialize data.sign to empty
            else
            {
               data.sign=''
            }
        }
        //if second operand has not been typed yet
        else
        {
            //if there is  existing operator inside data.sign
            if(data.sign!=='')
            {
                //update only if sign is not '='
                if(sign!=='=')
                {
                    data.sign=sign;
                    let text=resultscreen.textContent;
                    text=text.slice(0,text.length-1)+data.sign;
                    resultscreen.textContent=text;
                }
            }
            //if no operator inside  data.sign is present
            else
            {
                if(sign!=='=')
                {
                    data.sign=sign;
                    resultscreen.textContent+=data.sign;
                }
            }
        }
    }
}
