import {
	ComputationKey,
	DestinationKey,
	JumpKey,
	PreDefinedSymbolKey,
	SymbolTable,
} from '../symbol-table/symbol-table';

type AInstruction = `@${string}`;
type CompleteCInstruction = `${DestInstruction};${JumpKey}`;
/**
 * @todo possibly this should be reversed and need other fixes
 */
type DestInstruction = `${DestinationKey}=${ComputationKey}`;
type JumpInstruction = `${ComputationKey};${JumpKey}`;
type CInstruction = string;
type ProgramLine = AInstruction | CInstruction;
type Program = ProgramLine[];

export class CodeTranslator {
	private static readonly _BINARY_RADIX = 2;
	private static readonly _COMPLETE_C_INSTRUCTION = new RegExp(/(;.*=)/);
	private static readonly _DEST = new RegExp(/=/);
	private static readonly _JUMP = new RegExp(/;/);

	public static translateProgram(program: Program): string[] {
		return program.map((line) => CodeTranslator._translateLine(line));
	}

	private static _isAInstruction(line: ProgramLine): line is AInstruction {
		return line.startsWith('@');
	}

	// private static _isCInstruction(line: ProgramLine): line is CInstruction {
	// 	return !CodeTranslator._isAInstruction(line);
	// }

	private static _translateLine(line: ProgramLine): any {
		if (CodeTranslator._isAInstruction(line))
			return CodeTranslator._translateAInstruction(line);
		return CodeTranslator._translateCInstruction(line);
	}

	private static _translateAInstruction(line: AInstruction): string {
		return CodeTranslator._getAInstructionBinaryRepresentation(line);
	}

	private static _getAInstructionBinaryRepresentation(value: string): string {
		const memoryAddress = value.slice(1);
		let parsedToNumber: number = Number(memoryAddress);

		if (isNaN(parsedToNumber)) {
			parsedToNumber = Number(
				SymbolTable.preDefinedSymbol[memoryAddress as PreDefinedSymbolKey],
			);
		}

		return parsedToNumber
			.toString(CodeTranslator._BINARY_RADIX)
			.padStart(16, '0');
	}

	private static _translateCInstruction(line: CInstruction): string {
		const cInstructionStart = '111';

		if (CodeTranslator._isCompleteCInstruction(line)) {
			const [destination, computation, jump] = CodeTranslator._split<
				[DestinationKey, ComputationKey, JumpKey]
			>(line, /\=|\;/);
			const jumpPart = SymbolTable.jump[jump];
			const destinationPart = SymbolTable.destination[destination];
			const computationPart = SymbolTable.computation[computation];
			const AMBit = CodeTranslator._getAMBit(computation);

			return (
				cInstructionStart + AMBit + computationPart + destinationPart + jumpPart
			);
		}

		if (CodeTranslator._isDest(line)) {
			const [destination, computation] = CodeTranslator._split<
				[DestinationKey, ComputationKey]
			>(line, '=');

			const jumpPart = SymbolTable.jump.null;
			const destinationPart = SymbolTable.destination[destination];
			const computationPart = SymbolTable.computation[computation];
			const AMBit = computation.includes('M') ? '1' : '0';

			return (
				cInstructionStart + AMBit + computationPart + destinationPart + jumpPart
			);
		}

		if (CodeTranslator._isJump(line)) {
			const [computation, jump] = CodeTranslator._split<
				[ComputationKey, JumpKey]
			>(line, ';');

			const jumpPart = SymbolTable.jump[jump];
			const destinationPart = SymbolTable.destination.null;
			const computationPart = SymbolTable.computation[computation];
			const AMBit = CodeTranslator._getAMBit(computation);

			return (
				cInstructionStart + AMBit + computationPart + destinationPart + jumpPart
			);
		}

		const computationPart = SymbolTable.computation[line as ComputationKey];
		const AMBit = computationPart.includes('M') ? '1' : '0';
		return (
			cInstructionStart +
			AMBit +
			computationPart +
			SymbolTable.destination.null +
			SymbolTable.jump.null
		);
	}

	/**
	 * Either the dest or jump fields may be empty.
	 *
	 * If dest is empty, the "=" is omitted.
	 *
	 * If jump is empty, the ";" is omitted.
	 */
	private static _isCompleteCInstruction(
		line: CInstruction,
	): line is CompleteCInstruction {
		return CodeTranslator._COMPLETE_C_INSTRUCTION.test(line);
	}

	private static _isDest(line: CInstruction): line is DestInstruction {
		return CodeTranslator._DEST.test(line);
	}

	private static _isJump(line: CInstruction): line is JumpInstruction {
		return CodeTranslator._JUMP.test(line);
	}

	private static _getAMBit(computationPart: ComputationKey) {
		return computationPart.includes('M') ? '1' : '0';
	}

	private static _split<T>(line: string, separator: string | RegExp): T {
		return line.split(separator) as T;
	}
}
