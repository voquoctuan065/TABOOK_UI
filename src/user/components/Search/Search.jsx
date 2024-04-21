import SearchIcon from '@mui/icons-material/Search';
import { Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import HeadlessTippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../../hooks/useDebounce';
import axios from 'axios';
import { API_BASE_URL } from '../../../State/apiConfig';

function Search() {
    const navigate = useNavigate();
    const inputRef = useRef();
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const debounced = useDebounce(searchValue, 500);

    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        const data = {
            keyword: debounced,
            page: 0,
        };
        const fetchSearchBook = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/public/book/search?keyword=${encodeURIComponent(data.keyword)}&page=${
                        data.page
                    }&size=24`,
                );
                setSearchResult(response.data.booksDtoList);
            } catch (error) {
                console.error('Error fetching: ', error);
            }
        };

        fetchSearchBook();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchValue.trim() !== '') {
            navigate(`/book/search/${searchValue}`);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <div
            style={{
                width: 'calc(100% - 700px)',
                padding: '5px 8px 0 8px',
                marginLeft: '20px',
            }}
        >
            <div className="w-[100%]">
                <form className="block w-[100%]">
                    <div className="w-[100%] float-left">
                        <div
                            className="relative"
                            style={{
                                padding: '8px 0 12px 0',
                                height: 'inherit',
                            }}
                        >
                            <HeadlessTippy
                                appendTo={() => document.body}
                                interactive
                                visible={showResult && searchResult && searchResult.length > 0}
                                render={(attrs) => (
                                    <div className="box relative top-[-10px] max-w-[498px]" tabIndex="-1" {...attrs}>
                                        <div className="bg-white rounded-lg">
                                            <Typography
                                                sx={{
                                                    p: 2,
                                                    width: '100%',
                                                    boxShadow:
                                                        'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
                                                }}
                                            >
                                                <div
                                                    className="flex items-center justify-between pt-[12px] pr-[12px] pb-[8px] pl-[12px]"
                                                    style={{ color: '0D0E0F' }}
                                                >
                                                    <div
                                                        className="text-left justify-start flex items-center"
                                                        style={{ color: '0D0E0FD' }}
                                                    >
                                                        <span className="font-bold pr-[6px]">
                                                            <ShowChartIcon sx={{ maxWidth: '100%', height: 'auto' }} />
                                                        </span>
                                                        <span className="font-bold" style={{ fontSize: '1.1em' }}>
                                                            Sản phẩm
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className="grid flex items-center justify-start"
                                                    style={{
                                                        gridGap: '4px 5px',
                                                        padding: '0 12px 16px 12px',
                                                        gridTemplateColumns: 'repeat(3,1fr)',
                                                    }}
                                                >
                                                    {searchResult &&
                                                        searchResult.slice(0, 6).map((item) => (
                                                            <div
                                                                key={item.bookId}
                                                                onClick={() => navigate(`/book/${item.bookId}`)}
                                                                className="cursor-pointer p-[4px] h-[57px] w-[100%] flex items-stretch justify-stretch"
                                                                style={{
                                                                    borderRadius: '8px',
                                                                    color: '#7A7E7F',
                                                                    transition: 'box-shadow 0.3s',
                                                                }}
                                                            >
                                                                <img
                                                                    alt=""
                                                                    src={item.bookImage}
                                                                    className="w-[47px] max-w-[100%] h-auto"
                                                                />
                                                                <div
                                                                    style={{
                                                                        wordBreak: 'break-word',
                                                                        lineHeight: '1.4em',
                                                                        flexGrow: 1,
                                                                        overflow: 'hidden',
                                                                    }}
                                                                    className="whitespace-normal text-ellipsis pl-[8px] min-h-[2.8em] max-h-[2.8em] text-left"
                                                                >
                                                                    {item.bookTitle}
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>
                                            </Typography>
                                        </div>
                                    </div>
                                )}
                                onClickOutside={handleHideResult}
                            >
                                <input
                                    type="text"
                                    name="search"
                                    maxLength={255}
                                    placeholder="Tìm kiếm tên sách..."
                                    className="h-[40px] w-[100%] outline-none focus:ring-0"
                                    style={{
                                        padding: '0 80px 0 24px',
                                        border: '1px solid #CDCFD0',
                                        borderRadius: '8px',
                                    }}
                                    value={searchValue}
                                    onChange={handleSearchChange}
                                    onFocus={() => {
                                        setShowResult(true);
                                    }}
                                    onKeyDown={handleKeyPress}
                                    ref={inputRef}
                                />
                            </HeadlessTippy>
                            <span
                                onClick={handleSubmit}
                                onMouseDown={(e) => e.preventDefault()}
                                className="cursor-pointer absolute w-[72px] h-[30px] bg-red-700 flex items-center justify-center rounded-lg"
                                style={{
                                    top: 'calc(50% - 2px)',
                                    right: '4px',
                                    transform: 'translate(0, -50%)',
                                    fontWeight: 'normal',
                                    fontSize: '21px',
                                    zIndex: 3,
                                    border: '2px solid #C92127',
                                }}
                            >
                                <SearchIcon sx={{ color: 'white' }} />
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Search;
