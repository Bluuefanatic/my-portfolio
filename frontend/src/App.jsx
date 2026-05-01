import { useState, useEffect } from 'react'
import Portfolio from './components/Portfolio'
import './App.css'

function App() {
    return (
        <div className="page">
            <div className="grain" aria-hidden="true"></div>
            <Portfolio />
        </div>
    )
}

export default App
