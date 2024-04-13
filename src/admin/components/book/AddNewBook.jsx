import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from '@mui/material';
import Button from '@mui/material/Button';

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

// eslint-disable-next-line react/prop-types
function AddNewBook({ handleClose, handleAddBookSuccess }) {
    const inputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [nxb, setNxbs] = useState('');
    const [listNXBs, setListNXBs] = useState([]);
    const [category, setCategory] = useState('');
    const [listCategory, setListCategory] = useState([]);
    const [bookDescription, setBookDescription] = useState('');
    const [bookTitle, setBookTitle] = useState('');
    const [bookPrice, setBookPrice] = useState(null);
    const [bookImage, setBookImage] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [yearProduce, setYearProduce] = useState(null);
    const [stockQuantity, setStockQuantity] = useState(null);
    const [discountPercent, setDiscountPercent] = useState(null);
    const [discountedPrice, setDiscountedPrice] = useState(null);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    // ------------------------------ Validate Form ---------------------------------------//
    const handleNXBSChange = (event) => {
        setNxbs(event.target.value);
    };
    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    const handleBookTitleChange = (event) => {
        const bookTitle = event.target.value;
        const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
        const containsNumber = /\d/.test(bookTitle);
        if (!bookTitle || bookTitle.trim() === '') {
            setError('Tên sách không được để trống! Vui lòng nhập tên sách.');
        } else if (bookTitle.length > 255) {
            setError('Tên sách không được vượt quá 255 ký tự! Vui lòng nhập lại.');
        } else if (specialChars.test(bookTitle)) {
            setError('Tên sách không được chứa các ký tự đặc biệt! Vui lòng nhập lại.');
        } else if (containsNumber) {
            setError('Tên sách không được chứa số! Vui lòng nhập lại!');
        } else {
            setError('');
        }
        setBookTitle(bookTitle);
    };
    const handleBookPriceChange = (event) => {
        const inputValue = event.target.value.trim();

        if (inputValue === '') {
            setError('Vui lòng nhập năm xuất bản.');
        }
        const bookPrice = parseFloat(event.target.value);

        if (isNaN(bookPrice)) {
            setError('Vui lòng nhập giá sách.');
        } else if (bookPrice < 0) {
            setError('Giá của sách phải là số không âm! Vui lòng nhập lại.');
        } else if (bookPrice > 2000000) {
            setError('Giá của sách phải không được lớn hơn 2 triệu đồng! Vui lòng nhập lại.');
        } else if (!Number.isInteger(bookPrice)) {
            setError('Giá của sách phải là một số nguyên! Vui lòng nhập lại.');
        }
        setBookPrice(bookPrice);
    };

    const handleAuthorNameChange = (event) => {
        const authorName = event.target.value;
        const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
        const containsNumber = /\d/.test(bookTitle);
        if (!authorName || authorName.trim() === '') {
            setError('Tên tác giả không được để trống! Vui lòng nhập tên tác giả.');
        } else if (authorName.length > 255) {
            setError('Tên tác giả không được vượt quá 255 ký tự! Vui lòng nhập lại.');
        } else if (specialChars.test(authorName)) {
            setError('Tên tác giả không được chứa các ký tự đặc biệt! Vui lòng nhập lại.');
        } else if (containsNumber) {
            setError('Tên không được chứa số! Vui lòng nhập lại!');
        } else {
            setError('');
        }
        setAuthorName(authorName);
    };
    const handleYearProduceChange = (event) => {
        const inputValue = event.target.value.trim();

        if (inputValue === '') {
            setError('Vui lòng nhập năm xuất bản.');
        }

        const yearProduce = parseFloat(inputValue);
        const currentYear = new Date().getFullYear();

        if (isNaN(yearProduce)) {
            setError('Năm xuất bản phải là một số! Vui lòng nhập lại!');
        } else if (yearProduce < 0) {
            setError('Năm xuất bản không được âm! Vui lòng nhập lại.');
        } else if (!Number.isInteger(yearProduce)) {
            setError('Năm xuất phải là một số nguyên! Vui lòng nhập lại.');
        } else if (yearProduce < 2000 || yearProduce > currentYear) {
            setError(`Năm xuất bản nằm trong khoảng từ 2000 đến ${currentYear}! Vui lòng nhập lại.`);
        }
        setYearProduce(yearProduce);
    };
    const handleStockQuantityChange = (event) => {
        const inputValue = event.target.value.trim();

        if (inputValue === '') {
            setError('Vui lòng nhập năm xuất bản.');
        }

        const stockQuantity = parseFloat(inputValue);
        if (isNaN(stockQuantity)) {
            setError('Số lượng trong kho phải là một số! Vui lòng nhập lại.');
        } else if (stockQuantity < 0) {
            setError('Số lượng trong kho không được âm! Vui lòng nhập lại.');
        } else if (stockQuantity > 100) {
            setError('Số lượng trong kho không được lớn hơn 100! Vui lòng nhập lại');
        } else if (!Number.isInteger(stockQuantity)) {
            setError('Số lượng trong kho phải là một số nguyên! Vui lòng nhập lại');
        }

        setStockQuantity(stockQuantity);
    };
    const handleDiscountPercentChange = (event) => {
        const inputValue = event.target.value.trim();

        if (inputValue === '') {
            setError('Vui lòng nhập năm xuất bản.');
        }

        const discountPercent = parseFloat(inputValue);
        if (isNaN(discountPercent)) {
            setError('% giảm giá phải là một số! Vui lòng nhập lại.');
        } else if (discountPercent < 0) {
            setError('% giảm giá không được âm! Vui lòng nhập lại.');
        } else if (discountPercent > 100) {
            setError('% giảm giá không được lớn hơn 100! Vui lòng nhập lại');
        } else if (!Number.isInteger(discountPercent)) {
            setError('% giảm giá phải là một số nguyên! Vui lòng nhập lại');
        }

        const discountedPriceValue = bookPrice - (discountPercent * bookPrice) / 100;

        setDiscountPercent(discountPercent);
        setDiscountedPrice(discountedPriceValue);
    };

    // ------------------------------ End Validate Form ---------------------------------------//

    // ------------------------------ Xử lý upload hình ảnh ----------------------------------//
    const handleImageClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('image', selectedFile);
            const response = await axios.post('http://localhost:8686/admin/uploadToGoogleDrive', formData);
            const result = response.data;
            setSuccess(result.message);
            setBookImage(result.url);
        } catch (error) {
            console.error('Error uploading image', error.message);
            setError(error.message);
        }
    };
    // ------------------------------ End Xử lý upload hình ảnh ----------------------------------//

    // ----------------------------------- Get Category & NXBs ---------------------------------------//
    useEffect(() => {
        axios
            .get('http://localhost:8686/admin/category/list-category')
            .then((response) => {
                setListCategory(response.data);
            })
            .catch((error) => {
                console.log('Error fetching category data', error);
            });

        axios
            .get('http://localhost:8686/admin/nxb/list-nxb')
            .then((response) => {
                setListNXBs(response.data);
            })
            .catch((error) => {
                console.error('Error fetching nxb data: ', error);
            });
    }, []);
    // ------------------------------ End Get Category & NXBs---------------------------------------//

    useEffect(() => {
        let errorTimeout, successTimeout;

        if (error) {
            errorTimeout = setTimeout(() => {
                setError(null);
            }, 2000);
        }

        if (success) {
            successTimeout = setTimeout(() => {
                setSuccess(null);
            }, 2000);
        }

        return () => {
            clearTimeout(errorTimeout);
            clearTimeout(successTimeout);
        };
    }, [error, success]);

    // ------------------------------ Xử lý submit form thêm sách mới ----------------------------------//
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        let categoryId = parseInt(formData.get('category'));
        let formattedCategory = null;
        if (!isNaN(categoryId)) {
            formattedCategory = {
                categoryId: categoryId,
            };
        }

        let nxbId = parseInt(formData.get('nxb'));
        let formattedNxb = null;
        if (!isNaN(nxbId)) {
            formattedNxb = {
                nxbId: nxbId,
            };
        }
        if (!bookImage) {
            setError('Không được để trống hình ảnh!');
            return;
        }
        const inputData = {
            bookTitle: formData.get('bookTitle'),
            bookPrice: formData.get('bookPrice'),
            discountPercent: formData.get('discountPercent'),
            discountedPrice: formData.get('discountedPrice'),
            stockQuantity: formData.get('stockQuantity'),
            yearProduce: formData.get('yearProduce'),
            authorName: formData.get('authorName'),
            category: formattedCategory,
            nxb: formattedNxb,
            bookDescription: bookDescription,
            bookImage: bookImage,
        };
        try {
            await axios.post('http://localhost:8686/admin/book/add', inputData);
            setSuccessDialogOpen(true);
        } catch (error) {
            console.log(error);
        }
        console.log(inputData);
    };

    const handleAddSuccessClose = () => {
        setSuccessDialogOpen(false);
        handleClose();
        handleAddBookSuccess();
    };
    // ------------------------------ End lý submit form thêm sách mới ----------------------------------//
    return (
        <div>
            <h5 className="font-bold text-2xl text-center text-red-700">Thêm Sách Mới</h5>
            <Grid container>
                <Grid item xs={9}>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {success && <Alert severity="success">{success}</Alert>}
                        </Stack>
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            {error && <Alert severity="error">{error}</Alert>}
                        </Stack>
                        <Grid container spacing={3} sx={{ width: '100%' }}>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    type="text"
                                    id="bookTitle"
                                    name="bookTitle"
                                    label="Tên sách"
                                    fullWidth
                                    autoComplete="Tên sách"
                                    value={bookTitle}
                                    onChange={handleBookTitleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    type="number"
                                    id="bookPrice"
                                    name="bookPrice"
                                    label="Giá sách"
                                    fullWidth
                                    autoComplete="100000"
                                    value={bookPrice}
                                    onChange={handleBookPriceChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    type="number"
                                    id="discountPercent"
                                    name="discountPercent"
                                    label="% giảm giá"
                                    fullWidth
                                    autoComplete="10"
                                    value={discountPercent}
                                    onChange={handleDiscountPercentChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    aria-readonly
                                    type="number"
                                    id="discountedPrice"
                                    name="discountedPrice"
                                    label="Giá sau khi giảm"
                                    fullWidth
                                    autoComplete="10"
                                    value={discountedPrice}
                                    variant={discountedPrice ? 'outlined' : 'filled'}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    type="number"
                                    id="stockQuantity"
                                    name="stockQuantity"
                                    label="Số lượng trong kho"
                                    fullWidth
                                    autoComplete="10"
                                    value={stockQuantity}
                                    onChange={handleStockQuantityChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    type="number"
                                    id="yearProduce"
                                    name="yearProduce"
                                    label="Năm xuất bản"
                                    fullWidth
                                    autoComplete="10"
                                    value={yearProduce}
                                    onChange={handleYearProduceChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    type="text"
                                    id="authorName"
                                    name="authorName"
                                    label="Tác giả"
                                    fullWidth
                                    autoComplete="Tên tác giả"
                                    value={authorName}
                                    onChange={handleAuthorNameChange}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="categoryLabel">Thể loại</InputLabel>
                                    <Select
                                        labelId="categoryLabel"
                                        id="category"
                                        name="category"
                                        value={category || ''}
                                        label="Thể loại"
                                        onChange={handleCategoryChange}
                                    >
                                        {listCategory.length === 0 ? (
                                            <MenuItem value="">Loading...</MenuItem>
                                        ) : (
                                            listCategory
                                                .filter((item) => item.level === 3)
                                                .map((item) => (
                                                    <MenuItem key={item.categoryId} value={item.categoryId}>
                                                        {item.categoryName}
                                                    </MenuItem>
                                                ))
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="nxbsLabel">Nhà xuất bản</InputLabel>
                                    <Select
                                        labelId="nxbsLabel"
                                        id="nxb"
                                        name="nxb"
                                        value={nxb || ''}
                                        label="Nhà xuất bản"
                                        onChange={handleNXBSChange}
                                    >
                                        {listNXBs.length === 0 ? (
                                            <MenuItem value="">Loading...</MenuItem>
                                        ) : (
                                            listNXBs.map((item) => (
                                                <MenuItem key={item.nxbId} value={item.nxbId}>
                                                    {item.nxbName}
                                                </MenuItem>
                                            ))
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <h3 className="font-semibold mb-2">Mô tả sách</h3>
                                <ReactQuill
                                    theme="snow"
                                    value={bookDescription}
                                    onChange={setBookDescription}
                                    modules={modules}
                                    formats={formats}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    className="bg-[#9155FD] w-full"
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    sx={{ padding: '.8rem 0', bgcolor: '#9155fd' }}
                                >
                                    Lưu
                                </Button>
                            </Grid>
                        </Grid>
                        {/* Dialog for Success */}
                        <Dialog open={successDialogOpen} onClose={handleAddSuccessClose}>
                            <DialogTitle>Thành công!</DialogTitle>
                            <DialogContent>
                                <p>Sách đã được thêm thành công.</p>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleAddSuccessClose}>Đóng</Button>
                            </DialogActions>
                        </Dialog>
                    </form>
                </Grid>
                <Grid item xs={3} sx={{ marginTop: '80px' }}>
                    <h3 className="font-bold text-lg text-center mb-5">Tải lên hình ảnh sách</h3>
                    <div className="text-center mb-5" onClick={handleImageClick}>
                        {selectedFile ? (
                            <img
                                src={URL.createObjectURL(selectedFile)}
                                alt="bookImage"
                                className="w-[240px] h-[200px] mx-auto"
                            />
                        ) : (
                            <img src="/images/no-image.jpg" alt="bookImage" className="w-[120px] h-[100px] mx-auto" />
                        )}
                        <input
                            type="file"
                            ref={inputRef}
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden h-[50px] mx-auto "
                        />
                    </div>
                    <Button
                        sx={{ display: 'block', margin: '0 auto' }}
                        className="w-[160px]"
                        variant="contained"
                        onClick={handleUpload}
                        disabled={!selectedFile}
                    >
                        Upload Image
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default AddNewBook;
