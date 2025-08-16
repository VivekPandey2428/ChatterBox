# Chatterbox Architecture

## Folder Structure

```
src/
├── screens/           # Main application screens
│   ├── HomeScreen.jsx
│   ├── HomeScreen.css
│   ├── ChatScreen.jsx
│   └── ChatScreen.css
├── utils/             # Utility functions
│   ├── chatStorage.js
│   └── syntaxHighlight.js
├── assets/            # Static assets
├── App.jsx            # Main app component with routing
├── App.css            # Global styles
├── main.jsx           # Entry point
└── index.css          # Base styles
```

## Key Features

### Code Splitting
- Implemented lazy loading for all screen components
- Uses React's `Suspense` for loading states
- Improves initial bundle size and performance

### Automation Cards
- Pre-defined conversation starters with responses
- Creates new chats with both user question and bot response
- Educational content focused on biology topics

### Chat Management
- Local storage-based chat persistence
- Recent chats tracking
- Automatic chat title generation

## Architecture Benefits

1. **Better Organization**: Screens are now in a dedicated folder
2. **Scalability**: Easy to add new screens and features
3. **Performance**: Code splitting reduces initial load time
4. **Maintainability**: Clear separation of concerns
5. **User Experience**: Automation cards provide instant value
