/* eslint-disable react/jsx-key */
import { mainCarouselData } from './MainCarouselData';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const items = mainCarouselData.map((item) => (
    <img key={item} className="cursor-pointer" role="presentation" src={item.image} alt="carousel" />
));

function MainCarousel() {
    return (
        <div style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px' }}>
            <AliceCarousel
                autoHeight={true}
                mouseTracking
                items={items}
                autoPlay
                autoPlayInterval={2500}
                infinite
                disableButtonsControls
                disableDotsControls
            />
        </div>
    );
}

export default MainCarousel;
