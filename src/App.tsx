import React from 'react'
import styles from './styles/App.module.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import './styles/reset.css'
import Init from './components/Init'

function App() {
	Init()
	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	)
}

export default App
