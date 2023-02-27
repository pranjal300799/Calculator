const data=
{
    operandOne:'',
    operandTwo:'',
    sign:'initial'
};
let dotCounter=0;
let flag=true;
let powerbutton='off';
function add(a,b)
{
    let result=a+b;
    return isFloat(result)?result.toFixed(2):result;
}
function subtract(a,b)
{
    let result=a-b;
    return isFloat(result)?result.toFixed(2):result;
}
function multiply(a,b)
{
    let result=a*b;
    return isFloat(result)?result.toFixed(2):result;
}
function divide(a,b)
{
    let result=(a*1.0)/b;
    console.log(result);
    if (isNaN(result)||result===Infinity)
    {
        handleMathError();
        return 'MathError';
    }
    return isFloat(result)?result.toFixed(2):result;
}
function giveRemainder(a,b)
{
    let result =a%b;
    return isFloat(result)?result.toFixed(2):result;
}
const inputscreen=document.querySelector('.screen .input');
const resultscreen=document.querySelector('.screen .result');
function addEvents()
{
    let digits=document.querySelectorAll('.digit');
    digits.forEach(digit=>digit.addEventListener('click',getInput));
    let operators=document.querySelectorAll('.operator')
    operators.forEach(operator=>operator.addEventListener('click',getInput));
    let reset=document.querySelector('.reset');
    reset.addEventListener('click',resetCalculator);
    let del=document.querySelector('.delete');
    del.addEventListener('click',deleteLastEntry);
}
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
        if(data.sign!=='')//prevent input if no operator is present inside data.sign
        {
           inputscreen.textContent+=input;
        }
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
            console.log(data.operandTwo);
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
                    if(isNaN(text.charAt(text.length-1)))
                    {
                       text=text.slice(0,text.length-1)+data.sign;
                    }
                    else
                    {
                        text=text+data.sign;
                    }   
                    resultscreen.textContent=text;
                }
            }
            //if no operato=r inside  data.sign is present
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
function generateResult()
{   let result;
    switch(data.sign)
    {
        case '+':result=add(+data.operandOne,+data.operandTwo);
                 break;       
        case '-':result=subtract(+data.operandOne,+data.operandTwo);
                  break;
        case '*':result=multiply(+data.operandOne,+data.operandTwo);
                  break;
        case '/':result=divide(+data.operandOne,+data.operandTwo);
                  break;
        case '%':result=giveRemainder(+data.operandOne,+data.operandTwo);
                  break;
    }
    return result;
}
function isFloat(num)
{
    if(`${num}`.indexOf('.')!==-1)
    {
        return true;
    }
    else
    {
        return false;
    }
}
function resetCalculator()
{
    location.reload();
}
function handleMathError()
{
    inputscreen.textContent='Resetting...';
    setTimeout(resetCalculator,2000);
}
function switchONOFF()
{   
   if(powerbutton==='off')
   { 
    addEvents();
    button.textContent='ON'
    powerbutton='on';
   }
   else
   {
    powerbutton='off'
    resetCalculator();
   }

}
let button=document.querySelector('.switch');
button.addEventListener('click',switchONOFF);
function deleteLastEntry()
{
    if(inputscreen.textContent!=='')
    {
       let text=inputscreen.textContent;
       text=text.slice(0,(text.length-1));
       inputscreen.textContent=text;
    }
    else
    {
        let text=resultscreen.textContent;
        if(isNaN(text.charAt(text.length-1)))
        {
          text=text.slice(0,(text.length-1));
          data.sign='initial';
        }
        else
        {
            text=text.slice(0,(text.length-1));
            data.operandOne=+text;
        }  
        resultscreen.textContent=text;
        if(text==='')
        {
            data.sign='initial';
            data.operandOne=''
            flag=true;
            return;
        }
    }
}