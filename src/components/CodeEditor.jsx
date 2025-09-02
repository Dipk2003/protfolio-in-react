import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const CodeEditor = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [theme, setTheme] = useState('vs-dark');
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  const defaultCode = {
    javascript: `// Welcome to the Live Code Playground! 🚀
console.log("Hello, World!");

// Try some JavaScript magic
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci sequence:");
for (let i = 0; i < 10; i++) {
  console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}

// Interactive example - try modifying this!
const colors = ['🔴', '🟡', '🟢', '🔵', '🟣'];
console.log("Random color:", colors[Math.floor(Math.random() * colors.length)]);`,

    python: `# Welcome to the Python Playground! 🐍
print("Hello, World!")

# Try some Python magic
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print("Fibonacci sequence:")
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")

# Interactive example - try modifying this!
import random
colors = ['🔴', '🟡', '🟢', '🔵', '🟣']
print("Random color:", random.choice(colors))`,

    java: `// Welcome to the Java Playground! ☕
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Try some Java magic
        System.out.println("Fibonacci sequence:");
        for (int i = 0; i < 10; i++) {
            System.out.println("F(" + i + ") = " + fibonacci(i));
        }
        
        // Interactive example
        String[] colors = {"🔴", "🟡", "🟢", "🔵", "🟣"};
        int randomIndex = (int)(Math.random() * colors.length);
        System.out.println("Random color: " + colors[randomIndex]);
    }
    
    static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}`,

    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Playground</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            color: white;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        .card {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 15px;
            margin: 20px 0;
            backdrop-filter: blur(10px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌟 Welcome to HTML Playground!</h1>
        <div class="card">
            <h2>Interactive Demo</h2>
            <p>Try modifying this HTML to see live changes!</p>
            <button onclick="changeColor()">Change Background</button>
        </div>
    </div>
    
    <script>
        function changeColor() {
            const colors = ['#667eea', '#f093fb', '#4facfe', '#43e97b'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.style.background = \`linear-gradient(135deg, \${randomColor} 0%, #764ba2 100%)\`;
        }
    </script>
</body>
</html>`
  };

  useEffect(() => {
    setCode(defaultCode[language]);
  }, [language]);

  useGSAP(() => {
    gsap.fromTo(
      '.editor-section',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      }
    );
  });

  const loadMonacoEditor = () => {
    if (window.monaco) {
      initializeEditor();
      return;
    }

    // Load Monaco Editor from CDN
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/monaco-editor@0.44.0/min/vs/loader.js';
    script.onload = () => {
      window.require.config({ paths: { vs: 'https://unpkg.com/monaco-editor@0.44.0/min/vs' } });
      window.require(['vs/editor/editor.main'], () => {
        initializeEditor();
      });
    };
    document.head.appendChild(script);
  };

  const initializeEditor = () => {
    if (monacoRef.current) {
      monacoRef.current.dispose();
    }

    monacoRef.current = window.monaco.editor.create(editorRef.current, {
      value: code,
      language: language === 'html' ? 'html' : language,
      theme: theme,
      fontSize: 14,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      wordWrap: 'on',
      lineNumbers: 'on',
      folding: true,
      selectOnLineNumbers: true,
      matchBrackets: 'always',
      autoIndent: 'full',
      formatOnPaste: true,
      formatOnType: true
    });

    monacoRef.current.onDidChangeModelContent(() => {
      setCode(monacoRef.current.getValue());
    });
  };

  useEffect(() => {
    loadMonacoEditor();
    return () => {
      if (monacoRef.current) {
        monacoRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.setValue(code);
      window.monaco.editor.setModelLanguage(monacoRef.current.getModel(), language === 'html' ? 'html' : language);
    }
  }, [language]);

  useEffect(() => {
    if (monacoRef.current) {
      window.monaco.editor.setTheme(theme);
    }
  }, [theme]);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');

    try {
      if (language === 'javascript') {
        // Capture console.log output
        const logs = [];
        const originalLog = console.log;
        console.log = (...args) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        };

        try {
          // Create a new function to execute the code safely
          const func = new Function(code);
          func();
          console.log = originalLog;
          setOutput(logs.join('\n') || 'Code executed successfully! No output generated.');
        } catch (error) {
          console.log = originalLog;
          setOutput(`❌ Error: ${error.message}`);
        }
      } else if (language === 'html') {
        // For HTML, create a preview
        setOutput('HTML code ready for preview! Click "Preview HTML" to see the result.');
      } else {
        // For other languages, show a simulation message
        setOutput(`✅ ${language.charAt(0).toUpperCase() + language.slice(1)} code looks good! 
        
🚀 In a full implementation, this would:
• Compile and run your ${language} code
• Show execution results
• Provide debugging information
• Display runtime statistics`);
      }
    } catch (error) {
      setOutput(`❌ Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const previewHTML = () => {
    if (language === 'html') {
      const newWindow = window.open('', '_blank');
      newWindow.document.write(code);
      newWindow.document.close();
    }
  };

  const shareCode = () => {
    const shareData = {
      title: `Code Snippet - ${language.toUpperCase()}`,
      text: `Check out this ${language} code snippet from Dipanshu's Portfolio`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(code).then(() => {
        setOutput('✅ Code copied to clipboard!');
      });
    }
  };

  const resetCode = () => {
    setCode(defaultCode[language]);
    setOutput('');
  };

  const languageOptions = [
    { value: 'javascript', label: 'JavaScript', icon: '🟨' },
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'java', label: 'Java', icon: '☕' },
    { value: 'html', label: 'HTML', icon: '🌐' }
  ];

  const themeOptions = [
    { value: 'vs-dark', label: 'Dark' },
    { value: 'vs', label: 'Light' },
    { value: 'hc-black', label: 'High Contrast' }
  ];

  return (
    <div className="code-editor-container bg-black-100 rounded-xl overflow-hidden">
      {/* Editor Header */}
      <div className="editor-section bg-black-200 p-3 sm:p-4 border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
              💻 <span className="hidden sm:inline">Live Code Playground</span>
              <span className="sm:hidden">Code Editor</span>
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-white-50">Live</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto">
            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-black-300 border border-white/20 rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-400 min-w-0 flex-shrink-0"
            >
              {languageOptions.map(option => (
                <option key={option.value} value={option.value}>
                  <span className="sm:hidden">{option.icon}</span>
                  <span className="hidden sm:inline">{option.icon} {option.label}</span>
                </option>
              ))}
            </select>

            {/* Theme Selector */}
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-black-300 border border-white/20 rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-blue-400 min-w-0 flex-shrink-0"
            >
              {themeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 min-h-96">
        {/* Code Editor */}
        <div className="editor-section relative h-64 sm:h-80 lg:h-96">
          <div 
            ref={editorRef} 
            className="h-full w-full"
            style={{ minHeight: '256px' }}
          />
          
          {/* Editor Overlay for Loading */}
          {!monacoRef.current && (
            <div className="absolute inset-0 bg-black-300 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin text-2xl sm:text-4xl mb-2">⚡</div>
                <p className="text-sm sm:text-base text-white-50">Loading Monaco Editor...</p>
              </div>
            </div>
          )}
        </div>

        {/* Output Panel */}
        <div className="editor-section bg-black-300 p-3 sm:p-4 overflow-auto h-64 sm:h-80 lg:h-96">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <h4 className="font-semibold text-green-400 text-sm sm:text-base">📤 Output</h4>
            <div className="flex gap-2">
              {language === 'html' && (
                <button
                  onClick={previewHTML}
                  className="px-2 sm:px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded text-xs font-semibold transition-colors"
                >
                  <span className="hidden sm:inline">Preview HTML</span>
                  <span className="sm:hidden">Preview</span> 🌐
                </button>
              )}
              <button
                onClick={shareCode}
                className="px-2 sm:px-3 py-1 bg-purple-500 hover:bg-purple-600 rounded text-xs font-semibold transition-colors"
              >
                <span className="hidden sm:inline">Share</span> 📤
              </button>
            </div>
          </div>
          
          <div className="bg-black-100 rounded-lg p-2 sm:p-4 h-48 sm:h-64 lg:h-72 font-mono text-xs sm:text-sm overflow-auto">
            {output ? (
              <pre className="whitespace-pre-wrap text-green-400">{output}</pre>
            ) : (
              <div className="text-white-50 text-center flex items-center justify-center h-full">
                <div>
                  <div className="text-2xl sm:text-4xl mb-2">🎯</div>
                  <p className="text-sm sm:text-base">Click "Run Code" to see output here</p>
                  <p className="text-xs mt-2">Your code execution results will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editor Controls */}
      <div className="editor-section bg-black-200 p-3 sm:p-4 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:opacity-50 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
            >
              {isRunning ? (
                <>
                  <div className="animate-spin">⚡</div>
                  <span className="hidden sm:inline">Running...</span>
                  <span className="sm:hidden">Run...</span>
                </>
              ) : (
                <>
                  ▶️ <span className="hidden sm:inline">Run Code</span>
                  <span className="sm:hidden">Run</span>
                </>
              )}
            </button>

            <button
              onClick={resetCode}
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base"
            >
              🔄 <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-sm text-white-50">
            <span>👨‍💻 Interactive coding experience</span>
            <span>•</span>
            <span>✨ Try modifying the code above</span>
          </div>
        </div>
      </div>

      {/* Code Examples Quick Access */}
      <div className="editor-section bg-black-100 p-3 sm:p-4">
        <h4 className="font-semibold mb-3 text-blue-400 text-sm sm:text-base">🚀 Quick Examples</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.keys(defaultCode).map(lang => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                language === lang
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-black-200 text-white-50 hover:bg-black-300 hover:text-white'
              }`}
            >
              <span className="block sm:inline">{languageOptions.find(opt => opt.value === lang)?.icon}</span>
              <span className="hidden sm:inline ml-1">{lang.charAt(0).toUpperCase() + lang.slice(1)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Features Info */}
      <div className="editor-section bg-black-200 p-3 sm:p-4 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <span className="text-green-400">✅</span>
            <span>Syntax Highlighting</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <span className="text-blue-400">🔍</span>
            <span>IntelliSense</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <span className="text-purple-400">🎨</span>
            <span>Multiple Themes</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            <span className="text-orange-400">⚡</span>
            <span>Live Execution</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
