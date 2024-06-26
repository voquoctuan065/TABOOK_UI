/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid';
import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    Pagination,
    Radio,
    RadioGroup,
    Stack,
    Typography,
} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNxb } from '../../../State/Nxb/Action';
import { filterBook, findBookByName, getBookByCategory } from '../../../State/Books/Action';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ProductCard from './ProductCard';
import { Helmet } from 'react-helmet-async';

const sortOptions = [
    { name: 'Giá: Thấp đến cao', value: 'price_low' },
    { name: 'Giá: Cao đến thấp', value: 'price_high' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Product() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { book, nxb } = useSelector((store) => store);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const { item, searchValue } = useParams();
    const cleanItem = item?.replace('.html', '');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    useEffect(() => {
        const data = {
            cleanItem: cleanItem,
            currentPage: currentPage - 1,
        };
        dispatch(getBookByCategory(data));
    }, [cleanItem, currentPage]);

    useEffect(() => {
        if (book.books) {
            setTotalPages(book.books.totalPage);
        }
    }, [book.books]);

    useEffect(() => {
        if (searchValue) {
            const data = {
                keyword: searchValue,
                page: currentPage - 1,
            };
            dispatch(findBookByName(data));
        }
    }, [searchValue, currentPage]);

    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 1 -------------------------------- Handle Filter ---------------------------------------- 1//
    useEffect(() => {
        dispatch(getNxb());
    }, []);

    const filters = [
        {
            id: 'nxb',
            name: 'Nhà xuất bản',
            options: nxb.nxb?.map((item) => ({
                value: item.nxbId,
                label: item.nxbName,
            })),
        },
    ];

    const singleFilters = [
        {
            id: 'price',
            name: 'Giá',
            options: [
                { value: '0-150000', label: '0đ - 150.000đ' },
                { value: '150000-300000', label: '150.000đ - 300.000đ' },
                { value: '300000-500000', label: '300.000đ - 500.000đ' },
                { value: '500000-700000', label: '500.000đ - 700.000đ' },
                { value: '700000', label: '700.000đ trở lên' },
            ],
        },
    ];

    const handleSort = (value) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('sort', value);
        const query = searchParams.toString();

        navigate({ search: `?${query}` });
    };

    const handleFilter = (value, sectionId) => {
        const searchParams = new URLSearchParams(location.search);
        console.log(searchParams.toString());
        value = parseInt(value);

        let filterValue = searchParams.get(sectionId);

        if (filterValue === null) {
            filterValue = value.toString();
        } else {
            const values = filterValue.split(',');
            const index = values.indexOf(value.toString());

            if (index > -1) {
                values.splice(index, 1);
            } else {
                values.push(value.toString());
            }

            filterValue = values.join(',');
        }

        if (filterValue === '') {
            searchParams.delete(sectionId);
        } else {
            searchParams.set(sectionId, filterValue);
        }

        const query = searchParams.toString();
        console.log(query);
        navigate({ search: `${query}` });
    };

    const handleRadioFilterChange = (e, sectionId) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set(sectionId, e.target.value);
        const query = searchParams.toString();

        navigate({ search: `?${query}` });
    };

    const decodedQueryString = decodeURIComponent(location.search);
    const searchParams = new URLSearchParams(decodedQueryString);
    const priceValue = searchParams.get('price');
    const nxbValue = searchParams.get('nxb');
    const sortValue = searchParams.get('sort');

    useEffect(() => {
        const [minPrice, maxPrice] = priceValue === null ? [0, 150000] : priceValue.split('-').map(Number);

        const data = {    
            minPrice,
            maxPrice,
            nxbId: nxbValue || [],
            sort: sortValue || 'price_low',
            page: currentPage - 1,
            size: 24,
        };
        if (priceValue || nxbValue || sortValue) {
            dispatch(filterBook(data));
        }
    }, [priceValue, nxbValue, sortValue, currentPage]);
    // 2 -------------------------------- End Handle Filter ---------------------------------------- 2 //

    return (
        <>
            <Helmet>
                <title> Trang chủ </title>
            </Helmet>
            <Navbar />
            <div className="bg-white">
                <div>
                    {/* Mobile filter dialog */}
                    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                            <Transition.Child
                                as={Fragment}
                                enter="transition-opacity ease-linear duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity ease-linear duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black bg-opacity-25" />
                            </Transition.Child>
                            <div className="fixed inset-0 z-40 flex">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transition ease-in-out duration-300 transform"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transition ease-in-out duration-300 transform"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                        <div className="flex items-center justify-between px-4">
                                            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                            <button
                                                type="button"
                                                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                                onClick={() => setMobileFiltersOpen(false)}
                                            >
                                                <span className="sr-only">Close menu</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                        {/* Filters */}
                                        <form className="mt-4 border-t border-gray-200">
                                            <h3 className="sr-only">Categories</h3>
                                            {filters.map((section) => (
                                                <Disclosure
                                                    as="div"
                                                    key={section.id}
                                                    className="border-t border-gray-200 px-4 py-6"
                                                >
                                                    {({ open }) => (
                                                        <>
                                                            <h3 className="-mx-2 -my-3 flow-root">
                                                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                                    <span className="font-medium text-gray-900">
                                                                        {section.name}
                                                                    </span>
                                                                    <span className="ml-6 flex items-center">
                                                                        {open ? (
                                                                            <MinusIcon
                                                                                className="h-5 w-5"
                                                                                aria-hidden="true"
                                                                            />
                                                                        ) : (
                                                                            <PlusIcon
                                                                                className="h-5 w-5"
                                                                                aria-hidden="true"
                                                                            />
                                                                        )}
                                                                    </span>
                                                                </Disclosure.Button>
                                                            </h3>
                                                            <Disclosure.Panel className="pt-6">
                                                                <div className="space-y-6">
                                                                    {section.options.map((option, optionIdx) => (
                                                                        <div
                                                                            key={option.value}
                                                                            className="flex items-center"
                                                                        >
                                                                            <input
                                                                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                name={`${section.id}[]`}
                                                                                defaultValue={option.value}
                                                                                type="checkbox"
                                                                                defaultChecked={option.checked}
                                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                            />
                                                                            <label
                                                                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                            >
                                                                                {option.label}
                                                                            </label>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </Disclosure.Panel>
                                                        </>
                                                    )}
                                                </Disclosure>
                                            ))}
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition.Root>
                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Sản phẩm</h1>
                            <div className="flex items-center">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                            Sắp xếp
                                            <ChevronDownIcon
                                                className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                                aria-hidden="true"
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                {sortOptions.map((option) => (
                                                    <Menu.Item key={option.name}>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={() => handleSort(option.value)}
                                                                className={classNames(
                                                                    option.current
                                                                        ? 'font-medium text-gray-900'
                                                                        : 'text-gray-500',
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm',
                                                                )}
                                                            >
                                                                {option.name}
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                                <button
                                    type="button"
                                    className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                                >
                                    <span className="sr-only">View grid</span>
                                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                                </button>
                                <button
                                    type="button"
                                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                    onClick={() => setMobileFiltersOpen(true)}
                                >
                                    <span className="sr-only">Filters</span>
                                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                        <section aria-labelledby="products-heading" className="pb-24 pt-6">
                            <h2 id="products-heading" className="sr-only">
                                Products
                            </h2>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                {/* Filters */}
                                <form className="hidden lg:block">
                                    {filters.map((section) => (
                                        <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">
                                                                {section.name}
                                                            </span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-4">
                                                            {section.options.map((option, optionIdx) => (
                                                                <div key={option.value} className="flex items-center">
                                                                    <input
                                                                        onChange={(event) =>
                                                                            handleFilter(
                                                                                option.value,
                                                                                section.id,
                                                                                event.target.checked,
                                                                            )
                                                                        }
                                                                        id={`filter-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        defaultValue={option.value}
                                                                        type="checkbox"
                                                                        defaultChecked={option.checked}
                                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                        className="ml-3 text-sm text-gray-600"
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                    {singleFilters.map((section) => (
                                        <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                            <FormLabel
                                                                sx={{ color: 'black', fontSize: '14px' }}
                                                                className="font-medium"
                                                                id="demo-radio-buttons-group-label"
                                                            >
                                                                {section.name}
                                                            </FormLabel>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <div className="space-y-4">
                                                            <FormControl>
                                                                <RadioGroup
                                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                                    defaultValue="female"
                                                                    name="radio-buttons-group"
                                                                >
                                                                    {section.options.map((option, optionIdx) => (
                                                                        <div key={optionIdx}>
                                                                            <FormControlLabel
                                                                                onChange={(event) =>
                                                                                    handleRadioFilterChange(
                                                                                        event,
                                                                                        section.id,
                                                                                    )
                                                                                }
                                                                                value={option.value}
                                                                                control={<Radio />}
                                                                                label={option.label}
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </form>
                                {/* Product grid */}
                                <div className="lg:col-span-3 w-full">
                                    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-6">
                                        {book.books?.booksDtoList && book.books?.booksDtoList.length > 0 ? (
                                            <div className="grid grid-cols-4 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6">
                                                {book.books?.booksDtoList.map((item) => {
                                                    return <ProductCard product={item} key={item.bookId} />;
                                                })}
                                            </div>
                                        ) : (
                                            <Box
                                                sx={{
                                                    py: 12,
                                                    maxWidth: 480,
                                                    mx: 'auto',
                                                    display: 'flex',
                                                    minHeight: '100vh',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Typography variant="h3" sx={{ mb: 3 }}>
                                                    Sory, Not Found!
                                                </Typography>

                                                <Typography sx={{ color: 'text.secondary' }}>
                                                    Xin lỗi, chúng tôi không thể tìm thấy kết quả nào theo bộ lọc của
                                                    bạn. Vui lòng tìm kiếm theo bộ lọc khác.
                                                </Typography>

                                                <Box
                                                    component="img"
                                                    src="/images/logo/illustration_404.svg"
                                                    sx={{
                                                        mx: 'auto',
                                                        height: 260,
                                                        my: { xs: 5, sm: 10 },
                                                    }}
                                                />
                                            </Box>
                                        )}
                                        {book.books?.booksDtoList && (
                                            <Stack
                                                spacing={2}
                                                sx={{
                                                    marginTop: '30px',
                                                    textAlign: 'center',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Pagination
                                                    sx={{ margin: '0 auto' }}
                                                    count={totalPages}
                                                    color="secondary"
                                                    page={currentPage}
                                                    onChange={handlePageChange}
                                                />
                                            </Stack>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>

            <Footer />
        </>
    );
}
