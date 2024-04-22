import fs from 'node:fs';

type FileText = string & { fromGetFileText: true };

export class TextFileParser {
	public static getProgramLinesArray(filePath: string) {
		const file = TextFileParser._readFile(filePath);
		return TextFileParser._splitAndSanitize(TextFileParser._getFileText(file));
	}

	public static writeToExecutable(program: string[], fileName: string) {
		const executable = program.join('\n');
		fs.writeFileSync(fileName, executable);
	}

	private static _readFile(filePath: string) {
		return fs.readFileSync(filePath);
	}

	private static _getFileText(file: Buffer): FileText {
		return file.toString() as FileText;
	}

	private static _splitAndSanitize(fileText: FileText) {
		return fileText
			.split('\n')
			.filter((line) => TextFileParser._isCodeLine(line))
			.map((line) => line.replaceAll('\r', '').trim());
	}

	private static _isCodeLine(line: string) {
		return !TextFileParser._isDispensableLine(line);
	}

	private static _isDispensableLine(line: string) {
		return TextFileParser._DISPENSABLE_LINE.test(line);
	}

	private static readonly _DISPENSABLE_LINE = new RegExp('^(?:\\r|//|$)');
}
