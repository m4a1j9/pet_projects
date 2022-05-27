export enum LocalStorage {
	currentUserColor = 'currentUserColor',
	currentUserName = 'currentUserName',
	currentUserId = 'currentUserId',
	isAuth = 'isAuth',
}

type LSValue = string | number | boolean
export enum LSMode {
	set = 'set',
	get = 'get',
	remove = 'remove',
}

export const LS = (key: LocalStorage, value: LSValue = 0, mode: LSMode = LSMode.get) => {
	if (mode === LSMode.get) {
		switch (key) {
			case LocalStorage.currentUserColor:
				return localStorage[LocalStorage.currentUserColor]

			case LocalStorage.currentUserName:
				return localStorage[LocalStorage.currentUserName]

			case LocalStorage.currentUserId:
				return localStorage[LocalStorage.currentUserId]

			case LocalStorage.isAuth:
				return localStorage[LocalStorage.isAuth]

			default:
				return null
		}
	} else if (mode === LSMode.set) {
		switch (key) {
			case LocalStorage.currentUserColor:
				localStorage.setItem(LocalStorage.currentUserColor, value+'')
				break

			case LocalStorage.currentUserName:
				localStorage.setItem(LocalStorage.currentUserName, value+'')
				break

			case LocalStorage.currentUserId:
				localStorage.setItem(LocalStorage.currentUserId, value+'')
				break

			case LocalStorage.isAuth:
				localStorage.setItem(LocalStorage.isAuth, value+'')
				break

			default:
				return null
		}
	} else if (mode === LSMode.remove) {
		switch (key) {
			case LocalStorage.currentUserColor:
				localStorage.removeItem(LocalStorage.currentUserColor)
				break

			case LocalStorage.currentUserName:
				localStorage.removeItem(LocalStorage.currentUserName)
				break

			case LocalStorage.currentUserId:
				localStorage.removeItem(LocalStorage.currentUserId)
				break

			case LocalStorage.isAuth:
				localStorage.removeItem(LocalStorage.isAuth)
				break

			default:
				return null
		}
	}
}

