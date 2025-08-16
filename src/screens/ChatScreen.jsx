import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, Send, Paperclip, Copy, MoreVertical } from 'lucide-react'
import { 
  generateChatId, 
  saveChat, 
  updateChat, 
  getChat, 
  generateChatTitle 
} from '../utils/chatStorage'
import { getCodeLanguage } from '../utils/syntaxHighlight'
import { CODE_RESPONSES, DEFAULT_RESPONSE } from '../utils/chatResponses'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'
import './css/ChatScreen.css'

const ChatScreen = () => {
  const navigate = useNavigate()
  const { chatId } = useParams()
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentChatId, setCurrentChatId] = useState(null)

  // Highlight code blocks when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        Prism.highlightAll()
      }, 100)
    }
  }, [messages])

  // Load existing chat or create new one
  useEffect(() => {
    if (chatId) {
      const existingChat = getChat(chatId)
      if (existingChat) {
        setMessages(existingChat.messages || [])
        setCurrentChatId(chatId)
      } else {
        navigate('/chat')
      }
    } else {
      const newChatId = generateChatId()
      setCurrentChatId(newChatId)
      setMessages([])
    }
  }, [chatId, navigate])

  // Save chat to localStorage whenever messages change
  useEffect(() => {
    if (currentChatId && messages.length > 0) {
      const title = generateChatTitle(messages)
      if (chatId) {
        updateChat(currentChatId, messages)
      } else {
        saveChat(currentChatId, messages, title)
      }
    }
  }, [messages, currentChatId, chatId])

  // Enhanced code detection and response generation
  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Check for code-related keywords
    const codeKeywords = ['code', 'html', 'css', 'javascript', 'js', 'website', 'page', 'landing', 'build', 'create', 'make']
    const isCodeRequest = codeKeywords.some(keyword => lowerMessage.includes(keyword))
    
    if (isCodeRequest) {
      if (lowerMessage.includes('landing') || lowerMessage.includes('website') || lowerMessage.includes('page')) {
        return CODE_RESPONSES.landing
      } else if (lowerMessage.includes('css') || lowerMessage.includes('style')) {
        return CODE_RESPONSES.css
      } else {
        return CODE_RESPONSES.default
      }
    }
    
    return DEFAULT_RESPONSE
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue)
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        code: botResponse.code
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code)
    // You could add a toast notification here
  }

  return (
    <div className="chat-screen">
      {/* Header */}
      <div className="chat-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ChevronLeft size={24} />
        </button>
        <div className="bot-info">
          <div className="bot-avatar">
            <span>C</span>
          </div>
          <span className="bot-name">Chatterbox AI</span>
        </div>
        <button className="menu-btn">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="messages-container">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.sender === 'bot' && (
              <div className="bot-avatar-small">
                <span>C</span>
              </div>
            )}
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              {message.code && (
                <div className="code-block">
                  <div className="code-header">
                    <span className="code-language">{getCodeLanguage(message.code)}</span>
                    <button 
                      className="copy-btn"
                      onClick={() => copyToClipboard(message.code)}
                    >
                      <Copy size={14} />
                      Copy Code
                    </button>
                  </div>
                  <pre className="code-content">
                    <code className={`language-${getCodeLanguage(message.code)}`}>
                      {message.code}
                    </code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message bot">
            <div className="bot-avatar-small">
              <span>C</span>
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="input-container">
        <button className="attach-btn">
          <Paperclip size={20} />
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Send a message to Chatterbox AI"
          className="message-input"
        />
        <button 
          className="send-btn"
          onClick={handleSendMessage}
          disabled={!inputValue.trim()}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  )
}

export default ChatScreen
