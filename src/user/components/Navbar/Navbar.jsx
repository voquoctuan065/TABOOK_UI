import { Fragment, useEffect, useState } from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Menu, MenuItem, Typography } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import axios from 'axios';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const navigationData = {
    categories: [
        {
            id: '1',
            name: 'Sách',
            sections: [
                {
                    id: '',
                    name: 'Văn học',
                    items: [
                        { name: 'Tiểu thuyết' },
                        { name: 'Truyện ngắn' },
                        { name: 'Ngôn tình' },
                        { name: 'Light Novel' },
                    ],
                },
                {
                    id: '3',
                    name: 'Kinh tế',
                    items: [{ name: 'Nhân vật, bài học kinh doanh' }, { name: 'marketing - bán hàng' }],
                },
                {
                    id: '3',
                    name: 'Tâm lý - kĩ năng sống',
                    items: [
                        { name: 'Kỹ năng sống' },
                        { name: 'Rèn luyện nhân cách' },
                        { name: 'tâm lý' },
                        { name: 'Sách cho tuổi mới lớn' },
                    ],
                },
            ],
        },
        {
            id: '2',
            name: 'Sách nước ngoài',

            sections: [
                {
                    id: 'Fiction',
                    name: 'Fiction',
                    items: [{ name: 'romance' }, { name: 'fantasy' }, { name: 'Classics' }],
                },
                {
                    id: 'Bussiness & management',
                    name: 'Bussiness & management',
                    items: [{ name: 'Bussiness & management' }, { name: 'Economics' }],
                },
            ],
        },
    ],
};

