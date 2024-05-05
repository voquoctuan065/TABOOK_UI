import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHotBook } from '../../State/Books/Action';
import { useNavigate } from 'react-router-dom';
function TopBook() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { books } = useSelector((store) => ({
        books: store.book.books,
    }));

    useEffect(() => {
        dispatch(getHotBook());
    }, []);

    const shortenTitle = (title) => {
        if (title.length > 30) {
            return title.substring(0, 30) + '...';
        }
        return title;
    };

    return (
        <div>
            {Array.isArray(books) &&
                books.map((item) => (
                    <div
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                                navigate(`/book/${item.bookId}`);
                            }
                        }}
                        key={item.bookId}
                        style={{
                            boxShadow:
                                'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                        }}
                        className="p-2 mb-3 grid grid-cols-4 gap-4 bg-white rounded-lg cursor-pointer"
                        onClick={() => navigate(`/book/${item.bookId}`)}
                    >
                        <div className="max-w-[4rem] max-h-[4rem]">
                            <img className="object-fit" src={item.bookImage} alt="" />
                        </div>
                        <div className="col-span-3">
                            <span>{shortenTitle(item.bookTitle)}</span>
                            <div className="mt-3 flex justify-between">
                                <div className="text-red-500">
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    }).format(item.discountedPrice)}
                                </div>
                                <div className="text-gray-700 line-through">
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    }).format(item.bookPrice)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default TopBook;
