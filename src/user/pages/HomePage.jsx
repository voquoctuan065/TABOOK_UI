import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import MainCarousel from '../Carousel/MainCarousel';
import Feature from '../../sections/Feature/Feature';
import LatestBook from '../../sections/LatestBook/LatestBook';
import HotBook from '../../sections/HotBook/HotBook';
import MangaBook from '../../sections/MangaBook/MangaBook';

function HomePage() {
    return (
        <>
            <Helmet>
                <title> Trang chủ </title>
            </Helmet>

            <Navbar />

            <MainCarousel />

            <div className="bg-gray-200">
                <Feature />

                <LatestBook />

                <MangaBook />

                <HotBook />
            </div>

            <Footer />
        </>
    );
}

export default HomePage;
