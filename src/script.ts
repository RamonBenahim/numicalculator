const calculadoraElemento = document.getElementById('calculadora') as HTMLInputElement;

const resultadoElemento = document.getElementById('resultado') as HTMLElement;

function evaluate(expression: string): number | null {
  try {
    if(expression.match(/[a-zA-Z&#$<>{}]/g)) throw new Error('Invalid expression');
    return new Function (`return (${expression})`) ()
  } catch {
    return null
  }
}

function roundTheResult(value: number) {
  return Math.round(value * 1000) / 1000
}

function isNumber(value: unknown): value is number {
  if(typeof value === 'number') {
    return !isNaN(value) && isFinite(value)
  }
  return false
}

function calcular() {
  localStorage.setItem('calculadora', calculadoraElemento.value);

  const lines = calculadoraElemento.value.split(/\r?\n/).map(evaluate)

  resultadoElemento.innerHTML = `<div>${lines.map(l => `<div>${isNumber(l) 
    ? roundTheResult(l) 
    : '---'}</div>`)
    .join('')}</div>`

    const total = roundTheResult(lines.filter(isNumber).reduce((a, b) => a + b, 0))

    resultadoElemento.innerHTML += `<div id="total">Total: ${total}</div>`

    document.getElementById('total')?.addEventListener('click', () => {
      navigator.clipboard.writeText(total.toString())
    })
}

    calculadoraElemento.value = localStorage.getItem('calculadora') || '';

    calculadoraElemento.addEventListener('input', calcular)
    calcular()




