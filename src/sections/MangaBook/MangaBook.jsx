import { useEffect, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useDispatch, useSelector } from 'react-redux';
import { getHotBook } from '../../State/Books/Action';
import ProductCard from '../../user/components/Product/ProductCard';

import FiberNewIcon from '@mui/icons-material/FiberNew';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

const responsive = {
    0: { items: 1 },
    568: { items: 3 },
    1024: { items: 6 },
};

function MangaBook() {
    const dispatch = useDispatch();
    const { books = [] } = useSelector((store) => ({
        books: store.book.books,
    }));

    useEffect(() => {
        dispatch(getHotBook());
    }, []);

    const items = Array.isArray(books)
        ? books.map((item) => (
              <div key={item.bookId} className="m-3">
                  <ProductCard product={item} />
              </div>
          ))
        : [];

    const carousel = useRef();
    return (
        <div className="relative border border-red-600 rounded-lg bg-white">
            <div className="p-3 flex items-center">
                <SelfImprovementIcon sx={{ fontSize: '30px', color: '#55E6C1' }} />
                <span className="font-semibold ml-2" style={{ fontSize: '24px' }}>
                    Manga Book
                </span>
            </div>

            <AliceCarousel
                key="carousel"
                mouseTracking
                disableDotsControls
                disableButtonsControls
                items={items}
                ref={carousel}
                responsive={responsive}
            />

            <div key="btns" className="b-refs-buttons text-center">
                <Button
                    variant="contained"
                    onClick={(e) => carousel?.current?.slidePrev(e)}
                    sx={{ position: 'absolute', top: '8rem', left: '0rem', transform: 'rotate(-90deg)' }}
                    aria-label="next"
                >
                    <KeyboardArrowLeftIcon sx={{ transform: 'rotate(90deg)' }} />
                </Button>
                <Button
                    variant="contained"
                    onClick={(e) => carousel?.current?.slideNext(e)}
                    sx={{ position: 'absolute', top: '8rem', right: '0rem', transform: 'rotate(90deg)' }}
                    aria-label="next"
                >
                    <KeyboardArrowLeftIcon sx={{ transform: 'rotate(90deg)' }} />
                </Button>
            </div>
        </div>
    );
}

export default MangaBook;
