import { describe, expect, it } from '@jest/globals';
import { CodeTranslator } from '../src/code/code-translator';
import {
	expectedParsedAdd,
	expectedParsedMax,
	expectedParsedMaxL,
	expectedParsedRect,
	expectedParsedRectL,
	expectedTranslatedAdd,
	expectedTranslatedMax,
	expectedTranslatedMaxL,
	expectedTranslatedRect,
	expectedTranslatedRectL,
} from './mocks/text-file-parser.mocks';

describe('CodeTranslator', () => {
	describe('translate symbolless program', () => {
		it('translates Add.asm', () => {
			expect(CodeTranslator.translateProgram(expectedParsedAdd)).toStrictEqual(
				expectedTranslatedAdd,
			);
		});

		it('translates MaxL.asm', () => {
			expect(CodeTranslator.translateProgram(expectedParsedMaxL)).toStrictEqual(
				expectedTranslatedMaxL,
			);
		});

		it('translates RectL.asm', () => {
			expect(
				CodeTranslator.translateProgram(expectedParsedRectL),
			).toStrictEqual(expectedTranslatedRectL);
		});
	});

	describe('translate program with symbols', () => {
		it('translates Max.asm', () => {
			expect(CodeTranslator.translateProgram(expectedParsedMax)).toStrictEqual(
				expectedTranslatedMax,
			);
		});

		it('translates Rect.asm', () => {
			expect(CodeTranslator.translateProgram(expectedParsedRect)).toStrictEqual(
				expectedTranslatedRect,
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

		it('translates symbolic AInstructions for predifined symbols', () => {
			const argReturnTuples = [
				(['@R0', '0000000000000000'],
				['@R1', '0000000000000001'],
				['@R2', '0000000000000010'],
				['@SP', '0000000000000000'],
				['@THIS', '0000000000000001'],
				['@SCREEN', '0100000000000000'],
				['@KBD', '0110000000000000']) satisfies [`@${string}`, string],
			].forEach(([input, output]) => expect(translate(input)).toBe(output));
		});

		it('translates symbolic AInstructions for unknown symbols', () => {
			const argReturnTuples = [
				(['@TEST', '0000000000000000'],
				['@HELLO', '0000000000000001']) satisfies [`@${string}`, string],
			].forEach(([input, output]) => expect(translate(input)).toBe(output));
		});
	});
});