function Navbar() {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);
    const [categories, setCategories] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);
    const openUserMenu = Boolean(anchorEl);

    const handleUserClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorEl(null);
    };

    const handleCategoryClick = (category, child, secondChild, close) => {
        // navigate(`/${category.id}/${child.id}/${secondChild.id}`);
        console.log(category.categoryId);
        console.log(child.categoryId);
        console.log(secondChild.categoryId);
        close();
    };

    // 1 -------------------------------- Handle Get User Profile ---------------------------------------- 1//
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            const getUserProfile = async () => {
                try {
                    const response = await axios.get('http://localhost:8686/api/user/profile', {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    });
                    setUserProfile(response.data);
                } catch (error) {
                    console.error('Error fetching data: ', error);
                }
            };

            getUserProfile();
        }
    }, []);
    // 1 -------------------------------- End Handle Get User Profile ------------------------------------ 1//

    // 2 -------------------------------- Handle Logout ---------------------------------------- 2//
    const handleLogout = () => {
        localStorage.removeItem('jwt');
        setUserProfile(null);
    };
    // 2 -------------------------------- End Handle Logout---------------------------------------- 2//

    // 3 -------------------------------- Handle Get Category -------------------------------------------- 3//

    useEffect(() => {
        const getCategory = async () => {
            try {
                const response = await axios.get('http://localhost:8686/public/category/level1');
                setCategories(response.data);
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        getCategory();
    }, []);

    // 3 -------------------------------- End Handle Get Category ---------------------------------------- 3//

    return (
        <div className="bg-white">
            <header className="relative bg-indigo-500">
                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="">
                        <div className="flex h-16 items-center">
                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <div onClick={() => navigate('/')} className="cursor-pointer">
                                    <span className="sr-only">Your Company</span>
                                    <img className="h-8 w-auto" src="/images/logo/mainlogo.png" alt="" />
                                </div>
                            </div>

                            {/* Flyout menu */}
                            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                                <div className="flex h-full space-x-8">
                                    {categories.map((category) => (
                                        <Popover key={category.categoryId} className="flex">
                                            {({ open }) => (
                                                <>
                                                    <div className="relative flex">
                                                        <Popover.Button
                                                            className={classNames(
                                                                open ? 'text-red-500' : 'text-white hover:text-red-500',
                                                                'relative z-10 -mb-px flex items-center pt-px text-sm font-medium transition-colors duration-200 ease-out',
                                                            )}
                                                        >
                                                            {category.categoryName}
                                                        </Popover.Button>
                                                    </div>

                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-200"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="transition ease-in duration-150"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500 z-50">
                                                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                            <div
                                                                className="absolute inset-0 top-1/2 bg-white shadow"
                                                                aria-hidden="true"
                                                            />

                                                            <div
                                                                className="relative bg-white container m-auto rounded"
                                                                style={{
                                                                    boxShadow:
                                                                        'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
                                                                }}
                                                            >
                                                                <div className="mx-auto max-w-7xl px-8">
                                                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16 justify-center">
                                                                        <div className="row-start-1 grid grid-cols-3 gap-x-2 gap-y-10 text-sm">
                                                                            {category.children.map((child) => (
                                                                                <div key={child.categoryId}>
                                                                                    <p
                                                                                        id={`${child.categoryId}-heading`}
                                                                                        className="font-medium text-gray-900"
                                                                                    >
                                                                                        {child.categoryName}
                                                                                    </p>

                                                                                    <ul
                                                                                        role="list"
                                                                                        aria-labelledby={`${child.categoryId}-heading`}
                                                                                        className="mt-6 space-y-3 sm:mt-4 sm:space-y-4"
                                                                                    >
                                                                                        {child.children.map(
                                                                                            (secondChild) => (
                                                                                                <li
                                                                                                    key={
                                                                                                        secondChild.categoryName
                                                                                                    }
                                                                                                    className="flex"
                                                                                                >
                                                                                                    <p
                                                                                                        onClick={() =>
                                                                                                            handleCategoryClick(
                                                                                                                category,
                                                                                                                child,
                                                                                                                secondChild,
                                                                                                                close,
                                                                                                            )
                                                                                                        }
                                                                                                        className="cursor-pointer hover:text-gray-800"
                                                                                                    >
                                                                                                        {
                                                                                                            secondChild.categoryName
                                                                                                        }
                                                                                                    </p>
                                                                                                </li>
                                                                                            ),
                                                                                        )}
                                                                                    </ul>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Popover.Panel>
                                                    </Transition>
                                                </>
                                            )}
                                        </Popover>
                                    ))}

                                    {/* {navigationData.pages.map((page) => (
            <a
                key={page.name}
                href={page.href}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
            >
                {page.name}
            </a>
        ))} */}
                                </div>
                            </Popover.Group>
                            {/* End Flyout menu */}
                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    {userProfile ? (
                                        <div>
                                            <Avatar
                                                className="text-white"
                                                onClick={handleUserClick}
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                sx={{
                                                    bgcolor: deepPurple[500],
                                                    color: 'white',
                                                }}
                                            >
                                                {userProfile.fullName[0]}
                                            </Avatar>

                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={openUserMenu}
                                                onClose={handleCloseUserMenu}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>

                                                <MenuItem>My Orders</MenuItem>
                                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                            </Menu>
                                        </div>
                                    ) : (
                                        <>
                                            <span
                                                onClick={() => navigate('/sign-in')}
                                                className="cursor-pointer text-sm font-medium text-white hover:text-red-500"
                                            >
                                                Đăng nhập
                                            </span>
                                            <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                            <span
                                                onClick={() => navigate('/sign-up')}
                                                className="cursor-pointer text-sm font-medium text-white hover:text-red-500"
                                            >
                                                Tạo tài khoản
                                            </span>
                                        </>
                                    )}
                                </div>

                                {/* Search */}
                                <div className="flex lg:ml-6">
                                    <a href="/search" className="p-2 text-white hover:text-red-500">
                                        <span className="sr-only">Search</span>
                                        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                    </a>
                                </div>

                                {/* Cart */}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <Button
                                        onClick={() => navigate('/cart')}
                                        className="group -m-2 flex items-center p-2"
                                    >
                                        <ShoppingBagIcon
                                            className="h-6 w-6 flex-shrink-0 text-white group-hover:text-red-500"
                                            aria-hidden="true"
                                        />
                                        <span className="ml-2 text-sm font-medium text-white group-hover:text-red-500">
                                            0
                                        </span>
                                        <span className="sr-only">items in cart, view bag</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Navbar;
