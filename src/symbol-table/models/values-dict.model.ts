import { ReadonlyDeep } from 'type-fest';

export type PreTranslationDict<T extends string> = ReadonlyDeep<
	Record<T, string>
>;
export type TranslationsDict<T extends string> = ReadonlyDeep<
	Record<T, string>
>;
