import { describe, expect, it, jest } from '@jest/globals';
import { CodeTranslator } from '../src/code/code-translator';
import { TextFileParser } from '../src/parser/text-file-parser';

describe('CodeTranslator', () => {
	describe('translateProgram', () => {
		const BASE_PATH = 'C:\\repos\\_NAND\\nand2tetris\\projects\\06\\';
		it('translates Add.ASM', () => {
			const ADD_PATH = 'add\\Add.asm';
			const mockTextFileParser = {
				getProgramLinesArray: jest.fn().mockReturnValue([]),
			};

			const fileLines = TextFileParser.getProgramLinesArray(
				BASE_PATH + ADD_PATH,
			);
		});
	});
	describe('_translateAInstruction', () => {
		//@ts-ignore
		const translate = CodeTranslator._translateAInstruction;

		it('translates no-symbol AInstructions', () => {
			const argReturnTuples = [
				(['@0', '0000000000000000'],
				['@1', '0000000000000001'],
				['@2', '0000000000000010'],
				['@3', '000000000000011'],
				['@2137', '0000100001011001']) satisfies [`@${string}`, string],
			].forEach(([input, output]) => expect(translate(input)).toBe(output));
		});

		it('translates symbolic AInstructions', () => {
			const argReturnTuples = [
				(['@R0', '0000000000000000'],
				['@R1', '0000000000000001'],
				['@R2', '0000000000000010'],
				['@SP', '0000000000000000'],
				['@THIS', '0000000000000001'],
				['@SCREEN', '0000000000000010'],
				['@KBD', '0000100001011001']) satisfies [`@${string}`, string],
			].forEach(([input, output]) => expect(translate(input)).toBe(output));
		});
	});
});
