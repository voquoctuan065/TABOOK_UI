
function Feature() {
    return (
        <div className="flex items-center justify-between container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-[40px] pb-[40px]">
            <div className="flex items-center border border-red-200 py-5 px-3 rounded-lg bg-white">
                <img alt="" src="/images/logo/shipping-icon.jpg" className="w-[3rem] h-[3rem]" />
                <div className='flex flex-col ml-3'>
                    <span>Miễn phí giao hàng</span>
                    <span>Đơn hàng có giá trị từ 500.000đ</span>
                </div>
            </div>
            <div className="flex items-center border border-red-200 py-5 px-3 rounded-lg bg-white">
                <img alt="" src="/images/logo/payment-icon.png" className="w-[3rem] h-[3rem]" />
                <div className='flex flex-col ml-3'>
                    <span>Thanh toán nhanh gọn</span>
                    <span>Phương thức thanh toán đa dạng</span>
                </div>
            </div>
            <div className="flex items-center border border-red-200 py-5 px-3 rounded-lg bg-white">
                <img alt="" src="/images/logo/refund2-icon.png" className="w-[3rem] h-[3rem]" />
                <div className='flex flex-col ml-3'>
                    <span>Hoàn tiền liền tay</span>
                    <span>Hoàn tiền trong vòng 7 ngày.</span>
                </div>
            </div>
            <div className="flex items-center border border-red-200 py-5 px-3 rounded-lg bg-white">
                <img alt="" src="/images/logo/support-icon.png" className="w-[3rem] h-[3rem]" />
                <div className='flex flex-col ml-3'>
                    <span>Hỗ trợ khách hàng 24h</span>
                    <span>Đội ngũ support đông đảo</span>
                </div>
            </div>
        </div>
    );
}

export default Feature;
