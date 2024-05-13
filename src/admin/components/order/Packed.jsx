import { Helmet } from 'react-helmet-async';

import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

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
            width: '40ch',
            '&:focus': {
                width: '50ch',
            },
        },
    },
}));

const tableCell = [
    'Mã hoá đơn',
    'Tên khách hàng',
    'Địa chỉ nhận',
    'SĐT',
    'Ngày tạo',
    'Phương thức',
    'Thanh toán',
    'Trạng thái',
    'Xem chi tiết',
    'Hành động',
];

function Packed() {
    return (
        <>
            <Helmet>
                <title>Đóng gói đơn hàng</title>
            </Helmet>
            <div className="mt-8">
                <div className="flex justify-start">
                    <form>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Tìm kiếm đơn hàng..."
                                inputProps={{ 'aria-label': 'search' }}
                                // value={1}
                                // onChange={1}
                            />
                        </Search>
                    </form>
                </div>

                <div className="mt-8">
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead className="bg-indigo-400 ">
                                <TableRow>
                                    {tableCell.map((item) => (
                                        <TableCell key={item} align="left">
                                            {item}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    // key={item.nxbId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {/* {item.nxbName} */}
                                    </TableCell>
                                    <TableCell align="left">ìn</TableCell>

                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            // onClick={() => handleUpdateOpen(item.nxbId)}
                                            sx={{ marginRight: '10px' }}
                                        >
                                            Sửa
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            // onClick={() => setDeleteNxbIdId(item.nxbId)}
                                        >
                                            Xoá
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>
    );
}

export default Packed;
