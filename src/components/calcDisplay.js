import React, { useState, useContext } from "react";
import { ThemeContext } from "../contexts/themeContexts";
import useToggleState from "../hooks/useToggleState";
const CalcDisplay = () => {
    const { theme } = useContext(ThemeContext);
    const [result,changeResult] = useState(0);
    const [evaluationStack,updateStack] = useState([])
    const [toggleState,toggle] = useToggleState(false);
    const [signState,handleSciState] = useToggleState(true);
    const handleCellClick = (e) => {
        e.stopPropagation();
        computeCalcValue(e.target.dataset.cell)
    }
    const getCalcVal = (operand, prevRslt, currVal) => {
        let result;
        switch (operand) {
            case 'add':
                result = Number(prevRslt) + Number(currVal);
                break;
            case 'sub':
                result = Number(prevRslt) - Number(currVal);
                break;
            case 'mul':
                result = Number(prevRslt) * Number(currVal);
                break;
            case 'div':
                result = Number(prevRslt) / Number(currVal);
                break;
            default :
                break;
        }

        return result;
    }
    const computeCalcValue = (value) => {
        let newArr = [...evaluationStack];

        if(value === 'clear') {
            changeResult(0);
            updateStack([]);
            newArr = [];
        }
        let currVal = Number(value);
        if(newArr.length > 0) {
            let prevVal = newArr[newArr.length - 1];
            let isPrevNum = Number(prevVal);
            if(!isNaN(isPrevNum) && !isNaN(currVal) && typeof isPrevNum === 'number' && typeof currVal === 'number') {
                let popVal = newArr.pop();
                popVal += value;
                newArr.push(popVal);
                changeResult(popVal);

            } else if(!isNaN(currVal) && typeof currVal === 'number') {
                newArr.push(value);
                changeResult(currVal);
            }else if(value === 'equal'){
               if(newArr.length >= 3) {
                   let newResult = getCalcVal(newArr[newArr.length - 2],newArr[newArr.length -3], newArr[newArr.length - 1]);
                   newArr.splice(0,3);
                   newArr.unshift(newResult)
                   changeResult(newResult);
               } else {
                   changeResult(result);
               }
            } else if(isNaN(currVal) && isNaN(prevVal)){
                newArr.pop();
                newArr.push(value);
            }else{
                newArr.push(value);
                let result;
                if(newArr.length > 3) {
                    result = getCalcVal(newArr[newArr.length - 3],newArr[newArr.length -4], newArr[newArr.length - 2]);
                    newArr.splice(0,3)
                    newArr.unshift(result);
                    changeResult(result);
                }
            }
        }else {
            if(!isNaN(currVal) && typeof currVal === 'number') {
                changeResult(currVal);
                newArr.push(currVal);
            }
        }
        updateStack(newArr)

    }
    const sciCalcConditionLogic = (value,stackVal) => {
        let rtnResult;
        if (value === 'sign') {
            handleSciState();
            rtnResult = signState ?  "" + -Math.abs(stackVal) : "" + Math.abs(stackVal);
        } else if (value ==='sqr') {
            rtnResult = signState ? "" + -Math.abs((stackVal * stackVal)) : "" + Math.abs((stackVal * stackVal)) ;
        } else if(value ==='sqrt') {
            rtnResult = signState ? ("" + -Math.sqrt(stackVal)): ("" + Math.sqrt(stackVal));
        }

        return rtnResult;
    }
    const computeScientificCalc = (value) => {
        let newArr = [...evaluationStack];
        let isNumber = Number(newArr[newArr.length - 1] );
        if( (!isNaN(isNumber) && typeof isNumber === 'number')) {
            let popVal = newArr.pop();
            let result = sciCalcConditionLogic(value,popVal);
            newArr.push(result);
            changeResult(result);
        } else {
            let lastNum = newArr[newArr.length - 2];
            let result = sciCalcConditionLogic(value,lastNum);
            newArr[newArr.length - 2] = result;
            changeResult(result)
        }
        updateStack(newArr);
    }
    const handleScientificClick = (e) => {
        const value = e.target.dataset.cell
        computeScientificCalc(value)
    }
    return (
        <div className="container">
            <div className="resultInput">{result}</div>
                <div className="calcGrid" onClick={handleCellClick}>
                    <button className="btnItem btnElement" data-cell="1">1</button>
                    <button className="btnItem btnElement" data-cell="2">2</button>
                    <button className="btnItem btnElement" data-cell="3">3</button>
                    <button className="btnOperator btnElement" style={{ color:`${theme.fontColor}`, backgroundColor:`${theme.btnColor}`}} data-cell="add">ADD(+)</button>
                    <button className="btnItem btnElement" data-cell="4">4</button>
                    <button className="btnItem btnElement" data-cell="5">5</button>
                    <button className="btnItem btnElement" data-cell="6">6</button>
                    <button className="btnOperator btnElement" style={{ color:`${theme.fontColor}`, backgroundColor:`${theme.btnColor}`}} data-cell="sub">SUB(-)</button>
                    <button className="btnItem btnElement" data-cell="7">7</button>
                    <button className="btnItem btnElement" data-cell="8">8</button>
                    <button className="btnItem btnElement" data-cell="9">9</button>
                    <button className="btnOperator btnElement" style={{ color:`${theme.fontColor}`, backgroundColor:`${theme.btnColor}`}} data-cell="mul">MUL(X)</button>
                    <button className="btnOperator btnElement" style={{ color:`${theme.fontColor}`, backgroundColor:`${theme.btnColor}`}} data-cell="clear">clear</button>
                    <button className="btnItem btnElement" data-cell="0">0</button>
                    <button className="btnOperator btnElement" style={{ color:`${theme.fontColor}`, backgroundColor:`${theme.btnColor}`}} data-cell="equal">=</button>
                    <button className="btnOperator btnElement" style={{ color:`${theme.fontColor}`, backgroundColor:`${theme.btnColor}`}} data-cell="div">DIV(/)</button>
                </div>
                <div className="calcGrid">
                    <button className="btnElement" onClick={toggle}>Scientific Mode</button>
                </div>
                { toggleState &&
                    <div className="calcGrid" onClick={handleScientificClick}>
                        <button className="btnElement" data-cell="sign">Sign(+/-)</button>
                        <button className="btnElement" data-cell="sqr">Sqr(X^2)</button>
                        <button className="btnElement" data-cell="sqrt">Sqrt</button>
                    </div>
                }
            </div>
        )

}

export default CalcDisplay