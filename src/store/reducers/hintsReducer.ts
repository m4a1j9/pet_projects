import {
	HintCaseType,
	HintsActions,
	IHintsState,
} from '../types/hintsReducerTypes'

const defaultState: IHintsState = {
	loginHint: false,
	passwordHint: false,
	nameHint: false,
	emailHint: false,
	enterHint: false,
}

export const hintsReducer = (
	state = defaultState,
	action: HintCaseType,
): IHintsState => {
	switch (action.type) {
		case HintsActions.SHOW_LOGIN_HINT:
			return { ...state, loginHint: action.loginHint }

		case HintsActions.SHOW_PASSWORD_HINT:
			return { ...state, passwordHint: action.passwordHint }

		case HintsActions.SHOW_NAME_HINT:
			return { ...state, nameHint: action.nameHint }

		case HintsActions.SHOW_EMAIL_HINT:
			return { ...state, emailHint: action.emailHint }

		case HintsActions.SHOW_ENTER_HINT:
			return { ...state, enterHint: action.enterHint }

		default:
			return state
	}
}
