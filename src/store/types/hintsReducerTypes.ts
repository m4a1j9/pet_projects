export interface IHintsState {
	loginHint: boolean
	passwordHint: boolean
	nameHint: boolean
	emailHint: boolean
	enterHint: boolean
}

export enum HintsActions {
	SHOW_LOGIN_HINT = 'SHOW_LOGIN_HINT',
	SHOW_PASSWORD_HINT = 'SHOW_PASSWORD_HINT',
	SHOW_NAME_HINT = 'SHOW_NAME_HINT',
	SHOW_EMAIL_HINT = 'SHOW_EMAIL_HINT',
	SHOW_ENTER_HINT = 'SHOW_ENTER_HINT',
}

interface IHintLogin {
	type: HintsActions.SHOW_LOGIN_HINT
	loginHint: boolean
}

interface IHintPassword {
	type: HintsActions.SHOW_PASSWORD_HINT
	passwordHint: boolean
}

interface IHintName {
	type: HintsActions.SHOW_NAME_HINT
	nameHint: boolean
}

interface IHintEmail {
	type: HintsActions.SHOW_EMAIL_HINT
	emailHint: boolean
}

interface IHintEnter {
	type: HintsActions.SHOW_ENTER_HINT
	enterHint: boolean
}

export type HintCaseType =
	| IHintLogin
	| IHintPassword
	| IHintName
	| IHintEmail
	| IHintEnter
