import React from 'react'
import { mainCarouselData } from './MainCarouselData';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const items = mainCarouselData.map(
    (item) => <img className="cursor-pointer" role='presentation' src={item.image} alt="carousel"/>
);

const MainCarousel = () => {
    
    return (
        <AliceCarousel 
            mouseTracking
            items={items}
            autoPlay
            autoPlayInterval={3000}
            infinite
            disableButtonsControls 
        />
    )
}

export default MainCarousel;