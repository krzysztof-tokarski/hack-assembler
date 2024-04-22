import {
	BinaryValue,
	Instruction,
	JumpCondition,
	MemoryDestination,
	PredefinedSymbol,
	PreTranslationDict,
	TranslationsDict,
} from './models/_index';
import { Computation } from './models/computation.model';

export type ComputationKey = keyof typeof SymbolTable.computation;
export type DestinationKey = keyof typeof SymbolTable.destination;
export type InstructionKey = keyof typeof SymbolTable.instruction;
export type JumpKey = keyof typeof SymbolTable.jump;
export type PreDefinedSymbolKey = keyof typeof SymbolTable.preDefinedSymbol;

export type SymbolTableKey =
	| ComputationKey
	| DestinationKey
	| InstructionKey
	| JumpKey
	| PreDefinedSymbolKey;

export class SymbolTable {
	public static readonly instruction = {
		A: BinaryValue('0'),
		C: BinaryValue('1'),
	} satisfies TranslationsDict<Instruction>;

	/**
	 * @todo DynamicComputation values are repeated
	 */
	public static readonly computation = {
		'0': BinaryValue('101010'),
		'1': BinaryValue('111111'),
		'-1': BinaryValue('111010'),
		D: BinaryValue('001100'),

		A: BinaryValue('110000'),
		M: BinaryValue('110000'),

		'!D': BinaryValue('001111'),

		'!A': BinaryValue('110001'),
		'!M': BinaryValue('110001'),

		'-D': BinaryValue('001111'),

		'-A': BinaryValue('110011'),
		'-M': BinaryValue('110011'),

		'D+1': BinaryValue('011111'),

		'A+1': BinaryValue('110111'),
		'M+1': BinaryValue('110111'),

		'D-1': BinaryValue('001110'),

		'A-1': BinaryValue('110010'),
		'M-1': BinaryValue('110010'),

		'D+A': BinaryValue('000010'),
		'D+M': BinaryValue('000010'),

		'D-A': BinaryValue('010011'),
		'D-M': BinaryValue('010011'),

		'A-D': BinaryValue('000111'),
		'M-D': BinaryValue('000111'),

		'D&A': BinaryValue('000000'),
		'D&M': BinaryValue('000000'),

		'D|A': BinaryValue('010101'),
		'D|M': BinaryValue('010101'),
	} satisfies TranslationsDict<Computation>;

	public static readonly destination = {
		null: BinaryValue('000'),
		M: BinaryValue('001'),
		D: BinaryValue('010'),
		MD: BinaryValue('011'),
		A: BinaryValue('100'),
		AM: BinaryValue('101'),
		AD: BinaryValue('110'),
		AMD: BinaryValue('111'),
	} satisfies TranslationsDict<MemoryDestination>;

	public static readonly jump: TranslationsDict<JumpCondition> = {
		null: BinaryValue('000'),
		JGT: BinaryValue('001'),
		JEQ: BinaryValue('010'),
		JGE: BinaryValue('011'),
		JLT: BinaryValue('100'),
		JNE: BinaryValue('101'),
		JLE: BinaryValue('110'),
		JMP: BinaryValue('111'),
	} satisfies TranslationsDict<JumpCondition>;

	public static readonly preDefinedSymbol: PreTranslationDict<PredefinedSymbol> =
		{
			SP: '0',
			LCL: '1',
			ARG: '2',
			THIS: '3',
			THAT: '4',
			R0: '0',
			R1: '1',
			R2: '2',
			R3: '3',
			R4: '4',
			R5: '5',
			R6: '6',
			R7: '7',
			R8: '8',
			R9: '9',
			R10: '10',
			R11: '11',
			R12: '12',
			R13: '13',
			R14: '14',
			R15: '15',
			SCREEN: '16384',
			KBD: '24576',
		} satisfies PreTranslationDict<PredefinedSymbol>;
}
