import { useState } from 'react';

const Operator = {
  Add: '+',
  Subtract: '-',
  Multiply: '*',
  Divide: '/',
} as const;

type Operator = (typeof Operator)[keyof typeof Operator];

type Expression = {
  isFloat: boolean;
  isOperator: boolean;
  isNumber: boolean;
  value: number | Operator | '.' | undefined;
};

interface CalculatorProps {
  expressionDisplay: string;
  isDisplayClear: boolean;
  result?: string;
  values: Array<Expression>;
}

function setInitialState(): CalculatorProps {
  return {
    expressionDisplay: '',
    isDisplayClear: true,
    result: undefined,
    values: [],
  };
}

export function Calculator() {
  const [expression, setExpression] = useState<CalculatorProps>(
    setInitialState()
  );

  function isPreviousValueAnOperator(): boolean {
    if (expression.values.length === 0) {
      return false;
    }

    const lastIndex = expression.values.length - 1;
    if (expression.values[lastIndex].isOperator) {
      return true;
    }

    return false;
  }

  function isSameOperatorAsPrevious(operator: string): boolean {
    if (expression.values.length === 0) {
      return false;
    }

    const lastIndex = expression.values.length - 1;
    if (expression.values[lastIndex].value === operator) {
      return true;
    }

    return false;
  }

  function isPreviousValueNumeric(): boolean {
    if (expression.values.length === 0) {
      return false;
    }

    const lastIndex = expression.values.length - 1;
    if (expression.values[lastIndex].isNumber) {
      return true;
    }

    return false;
  }

  function isValidDecimalInput(): boolean {
    // Need to check if the last character is a number (i.e., not already set to a float) or a decimal point.
    if (expression.values.length === 0 || isPreviousValueNumeric()) {
      return true;
    }

    return false;
  }

  function isFirstCharacter(): boolean {
    return expression.values.length === 0;
  }

  function onButtonClick(e: React.MouseEvent<HTMLButtonElement>): void {
    const value = e.currentTarget.value;

    if (!isNaN(Number(value))) {
      if (expression.isDisplayClear) {
        setExpression({
          ...setInitialState(),
          expressionDisplay: value,
          isDisplayClear: false,
          values: [
            {
              isFloat: false,
              isNumber: true,
              isOperator: false,
              value: Number(value),
            },
          ],
        });
      } else {
        setExpression({
          ...expression,
          expressionDisplay: expression.expressionDisplay + value,
          values: [
            ...expression.values,
            {
              isFloat: false,
              isNumber: true,
              isOperator: false,
              value: Number(value),
            },
          ],
        });
      }
    } else {
      if (isFirstCharacter()) {
        return;
      }

      if (isSameOperatorAsPrevious(value)) {
        return;
      }

      switch (value) {
        case 'clear':
          setExpression(setInitialState());
          break;
        case 'backspace':
          if (expression.values.length === 0) {
            return;
          }

          if (expression.values.length === 1) {
            setExpression({
              ...setInitialState(),
              isDisplayClear: false,
            });

            return;
          }

          setExpression({
            ...expression,
            expressionDisplay: expression.expressionDisplay.slice(0, -1),
            values: expression.values.slice(0, -1),
          });
          break;
        case Operator.Divide:
          if (isPreviousValueAnOperator()) {
            setExpression({
              ...expression,
              expressionDisplay:
                expression.expressionDisplay.slice(0, -1) + Operator.Divide,
              values: expression.values.slice(0, -1).concat({
                isFloat: false,
                isOperator: true,
                isNumber: false,
                value: Operator.Divide,
              }),
            });
          } else {
            setExpression({
              ...expression,
              expressionDisplay: expression.expressionDisplay + Operator.Divide,
              values: [
                ...expression.values,
                {
                  isFloat: false,
                  isOperator: true,
                  isNumber: false,
                  value: Operator.Divide,
                },
              ],
            });
          }
          break;
        case Operator.Multiply:
          if (isPreviousValueAnOperator()) {
            setExpression({
              ...expression,
              expressionDisplay:
                expression.expressionDisplay.slice(0, -1) + Operator.Multiply,
              values: expression.values.slice(0, -1).concat({
                isFloat: false,
                isOperator: true,
                isNumber: false,
                value: Operator.Divide,
              }),
            });
          } else {
            setExpression({
              ...expression,
              expressionDisplay:
                expression.expressionDisplay + Operator.Multiply,
              values: [
                ...expression.values,
                {
                  isFloat: false,
                  isOperator: true,
                  isNumber: false,
                  value: Operator.Multiply,
                },
              ],
            });
          }
          break;
        case Operator.Subtract:
          if (isPreviousValueAnOperator()) {
            setExpression({
              ...expression,
              expressionDisplay:
                expression.expressionDisplay.slice(0, -1) + Operator.Subtract,
              values: expression.values.slice(0, -1).concat({
                isFloat: false,
                isOperator: true,
                isNumber: false,
                value: Operator.Divide,
              }),
            });
          } else {
            setExpression({
              ...expression,
              expressionDisplay:
                expression.expressionDisplay + Operator.Subtract,
              values: [
                ...expression.values,
                {
                  isFloat: false,
                  isOperator: true,
                  isNumber: false,
                  value: Operator.Subtract,
                },
              ],
            });
          }
          break;
        case Operator.Add:
          if (isPreviousValueAnOperator()) {
            setExpression({
              ...expression,
              expressionDisplay:
                expression.expressionDisplay.slice(0, -1) + Operator.Add,
              values: expression.values.slice(0, -1).concat({
                isFloat: false,
                isOperator: true,
                isNumber: false,
                value: Operator.Add,
              }),
            });
          } else {
            setExpression({
              ...expression,
              expressionDisplay: expression.expressionDisplay + Operator.Add,
              values: [
                ...expression.values,
                {
                  isFloat: false,
                  isOperator: true,
                  isNumber: false,
                  value: Operator.Add,
                },
              ],
            });
          }
          break;
        case '.':
          if (isValidDecimalInput()) {
            if (isFirstCharacter()) {
              setExpression({
                ...expression,
                expressionDisplay: `${value}0`,
                values: [
                  {
                    isFloat: true,
                    isOperator: false,
                    isNumber: false,
                    value: parseFloat(`${value}0`),
                  },
                ],
              });
            } else {
              setExpression({
                ...expression,
                expressionDisplay: expression.expressionDisplay + value,
                values: [
                  ...expression.values,
                  {
                    isFloat: true,
                    isOperator: false,
                    isNumber: false,
                    value: value,
                  },
                ],
              });
            }
          }
          break;
        default:
          console.log(`${value} not supported.`);
      }
    }
  }

  return (
    <div className='calculator'>
      <h1>Calculator</h1>
      <div className='screen'>
        <div className='expression'>0</div>
        <div className='display'>{expression.expressionDisplay ?? '0'}</div>
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
