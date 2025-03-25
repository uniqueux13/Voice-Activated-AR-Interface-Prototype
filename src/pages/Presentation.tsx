// src/pages/Presentation.tsx
import React from 'react';

interface Slide {
  title: string;
  content: string;
  imagePath?: string;
  animationClass?: string;
}

interface Props {
  slides: Slide[];
  currentSlideIndex: number;
}

const Presentation: React.FC<Props> = ({ slides, currentSlideIndex }) => {
  const currentSlide = slides[currentSlideIndex]; // Get the *current* slide

  return (
    <div className="presentation">
      {/* Only render the *current* slide */}
      <div
        key={currentSlideIndex} //  Important: Change the key when the slide changes
        className={`slide active ${currentSlide.animationClass || ''}`}
      >
        <div className="slide-title">{currentSlide.title}</div>
        {currentSlide.imagePath && (
          <img src={currentSlide.imagePath} alt={currentSlide.title} />
        )}
        <p>{currentSlide.content}</p>
      </div>
    </div>
  );
};

export default Presentation;