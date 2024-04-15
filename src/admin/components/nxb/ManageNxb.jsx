import * as React from 'react';

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
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import axios from 'axios';
import UpdateNxb from './UpdateNxb';
import AddNewNxb from './AddNewNxb';
import { Helmet } from 'react-helmet-async';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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

export default function ManageNxb() {
    const [nxb, setNXB] = React.useState([]);
    const [error, setError] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = React.useState('');
    const [successDialogOpen, setSuccessDialogOpen] = React.useState(false);
    const [updateOpen, setUpdateOpen] = React.useState(false);

    const [deletedNxbId, setDeleteNxbIdId] = React.useState(null);
    const [selectedNxbId, setSelectedNxbId] = React.useState(null);

    const [searchKeyword, setSearchKeyword] = React.useState('');
    const jwt = localStorage.getItem('adminJwt');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleUpdateOpen = (nxbId) => {
        setSelectedNxbId(nxbId);
        setUpdateOpen(true);
    };
    const handleUpdateClose = () => setUpdateOpen(false);

    //-------------------------------- Get Nhà Xuất Bản -------------------------//
    const fetchNXB = async () => {
        try {
            const response = await axios.get('http://localhost:8686/admin/nxb/list-nxb', {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            setNXB(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    //-------------------------------- End Get Nhà Xuất Bản -------------------------//

    //---------------------------------------- Delete NXB ----------------------------------------//
    const handleDelete = async (nxbId) => {
        try {
            const response = await axios.delete(`http://localhost:8686/admin/nxb/delete/${nxbId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            setSuccessDialogOpen(true);
            setDeleteNxbIdId(null);
        } catch (error) {
            console.error('Error deleting book:', error);
            setError('Xoá nhà xuất bản không thành công');
        }
    };

    const handleDeleteSuccess = () => {
        setSuccessDialogOpen(false);
        fetchNXB();
    };
    //--------------------------------------------------- End Delete NXB ---------------------------------------------------//

    React.useEffect(() => {
        let errorTimeout, successTimeout;

        if (error) {
            errorTimeout = setTimeout(() => {
                setError(null);
            }, 3000);
        }

        if (success) {
            successTimeout = setTimeout(() => {
                setSuccess(null);
            }, 3000);
        }

        return () => {
            clearTimeout(errorTimeout);
            clearTimeout(successTimeout);
        };
    }, [error, success]);

    //--------------------------------------------------- Tìm kiếm ---------------------------------------------------//
    const [noResults, setNoResults] = React.useState(false);
    const searchNxb = async () => {
        try {
            const response = await axios.get(`http://localhost:8686/admin/nxb/search?keyword=${searchKeyword}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            if (response.status === 200) {
                const data = response.data;
                if (data.length === 0) {
                    setNoResults(true);
                } else {
                    setNoResults(false);
                }
                setNXB(data);
            }
        } catch (error) {
            console.error('Error searching NXB:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchKeyword(event.target.value);
        if (event.target.value === '') {
            fetchNXB();
        } else {
            searchNxb();
        }
    };
    React.useEffect(() => {
        if (searchKeyword === '') {
            fetchNXB();
            setNoResults(false); // Reset trạng thái noResults khi trở về trạng thái ban đầu
        }
    }, [searchKeyword]);

    //--------------------------------------------------- End Tìm kiếm ---------------------------------------------------//

    const handleAddNXBSuccess = () => {
        fetchNXB();
    };

    return (
        <>
            <Helmet>
                <title>Quản lý nhà xuất bản</title>
            </Helmet>
            <div className="flex justify-between mb-5">
                <form>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Tìm kiếm tên nhà xuất bản..."
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchKeyword}
                            onChange={handleSearchChange}
                        />
                    </Search>
                </form>
                <Stack spacing={2}>{error && <Alert severity="error">{error}</Alert>}</Stack>
                <Stack spacing={2}>{success && <Alert severity="success">{success}</Alert>}</Stack>
                <Button variant="outlined" className="mr-3" color="error" onClick={handleOpen}>
                    Thêm nhà xuất bản
                </Button>
            </div>

            {/* Table Content Category */}
            {!noResults ? (
                <div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead className="bg-indigo-400 ">
                                <TableRow>
                                    <TableCell align="left">Tên nhà xuất bản</TableCell>
                                    <TableCell align="left">Thông tin nhà xuất bản</TableCell>
                                    <TableCell align="left"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {nxb.map((item) => (
                                    <TableRow
                                        key={item.nxbId}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {item.nxbName}
                                        </TableCell>
                                        <TableCell align="left">{item.nxbInfo}</TableCell>

                                        <TableCell align="right">
                                            <Button
                                                variant="contained"
                                                color="warning"
                                                onClick={() => handleUpdateOpen(item.nxbId)}
                                                sx={{ marginRight: '10px' }}
                                            >
                                                Sửa
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => setDeleteNxbIdId(item.nxbId)}
                                            >
                                                Xoá
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            ) : (
                <Typography variant="body1" color="textSecondary" align="center">
                    Không tìm thấy kết quả nào
                </Typography>
            )}

            {/* Modal Thêm mới Nhà Xuất Bản */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddNewNxb handleClose={handleClose} handleAddNXBSuccess={handleAddNXBSuccess} />
                </Box>
            </Modal>
            {/* End Modal Thêm mới Nhà Xuất Bản */}

            {/* Modal Sửa Nhà Xuất Bản */}
            <Modal
                open={updateOpen}
                onClose={handleUpdateClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <UpdateNxb
                        selectedNxbId={selectedNxbId}
                        handleUpdateClose={handleUpdateClose}
                        handleAddNXBSuccess={handleAddNXBSuccess}
                    />
                </Box>
            </Modal>
            {/* End Modal Sửa Nhà Xuất Bản */}

            {/* Dialog Confirm Delete */}
            <Dialog
                open={deletedNxbId !== null}
                onClose={() => setDeleteNxbIdId(null)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xác nhận xoá</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn chắc chắn muốn xoá nhà xuất bản này?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteNxbIdId(null)} color="primary">
                        Huỷ
                    </Button>
                    <Button onClick={() => handleDelete(deletedNxbId)} color="primary" autoFocus>
                        Xoá
                    </Button>
                </DialogActions>
            </Dialog>
            {/* End Dialog Confirm */}

            {/* Dialog Delete Success */}
            <Dialog open={successDialogOpen} onClose={handleDeleteSuccess}>
                <DialogTitle>Thành công!</DialogTitle>
                <DialogContent>
                    <p>Nhà xuất bản đã được xoá thành công.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteSuccess}>Đóng</Button>
                </DialogActions>
            </Dialog>
            {/* End Dialog Delete Success */}
        </>
    );
}
