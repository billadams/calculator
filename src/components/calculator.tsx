import { useState } from 'react';

const Operator = {
  Add: '+',
  Subtract: '-',
  Multiply: '*',
  Divide: '/',
} as const;

type Operator = (typeof Operator)[keyof typeof Operator];

// type Expression = number | Operator | '.' | undefined;

type Expression = {
  isFloat: boolean;
  isOperator: boolean;
  isNumber: boolean;
  value: number | Operator | '.' | undefined;
};

interface CalculatorProps {
  clear: boolean;
  expression: Array<Expression>;
  expressionDisplay: string;
  result: string;
}

export function Calculator() {
  const [expression, setExpression] = useState<string>();
  const [isClear, setIsClear] = useState<boolean>(true);
  // const [result, setResult] = useState<string>('0');
  // const [operator, setOperator] = useState<string | null>(null);

  // function isNumericSequence(): boolean {
  //   //
  // }

  function isPreviousValueAnOperator(): boolean {
    const lastChar = expression?.[expression.length - 1];

    return (
      (lastChar && lastChar === Operator.Add) ||
      lastChar === Operator.Subtract ||
      lastChar === Operator.Multiply ||
      lastChar === Operator.Divide
    );
  }

  function isSameOperator(operator: string): boolean {
    const lastChar = expression?.[expression.length - 1];

    return lastChar === operator;
  }

  function isSecondDecimal(value: string): boolean {
    const lastChar = expression?.[expression.length - 1];
    return lastChar === value;
  }

  function isFirstCharacter(): boolean {
    return !expression;
  }

  function isFirstCharacterNumeric(): boolean {
    const firstChar = expression?.[0];
    const isNumber = !isNaN(Number(firstChar));

    return isNumber;
  }

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
      if (isFirstCharacter()) {
        return;
      }

      if (!isFirstCharacterNumeric()) {
        return;
      }

      if (isSameOperator(value) || isPreviousValueAnOperator()) {
        return;
      }

      switch (value) {
        case 'clear':
          setExpression(undefined);
          setIsClear(true);
          break;
        case 'backspace':
          setExpression((prev) => {
            if (prev?.length === 1) {
              setIsClear(true);
              return '0';
            }

            return prev?.slice(0, -1);
          });
          break;
        case Operator.Divide:
          setExpression((prev) => prev + Operator.Divide);
          break;
        case Operator.Multiply:
          setExpression((prev) => prev + Operator.Multiply);
          break;
        case Operator.Subtract:
          setExpression((prev) => prev + Operator.Subtract);
          break;
        case Operator.Add:
          setExpression((prev) => prev + Operator.Add);
          break;
        case '.':
          if (isSecondDecimal(value)) {
            return;
          } else {
            setExpression((prev) => prev + '.');
          }
          break;
        default:
          setExpression(`${value} not supported.`);
      }
    }
  }

  return (
    <div className='calculator'>
      <h1>Calculator</h1>
      <div className='screen'>
        <div className='expression'>0</div>
        <div className='display'>{expression ?? '0'}</div>
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
          onClick={(e) => {
            onButtonClick(e);
          }}
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
        <button
          type='button'
          name='multiply'
          value={Operator.Multiply}
          onClick={(e) => {
            onButtonClick(e);
          }}
        >
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
        <button
          type='button'
          name='subtract'
          value={Operator.Subtract}
          onClick={(e) => {
            onButtonClick(e);
          }}
        >
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
        <button
          type='button'
          name='four'
          value={Operator.Add}
          onClick={(e) => {
            onButtonClick(e);
          }}
        >
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
        <button
          type='button'
          name='decimal'
          value={'.'}
          onClick={(e) => {
            onButtonClick(e);
          }}
        >
          {'.'}
        </button>
        <button
          type='button'
          name='equal'
          value={'equal'}
          onClick={(e) => {
            onButtonClick(e);
          }}
        >
          {'='}
        </button>
      </div>
    </div>
  );
}
