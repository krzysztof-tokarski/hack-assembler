type BinaryDigit = '0' | '1';

/**
 * Origin: https://stackoverflow.com/questions/72922880/typescript-type-to-check-if-the-string-contains-only-specific-characters
 */
type OnlyBinaryValue<T> = T extends ''
	? unknown
	: T extends `${BinaryDigit}${infer Tail}`
		? OnlyBinaryValue<Tail>
		: never;

/**
 * Helper function used to make sure a value is in binary format
 * @todo Currenty compiles with empty string inserted
 */
export const BinaryValue = <T extends string>(
	value: T extends OnlyBinaryValue<T> ? T : OnlyBinaryValue<T>,
) => value;
