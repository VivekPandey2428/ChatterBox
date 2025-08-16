import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Zap, User, Leaf, Grid, Clock, MessageSquare, Trash2 } from 'lucide-react'
import { getRecentChats, initializeSampleData, generateChatId, saveChat, getChats, clearAllData } from '../utils/chatStorage'
import './css/HomeScreen.css'

// Constants
const CHAT_COLORS = ['light-green', 'light-orange', 'light-purple', 'light-grey']

// Helper function to create chat messages
const createChatMessages = (title, response) => {
  const userMessage = {
    id: 1,
    text: title,
    sender: 'user',
    timestamp: new Date().toISOString()
  }
  
  const botResponse = {
    id: 2,
    text: response,
    sender: 'bot',
    timestamp: new Date(Date.now() + 1000).toISOString()
  }
  
  return [userMessage, botResponse]
}

// Helper function to handle chat creation and navigation
const createAndNavigateToChat = (title, response, navigate) => {
  const chatId = generateChatId()
  const messages = createChatMessages(title, response)
  saveChat(chatId, messages, title)
  navigate(`/chat/${chatId}`)
}

const HomeScreen = () => {
  const navigate = useNavigate()
  const [recentChats, setRecentChats] = useState([])
  const [allChats, setAllChats] = useState([])

  useEffect(() => {
    initializeSampleData()
    
    const loadChats = () => {
      const recent = getRecentChats()
      const all = Object.values(getChats())
      const sortedAllChats = all.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      
      setRecentChats(recent)
      setAllChats(sortedAllChats)
    }
    
    loadChats()
  }, [])

  const handleStartNewChat = () => navigate('/chat')
  const handleChatClick = (chatId) => navigate(`/chat/${chatId}`)
  const handleGenerateAutomation = (automation) => createAndNavigateToChat(automation.title, automation.response, navigate)
  const handleRecentChatClick = (topic) => createAndNavigateToChat(topic.title, topic.response, navigate)

  const handleClearAllHistory = () => {
    if (window.confirm('Are you sure you want to clear all chat history? This action cannot be undone.')) {
      clearAllData()
      setAllChats([])
      setRecentChats([])
    }
  }

  const getChatColor = (index) => CHAT_COLORS[index % CHAT_COLORS.length]

  // Data arrays
  const automations = [
    {
      id: 1,
      title: "What is photosynthesis?",
      description: "Photosynthesis is the process by which plants convert light energy into chemical energy...",
      response: "Photosynthesis is the process by which plants, algae, and some bacteria convert light energy into chemical energy. During this process, carbon dioxide and water are converted into glucose and oxygen using sunlight as the energy source. This process occurs in the chloroplasts of plant cells, specifically in the thylakoid membranes where chlorophyll captures light energy. The overall equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂. This process is crucial for life on Earth as it produces oxygen and provides the foundation for most food chains.",
      icon: <Leaf size={20} />,
      color: "purple"
    },
    {
      id: 2,
      title: "How do plants use glucose?",
      description: "Plants use glucose for energy through cellular respiration...",
      response: "Plants use glucose in several important ways:\n\n1. **Cellular Respiration**: Glucose is broken down to produce ATP (adenosine triphosphate), which is the energy currency of cells. This process occurs in the mitochondria.\n\n2. **Growth and Development**: Glucose provides the carbon skeletons needed to build other organic molecules like amino acids, lipids, and nucleic acids.\n\n3. **Storage**: Excess glucose is converted into starch for long-term storage in roots, stems, and leaves.\n\n4. **Structural Support**: Glucose is used to make cellulose, the main component of plant cell walls.\n\n5. **Reproduction**: Glucose provides energy for flower and seed production.\n\nPlants can also convert glucose into sucrose for transport through the phloem to other parts of the plant.",
      icon: <Grid size={20} />,
      color: "green"
    },
    {
      id: 3,
      title: "Explain cellular respiration",
      description: "Learn about how cells produce energy through cellular respiration...",
      response: "Cellular respiration is the process by which cells break down glucose and other organic molecules to produce ATP (adenosine triphosphate), the cell's energy currency. This process occurs in three main stages:\n\n**1. Glycolysis** (in cytoplasm):\n- Glucose is broken down into two molecules of pyruvate\n- Produces 2 ATP and 2 NADH\n\n**2. Krebs Cycle** (in mitochondria):\n- Pyruvate is converted to acetyl-CoA\n- Generates 2 ATP, 6 NADH, and 2 FADH₂\n\n**3. Electron Transport Chain** (in mitochondria):\n- Uses NADH and FADH₂ to create a proton gradient\n- Produces 32-34 ATP through oxidative phosphorylation\n\nThe overall equation is: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 36-38 ATP",
      icon: <Zap size={20} />,
      color: "orange"
    },
    {
      id: 4,
      title: "What are enzymes?",
      description: "Discover the role of enzymes in biological reactions...",
      response: "Enzymes are biological catalysts that speed up chemical reactions in living organisms without being consumed in the process. They are typically proteins (though some RNA molecules can also act as enzymes).\n\n**Key characteristics of enzymes:**\n\n1. **Specificity**: Each enzyme catalyzes a specific reaction or group of related reactions\n2. **Reusability**: Enzymes are not consumed in reactions and can be used repeatedly\n3. **Temperature and pH sensitivity**: Enzymes work best at optimal temperature and pH conditions\n4. **Substrate binding**: Enzymes bind to specific substrates at their active sites\n\n**How enzymes work:**\n- Lower the activation energy required for reactions\n- Bring substrates together in the correct orientation\n- Provide an optimal environment for the reaction\n\n**Examples:**\n- Amylase: breaks down starch into sugars\n- Protease: breaks down proteins into amino acids\n- Lipase: breaks down fats into fatty acids and glycerol",
      icon: <Grid size={20} />,
      color: "blue"
    }
  ]

  const recentChatTopics = [
    {
      id: 1,
      title: 'Explore Animal Behavior',
      response: "Animal behavior is a fascinating field of study that examines how animals interact with their environment and each other. Here are some key aspects:\n\n**Types of Animal Behavior:**\n1. **Instinctive Behavior**: Innate behaviors like migration, courtship rituals, and nest building\n2. **Learned Behavior**: Behaviors acquired through experience and observation\n3. **Social Behavior**: Interactions between members of the same species\n4. **Communication**: Various ways animals signal to each other\n\n**Examples of Animal Behavior:**\n- **Migration**: Birds flying south for winter\n- **Hibernation**: Bears sleeping through cold months\n- **Courtship**: Peacocks displaying their feathers\n- **Parental Care**: Birds feeding their young\n\n**Why Study Animal Behavior?**\nUnderstanding animal behavior helps us learn about evolution, ecology, and even human psychology. It also aids in conservation efforts and animal welfare."
    },
    {
      id: 2,
      title: 'Analyze Tree Growth?',
      response: "Tree growth is a complex process influenced by many factors. Here's what you need to know:\n\n**How Trees Grow:**\n1. **Primary Growth**: Height increase through apical meristems\n2. **Secondary Growth**: Width increase through lateral meristems (cambium)\n3. **Root Growth**: Underground expansion for water and nutrients\n\n**Factors Affecting Tree Growth:**\n- **Sunlight**: Essential for photosynthesis\n- **Water**: Required for nutrient transport and cell expansion\n- **Nutrients**: Nitrogen, phosphorus, potassium, and micronutrients\n- **Temperature**: Affects metabolic processes\n- **Soil Quality**: pH, texture, and organic matter content\n\n**Tree Growth Stages:**\n1. **Seed Germination**: Root and shoot emergence\n2. **Seedling Stage**: Early growth and establishment\n3. **Sapling Stage**: Rapid height growth\n4. **Mature Tree**: Slower growth, focus on reproduction\n5. **Old Age**: Decline in growth rate\n\n**Measuring Tree Growth:**\n- **Height**: Using clinometers or laser rangefinders\n- **Diameter**: Using calipers or diameter tapes\n- **Volume**: Calculated from height and diameter measurements"
    },
    {
      id: 3,
      title: 'Decomposition?',
      response: "Decomposition is the natural process of breaking down organic matter into simpler substances. Here's a comprehensive overview:\n\n**What is Decomposition?**\nDecomposition is the breakdown of dead organic material by decomposers like bacteria, fungi, and invertebrates.\n\n**Stages of Decomposition:**\n1. **Fresh Stage**: Initial breakdown begins immediately after death\n2. **Bloat Stage**: Gases build up, causing swelling\n3. **Active Decay**: Rapid breakdown by bacteria and fungi\n4. **Advanced Decay**: Slower breakdown, mostly by fungi\n5. **Dry Remains**: Final stage with minimal organic matter\n\n**Decomposers:**\n- **Bacteria**: Break down simple organic compounds\n- **Fungi**: Decompose complex materials like cellulose and lignin\n- **Invertebrates**: Earthworms, insects, and other small animals\n- **Scavengers**: Larger animals that consume dead material\n\n**Factors Affecting Decomposition:**\n- **Temperature**: Higher temperatures speed up decomposition\n- **Moisture**: Adequate water is needed for microbial activity\n- **Oxygen**: Aerobic decomposition is faster than anaerobic\n- **pH**: Neutral to slightly acidic conditions are optimal\n- **Nutrient Content**: Materials rich in nitrogen decompose faster\n\n**Importance of Decomposition:**\n- Recycles nutrients back into the ecosystem\n- Maintains soil fertility\n- Breaks down waste materials\n- Supports the food web"
    },
    {
      id: 4,
      title: 'Enzymes',
      response: "Enzymes are biological catalysts that speed up chemical reactions in living organisms. Here's everything you need to know:\n\n**What are Enzymes?**\nEnzymes are proteins (or sometimes RNA) that act as catalysts, lowering the activation energy required for chemical reactions.\n\n**How Enzymes Work:**\n1. **Substrate Binding**: Enzyme binds to specific substrate(s)\n2. **Active Site**: Region where catalysis occurs\n3. **Product Formation**: Substrate is converted to product\n4. **Enzyme Release**: Enzyme is unchanged and can be reused\n\n**Key Characteristics:**\n- **Specificity**: Each enzyme catalyzes specific reactions\n- **Reusability**: Enzymes are not consumed in reactions\n- **Temperature Sensitivity**: Work best at optimal temperatures\n- **pH Sensitivity**: Require specific pH conditions\n\n**Types of Enzymes:**\n- **Hydrolases**: Break bonds by adding water (e.g., amylase, protease)\n- **Oxidoreductases**: Transfer electrons (e.g., dehydrogenase)\n- **Transferases**: Transfer functional groups\n- **Lyases**: Remove groups to form double bonds\n- **Isomerases**: Rearrange molecules\n- **Ligases**: Join molecules using ATP\n\n**Examples of Enzymes:**\n- **Amylase**: Breaks down starch into sugars\n- **Protease**: Breaks down proteins into amino acids\n- **Lipase**: Breaks down fats into fatty acids\n- **DNA Polymerase**: Builds DNA molecules\n\n**Enzyme Regulation:**\n- **Competitive Inhibition**: Inhibitor competes with substrate\n- **Non-competitive Inhibition**: Inhibitor binds elsewhere\n- **Allosteric Regulation**: Binding at regulatory sites\n- **Feedback Inhibition**: Product inhibits enzyme activity"
    },
    {
      id: 5,
      title: 'Identify Birds',
      response: "Bird identification is a rewarding skill that combines observation, knowledge, and practice. Here's how to get started:\n\n**Key Identification Features:**\n1. **Size and Shape**: Overall body size and proportions\n2. **Color and Pattern**: Plumage colors, markings, and patterns\n3. **Bill Shape**: Size, shape, and color of the beak\n4. **Wing Shape**: Length, width, and flight pattern\n5. **Tail Shape**: Length, shape, and markings\n6. **Legs and Feet**: Color, length, and structure\n\n**Identification Methods:**\n- **Visual Observation**: Using binoculars or spotting scopes\n- **Vocalizations**: Learning bird songs and calls\n- **Behavior**: Flight patterns, feeding habits, and social behavior\n- **Habitat**: Preferred environments and geographic range\n- **Season**: Breeding vs. non-breeding plumage\n\n**Common Bird Families:**\n- **Passerines**: Songbirds (sparrows, finches, warblers)\n- **Raptors**: Birds of prey (hawks, eagles, owls)\n- **Waterfowl**: Ducks, geese, and swans\n- **Shorebirds**: Sandpipers, plovers, and related species\n- **Game Birds**: Pheasants, quail, and grouse\n\n**Tools for Bird Identification:**\n- **Field Guides**: Books with illustrations and descriptions\n- **Apps**: Digital guides with photos and sounds\n- **Binoculars**: Essential for detailed observation\n- **Camera**: For documentation and later identification\n\n**Tips for Beginners:**\n- Start with common, distinctive species\n- Learn bird songs and calls\n- Join birding groups or clubs\n- Keep a birding journal\n- Practice regularly in different habitats\n- Use multiple field guides for comparison"
    }
  ]

  return (
    <div className="home-screen">
      {/* Top Header */}
      <div className="top-header">
        <button className="premium-btn">
          <span>Try Premium</span>
          <Zap size={16} />
        </button>
        <div className="user-avatar">
          <User size={24} />
        </div>
      </div>

      {/* Greeting Section */}
      <div className="greeting-section">
        <h1 className="greeting">Hi, Adom!</h1>
        <p className="subheading">Revolutionize Your Learning Path with AI Guidance!</p>
      </div>

      {/* Automations Section */}
      <div className="automations-section">
        <h2 className="section-title">Automations</h2>
        <div className="automations-grid">
          {automations.map((automation) => (
            <div key={automation.id} className={`automation-card ${automation.color}`}>
              <div className="automation-icon">
                {automation.icon}
              </div>
              <h3 className="automation-title">{automation.title}</h3>
              <p className="automation-description">{automation.description}</p>
              <button 
                className="generate-btn"
                onClick={() => handleGenerateAutomation(automation)}
              >
                <span>Generate</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Chat Section */}
      <div className="recent-chat-section">
        <h2 className="section-title">Recent Chat</h2>
        <div className="chat-pills">
          {recentChatTopics.map((topic) => (
            <button 
              key={topic.id} 
              className={`chat-pill ${getChatColor(topic.id - 1)}`}
              onClick={() => handleRecentChatClick(topic)}
            >
              {topic.title}
            </button>
          ))}
        </div>
      </div>

      {/* History Section */}
      <div className="history-section">
        <div className="history-header">
          <h2 className="section-title">History</h2>
          {allChats.length > 0 && (
            <button className="clear-all-btn" onClick={handleClearAllHistory}>
              <Trash2 size={16} />
              Clear All
            </button>
          )}
        </div>
        <div className="history-grid">
          {allChats.length > 0 ? (
            allChats.map((chat) => (
              <div 
                key={chat.id} 
                className="history-card"
                onClick={() => handleChatClick(chat.id)}
              >
                <div className="history-card-header">
                  <div className="history-card-icon">
                    <MessageSquare size={18} />
                  </div>
                  <div className="history-card-time">
                    <Clock size={12} />
                    {new Date(chat.updatedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="history-card-content">
                  <h3 className="history-card-title">{chat.title}</h3>
                  <p className="history-card-preview">
                    {chat.messages && chat.messages.length > 0 
                      ? chat.messages[0].text.substring(0, 60) + '...'
                      : 'No messages yet'
                    }
                  </p>
                </div>
                <div className="history-card-footer">
                  <span className="history-card-messages">
                    {chat.messages ? chat.messages.length : 0} messages
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="history-empty">
              <div className="history-empty-icon">
                <MessageSquare size={24} />
              </div>
              <p className="history-empty-text">No chat history yet</p>
              <p className="history-empty-subtext">Start a new chat to see your history here</p>
            </div>
          )}
        </div>
      </div>

      {/* Start New Chat Button */}
      <div className="bottom-button-container">
        <button className="start-chat-btn" onClick={handleStartNewChat}>
          <span>Start new chat</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  )
}

export default HomeScreen
