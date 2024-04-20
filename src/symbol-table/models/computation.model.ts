export type Computation = ConstantComputation | DynamicComputation;

type ConstantComputation = '0' | '1' | '-1' | 'D' | '!D' | '-D' | 'D+1' | 'D-1';

type DynamicComputationArg = 'A' | 'M';
type AdditionOperator = '+';
type SubtractionOperator = '-';
type ArithmeticSymbol = AdditionOperator | SubtractionOperator;
type Prefix = SubtractionOperator | '';
type LogicalOperator = '&' | '|';
type NegationOperator = '!';

type DynamicComputation =
	| `${DynamicComputationArg}${ArithmeticSymbol}1`
	| `${Prefix}${DynamicComputationArg}`
	| `D${ArithmeticSymbol}${DynamicComputationArg}`
	| `${DynamicComputationArg}${SubtractionOperator}D`
	| `D${LogicalOperator}${DynamicComputationArg}`
	| `${NegationOperator}${DynamicComputationArg}`;
