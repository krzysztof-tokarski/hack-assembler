import fs from 'node:fs';

export class Parser {
	public static getFileText(filePath: string) {
		return this._readFile(filePath)
			.toString()
			.split('\n')
			.filter((line) => this._dispensableLine.test(line) === false)
			.map((line) => line.replaceAll('\r', ''));
	}

	private static _readFile(filePath: string) {
		return fs.readFileSync(filePath);
	}

	/**
	 * Catch at start: "\r", "//"", or ""
	 */
	private static _dispensableLine = new RegExp('^(?:\\r|//|$)');
}
