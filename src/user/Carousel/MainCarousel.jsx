/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
import { API_BASE_URL } from '../../State/apiConfig';
import { useNavigate } from 'react-router-dom';

function MainCarousel() {
    const navigate = useNavigate();
    const [carousel, setCarousel] = useState(null);

    useEffect(() => {
        const getCarousel = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/public/carousel/get`);
                if (response.status === 200) {
                    setCarousel(response.data);
                }
            } catch (error) {
                console.error('Error fetching carousel: ', error);
            }
        };
        getCarousel();
    }, []);

    const items = carousel?.map((item) => (
        <div
            key={item}
            onClick={() => navigate(item.targetUrl)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Space') {
                    navigate(item.targetUrl);
                }
            }}
            className="h-[70vh] w-full relative overflow-hidden"
            style={{ aspectRatio: '16/9' }} 
        >
            <img
                className="absolute top-0 left-0 w-full h-full object-cover"
                role="presentation"
                src={`/images/carousel/${item.imageUrl}`}
                alt="carousel"
            />
        </div>
    ));

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
