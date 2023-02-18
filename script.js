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