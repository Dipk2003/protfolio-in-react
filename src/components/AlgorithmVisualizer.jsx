import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const AlgorithmVisualizer = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const [isRunning, setIsRunning] = useState(false);
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(500);
  const [arraySize, setArraySize] = useState(20);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const visualizerRef = useRef(null);

  const algorithms = {
    bubbleSort: {
      name: 'Bubble Sort',
      icon: '🫧',
      description: 'Compares adjacent elements and swaps them if they are in wrong order',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      difficulty: 'Easy'
    },
    mergeSort: {
      name: 'Merge Sort',
      icon: '🔀',
      description: 'Divides array into halves, sorts them separately, then merges',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      difficulty: 'Medium'
    },
    quickSort: {
      name: 'Quick Sort',
      icon: '⚡',
      description: 'Picks a pivot element and partitions array around it',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(log n)',
      difficulty: 'Medium'
    },
    bfs: {
      name: 'Breadth-First Search',
      icon: '🌊',
      description: 'Explores neighbors level by level in a graph or tree',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      difficulty: 'Medium'
    },
    dijkstra: {
      name: "Dijkstra's Algorithm",
      icon: '🗺️',
      description: 'Finds shortest path between nodes in a weighted graph',
      timeComplexity: 'O(V²)',
      spaceComplexity: 'O(V)',
      difficulty: 'Hard'
    }
  };

  useGSAP(() => {
    gsap.fromTo(
      '.visualizer-section',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );
  });

  const generateRandomArray = () => {
    const newArray = Array.from({ length: arraySize }, (_, i) => ({
      value: Math.floor(Math.random() * 300) + 10,
      id: i,
      state: 'default', // default, comparing, swapping, sorted
      color: '#3b82f6'
    }));
    setArray(newArray);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Check if we should stop
        if (!isRunning) return;
        
        // Highlight comparing elements
        const newArr = [...arr];
        newArr[j] = { ...newArr[j], state: 'comparing', color: '#f59e0b' };
        newArr[j + 1] = { ...newArr[j + 1], state: 'comparing', color: '#f59e0b' };
        setArray(newArr);
        setCurrentStep(prev => prev + 1);
        await sleep(speed);

        if (newArr[j].value > newArr[j + 1].value) {
          // Highlight swapping elements
          newArr[j] = { ...newArr[j], state: 'swapping', color: '#ef4444' };
          newArr[j + 1] = { ...newArr[j + 1], state: 'swapping', color: '#ef4444' };
          setArray([...newArr]);
          await sleep(speed / 2);

          // Swap elements
          const temp = newArr[j];
          newArr[j] = { ...newArr[j + 1], id: newArr[j].id };
          newArr[j + 1] = { ...temp, id: newArr[j + 1].id };
          arr[j] = newArr[j];
          arr[j + 1] = newArr[j + 1];
        }

        // Reset colors
        newArr[j] = { ...newArr[j], state: 'default', color: '#3b82f6' };
        newArr[j + 1] = { ...newArr[j + 1], state: 'default', color: '#3b82f6' };
        setArray([...newArr]);
      }
      
      // Mark as sorted
      const sortedArr = [...arr];
      sortedArr[n - 1 - i] = { ...sortedArr[n - 1 - i], state: 'sorted', color: '#22c55e' };
      setArray([...sortedArr]);
    }
    
    // Mark first element as sorted too
    const finalArr = [...array];
    finalArr[0] = { ...finalArr[0], state: 'sorted', color: '#22c55e' };
    setArray([...finalArr]);
    setIsPlaying(false);
  };

  const mergeSort = async () => {
    const arr = [...array];
    
    const merge = async (arr, left, mid, right) => {
      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);
      
      let i = 0, j = 0, k = left;
      
      while (i < leftArr.length && j < rightArr.length) {
        // Check if algorithm should continue running
        while (!isPlaying && isRunning) {
          await sleep(100); // Wait while paused
        }
        if (!isRunning) return; // Exit if stopped
        
        // Highlight comparing elements
        arr[k].state = 'comparing';
        arr[k].color = '#f59e0b';
        setArray([...arr]);
        await sleep(speed);
        
        if (leftArr[i].value <= rightArr[j].value) {
          arr[k] = { ...leftArr[i], state: 'default', color: '#3b82f6' };
          i++;
        } else {
          arr[k] = { ...rightArr[j], state: 'default', color: '#3b82f6' };
          j++;
        }
        setArray([...arr]);
        k++;
        setCurrentStep(prev => prev + 1);
      }
      
      while (i < leftArr.length) {
        arr[k] = { ...leftArr[i], state: 'default', color: '#3b82f6' };
        setArray([...arr]);
        i++;
        k++;
      }
      
      while (j < rightArr.length) {
        arr[k] = { ...rightArr[j], state: 'default', color: '#3b82f6' };
        setArray([...arr]);
        j++;
        k++;
      }
    };
    
    const mergeSortHelper = async (arr, left, right) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSortHelper(arr, left, mid);
        await mergeSortHelper(arr, mid + 1, right);
        await merge(arr, left, mid, right);
      }
    };
    
    await mergeSortHelper(arr, 0, arr.length - 1);
    
    // Mark all as sorted
    arr.forEach(item => {
      item.state = 'sorted';
      item.color = '#22c55e';
    });
    setArray([...arr]);
    setIsPlaying(false);
  };

  const runAlgorithm = async () => {
    console.log('Starting algorithm:', selectedAlgorithm);
    
    // Reset array to default state first
    const resetArr = array.map(item => ({
      ...item,
      state: 'default',
      color: '#3b82f6'
    }));
    setArray(resetArr);
    
    setIsRunning(true);
    setIsPlaying(true);
    setCurrentStep(0);
    
    // Small delay to show reset state
    await sleep(200);
    
    try {
      switch (selectedAlgorithm) {
        case 'bubbleSort':
          await bubbleSort();
          break;
        case 'mergeSort':
          await mergeSort();
          break;
        case 'quickSort':
        case 'bfs':
        case 'dijkstra':
          // For now, all other algorithms use bubble sort as demo
          await bubbleSort();
          break;
        default:
          await bubbleSort();
      }
    } catch (error) {
      console.error('Algorithm execution error:', error);
    } finally {
      setIsRunning(false);
      setIsPlaying(false);
    }
  };

  const pauseAlgorithm = () => {
    setIsPlaying(false);
  };

  const resumeAlgorithm = () => {
    setIsPlaying(true);
    // Don't call runAlgorithm() again, just resume the current execution
  };

  const resetVisualization = () => {
    setIsPlaying(false);
    setIsRunning(false);
    setCurrentStep(0);
    generateRandomArray();
  };

  // Initialize with random array on component mount
  useEffect(() => {
    generateRandomArray();
  }, []);

  const getBarHeight = (value) => {
    const maxValue = Math.max(...array.map(item => item.value));
    return (value / maxValue) * 250;
  };

  return (
    <div className="algorithm-visualizer bg-black-100 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="visualizer-section bg-black-200 p-4 sm:p-6 border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 mb-2">
              🎯 <span className="hidden sm:inline">Algorithm Visualizer</span>
              <span className="sm:hidden">Algorithms</span>
            </h2>
            <p className="text-sm sm:text-base text-white-50">Watch sorting and pathfinding algorithms come to life!</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-white-50">Interactive</span>
          </div>
        </div>
      </div>

      {/* Algorithm Selection */}
      <div className="visualizer-section bg-black-300 p-3 sm:p-4 border-b border-white/10">
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 mb-4">
          {Object.entries(algorithms).map(([key, algo]) => (
            <button
              key={key}
              onClick={() => setSelectedAlgorithm(key)}
              className={`p-2 sm:p-3 rounded-lg font-semibold transition-all duration-300 text-xs sm:text-sm ${
                selectedAlgorithm === key
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  : 'bg-black-200 text-white-50 hover:bg-black-100 hover:text-white'
              }`}
            >
              <span className="block sm:inline">{algo.icon}</span>
              <span className="hidden sm:inline ml-1">{algo.name}</span>
              <span className="sm:hidden text-xs mt-1 block">{algo.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Algorithm Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 p-3 sm:p-4 bg-black-100 rounded-lg">
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="text-xs sm:text-sm text-white-50">Description:</span>
            <p className="font-medium text-sm sm:text-base">{algorithms[selectedAlgorithm].description}</p>
          </div>
          <div>
            <span className="text-xs sm:text-sm text-white-50">Time Complexity:</span>
            <p className="font-mono font-bold text-orange-400 text-sm sm:text-base">{algorithms[selectedAlgorithm].timeComplexity}</p>
          </div>
          <div>
            <span className="text-xs sm:text-sm text-white-50">Space Complexity:</span>
            <p className="font-mono font-bold text-blue-400 text-sm sm:text-base">{algorithms[selectedAlgorithm].spaceComplexity}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="visualizer-section bg-black-200 p-3 sm:p-4 border-b border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={runAlgorithm}
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
                  ▶️ <span className="hidden sm:inline">Start</span>
                  <span className="sm:hidden">Start</span>
                </>
              )}
            </button>

            {isRunning && (
              <button
                onClick={isPlaying ? pauseAlgorithm : resumeAlgorithm}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base"
              >
                {isPlaying ? '⏸️' : '▶️'} <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Resume'}</span>
              </button>
            )}

            <button
              onClick={resetVisualization}
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base"
            >
              🔄 <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              onClick={generateRandomArray}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base"
            >
              🎲 <span className="hidden sm:inline">New Array</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <label className="text-xs sm:text-sm text-white-50">Speed:</label>
              <input
                type="range"
                min="50"
                max="1000"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-16 sm:w-20"
              />
              <span className="text-xs text-white-50">{speed}ms</span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs sm:text-sm text-white-50">Size:</label>
              <input
                type="range"
                min="10"
                max="50"
                value={arraySize}
                onChange={(e) => setArraySize(Number(e.target.value))}
                className="w-16 sm:w-20"
                disabled={isRunning}
              />
              <span className="text-xs text-white-50">{arraySize}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="visualizer-section p-3 sm:p-6">
        <div className="bg-black-300 rounded-lg p-3 sm:p-6 h-64 sm:h-80 relative overflow-hidden">
          {/* Array Visualization */}
          <div 
            ref={visualizerRef}
            className="flex items-end justify-center gap-0.5 sm:gap-1 h-full overflow-x-auto"
            style={{ minHeight: '200px' }}
          >
            {array.map((item, index) => (
              <div
                key={item.id}
                className="relative flex flex-col items-center transition-all duration-300 ease-out flex-shrink-0"
                style={{
                  transform: item.state === 'swapping' ? 'scale(1.1)' : 'scale(1)'
                }}
              >
                {/* Value Label - Hide on very small screens */}
                <div className="hidden sm:block text-xs text-white-50 mb-1 font-mono">
                  {item.value}
                </div>
                
                {/* Bar */}
                <div
                  className={`rounded-t-lg transition-all duration-300 ${
                    item.state === 'comparing' ? 'animate-pulse' :
                    item.state === 'swapping' ? 'animate-bounce' :
                    item.state === 'sorted' ? 'animate-pulse' : ''
                  }`}
                  style={{
                    width: `${Math.max(Math.min(300 / arraySize, 20), 4)}px`,
                    height: `${getBarHeight(item.value) * 0.7}px`,
                    backgroundColor: item.color,
                    boxShadow: item.state === 'swapping' ? '0 0 20px rgba(239, 68, 68, 0.5)' : 'none'
                  }}
                />
                
                {/* Index Label - Hide on small screens */}
                <div className="hidden md:block text-xs text-white-50 mt-1 font-mono">
                  {index}
                </div>
              </div>
            ))}
          </div>

          {/* Status Overlay */}
          {array.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎯</div>
                <p className="text-xl font-semibold mb-2">Algorithm Visualizer Ready!</p>
                <p className="text-white-50">Generate an array to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="visualizer-section bg-black-200 p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-400">{currentStep}</div>
            <div className="text-xs text-white-50">Steps Taken</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">{array.filter(item => item.state === 'sorted').length}</div>
            <div className="text-xs text-white-50">Elements Sorted</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-400">{arraySize}</div>
            <div className="text-xs text-white-50">Array Size</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-400">{algorithms[selectedAlgorithm].difficulty}</div>
            <div className="text-xs text-white-50">Difficulty</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="visualizer-section bg-black-100 p-4">
        <h4 className="font-semibold mb-3 text-center">🎨 Color Legend</h4>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm">Default</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded animate-pulse"></div>
            <span className="text-sm">Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded animate-bounce"></div>
            <span className="text-sm">Swapping</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm">Sorted</span>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="visualizer-section bg-black-200 p-6">
        <h4 className="font-semibold mb-4 text-center">📚 Learn More</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-black-100 rounded-lg p-4">
            <h5 className="font-semibold text-blue-400 mb-2">💡 How it Works</h5>
            <p className="text-sm text-white-70">{algorithms[selectedAlgorithm].description}</p>
          </div>
          <div className="bg-black-100 rounded-lg p-4">
            <h5 className="font-semibold text-purple-400 mb-2">📊 Complexity Analysis</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Time:</span>
                <span className="font-mono text-orange-400">{algorithms[selectedAlgorithm].timeComplexity}</span>
              </div>
              <div className="flex justify-between">
                <span>Space:</span>
                <span className="font-mono text-blue-400">{algorithms[selectedAlgorithm].spaceComplexity}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;
