import './App.css'
import Bonjour from "./components/Bonjour.tsx";

function App() {
    return (
        <main className="flex flex-col items-center py-14">
            <div className="w-5/6">
                <h1>Hello, Vite</h1>
                <Bonjour/>
            </div>
        </main>
    )
}

export default App
