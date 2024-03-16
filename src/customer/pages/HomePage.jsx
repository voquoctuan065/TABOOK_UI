import React from 'react';
import MainCarousel from '../homecarousel/MainCarousel';
import HomeSectionCarousel from '../HomeSectionCarousel/HomeSectionCarousel';

import Navigation from '../components/Navigation/Navigation';
import Footer from '../components/Footer/Footer';

const HomePage = () => {
    return (
        <div>
            <Navigation />
            <MainCarousel />

            <div>
                <HomeSectionCarousel />
            </div>

            <Footer />
        </div>
    );
};

export default HomePage;
