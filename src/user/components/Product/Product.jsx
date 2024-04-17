import { Helmet } from 'react-helmet-async';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid';

import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ProductCard from './ProductCard';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FormControl, FormControlLabel, FormLabel, Pagination, Radio, RadioGroup, Stack } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const sortOptions = [
    { name: 'Mới nhất', href: '#', current: false },
    { name: 'Giá: Thấp đến Cao', href: '#', current: false },
    { name: 'Giá: Cao đến Thấp', href: '#', current: false },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function Product() {
    const navigate = useNavigate();
    const location = useLocation();
    const [book, setBook] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFilters, setSelectedFilters] = useState({});
    const [totalPages, setTotalPages] = useState(1);
    const { category, subcategory, '*': item } = useParams();
    const cleanItem = item.replace('.html', '');

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // 1 -------------------------------- Handle Get Book By Category ---------------------------------------- 1//
    useEffect(() => {
        const getBookByCategory = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8686/public/book/c?pathName=${cleanItem}&page=${currentPage - 1}&size=2`,
                );
                setBook(response.data.booksDtoList);
                console.log(response.data);
                setTotalPages(response.data.totalPage);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        getBookByCategory();
    }, [cleanItem, currentPage]);
    // 1 -------------------------------- End Handle Book By Category ---------------------------------------- 1//

    // 2 -------------------------------- Handle Filter ---------------------------------------- 2//
    const filters = [
        {
            id: 'nxb',
            name: 'Nhà xuất bản',
            options: [
                { value: 'nxb1', label: 'Nhà Xuất Bản Kim Đồng' },
                { value: 'nxb2', label: 'Nhà Xuất Bản Văn Học' },
                { value: 'nxb3', label: 'Nhà Xuất Bản Trẻ' },
                { value: 'nxb4', label: 'Nhà Xuất Bản Thế Giới' },
                { value: 'nxb5', label: 'Nhà Xuất Bản Đại Học Quốc Gia Hà Nội' },
                { value: 'nxb6', label: 'Nhà Xuất Bản Tri Thức' },
            ],
        },
    ];

    const singleFilter = [
        {
            id: 'price',
            name: 'Giá',
            options: [
                { value: '0-15000', label: '0đ - 150.000đ', checked: false },
                { value: '150000-300000', label: '150.000đ - 300.000đ', checked: false },
                { value: '300000-500000', label: '300.000đ - 500.000đ', checked: false },
                { value: '500000-700000', label: '500.000đ - 700.000đ', checked: false },
                { value: '700000', label: '700.000đ trở lên', checked: false },
            ],
        },
    ];
    const handleFilter = (value, sectionId) => {
        const searchParams = new URLSearchParams(location.search);
        let filterValue = searchParams.getAll(sectionId);

        if (filterValue.length > 0 && filterValue[0].split(',').includes(value)) {
            filterValue = filterValue[0].split(',').filter((item) => item !== value);
            if (filterValue.length === 0) {
                searchParams.delete(sectionId);
            }
        } else {
            filterValue.push(value);
        }

        if (filterValue.length > 0) {
            searchParams.set(sectionId, filterValue.join(','));
        }

        const query = searchParams.toString();
        navigate({ search: `?${query}` });
    };

    const hanldeRadioFilterChange = (e, sectionId) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set(sectionId, e.target.value);
        const query = searchParams.toString();

        navigate({ search: `?${query}` });
    };

    // 2 -------------------------------- End Handle Filter ---------------------------------------- 2//

    const handlePageChange = (event, pageNumber) => {
        event.preventDefault();
        setCurrentPage(pageNumber);
    };
    return (
        <>
            <Helmet>
                <title> Sản phẩm </title>
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
                                                                                onChange={() =>
                                                                                    handleFilter(
                                                                                        option.value,
                                                                                        section.id,
                                                                                    )
                                                                                }
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

                                            {singleFilter.map((section) => (
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
                                                                                onChange={() =>
                                                                                    handleFilter(
                                                                                        option.value,
                                                                                        section.id,
                                                                                    )
                                                                                }
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
                        <div className="flex items-baseline justify-between border-b border-gray-200 py-6">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

                            <div className="flex items-center">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                            Sort
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
                                                            <a
                                                                href={option.href}
                                                                className={classNames(
                                                                    option.current
                                                                        ? 'font-medium text-gray-900'
                                                                        : 'text-gray-500',
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm',
                                                                )}
                                                            >
                                                                {option.name}
                                                            </a>
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
                                <div>
                                    <div className="flex py-10 justify-between items-center">
                                        <h1 className="text-lg, opacity-50 font-bold">Lọc sản phẩm</h1>
                                        <FilterListIcon />
                                    </div>
                                    <form className="hidden lg:block">
                                        {filters.map((section) => (
                                            <Disclosure
                                                as="div"
                                                key={section.id}
                                                className="border-b border-gray-200 py-6"
                                            >
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-my-3 flow-root">
                                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                                <span className="text-gray-900">{section.name}</span>
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
                                                            <div className="space-y-4">
                                                                {section.options.map((option, optionIdx) => (
                                                                    <div
                                                                        key={option.value}
                                                                        className="flex items-center"
                                                                    >
                                                                        <input
                                                                            id={`filter-${section.id}-${optionIdx}`}
                                                                            name={`${section.id}[]`}
                                                                            defaultValue={option.value}
                                                                            type="checkbox"
                                                                            onChange={() =>
                                                                                handleFilter(option.value, section.id)
                                                                            }
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

                                        {singleFilter.map((section) => (
                                            <Disclosure
                                                as="div"
                                                key={section.id}
                                                className="border-b border-gray-200 py-6"
                                            >
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
                                                                                        hanldeRadioFilterChange(
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
                                </div>

                                {/* Product grid */}

                                <div className="lg:col-span-3 w-full">
                                    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-6">
                                        <div className="grid grid-cols-4 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6">
                                            {book.map((item) => (
                                                <ProductCard product={item} key={item.bookId} />
                                            ))}
                                        </div>

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

export default Product;
