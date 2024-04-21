import { CodeTranslator } from './code/code-translator';
import { TextFileParser } from './parser/text-file-parser';

const BASE_PATH = 'C:\\repos\\_NAND\\nand2tetris\\projects\\06\\';
const ADD_PATH = 'add\\Add.asm';
const FILE_PATH = BASE_PATH + ADD_PATH;

const fileLines = TextFileParser.getProgramLinesArray(FILE_PATH);
if (fileLines[0] === undefined) throw new Error('File is empty');

const translation = CodeTranslator.translateProgram(fileLines);
TextFileParser.writeToExecutable(translation, 'Add.hack');
