import { Fragment, useEffect, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';

import { deepPurple } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logout } from '../../../State/Auth/Action';
import { getCategory } from '../../../State/Categories/Action';
import Search from '../Search/Search';
import routes from '../../../config/routes';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [categories, setCategories] = useState([]);
    const jwt = localStorage.getItem('jwt');
    const { auth, category, cartItems } = useSelector((store) => ({
        auth: store.auth,
        category: store.category,
        cartItems: store.cart.cartItems,
    }));

    const [anchorEl, setAnchorEl] = useState(null);
    const openUserMenu = Boolean(anchorEl);
    const handleUserClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorEl(null);
    };

    const handleCategoryClick = (category, child, secondChild) => {
        const categoryPath = category.pathName;
        const childPath = child?.pathName;
        const secondChildPath = secondChild?.pathName;

        navigate(`/${categoryPath}/${childPath}/${secondChildPath}.html`);
    };

    // 1 -------------------------------- Handle Get User Profile ---------------------------------------- 1//
    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt));
        }
    }, [jwt, auth.jwt]);

    useEffect(() => {
        if (auth.user) {
            setUserProfile(auth.user);
        }
    }, [auth.user]);
    // 1 -------------------------------- End Handle Get User Profile ------------------------------------ 1//

    // 2 -------------------------------- Handle Logout ---------------------------------------- 2//
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('jwt');
        setUserProfile(null);
    };
    // 2 -------------------------------- End Handle Logout---------------------------------------- 2//

    // 3 -------------------------------- Handle Get Category -------------------------------------------- 3//

    useEffect(() => {
        dispatch(getCategory());
    }, []);

    useEffect(() => {
        if (category.categoryList) {
            setCategories(category.categoryList);
        }
    }, [category.categoryList]);

    // 3 -------------------------------- End Handle Get Category ---------------------------------------- 3//
    return (
        <div className="bg-white">
            <header className="relative bg-indigo-500">
                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="">
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>
                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0" onClick={() => navigate(routes.home)}>
                                <div className="cursor-pointer">
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
                                                                                                    <Popover.Button
                                                                                                        onClick={() =>
                                                                                                            handleCategoryClick(
                                                                                                                category,
                                                                                                                child,
                                                                                                                secondChild,
                                                                                                            )
                                                                                                        }
                                                                                                        className="text-left cursor-pointer hover:text-red-800"
                                                                                                    >
                                                                                                        {
                                                                                                            secondChild.categoryName
                                                                                                        }
                                                                                                    </Popover.Button>
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
                                </div>
                            </Popover.Group>

                            <Search />

                            {/* Cart */}
                            <div className="ml-4 flow-root lg:ml-6">
                                <Button
                                    onClick={() => navigate(routes.cart)}
                                    className="group -m-2 flex items-center p-2"
                                >
                                    <ShoppingBagIcon
                                        className="h-6 w-6 flex-shrink-0 text-white group-hover:text-red-500"
                                        aria-hidden="true"
                                    />
                                    <span className="ml-2 text-sm font-medium text-white group-hover:text-red-500">
                                        {cartItems ? cartItems.length : 0}
                                    </span>
                                    <span className="sr-only">items in cart, view bag</span>
                                </Button>
                            </div>

                            {/* End Flyout menu */}
                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    {userProfile ? (
                                        <div className="flex items-center">
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

                                            {userProfile.fullName}

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
                                                <MenuItem onClick={() => navigate(routes.orders)}>Lịch sử mua</MenuItem>
                                                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                                            </Menu>
                                        </div>
                                    ) : (
                                        <>
                                            <span
                                                onClick={() => navigate(routes.signIn)}
                                                className="cursor-pointer text-sm font-medium text-white hover:text-red-500"
                                            >
                                                Đăng nhập
                                            </span>
                                            <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                            <span
                                                onClick={() => navigate(routes.signUp)}
                                                className="cursor-pointer text-sm font-medium text-white hover:text-red-500"
                                            >
                                                Tạo tài khoản
                                            </span>
                                        </>
                                    )}
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
