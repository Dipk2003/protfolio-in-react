import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Editor from "@monaco-editor/react";

const CodeDemo = ({ title, description, initialCode, language, output }) => {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(output);

  useGSAP(() => {
    gsap.fromTo(
      ".code-demo-card",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    );
  });

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const runCode = () => {
    setIsRunning(true);
    
    // Simulate code execution
    setTimeout(() => {
      setResult("Code executed successfully! ✅");
      setIsRunning(false);
    }, 1000);
  };

  return (
    <div className="code-demo-card card-border rounded-xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-white-50 text-sm">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            language === 'javascript' ? 'bg-yellow-500/20 text-yellow-400' :
            language === 'java' ? 'bg-red-500/20 text-red-400' :
            language === 'python' ? 'bg-blue-500/20 text-blue-400' :
            'bg-gray-500/20 text-gray-400'
          }`}>
            {language.toUpperCase()}
          </span>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold">📝 Code Editor</h4>
            <button
              onClick={runCode}
              disabled={isRunning}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300"
            >
              {isRunning ? "⏳ Running..." : "▶️ Run Code"}
            </button>
          </div>
          
          <div className="border border-gray-600 rounded-lg overflow-hidden">
            <Editor
              height="300px"
              language={language}
              value={code}
              onChange={handleCodeChange}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
        </div>

        {/* Output */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">📤 Output</h4>
          <div className="bg-black-200 border border-gray-600 rounded-lg p-4 h-[300px] overflow-auto">
            <pre className="text-green-400 text-sm font-mono">
              {result}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeDemo;
