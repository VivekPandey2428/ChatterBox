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

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
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

  // Simplified response generation
  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Check for code-related keywords
    const codeKeywords = ['code', 'html', 'css', 'javascript', 'js', 'website', 'page', 'landing', 'build', 'create', 'make']
    const isCodeRequest = codeKeywords.some(keyword => lowerMessage.includes(keyword))
    
    let response
    
    if (isCodeRequest) {
      if (lowerMessage.includes('landing') || lowerMessage.includes('website') || lowerMessage.includes('page')) {
        response = CODE_RESPONSES.landing
      } else if (lowerMessage.includes('css') || lowerMessage.includes('style')) {
        response = CODE_RESPONSES.css
      } else {
        response = CODE_RESPONSES.default
      }
    } else {
      response = DEFAULT_RESPONSE
    }
    
    // Return formatted message object
    return {
      id: Date.now(),
      text: response.text,
      sender: 'bot',
      timestamp: new Date(),
      code: response.code,
      language: response.language || (response.code ? getCodeLanguage(response.code) : null),
      type: response.type || 'markdown',
      metadata: response.metadata || {},
      suggestions: response.suggestions || []
    }
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
      setMessages(prev => [...prev, botResponse])
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
              <div className="message-text">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    // Custom styling for markdown elements
                    p: ({children}) => <p style={{margin: '0 0 8px 0'}}>{children}</p>,
                    h1: ({children}) => <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 8px 0'}}>{children}</h1>,
                    h2: ({children}) => <h2 style={{fontSize: '1.3rem', fontWeight: 'bold', margin: '0 0 8px 0'}}>{children}</h2>,
                    h3: ({children}) => <h3 style={{fontSize: '1.1rem', fontWeight: 'bold', margin: '0 0 8px 0'}}>{children}</h3>,
                    ul: ({children}) => <ul style={{margin: '8px 0', paddingLeft: '20px'}}>{children}</ul>,
                    ol: ({children}) => <ol style={{margin: '8px 0', paddingLeft: '20px'}}>{children}</ol>,
                    li: ({children}) => <li style={{margin: '4px 0'}}>{children}</li>,
                    strong: ({children}) => <strong style={{fontWeight: 'bold'}}>{children}</strong>,
                    em: ({children}) => <em style={{fontStyle: 'italic'}}>{children}</em>,
                    code: ({children, className}) => {
                      // Inline code styling
                      if (!className) {
                        return <code style={{
                          backgroundColor: '#f1f5f9',
                          padding: '2px 4px',
                          borderRadius: '4px',
                          fontSize: '0.9em',
                          fontFamily: 'monospace'
                        }}>{children}</code>
                      }
                      return <code>{children}</code>
                    },
                    pre: ({children}) => <pre>{children}</pre>
                  }}
                >
                  {message.text}
                </ReactMarkdown>
              </div>
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
