import WhatshotIcon from '@mui/icons-material/Whatshot';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TopBook from './TopBook';
import FavoriteBook from './FavoriteBook';
function HotBook() {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-[30px] pb-[30px]">
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-lg border border-red-600">
                    <div className="p-3 flex items-center">
                        <WhatshotIcon sx={{ fontSize: '30px', color: '#cc8e35' }} />
                        <span className="font-semibold ml-2" style={{ fontSize: '24px' }}>
                            Sách nổi bật
                        </span>
                    </div>

                    <div className="p-3">
                        <TopBook />
                    </div>
                </div>
                <div className="bg-white col-span-2 border border-red-600 rounded-lg">
                    <div className="p-3 flex items-center ">
                        <FavoriteIcon sx={{ fontSize: '30px', color: '#cf6a87' }} />
                        <span className="font-semibold ml-2" style={{ fontSize: '24px' }}>
                            Sách yêu thích
                        </span>
                    </div>
                    <div className="p-3">
                        <FavoriteBook />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HotBook;
