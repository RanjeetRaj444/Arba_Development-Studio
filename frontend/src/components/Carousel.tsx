import React, { useState } from 'react';
import '../styles/Carousel.css'; // Import CSS for styling (create this file if not exist)

interface CarouselProps {
    slides: React.ReactNode[]; // Array of React nodes representing each slide
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const goToNextSlide = () => {
        const nextSlide = (currentSlide + 1) % slides.length;
        setCurrentSlide(nextSlide);
    };

    const goToPrevSlide = () => {
        const prevSlide = (currentSlide - 1 + slides.length) % slides.length;
        setCurrentSlide(prevSlide);
    };

    return (
        <div className="carousel-container">
            <div className="carousel-slide" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div className="slide" key={index}>
                        {slide}
                    </div>
                ))}
            </div>
            <button className="prev" onClick={goToPrevSlide}>❮</button>
            <button className="next" onClick={goToNextSlide}>❯</button>
        </div>
    );
};

export default Carousel;
