/* eslint-disable react/prop-types */

export default function AddressCard({ address }) {
    return (
        <div className="space-y-3">
            <p className="font-semibold cursor-text">Họ tên: {address && address.fullName}</p>
            <p className="cursor-text">
                <p className="font-semibold cursor-text">Địa chỉ: </p>
                {address && address.streetAddress}, {address && address.ward}, {address && address.province},{' '}
                {address && address.zipCode}
            </p>
            <div className="space-y-1 flex items-center">
                <p className="font-semibold cursor-text mr-3">Số điện thoại: </p>
                <span
                    style={{
                        marginTop: '0px !important',
                    }}
                >
                    {address && address.phoneNumber}
                </span>
            </div>
        </div>
    );
}
