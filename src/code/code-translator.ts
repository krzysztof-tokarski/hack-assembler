import {
	ComputationKey,
	DestinationKey,
	JumpKey,
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
		return program.map((line) => this._translateLine(line));
	}

	private static _isAInstruction(line: ProgramLine): line is AInstruction {
		return line.startsWith('@');
	}

	// private static _isCInstruction(line: ProgramLine): line is CInstruction {
	// 	return !this._isAInstruction(line);
	// }

	private static _translateLine(line: ProgramLine): any {
		if (this._isAInstruction(line)) return this._translateAInstruction(line);
		return this._translateCInstruction(line);
	}

	private static _translateAInstruction(line: AInstruction): string {
		return this._getAInstructionBinaryRepresentation(line);
	}

	private static _getAInstructionBinaryRepresentation(value: string): string {
		const memoryAddress = value.slice(1);
		const parsedToNumber = Number(memoryAddress);

		if (isNaN(parsedToNumber)) throw new Error('Method not implemented');

		return parsedToNumber.toString(this._BINARY_RADIX).padStart(16, '0');
	}

	private static _translateCInstruction(line: CInstruction): string {
		const cInstructionStart = '111';

		if (this._isCompleteCInstruction(line)) {
			// const [destination, computation] = this._split<
			// 	[DestinationKey, ComputationKey]
			// >(line, '=');
			// const jumpPart = SymbolTable.jump.null;
			// const destinationPart = SymbolTable.destination[destination];
			// const computationPart = SymbolTable.computation[computation];
			// const AMBit = computationPart.includes('M') ? '1' : '0';
			// return (
			// 	cInstructionStart + AMBit + computationPart + destinationPart + jumpPart
			// );
		}

		if (this._isDest(line)) {
			const [destination, computation] = this._split<
				[DestinationKey, ComputationKey]
			>(line, '=');
			const jumpPart = SymbolTable.jump.null;
			const destinationPart = SymbolTable.destination[destination];
			const computationPart = SymbolTable.computation[computation];
			const AMBit = computationPart.includes('M') ? '1' : '0';

			return (
				cInstructionStart + AMBit + computationPart + destinationPart + jumpPart
			);
		}

		// if (this._isJump(line)) return `111${line.slice(0, -1)}000`;

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
		return this._COMPLETE_C_INSTRUCTION.test(line);
	}

	private static _isDest(line: CInstruction): line is DestInstruction {
		return this._DEST.test(line);
	}

	private static _isJump(line: CInstruction): line is JumpInstruction {
		return this._JUMP.test(line);
	}

	private static _split<T>(line: string, separator: string): T {
		return line.split(separator) as T;
	}
}
