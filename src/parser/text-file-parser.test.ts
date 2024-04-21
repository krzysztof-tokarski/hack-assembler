import { describe, expect, it } from '@jest/globals';
import { TextFileParser } from './text-file-parser';

describe('TextFileParser', () => {
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
});
