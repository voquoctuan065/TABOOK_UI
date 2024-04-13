import * as React from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';

import AddNewBook from './AddNewBook';
import UpdateBook from './UpdateBook';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 1000,
    width: 'auto',
    height: '100vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto',
};

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        border: '1px solid red',
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '30ch',
            '&:focus': {
                width: '50ch',
            },
        },
    },
}));

export default function ManageBook() {
    const [book, setBook] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const [open, setOpen] = React.useState(false);
    const [updateOpen, setUpdateOpen] = React.useState(false);
    const [successDialogOpen, setSuccessDialogOpen] = React.useState(false);

    const [deleteBookId, setDeleteBookId] = React.useState(null);
    const [selectedBookId, setSelectedBookId] = React.useState(null);
    const [searchKeyword, setSearchKeyword] = React.useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleUpdateOpen = (bookId) => {
        setSelectedBookId(bookId);
        setUpdateOpen(true);
    };
    const handleUpdateClose = () => setUpdateOpen(false);

    //-------------------------------- Get page book with size 10 -------------------------//
    const fetchBook = async () => {
        try {
            const response = await axios.get(`http://localhost:8686/admin/book?page=${currentPage - 1}&size=10`);
            if (response.status === 200) {
                setBook(response.data.booksDtoList);
                setTotalPages(response.data.totalPage);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    //-------------------------------- End page book with size 10 -------------------------//

    React.useEffect(() => {
        fetchBook();
    }, [currentPage]);

    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    //--------------------------------------------------- Handle Delete Book ---------------------------------------------------//
    const handleDelete = async (bookId) => {
        try {
            const response = await axios.delete(`http://localhost:8686/admin/book/delete/${bookId}`);
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            console.log(response);
            setSuccessDialogOpen(true);
            setDeleteBookId(null);
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const handleDeleteSuccess = () => {
        setSuccessDialogOpen(false);
        fetchBook();
    };
    //--------------------------------------------------- End Delete Category ---------------------------------------------------//

    //--------------------------------------------------- Tìm kiếm ---------------------------------------------------//
    const [noResults, setNoResults] = React.useState(false);
    const searchBook = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8686/admin/book/search?keyword=${searchKeyword}&page=${currentPage - 1}&size=10`,
            );
            if (response.status === 200) {
                const data = response.data;
                if (data.booksDtoList.length === 0) {
                    setNoResults(true);
                } else {
                    setNoResults(false);
                }
                setBook(data.booksDtoList);
                setTotalPages(data.totalPages);
                console.log('Sach tim kiem duoc', response);
            }
        } catch (error) {
            console.error('Error searching Book:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchKeyword(event.target.value);
        if (event.target.value === '') {
            fetchBook();
        } else {
            searchBook();
        }
    };
    React.useEffect(() => {
        if (searchKeyword === '') {
            fetchBook();
            setNoResults(false); // Reset trạng thái noResults khi trở về trạng thái ban đầu
        }
    }, [searchKeyword]);

    //--------------------------------------------------- End Tìm kiếm ---------------------------------------------------//

    const handleAddBookSuccess = () => {
        fetchBook();
    };

    return (
        <>
            <div className="flex justify-between mb-5">
                <form>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Tìm kiếm tên sách..."
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchKeyword}
                            onChange={handleSearchChange}
                        />
                    </Search>
                </form>
                <Button variant="outlined" className="mr-3" color="error" onClick={handleOpen}>
                    Thêm sách mới
                </Button>
            </div>

            {/* Table Content Book */}
            {!noResults ? (
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead className="bg-indigo-400 ">
                                <TableRow>
                                    <TableCell align="left">Tên sách</TableCell>
                                    <TableCell align="left">Giá</TableCell>
                                    <TableCell align="left">% Giảm giá</TableCell>
                                    <TableCell align="left">Giá sau khi giảm</TableCell>
                                    <TableCell align="left">Hình ảnh</TableCell>
                                    <TableCell align="left">Số lượng trong kho</TableCell>
                                    <TableCell align="left">Năm xuất bản</TableCell>
                                    <TableCell align="left"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {book.map((item) => (
                                    <TableRow
                                        key={item.bookId}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            sx={{
                                                maxWidth: '200px',
                                                maxHeight: '100px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}
                                        >
                                            {item.bookTitle}
                                        </TableCell>
                                        <TableCell align="left">
                                            {item.bookPrice.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </TableCell>
                                        <TableCell align="left"> - {item.discountPercent} %</TableCell>
                                        <TableCell align="left">
                                            {item.discountedPrice.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}
                                        </TableCell>
                                        <TableCell align="left" sx={{ width: '170px' }}>
                                            <img className="object-fit" src={item.bookImage} alt="" />
                                        </TableCell>
                                        <TableCell align="left">{item.stockQuantity}</TableCell>
                                        <TableCell align="left">{item.yearProduce}</TableCell>
                                        <TableCell align="right" sx={{ width: '150px' }}>
                                            <Button
                                                variant="contained"
                                                color="warning"
                                                onClick={() => handleUpdateOpen(item.bookId)}
                                                sx={{ marginBottom: '10px' }}
                                            >
                                                Sửa
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => setDeleteBookId(item.bookId)}
                                            >
                                                Xoá
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Stack
                        spacing={2}
                        sx={{ marginTop: '30px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <Pagination
                            sx={{ margin: '0 auto' }}
                            count={totalPages}
                            color="secondary"
                            page={currentPage}
                            onChange={handlePageChange}
                        />
                    </Stack>
                </>
            ) : (
                <Typography variant="body1" color="textSecondary" align="center">
                    Không tìm thấy kết quả nào
                </Typography>
            )}

            {/* Modal Thêm mới Book */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddNewBook handleClose={handleClose} handleAddBookSuccess={handleAddBookSuccess} />
                </Box>
            </Modal>
            {/* End Modal Thêm mới Book */}

            {/* Modal Sửa Book */}
            <Modal
                open={updateOpen}
                onClose={handleUpdateClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <UpdateBook
                        selectedBookId={selectedBookId}
                        handleUpdateClose={handleUpdateClose}
                        handleAddBookSuccess={handleAddBookSuccess}
                    />
                </Box>
            </Modal>
            {/* End Modal Sửa Book */}

            {/* Dialog Confirm Delete */}
            <Dialog
                open={deleteBookId !== null}
                onClose={() => setDeleteBookId(null)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xác nhận xoá</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn chắc chắn muốn xoá sách này?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteBookId(null)} color="primary">
                        Huỷ
                    </Button>
                    <Button onClick={() => handleDelete(deleteBookId)} color="primary" autoFocus>
                        Xoá
                    </Button>
                </DialogActions>
            </Dialog>
            {/* End Dialog Confirm */}

            {/* Dialog Delete Success */}
            <Dialog open={successDialogOpen} onClose={handleDeleteSuccess}>
                <DialogTitle>Thành công!</DialogTitle>
                <DialogContent>
                    <p>Sách đã được xoá thành công.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteSuccess}>Đóng</Button>
                </DialogActions>
            </Dialog>
            {/* End Dialog Delete Success */}
        </>
    );
}
