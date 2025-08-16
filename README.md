# Chatterbox AI - Educational Chatbot App

A modern, mobile-first educational chatbot application built with React and Vite. Chatterbox AI helps users generate learning content and HTML/CSS code through conversational interactions.

## 🚀 Features

- **Home Screen**: Greeting with user name, recent chat topics, and start new chat functionality
- **Chat Interface**: Real-time messaging with AI responses
- **Code Generation**: HTML/CSS code blocks with copy functionality
- **Mobile-First Design**: Optimized for mobile screen sizes
- **Mock WebSocket**: Simulated real-time chat experience
- **Responsive UI**: Clean, modern interface with smooth animations

## 🛠️ Tech Stack

- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Routing**: React Router 7.8.1
- **Icons**: Lucide React
- **Styling**: CSS3 with custom design system

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chatterbox
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` (or the URL shown in terminal)

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🎯 Usage

### Home Screen
- View personalized greeting
- Browse recent chat topics (pill-style buttons)
- Click "Start new chat" to begin a conversation

### Chat Interface
- Send messages using the input field
- Press Enter or click the send button
- View AI responses with typing indicators
- Copy generated code using the "Copy Code" button
- Navigate back to home using the back button

### Sample Interactions
- Ask about building landing pages
- Request HTML/CSS code examples
- General educational queries

## 🏗️ Project Structure

```
chatterbox/
├── src/
│   ├── pages/
│   │   ├── HomeScreen.jsx      # Home screen component
│   │   ├── HomeScreen.css      # Home screen styles
│   │   ├── ChatScreen.jsx      # Chat interface component
│   │   └── ChatScreen.css      # Chat screen styles
│   ├── App.jsx                 # Main app component with routing
│   ├── App.css                 # Global styles
│   ├── main.jsx                # App entry point
│   └── index.css               # Base styles
├── public/                     # Static assets
├── package.json                # Dependencies and scripts
└── README.md                   # Project documentation
```

## 🎨 Design System

### Colors
- **Primary**: Purple gradient (#8b5cf6 to #f97316)
- **Background**: Light blue gradient (#f0f9ff to #e0f2fe)
- **User Messages**: Light purple (#e9d5ff)
- **Bot Messages**: White with shadow
- **Code Blocks**: Light gray (#f8f9fa)

### Typography
- **Font Family**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- **Headings**: Bold weights (600-700)
- **Body Text**: Regular weight (400-500)

### Components
- **Buttons**: Rounded corners, hover effects
- **Cards**: Subtle shadows, rounded borders
- **Input Fields**: Focus states, smooth transitions

## 🔧 Technical Implementation

### Mock WebSocket
- Simulated real-time messaging using `setTimeout`
- Typing indicators during response generation
- Configurable response delays (1.5 seconds)

### State Management
- React hooks for local state management
- Message history stored in component state
- Real-time UI updates

### Responsive Design
- Mobile-first approach
- Flexible layouts using CSS Grid and Flexbox
- Touch-friendly interface elements

## 📱 Mobile Optimization

- Optimized for mobile screen sizes (320px - 480px)
- Touch-friendly button sizes (minimum 44px)
- Smooth scrolling and animations
- Proper viewport handling

## 🚫 Exclusions (As Per Requirements)

- No voice input/output support
- No premium/user profile functionality
- No automations section or templates
- No backend API integration
- No authentication system

## 🤝 Assumptions Made

1. **User Experience**:
   - Static user name "Adom" for demonstration
   - Pre-defined recent chat topics
   - Sample history entry

2. **Chat Functionality**:
   - Limited response patterns for demonstration
   - Focus on landing page/code generation queries
   - Simple text-based interactions

3. **Design**:
   - Approximate color matching from screenshots
   - Similar icon alternatives from Lucide React
   - Mobile-first responsive design

4. **Technical**:
   - No persistent data storage
   - Client-side only implementation
   - Mock WebSocket for real-time simulation

## 🐛 Known Limitations

- Messages are not persisted between sessions
- Limited response variety in mock AI
- No actual WebSocket connection
- No file upload functionality (UI only)

## 🔮 Future Enhancements

- Real WebSocket integration
- Persistent message storage
- More diverse AI responses
- File upload functionality
- User authentication
- Premium features
- Voice input/output

## 📄 License

This project is created for educational purposes and demonstration.

## 👨‍💻 Development

### Code Style
- Functional components with hooks
- CSS modules for styling
- Consistent naming conventions
- Clean, readable code structure

### Performance
- Optimized bundle size
- Efficient re-renders
- Smooth animations
- Mobile performance optimization

---

**Note**: This is a front-end demonstration project. All AI responses are pre-defined and simulated for UI/UX purposes.
