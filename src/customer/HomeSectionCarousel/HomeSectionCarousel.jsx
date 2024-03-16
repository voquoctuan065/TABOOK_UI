import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';

import { Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { men_kurta } from '../components/men_kurta';

const HomeSectionCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 5.5 },
    };

    const slidePrev = () => {
        const newIndex = activeIndex - 1;
        setActiveIndex(Math.max(0, newIndex));
    };

    const slideNext = () => {
        const newIndex = activeIndex + 1;
        setActiveIndex(Math.min(items.length - 1, newIndex));
    };

    const syncActiveIndex = ({ item }) => setActiveIndex(item);

    const items = men_kurta.map((item) => <HomeSectionCard product={item} />);

    return (
        <div className="relative p-5">
            <AliceCarousel
                items={items}
                disableButtonsControls
                responsive={responsive}
                disableDotsControls
                onSlideChanged={syncActiveIndex}
                activeIndex={activeIndex}
            />
            {activeIndex !== items.length - 5 && (
                <Button
                    onClick={slideNext}
                    variant="contained"
                    className="z-50"
                    sx={{ position: 'absolute', top: '8rem', right: '0rem', transform: 'rotate(90deg)' }}
                    aria-label="next"
                >
                    <KeyboardArrowLeftIcon sx={{ transform: 'rotate(90deg)' }} />
                </Button>
            )}

            {activeIndex !== 0 && (
                <Button
                    onClick={slidePrev}
                    variant="contained"
                    className="z-50"
                    sx={{ position: 'absolute', top: '8rem', left: '0rem', transform: 'rotate(-90deg)' }}
                    aria-label="next"
                >
                    <KeyboardArrowLeftIcon sx={{ transform: 'rotate(90deg)' }} />
                </Button>
            )}
        </div>
    );
};

export default HomeSectionCarousel;
