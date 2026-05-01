import Portfolio from './components/Portfolio'
import styles from './components/App.module.css'

function App() {
    return (
        <div className={styles.page}>
            <div className={styles.grain} aria-hidden="true"></div>
            <Portfolio />
        </div>
    )
}

export default App
