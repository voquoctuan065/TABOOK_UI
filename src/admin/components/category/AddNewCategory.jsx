/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
export default function AddNewCategory({ handleAddCategorySuccess, handleClose, category }) {
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [level, setLevel] = useState(1);
    const [categories, setCategories] = useState([]);
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    const jwt = localStorage.getItem('adminJwt');

    useEffect(() => {
        setCategories(category);
    }, [category]);

    //--------------------------------------------------- Form Validate ---------------------------------------------------//
    const handleLevelChange = (event) => {
        setLevel(event.target.value);
    };

    const handleParentCategoryChange = (event) => {
        const level = event.target.value;
        if (level === null || level.trim === '') {
            setError('Bạn phải chọn level cho thể loại');
        }
        if (level === 1) {
            setParentCategory('');
        }
        setParentCategory(event.target.value);
    };

    const handleCategoryNameChange = (event) => {
        const category_name = event.target.value;

        if (!category_name || category_name.trim() === '') {
            setError('Tên sách không được để trống');
        } else if (category_name.length > 500) {
            setError(`Tên sách phải nằm trong khoảng từ 0 đến 500 ký tự`);
        } else {
            setError('');
        }

        setCategoryName(event.target.value);
    };

    const handleAddSuccessClose = () => {
        setSuccessDialogOpen(false);
        handleClose();
        handleAddCategorySuccess();
    };
    //--------------------------------------------------- End Validate ---------------------------------------------------//

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        let parentCategoryId = parseInt(formData.get('parentCategory'));
        let formattedParentCategory = null;

        if (!isNaN(parentCategoryId)) {
            formattedParentCategory = {
                categoryId: parentCategoryId,
            };
        }

        const inputData = {
            categoryName: formData.get('categoryName'),
            level: parseInt(formData.get('level')),
            parentCategory: formattedParentCategory,
        };

        try {
            const response = await axios.post('http://localhost:8686/admin/category/add-category', inputData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log('Response:', response.data);
            setSuccessDialogOpen(true);
        } catch (error) {
            console.error('Error adding category:', error);
        }
        console.log('inputData?', inputData);
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="font-bold text-2xl text-center text-red-700">Thêm Thể Loại Mới</h5>

            <Stack sx={{ width: '100%' }} spacing={2}>
                {error && <Alert severity="error">{error}</Alert>}
            </Stack>
            <Grid container spacing={3} sx={{ width: '100%' }}>
                <Grid item xs={6}>
                    <TextField
                        required
                        type="text"
                        id="categoryName"
                        name="categoryName"
                        label="Tên thể loại"
                        fullWidth
                        autoComplete="Tên thể loại"
                        value={categoryName}
                        onChange={handleCategoryNameChange}
                    />
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="levelLabel">Level</InputLabel>
                        <Select
                            labelId="levelLabel"
                            id="level"
                            name="level"
                            value={level}
                            label="Level"
                            onChange={handleLevelChange}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="parentCategoryLabel">Parent Category</InputLabel>
                        <Select
                            labelId="parentCategoryLabel"
                            id="parentCategory"
                            name="parentCategory"
                            value={parentCategory}
                            label="Parent Category"
                            onChange={handleParentCategoryChange}
                        >
                            {categories
                                .filter((item) => item.level !== 3)
                                .map((item) => (
                                    <MenuItem key={item.categoryId} value={item.categoryId}>
                                        {item.categoryName}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
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
                    <p>Thể loại đã được thêm thành công.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddSuccessClose}>Đóng</Button>
                </DialogActions>
            </Dialog>
        </form>
    );
}
