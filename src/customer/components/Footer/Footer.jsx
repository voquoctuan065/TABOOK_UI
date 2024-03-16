import React from 'react';
import { Typography } from '@mui/material';
import { SocialIcon } from 'react-social-icons/component';
import 'react-social-icons/tiktok';
import 'react-social-icons/facebook';
import 'react-social-icons/instagram';

const LINKS = [
    {
        title: 'Về chúng tôi',
        items: ['Điều khoản sử dụng', 'Chính sách bảo mật', 'Flash Sale', 'Chính sách mua hàng'],
    },
    {
        title: 'Chăm sóc khách hàng',
        items: ['Trung tâm trợ giúp & CSKH', 'Hướng dẫn mua hàng', 'Trả hàng & hoàn tiền', 'Thanh toán'],
    },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
    return (
        <footer className="relative w-full bg-indigo-950 ">
            <div className="mx-auto w-full max-w-7xl px-8 pt-6">
                <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2 ">
                    <Typography variant="h5" className="mb-6 text-white">
                        <div>
                            <img src="/mainlogo.png" alt="" />
                        </div>

                        <p className="text-lg py-5 font-medium opacity-80">ĐĂNG KÝ NHẬN THÔNG BÁO SẢN PHẨM MỚI</p>
                        <form method="" action="" className="flex align-center gap-4">
                            <div className="relative min-w-[200px] w-[350px] h-10 text-base">
                                <input
                                    className="peer w-full h-full bg-transparent text-red-gray-700 font-sans 
                                    font-normal outline outline-0 focus:outline-0 disabled:bg-red-gray-50 
                                    disabled:border-0 transition-all placeholder-shown:border
                                    placeholder-shown:border-red-gray-200 placeholder-shown:border-t-red-gray-200 
                                    border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 
                                    rounded-[7px] border-red-gray-200 focus:border-red-900"
                                    placeholder=""
                                />
                                <label
                                    className="flex w-full h-full select-none pointer-events-none absolute 
                                left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-red-gray-500 
                                leading-tight peer-focus:leading-tight peer-disabled:text-transparent 
                                peer-disabled:peer-placeholder-shown:text-red-gray-500 transition-all -top-1.5 
                                peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] 
                                before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 
                                peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t 
                                peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 
                                before:pointer-events-none before:transition-all peer-disabled:before:border-transparent 
                                after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 
                                after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md 
                                after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 
                                after:pointer-events-none after:transition-all peer-disabled:after:border-transparent 
                                peer-placeholder-shown:leading-[3.75] text-red-500 peer-focus:text-red-900 
                                before:border-red-gray-200 peer-focus:before:!border-gray-900 after:border-red-gray-200 
                                peer-focus:after:!border-red-900 text-base"
                                >
                                    Email
                                </label>
                            </div>
                            <button
                                className="
                                bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 
                                hover:border-transparent rounded
                                text-base"
                            >
                                Gửi đi
                            </button>
                        </form>
                    </Typography>
                    <div className="grid grid-cols-2 flex justify-items-end gap-4 text-white">
                        {LINKS.map(({ title, items }) => (
                            <ul key={title}>
                                <Typography variant="small" color="blue-gray" className="mb-3 font-medium opacity-80">
                                    {title}
                                </Typography>
                                {items.map((link) => (
                                    <li key={link}>
                                        <Typography
                                            as="a"
                                            href="#"
                                            color="gray"
                                            className="py-1.5 font-normal transition-colors hover:text-red-500"
                                        >
                                            {link}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
                <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
                    <Typography
                        variant="small"
                        className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0 text-white"
                    >
                        &copy; {currentYear} <a href="https://material-tailwind.com/">TaBook</a>. All Rights Reserved.
                    </Typography>
                    <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
                        <SocialIcon network="facebook" url="https://facebook.com" />
                        <SocialIcon network="instagram" url="https://instagram.com" />
                        <SocialIcon network="tiktok" url="https://tiktok.com" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
