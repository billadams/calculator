import { useState } from 'react';

const Operator = {
  Add: '+',
  Subtract: '-',
  Multiply: '*',
  Divide: '/',
  Equal: '=',
  Clear: 'clear',
  Decimal: '.',
} as const;

// Max numbers the screen can display: ?
// Display all numbers and operators until equal sign is pressed.
// Replace expression with result when equal sign is pressed.
// Add a button to clear the screen.
// Store the expression in a variable. Display the expression above the result.
// Disply expression above the result using a smaller font.
// Add a button to switch between dark mode and light mode.
// Add a button to delete the last character.
// Add a button to add a negative sign.
// Add a button to add a percentage sign.
// Add a button to add a square root sign.
// Add a button to add a power sign.
// Add a button to add a factorial sign.
// Add a button to add a logarithm sign.
// Add a button to add a sine sign.
// Add a button to add a cosine sign.
// Add a button to add a tangent sign.
// Add a button to add a square sign.
// Add a button to add a cube sign.
// Web Dev Extraordinaire.
// Number and operator keyboard presses should work with the calculator.
export function Calculator() {
  const [expression, setExpression] = useState<string>('0');
  const [isClear, setIsClear] = useState<boolean>(true);
  // const [result, setResult] = useState<string>('0');
  // const [operator, setOperator] = useState<string | null>(null);

  function onButtonClick(e: React.MouseEvent<HTMLButtonElement>): void {
    const value = e.currentTarget.value;

    if (!isNaN(Number(value))) {
      if (isClear) {
        setExpression(value);
        setIsClear(false);
      } else {
        setExpression((prev) => prev + value);
      }
    } else {
      if (value === Operator.Clear) {
        setExpression('0');
        setIsClear(true);
      }
      if (value === 'backspace') {
        setExpression((prev) => {
          if (prev.length === 1) {
            setIsClear(true);
            return '0';
          }
          return prev.slice(0, -1);
        });
      }
    }
  }

  return (
    <div className='calculator'>
      <h1>Calculator</h1>
      <div className='screen'>
        <div className='expression'>0</div>
        <div className='display'>{expression}</div>
      </div>
      <div className='keys'>
        <button
          type='button'
          name='clear'
          value='clear'
          className='clear'
          onClick={(e) => {
            onButtonClick(e);
          }}
        >
          AC
        </button>
        <button
          type='button'
          name='backspace'
          value='backspace'
          onClick={(e) => {
            onButtonClick(e);
          }}
        >
          <span className='backspace'>&#9003;</span>
        </button>
        <button
          type='button'
          name='divide'
          value={Operator.Divide}
          className='divide'
        >
          {Operator.Divide}
        </button>
        <button
          type='button'
          name='seven'
          value={7}
          onClick={(e) => {
            onButtonClick(e);
          }}
        >
          7
        </button>
        <button
          type='button'
          name='eight'
          value={8}
          onClick={(e) => {
            onButtonClick(e);
          }}
        >
          8
        </button>
        <button
          type='button'
          name='nine'
          value={9}
          onClick={(e) => {
            onButtonClick(e);
          }}
        >
          9
        </button>
        <button type='button' name='multiply' value={Operator.Multiply}>
          {Operator.Multiply}
        </button>
        <button
          type='button'
          name='four'
          value={4}
          onClick={(e) => {
            onButtonClick(e);
          }}
        >
          4
        </button>
        <button
          type='button'
          name='five'
          value={5}
          onClick={(e) => {
            onButtonClick(e);
          }}
        >
          5
        </button>
        <button
          type='button'
          name='six'
          value={6}
          onClick={(e) => {
            onButtonClick(e);
          }}
        >
          6
        </button>
        <button type='button' name='subtract' value={Operator.Subtract}>
          {Operator.Subtract}
        </button>
        <button
          type='button'
          name='one'
          value={1}
          onClick={(e) => {
            onButtonClick(e);
          }}
        >
          1
        </button>
        <button
          type='button'
          name='two'
          value={2}
          onClick={(e) => {
            onButtonClick(e);
          }}
        >
          2
        </button>
        <button
          type='button'
          name='3'
          value={3}
          onClick={(e) => {
            onButtonClick(e);
          }}
        >
          3
        </button>
        <button type='button' name='four' value={Operator.Add}>
          {Operator.Add}
        </button>
        <button
          type='button'
          name='zero'
          value={0}
          className='zero'
          onClick={(e) => {
            onButtonClick(e);
          }}
        >
          0
        </button>
        <button type='button' name='decimal' value={Operator.Decimal}>
          {Operator.Decimal}
        </button>
        <button type='button' name='equal' value={Operator.Equal}>
          {Operator.Equal}
        </button>
      </div>
    </div>
  );
}
