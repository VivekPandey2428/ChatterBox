// Simple syntax highlighting for HTML/CSS code

export const highlightHTML = (code) => {
  return code
    // HTML tags
    .replace(/(&lt;\/?)([a-zA-Z][a-zA-Z0-9]*)([^&]*?)(&gt;)/g, 
      '<span class="tag">$1$2$3$4</span>')
    // HTML attributes
    .replace(/([a-zA-Z-]+)=("([^"]*)"|'([^']*)')/g, 
      '<span class="attr">$1</span>=<span class="string">$2</span>')
    // CSS properties
    .replace(/([a-zA-Z-]+):\s*([^;]+);/g, 
      '<span class="attr">$1</span>: <span class="string">$2</span>;')
    // CSS selectors
    .replace(/(\.[a-zA-Z][a-zA-Z0-9-]*)/g, 
      '<span class="selector">$1</span>')
    // Comments
    .replace(/(\/\*.*?\*\/|\/\/.*)/g, 
      '<span class="comment">$1</span>')
}

export const getCodeLanguage = (code) => {
  if (code.includes('<!DOCTYPE html>') || code.includes('<html')) {
    return 'html'
  }
  if (code.includes('/*') || code.includes('{') && code.includes(':')) {
    return 'css'
  }
  if (code.includes('function') || code.includes('const') || code.includes('let')) {
    return 'javascript'
  }
  return 'html'
}
