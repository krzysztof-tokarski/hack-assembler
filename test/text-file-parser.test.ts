import { describe, expect, it } from '@jest/globals';
import { TextFileParser } from '../src/parser/text-file-parser';
import {
	expectedParsedAdd,
	expectedParsedMax,
	expectedParsedMaxL,
	expectedParsedRect,
	expectedParsedRectL,
} from './mocks/text-file-parser.mocks';

describe('TextFileParser', () => {
	describe('getProgramLinesArray', () => {
		const BASE_PATH = 'C:\\repos\\_NAND\\nand2tetris\\projects\\06\\';

		it('returns expected results for Add.asm', () => {
			const ADD_PATH = 'add\\Add.asm';

			const fileLines = TextFileParser.getProgramLinesArray(
				BASE_PATH + ADD_PATH,
			);
			expect(fileLines).toStrictEqual(expectedParsedAdd);
		});

		it('returns expected results for Max.asm', () => {
			const MAX_PATH = 'max\\Max.asm';

			const fileLines = TextFileParser.getProgramLinesArray(
				BASE_PATH + MAX_PATH,
			);

			expect(fileLines).toStrictEqual(expectedParsedMax);
		});

		it('returns expected results for MaxL.asm', () => {
			const MAXL_PATH = 'max\\MaxL.asm';

			const fileLines = TextFileParser.getProgramLinesArray(
				BASE_PATH + MAXL_PATH,
			);

			expect(fileLines).toStrictEqual(expectedParsedMaxL);
		});

		it('returns expected results for Rect.asm', () => {
			const RECT_PATH = 'rect\\Rect.asm';

			const fileLines = TextFileParser.getProgramLinesArray(
				BASE_PATH + RECT_PATH,
			);

			expect(fileLines).toStrictEqual(expectedParsedRect);
		});

		it('returns expected results for RectL.asm', () => {
			const RECTL_PATH = 'rect\\RectL.asm';

			const fileLines = TextFileParser.getProgramLinesArray(
				BASE_PATH + RECTL_PATH,
			);

			expect(fileLines).toStrictEqual(expectedParsedRectL);
		});
	});
});

describe('_isCodeLine', () => {
	//@ts-ignore
	const isCodeLine = (line: string) => TextFileParser._isCodeLine(line);

	it('should get a match on invalid strings', () => {
		[
			'',
			'\r',
			'\r test',
			'//',
			'// This file is part of www.nand2tetris.org',
		].forEach((e) => expect(isCodeLine(e)).toBe(false));
	});

	it('should not get a match on valid strings', () => {
		['test \r', 'test //'].forEach((e) => expect(isCodeLine(e)).toBe(true));
	});
});
