// src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SpeechRecognitionComponent from './components/SpeechRecognitionComponent';
import Presentation from './pages/Presentation';
import About from './pages/About';
import Contact from './pages/Contact';
import CommandModal from './components/CommandModal';
import './App.css';

interface Slide {
  title: string;
  content: string;
  imagePath?: string;
  animationClass?: string;
}

const slides: Slide[] = [
  { title: 'Voice-Activated AR Interface Prototype', content: 'This project demonstrates a minimal, voice-controlled UI designed for wearable displays, built with React, TypeScript, Vite, and the Web Speech API.', imagePath: '/interface-intro.gif', animationClass: 'fade-in' },
  { title: 'Minimalist Design', content: 'AR interfaces require a minimalist design to avoid overwhelming the user.  UI elements are placed in the peripheral vision to keep the central field of view clear.', imagePath: '/peripheral-ui.png', animationClass: 'slide-in-right' },
  { title: 'Voice as Primary Input', content: 'Voice control enables hands-free interaction, essential for wearable devices. The Web Speech API provides the foundation for speech recognition.', imagePath: '/voice-icon.svg', animationClass: 'pulse' },
  { title: 'Clear Visual Feedback', content: 'Subtle but clear visual cues confirm user commands and system status.  This project uses button highlighting and a "Processing..." indicator.', imagePath: '/feedback-example.gif', animationClass: 'fade-in' },
  { title: 'Under the Hood: Command Parsing', content: "The `processCommand` function uses string matching and regular expressions to interpret voice commands and trigger the appropriate actions.", imagePath: '/command-parsing-diagram.png', animationClass: 'slide-in-left' },
  { title: 'Built Using', content: 'React, TypeScript, Vite, Web Speech API, Netlify, GitHub', imagePath: '/tech-logos.png', animationClass: 'fade-in' },
  { title: 'Future Directions', content: 'Potential extensions include gesture control, more sophisticated voice commands, and integration with WebXR for a true AR experience.', imagePath: '/future-concept.jpg', animationClass: 'fade-in' },
];

const commands = [
    { command: 'next', description: 'Go to the next concept.' },
    { command: 'back', description: 'Go to the previous concept.' },
    { command: 'go to [topic]', description: 'Go to a specific concept (e.g., "go to voice control").' },
    { command: 'show commands', description: 'Display the available voice commands.' },
    { command: 'hide commands', description: 'Hides the available voice commands' },
];

const App: React.FC = () => {
  const [lastCommand, setLastCommand] = useState(''); // Remove
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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
      setIsModalOpen(true);
    } else if (lowerCaseCommand === 'hide commands') {
      setIsModalOpen(false);
    } else {
      console.log('Unknown command:', command);
    }

    // Remove setLastCommand

    setTimeout(() => {
      setIsProcessing(false);
    }, 500);
  };

  return (
    <div className="App">
      <div className="ui-container">
        <button className="show-commands-button" onClick={() => setIsModalOpen(true)}>
          Show Commands
        </button>
      </div>
      <SpeechRecognitionComponent onResult={processCommand} />
      {/* Remove last command display */}
      {isProcessing && <div className="processing-indicator"></div>}
      <CommandModal
        commands={commands}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Presentation
              slides={slides}
              currentSlideIndex={currentSlideIndex}
            />
          }
        />
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