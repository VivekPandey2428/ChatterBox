// Chat Storage Utility for localStorage

const CHAT_STORAGE_KEY = 'chatterbox_chats'
const RECENT_CHATS_KEY = 'chatterbox_recent_chats'

// Generate unique chat ID
export const generateChatId = () => {
  return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Save a new chat
export const saveChat = (chatId, messages, title) => {
  try {
    const existingChats = getChats()
    const newChat = {
      id: chatId,
      title: title || 'New Chat',
      messages: messages,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    existingChats[chatId] = newChat
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(existingChats))
    
    // Update recent chats
    updateRecentChats(chatId, title)
    
    return true
  } catch (error) {
    console.error('Error saving chat:', error)
    return false
  }
}

// Update existing chat
export const updateChat = (chatId, messages) => {
  try {
    const existingChats = getChats()
    if (existingChats[chatId]) {
      existingChats[chatId].messages = messages
      existingChats[chatId].updatedAt = new Date().toISOString()
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(existingChats))
      return true
    }
    return false
  } catch (error) {
    console.error('Error updating chat:', error)
    return false
  }
}

// Get all chats
export const getChats = () => {
  try {
    const chats = localStorage.getItem(CHAT_STORAGE_KEY)
    return chats ? JSON.parse(chats) : {}
  } catch (error) {
    console.error('Error getting chats:', error)
    return {}
  }
}

// Get specific chat by ID
export const getChat = (chatId) => {
  try {
    const chats = getChats()
    return chats[chatId] || null
  } catch (error) {
    console.error('Error getting chat:', error)
    return null
  }
}

// Delete chat
export const deleteChat = (chatId) => {
  try {
    const existingChats = getChats()
    delete existingChats[chatId]
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(existingChats))
    
    // Remove from recent chats
    removeFromRecentChats(chatId)
    
    return true
  } catch (error) {
    console.error('Error deleting chat:', error)
    return false
  }
}

// Get recent chats for display
export const getRecentChats = () => {
  try {
    const recentChats = localStorage.getItem(RECENT_CHATS_KEY)
    return recentChats ? JSON.parse(recentChats) : []
  } catch (error) {
    console.error('Error getting recent chats:', error)
    return []
  }
}

// Update recent chats list
const updateRecentChats = (chatId, title) => {
  try {
    const recentChats = getRecentChats()
    const existingIndex = recentChats.findIndex(chat => chat.id === chatId)
    
    const chatInfo = {
      id: chatId,
      title: title || 'New Chat',
      updatedAt: new Date().toISOString()
    }
    
    if (existingIndex !== -1) {
      // Move to top if exists
      recentChats.splice(existingIndex, 1)
    }
    
    // Add to beginning
    recentChats.unshift(chatInfo)
    
    // Keep only last 10 recent chats
    const limitedChats = recentChats.slice(0, 10)
    
    localStorage.setItem(RECENT_CHATS_KEY, JSON.stringify(limitedChats))
  } catch (error) {
    console.error('Error updating recent chats:', error)
  }
}

// Remove from recent chats
const removeFromRecentChats = (chatId) => {
  try {
    const recentChats = getRecentChats()
    const filteredChats = recentChats.filter(chat => chat.id !== chatId)
    localStorage.setItem(RECENT_CHATS_KEY, JSON.stringify(filteredChats))
  } catch (error) {
    console.error('Error removing from recent chats:', error)
  }
}

// Clear all data
export const clearAllData = () => {
  try {
    localStorage.removeItem(CHAT_STORAGE_KEY)
    localStorage.removeItem(RECENT_CHATS_KEY)
    return true
  } catch (error) {
    console.error('Error clearing data:', error)
    return false
  }
}

// Get chat title from first user message
export const generateChatTitle = (messages) => {
  const firstUserMessage = messages.find(msg => msg.sender === 'user')
  if (firstUserMessage) {
    const text = firstUserMessage.text
    return text.length > 30 ? text.substring(0, 30) + '...' : text
  }
  return 'New Chat'
}

// Initialize sample data for testing
export const initializeSampleData = () => {
  try {
    const existingChats = getChats()
    const existingRecentChats = getRecentChats()
    
    // Only initialize if no data exists
    if (Object.keys(existingChats).length === 0 && existingRecentChats.length === 0) {
      const sampleChats = {
        'sample_1': {
          id: 'sample_1',
          title: 'Explore Animal Behavior',
          messages: [
            {
              id: 1,
              text: 'Tell me about animal behavior',
              sender: 'user',
              timestamp: new Date(Date.now() - 86400000).toISOString()
            },
            {
              id: 2,
              text: 'Animal behavior is fascinating! It includes everything from migration patterns to social interactions. Different species have unique behaviors that help them survive and reproduce.',
              sender: 'bot',
              timestamp: new Date(Date.now() - 86400000 + 1000).toISOString()
            }
          ],
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 86400000).toISOString()
        },
        'sample_2': {
          id: 'sample_2',
          title: 'Analyze Tree Growth?',
          messages: [
            {
              id: 3,
              text: 'How do trees grow?',
              sender: 'user',
              timestamp: new Date(Date.now() - 172800000).toISOString()
            },
            {
              id: 4,
              text: 'Trees grow through a process called photosynthesis, where they convert sunlight into energy. They also absorb water and nutrients through their roots.',
              sender: 'bot',
              timestamp: new Date(Date.now() - 172800000 + 1000).toISOString()
            }
          ],
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          updatedAt: new Date(Date.now() - 172800000).toISOString()
        }
      }
      
      const sampleRecentChats = [
        {
          id: 'sample_1',
          title: 'Explore Animal Behavior',
          updatedAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 'sample_2',
          title: 'Analyze Tree Growth?',
          updatedAt: new Date(Date.now() - 172800000).toISOString()
        }
      ]
      
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(sampleChats))
      localStorage.setItem(RECENT_CHATS_KEY, JSON.stringify(sampleRecentChats))
      
      return true
    }
    return false
  } catch (error) {
    console.error('Error initializing sample data:', error)
    return false
  }
}
