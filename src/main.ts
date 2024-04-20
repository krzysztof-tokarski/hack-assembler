import { Parser } from './parser/parser';

const BASE_PATH = 'C:\\repos\\_NAND\\nand2tetris\\projects\\06\\';
const ADD_PATH = 'add\\Add.asm';
const FILE_PATH = BASE_PATH + ADD_PATH;

const fileText = Parser.getFileText(FILE_PATH);
console.log(fileText);
