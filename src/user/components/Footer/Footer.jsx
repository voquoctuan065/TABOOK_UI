import { TextField, Typography } from '@mui/material';
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
                            <div>
                                <TextField 
                                sx={{
                                    width: '400px',
                                    '& input': {
                                        color: 'white',
                                    },
                                    '& input::placeholder': {
                                        color: 'white',
                                    },
                                    
                                  }}
                                error id="outlined-error" label="Email" placeholder="example@email.com" />
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
