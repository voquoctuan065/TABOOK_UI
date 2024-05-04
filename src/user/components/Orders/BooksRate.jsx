/* eslint-disable react/prop-types */
import { Button } from '@mui/material';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createRating } from '../../../State/BooksRate/Action';

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
    ],
};

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
];

function BooksRate({ bookId, handleRateClose }) {
    const dispatch = useDispatch();
    const [highlightedInput, setHighlightedInput] = useState(null);
    const [comment, setComment] = useState('');

    const handleInputClick = (value) => {
        setHighlightedInput(value);
    };

    const handleSubmit = () => {
        if (!highlightedInput || !comment || !bookId) {
            toast.warning('Vui lòng để lại đánh giá và nhận xét trước khi gửi');
            return;
        }

        const reqData = {
            rating: highlightedInput,
            comment: comment,
        };

        dispatch(createRating(bookId, reqData));
        toast.success('Đánh giá sản phẩm thành công!');
        handleRateClose();
    };

    return (
        <>
            <div
                className="flex flex-row p-0 mr-[-38px] ml-[-38px] items-center"
                style={{ backgroundColor: '#66bfdd' }}
            >
                <div className="flex">
                    <img src="/images/logo/rating.png" alt="" className="w-[340px] pointer-events-none text-left" />
                </div>
                <div className="text-left">
                    <h3
                        className="text-left pr-[40px]"
                        style={{
                            backgroundColor: '#66bfdd',
                            fontSize: '32px',
                            fontWeight: '300',
                            color: '#122B46',
                        }}
                    >
                        <div className="inline-block cursor-text max-w-[100%]">
                            <div className="cursor-text">Đánh giá sản phẩm</div>
                        </div>
                    </h3>
                </div>
            </div>
            <div className="relative rounded w-full mx-[4px] my-[12px] flex flex-wrap items-start">
                <label
                    className="block text-left w-full ml-[2px] mb-[14px]"
                    style={{
                        color: '#2c3345',
                        fontWeight: '500',
                        wordBreak: 'break-word',
                    }}
                >
                    <div
                        className="inline-block w-full cursor-text max-w-[100%]"
                        style={{
                            wordWrap: 'break-word',
                            whiteSpace: 'pre-wrap',
                            display: 'block',
                        }}
                    >
                        <div>Bạn đánh giá sản phẩm này như thế nào? </div>
                    </div>
                </label>

                <div className="relative w-full">
                    <span className="flex flex-wrap overflow-visible">
                        <div className="inline-flex flex-col ml-[-6px]">
                            <div className="flex flex-wrap">
                                <div className="mr-[24px] flex items-center justify-end flex-col-reverse relative w-[40px]">
                                    <span
                                        className="text-left self-start cursor-text whitespace-normal w-[100px] relative"
                                        style={{
                                            wordBreak: 'break-word',
                                            zIndex: 9,
                                            fontSize: '0.75em',
                                        }}
                                    >
                                        <div className="inline-block cursor-text max-w-[100%]">
                                            <div className="cursor-text outline-none">Rất tệ</div>
                                        </div>
                                    </span>
                                    <input
                                        value="1"
                                        className={`text-left outline-0 m-0 absolute opacity-0 h-[1px] w-[1px] overflow-hidden`}
                                        style={{
                                            clip: 'rect(1px, 1px, 1px, 1px)',
                                        }}
                                    />
                                    <label
                                        onClick={() => handleInputClick(1)}
                                        className={`bg-white items-center justify-center flex w-[40px] h-[40px] ${
                                            highlightedInput === 1 ? 'bg-red-300' : ''
                                        }`}
                                        style={{
                                            color: '#000',
                                            border: '1px solid',
                                            fontSize: '0.75em',
                                            borderRadius: '50%',
                                            fontWeight: '600',
                                            flexShrink: 0,
                                            padding: 0,
                                        }}
                                    >
                                        1
                                    </label>
                                </div>
                                {[2, 3, 4].map((value) => (
                                    <div
                                        key={value}
                                        className="mr-[24px] flex items-center justify-end flex-col-reverse relative w-[40px]"
                                    >
                                        <input
                                            value={value}
                                            className={`text-left outline-0 m-0 absolute opacity-0 h-[1px] w-[1px] overflow-hidden `}
                                            style={{ clip: 'rect(1px, 1px, 1px, 1px)' }}
                                        />
                                        <label
                                            onClick={() => handleInputClick(value)}
                                            className={`bg-white items-center justify-center flex w-[40px] h-[40px] ${
                                                highlightedInput === value ? 'bg-red-300' : ''
                                            }`}
                                            style={{
                                                color: '#000',
                                                border: '1px solid',
                                                fontSize: '0.75em',
                                                borderRadius: '50%',
                                                fontWeight: '600',
                                                flexShrink: 0,
                                                padding: 0,
                                            }}
                                        >
                                            {value}
                                        </label>
                                    </div>
                                ))}

                                <div className="mr-[24px] flex items-center justify-end flex-col-reverse relative w-[40px]">
                                    <span
                                        className="text-left self-start cursor-text whitespace-normal w-[100px] relative"
                                        style={{
                                            wordBreak: 'break-word',
                                            zIndex: 9,
                                            fontSize: '0.75em',
                                        }}
                                    >
                                        <div className="inline-block cursor-text max-w-[100%]">
                                            <div className="cursor-text outline-none">Xuất sắc</div>
                                        </div>
                                    </span>
                                    <input
                                        value="5"
                                        className="text-left outline-0 m-0 absolute opacity-0 h-[1px] w-[1px] overflow-hidden"
                                        style={{
                                            clip: 'rect(1px, 1px, 1px, 1px)',
                                        }}
                                    />
                                    <label
                                        onClick={() => handleInputClick(5)}
                                        className={`bg-white items-center justify-center flex w-[40px] h-[40px] ${
                                            highlightedInput === 5 ? 'bg-red-300 ' : ''
                                        } `}
                                        style={{
                                            color: '#000',
                                            border: '1px solid',
                                            fontSize: '0.75em',
                                            borderRadius: '50%',
                                            fontWeight: '600',
                                            flexShrink: 0,
                                            padding: 0,
                                        }}
                                    >
                                        5
                                    </label>
                                </div>
                            </div>

                            <div
                                className="w-auto block h-[24px] w-[20px] absolute "
                                style={{
                                    top: '50%',
                                    right: '14px',
                                    transform: 'translate(50%, -50%)',
                                }}
                            >
                                <svg
                                    className="h-[24px]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7 6a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm0 6a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm2 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm4-14a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm0 6a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm2 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </span>
                </div>
            </div>

            <div className="mt-5 border-t pt-5 h-[10rem]">
                <ReactQuill
                    theme="snow"
                    value={comment}
                    onChange={setComment}
                    modules={modules}
                    formats={formats}
                    style={{ height: '100%' }}
                    placeholder="Để lại nhận xét gì đó"
                />
            </div>
            <div>
                <Button
                    onClick={handleSubmit}
                    className="bg-[#9155FD] w-full"
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ padding: '.8rem 0', bgcolor: '#9155fd' }}
                >
                    Gửi đi
                </Button>
            </div>
        </>
    );
}

export default BooksRate;
