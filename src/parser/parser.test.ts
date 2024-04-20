import { describe, expect, it } from '@jest/globals';
import { Parser } from './parser';

describe('Parser', () => {
	describe('Invalid line regex', () => {
		//@ts-ignore
		const regex = Parser._dispensableLine;

		it('should get a match on invalid strings', () => {
			[
				'',
				'\r',
				'\r test',
				'//',
				'// This file is part of www.nand2tetris.org',
			].forEach((e) => expect(regex.test(e)).toBe(true));
		});

		it('should not get a match on valid strings', () => {
			['test \r', 'test //'].forEach((e) => expect(regex.test(e)).toBe(false));
		});
	});
});
