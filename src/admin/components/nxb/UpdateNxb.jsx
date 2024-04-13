import { useEffect, useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Stack,
    TextField,
} from '@mui/material';
import axios from 'axios';

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
function UpdateNxb({ selectedNxbId, handleUpdateClose, handleAddNXBSuccess }) {
    const [error, setError] = useState('');
    const [nxbById, setNxbById] = useState('');
    const [nxbName, setNxbName] = useState('');
    const [nxbInfo, setNxbInfo] = useState('');
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    useEffect(() => {
        const fetNxbById = async () => {
            try {
                const response = await axios.get(`http://localhost:8686/admin/nxb/${selectedNxbId}`);
                setNxbById(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dứ liệu sách: ', error);
            }
        };

        fetNxbById();
    }, []);

    useEffect(() => {
        console.log(nxbById);
        if (nxbById) {
            setNxbName(nxbById.nxbName);
            setNxbInfo(nxbById.nxbInfo);
        }
    }, [nxbById]);

    const handleNXBSChange = (event) => {
        const nxbString = event.target.value;
        const specialChars = /[!@#$%^&*()?":{}|<>]/;
        const containsNumber = /\d/.test(nxbString);
        if (!nxbString || nxbString.trim() === '') {
            setError('Tên NXB không được để trống! Vui lòng nhập tên tác giả.');
        } else if (nxbString.length > 255) {
            setError('Tên NXB không được vượt quá 255 ký tự! Vui lòng nhập lại.');
        } else if (specialChars.test(nxbString)) {
            setError('Tên NXB không được chứa các ký tự đặc biệt! Vui lòng nhập lại.');
        } else if (containsNumber) {
            setError('Tên không được chứa số! Vui lòng nhập lại!');
        } else {
            setError('');
        }
        setNxbName(nxbString);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const inputData = {
            nxbName: formData.get('nxbName'),
            nxbInfo: nxbInfo,
        };

        try {
            await axios.put(`http://localhost:8686/admin/nxb/update/${selectedNxbId}`, inputData);
            setSuccessDialogOpen(true);
        } catch (error) {
            console.log(error);
        }
        console.log(inputData);
    };

    const handleAddSuccessClose = () => {
        setSuccessDialogOpen(false);
        handleUpdateClose();
        handleAddNXBSuccess();
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="font-bold text-2xl text-center text-red-700">Sửa nhà xuất bản</h5>
            <Stack sx={{ width: '100%' }} spacing={2}>
                {error && <Alert severity="error">{error}</Alert>}
            </Stack>
            <Grid container spacing={3} sx={{ width: '100%' }}>
                <Grid item xs={12}>
                    <TextField
                        required
                        type="text"
                        id="nxbName"
                        name="nxbName"
                        label="Tên nhà xuất bản"
                        fullWidth
                        autoComplete="A"
                        value={nxbName}
                        onChange={handleNXBSChange}
                    />
                </Grid>

                <Grid item xs={12}>
                    <h3 className="font-semibold mb-2">Thông tin nhà xuất bản</h3>
                    <ReactQuill
                        theme="snow"
                        value={nxbInfo}
                        onChange={setNxbInfo}
                        modules={modules}
                        formats={formats}
                        style={{ height: '200px' }}
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
                    <p>Nhà xuất bản đã được thêm thành công.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddSuccessClose}>Đóng</Button>
                </DialogActions>
            </Dialog>
        </form>
    );
}

export default UpdateNxb;
