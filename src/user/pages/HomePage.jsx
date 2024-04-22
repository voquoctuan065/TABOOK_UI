import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
function HomePage() {
    return (
        <>
            <Helmet>
                <title> Trang chủ </title>
            </Helmet>
            <Navbar />

            <Footer />
        </>
    );
}

export default HomePage;
