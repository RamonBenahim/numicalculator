"use strict";
const calculadoraElemento = document.getElementById('calculadora');
const resultadoElemento = document.getElementById('resultado');
function evaluate(expression) {
    try {
        if (expression.match(/[a-zA-Z&#$<>{}]/g))
            throw new Error('Invalid expression');
        return new Function(`return (${expression})`)();
    }
    catch {
        return null;
    }
}
function roundTheResult(value) {
    return Math.round(value * 1000) / 1000;
}
function isNumber(value) {
    if (typeof value === 'number') {
        return !isNaN(value) && isFinite(value);
    }
    return false;
}
function calcular() {
    //save calculadora value to localStorage
    localStorage.setItem('calculadora', calculadoraElemento.value);
    const lines = calculadoraElemento.value.split(/\r?\n/).map(evaluate);
    resultadoElemento.innerHTML = `<div>${lines.map(l => `<div>${isNumber(l)
        ? roundTheResult(l)
        : '---'}</div>`)
        .join('')}</div>`;
    const total = roundTheResult(lines.filter(isNumber).reduce((a, b) => a + b, 0));
    resultadoElemento.innerHTML += `<div id="total">Total: ${total}</div>`;
    //savel total to clipboard on click
    document.getElementById('total')?.addEventListener('click', () => {
        navigator.clipboard.writeText(total.toString());
    });
}
//load calculadora value from localStorage
calculadoraElemento.value = localStorage.getItem('calculadora') || '';
calculadoraElemento.addEventListener('input', calcular);
calcular();
//# sourceMappingURL=script.js.map