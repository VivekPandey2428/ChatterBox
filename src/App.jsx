
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomeScreen from './screens/HomeScreen'
import ChatScreen from './screens/ChatScreen'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/chat" element={<ChatScreen />} />
          <Route path="/chat/:chatId" element={<ChatScreen />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
