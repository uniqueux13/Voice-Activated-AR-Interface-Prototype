// src/App.tsx
import React, { useState, } from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import SpeechRecognitionComponent from './components/SpeechRecognitionComponent';
import Presentation from './pages/Presentation';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

interface Slide {
    title: string;
    content: string;
    imagePath?: string;
    animationClass?: string;
}

// Revised slide content from a UX exploration perspective
const slides: Slide[] = [
    {
      title: 'Exploring Voice UI: An AR Concept',
      content: 'Goal: Understand the Web Speech API and experiment with basic voice commands in a web-based simulation of an AR interface. This is a learning exercise, not a polished UI. Built with React, TypeScript, & Vite.',
      imagePath: '/concept-sketch.png',
      animationClass: 'fade-in',
    },
    {
      title: 'Initial Layout Concept',
      content: 'Considering an AR overlay, the user\'s main view shouldn\'t be blocked. I explored placing the core content in a defined panel on the left, simulating a secondary display within the field of view.',
      // Suggestion: A simple diagram showing the layout idea
      imagePath: '/layout-idea.png',
      animationClass: 'fade-in', // Changed from slide-in for simplicity unless you prefer specific slide-ins
    },
    {
      title: 'Handling Voice Commands',
      content: 'Implemented the Web Speech API to capture speech. The "Start Listening" button initiates capture. This API provides the foundation for speech recognition in the browser. (API Docs: developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)',
      imagePath: '/web-speech-api-logo.svg',
      animationClass: 'fade-in',
    },
    {
      title: 'Feedback Considerations',
      content: 'How does the user know the command was heard or is processing? Added the "Last Command" display for immediate confirmation. The pulsing dot is a very simple processing indicator. Designing subtle, effective feedback for AR is a key challenge.',
      // Suggestion: Simple diagram showing input -> processing -> output/feedback
      imagePath: '/feedback-loop.png',
      animationClass: 'fade-in',
    },
    {
      title: 'Under the Hood: Basic Logic',
      content: 'Once speech is transcribed, how does it trigger an action? A JavaScript function checks the text for keywords ("next", "back", "show", etc.) and calls the corresponding function (e.g., changing the slide).',
      // Suggestion: Simplified flowchart: Voice Input -> Text -> Keyword Check -> Action
      imagePath: '/logic-flow.png',
      animationClass: 'fade-in',
    },
    {
      title: 'Tech Stack Used',
      content: 'This experiment was built using: React, TypeScript, Vite, Web Speech API, CSS, Netlify (for deployment), and GitHub (for version control).',
      // Suggestion: Keep the tech logos image
      imagePath: '/tech-logos.png',
      animationClass: 'fade-in',
    },
    {
      title: 'Learnings & Next Steps',
      content: 'This was a valuable first step into VUI using web tech. Key learning: Web Speech API is accessible, but context-awareness and truly seamless AR interaction are complex challenges! Next steps could involve better error handling, more natural language processing, or exploring WebXR.',
      // Suggestion: An icon representing learning or future steps
      imagePath: '/learning-icon.svg',
      animationClass: 'fade-in',
    },
  ];

const commands = [
    { command: 'next', description: 'Go to the next concept.' },
    { command: 'back', description: 'Go to the previous concept.' },
    { command: 'go to [topic]', description: 'Go to a specific concept (e.g., "go to voice control").' },
    { command: 'show commands', description: 'Display the available voice commands.' },
    { command: 'hide commands', description: 'Hides the available voice commands' },
    { command: 'hide presentation', description: 'Hides the project details view.' },
    { command: 'show presentation', description: 'Shows the project details view.' },
    { command: 'presentation small', description: 'Resize presentation to default (left side).' }, 
    { command: 'presentation large', description: 'Resize presentation to large (centered).' },
];

const App: React.FC = () => {
    const [lastCommand, setLastCommand] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isCommandsVisible, setIsCommandsVisible] = useState(false); // Renamed state
    const [isPresentationVisible, setIsPresentationVisible] = useState(true);
    const [presentationSizeMode, setPresentationSizeMode] = useState<'small' | 'large'>('small');

    const goToNextSlide = () => {
        setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const goToPreviousSlide = () => {
        setCurrentSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    const goToSlide = (topic: string) => {
        const index = slides.findIndex((slide) =>
            slide.title.toLowerCase().includes(topic)
        );
        if (index !== -1) {
            setCurrentSlideIndex(index);
        }
    };

    const processCommand = (command: string) => {
        setIsProcessing(true);
        const lowerCaseCommand = command.toLowerCase().trim();

        if (lowerCaseCommand.includes('change background color to')) {
            const color = lowerCaseCommand.split('change background color to ')[1];
            document.body.style.backgroundColor = color;
        } else if (lowerCaseCommand === 'next') {
            goToNextSlide();
        } else if (lowerCaseCommand === 'back') {
            goToPreviousSlide();
        } else if (lowerCaseCommand.startsWith('go to')) {
            const topic = lowerCaseCommand.split('go to ')[1];
            goToSlide(topic);
        } else if (lowerCaseCommand === 'show commands') {
            setIsCommandsVisible(true); 
        } else if (lowerCaseCommand === 'hide commands') {
            setIsCommandsVisible(false); 
        } else if (lowerCaseCommand === 'hide presentation') { 
            setIsPresentationVisible(false);
        } else if (lowerCaseCommand === 'show presentation') { 
            setIsPresentationVisible(true);
        } else {
            console.log('Unknown command:', command);
        }

        if (lowerCaseCommand === 'presentation small') { // Add this block
            setPresentationSizeMode('small');
        } else if (lowerCaseCommand === 'presentation large') { // Add this block
            setPresentationSizeMode('large');
        } else {
            console.log('Unknown command:', command);
            // Maybe set an error state or provide feedback
        }

        setLastCommand(command);

        setTimeout(() => {
            setIsProcessing(false);
        }, 500);
    };

    return (
        <div className="App">
            <h1>Voice-Activated AR Interface Simulation</h1>
            <p className="last-command">{lastCommand}</p>

            <div className="ui-container"> {/* Keep this div, even if empty for now */}
                {/* Button was removed, container can stay or go */}
            </div>
            <SpeechRecognitionComponent onResult={processCommand} />

            {isProcessing && <div className="processing-indicator"></div>}

            {/* Command Panel remains conditional */}
            {isCommandsVisible && (
                <div className="commands-panel">
                    <h3>Available Commands:</h3>
                    <ul>
                        {commands.map((item, index) => (
                            <li key={index} className="command-item">
                                <strong>{item.command}</strong>: {item.description}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Conditionally render the presentation based on state */}
            {isPresentationVisible && (
                 <div className={`presentation ${presentationSizeMode === 'large' ? 'large' : ''}`}>
                 <Presentation
                     slides={slides}
                     currentSlideIndex={currentSlideIndex}
                 />
              </div>
            )}

             {/* Branding Element - Add This */}
             <div className="branding-container">
                <img src="/unique-ux-logo.png" alt="Unique UX Logo" className="logo" />
                <span className="brand-name">Unique UX</span>
            </div>
            {/* End Branding Element */}

            {/* Routes for About/Contact (outside the conditional presentation) */}
            <Routes>
                {/* Route for presentation is handled by the conditional rendering above */}
                 <Route path="/" element={null} /> {/* Add this line to satisfy react router*/}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
    );
};

function AppWithRouter() {
    return (
        <Router>
            <App />
        </Router>
    )
}

export default AppWithRouter;