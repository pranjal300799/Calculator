const data=
{
    operandOne:'',
    operandTwo:'',
    sign:''
};
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