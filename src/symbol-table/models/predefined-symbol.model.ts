import { range } from 'lodash';
import { IntRange } from 'type-fest';

export type GenericRegistersWithMnemonicsNums = IntRange<0, 16>;
export type First16RegistersMnemonics =
	(typeof first16RegistersMnemonics)[number];
export type PredefinedSymbol =
	| 'SP'
	| 'LCL'
	| 'ARG'
	| 'THIS'
	| 'THAT'
	| First16RegistersMnemonics
	| 'SCREEN'
	| 'KBD';

type GenericLabeledRegisterMnemonic = `R${GenericRegistersWithMnemonicsNums}`;
const first16RegistersMnemonics: ReadonlyArray<GenericLabeledRegisterMnemonic> =
	range(0, 16).map((n: number) => `R${n}` as GenericLabeledRegisterMnemonic);
