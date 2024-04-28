import { Box, Button, Grid, TextField } from '@mui/material';
import AddressCard from '../AddressCard/AddressCard';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createOrder } from '../../../State/Order/Action';
import { useNavigate } from 'react-router-dom';

export default function DeliveryForm() {
    const formRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, cartItems, cart } = useSelector((store) => ({
        user: store.auth.user,
        cartItems: store.cart.cartItems,
        cart: store.cart,
    }));

    const [fullName, setFullName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [ward, setWard] = useState('');
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [fullNameHelperText, setFullNameHelperText] = useState(null);
    const [streetAddressHelperText, setStreetAddressHelperText] = useState(null);
    const [wardHelperText, setWardHelperText] = useState(null);
    const [districtHelperText, setDistrictHelperText] = useState(null);
    const [provinceHelperText, setProvinceHelperText] = useState(null);
    const [zipCodeHelperText, setZipCodeHelperText] = useState(null);
    const [phoneNumberHelperText, setPhoneNumberHelperText] = useState(null);

    const handleFullNameChange = (event) => {
        const inputFullName = event.target.value;
        const regex = /[@#$%^&*\d]/;

        if (inputFullName !== '') {
            if (regex.test(inputFullName)) {
                setFullNameHelperText('Tên không được chứa các ký tự đặc biệt hoặc số!');
            } else if (inputFullName.length > 100) {
                setFullNameHelperText('Tên không được quá 100 ký tự!');
            } else {
                setFullNameHelperText('');
            }
        } else {
            setFullNameHelperText('');
        }
        setFullName(inputFullName);
    };

    const handleFullNameBlur = () => {
        if (fullName === '') {
            setFullNameHelperText('Trường này không được để trống!');
        }
    };

    const handleStreetAddressChange = (e) => {
        const inputAddress = e.target.value;
        const regex = /[@#$%^&*]/;
        if (inputAddress !== '') {
            if (regex.test(inputAddress)) {
                setStreetAddressHelperText('Truờng này được chứa các ký tự đặc biệt!');
            } else if (inputAddress.length > 100) {
                setStreetAddressHelperText('Trường này được quá 100 ký tự!');
            } else {
                setStreetAddressHelperText('');
            }
        } else {
            setStreetAddressHelperText('');
        }
        setStreetAddress(inputAddress);
    };

    const handleStreetAddressBlur = () => {
        if (streetAddress === '') {
            setStreetAddressHelperText('Trường này không được để trống!');
        }
    };

    const handleWardChange = (e) => {
        const inputWard = e.target.value;
        const regex = /[@#$%^&*\d]/;
        if (inputWard !== '') {
            if (regex.test(inputWard)) {
                setWardHelperText('Truờng này được chứa các ký tự đặc biệt hoặc số!');
            } else if (inputWard.length > 100) {
                setWardHelperText('Trường này được quá 100 ký tự!');
            } else {
                setWardHelperText('');
            }
        } else {
            setWardHelperText('');
        }
        setWard(inputWard);
    };

    const handleWardBlur = () => {
        if (ward === '') {
            setWardHelperText('Trường này không được để trống!');
        }
    };

    const handleDistrictChange = (e) => {
        const inputDistrict = e.target.value;
        const regex = /[@#$%^&*\d]/;
        if (inputDistrict !== '') {
            if (regex.test(inputDistrict)) {
                setDistrictHelperText('Truờng này được chứa các ký tự đặc biệt hoặc số!');
            } else if (inputDistrict.length > 100) {
                setDistrictHelperText('Trường này được quá 100 ký tự!');
            } else {
                setDistrictHelperText('');
            }
        } else {
            setDistrictHelperText('');
        }
        setDistrict(inputDistrict);
    };

    const handleDistrictBlur = () => {
        if (district === '') {
            setDistrictHelperText('Trường này không được để trống!');
        }
    };

    const handleProvinceChange = (e) => {
        const inputProvince = e.target.value;
        const regex = /[@#$%^&*\d]/;
        if (inputProvince !== '') {
            if (regex.test(inputProvince)) {
                setProvinceHelperText('Truờng này được chứa các ký tự đặc biệt hoặc số!');
            } else if (inputProvince.length > 100) {
                setProvinceHelperText('Trường này được quá 100 ký tự!');
            } else {
                setProvinceHelperText('');
            }
        } else {
            setProvinceHelperText('');
        }
        setProvince(inputProvince);
    };

    const handleProvinceBlur = () => {
        if (province === '') {
            setProvinceHelperText('Trường này không được để trống!');
        }
    };

    const handleZipCodeChange = (e) => {
        const inputZipcode = e.target.value;

        if (inputZipcode !== '') {
            if (/\D/.test(inputZipcode) || /[@#$%^&*]/.test(inputZipcode)) {
                setZipCodeHelperText('Truờng này được chứa các ký tự đặc biệt hoặc chữ!');
            } else if (inputZipcode.length > 100) {
                setZipCodeHelperText('Trường này được quá 100 ký tự!');
            } else {
                setZipCodeHelperText('');
            }
        } else {
            setZipCodeHelperText('');
        }
        setZipCode(inputZipcode);
    };

    const handleZipCodeBlur = () => {
        if (zipCode === '') {
            setZipCodeHelperText('Trường này không được để trống!');
        }
    };

    const handlePhoneNumberChange = (e) => {
        const inputPhoneNumber = e.target.value;

        if (inputPhoneNumber !== '') {
            if (/\D/.test(inputPhoneNumber) || /[@#$%^&*]/.test(inputPhoneNumber)) {
                setPhoneNumberHelperText('Truờng này được chứa các ký tự đặc biệt hoặc chữ!');
            } else if (inputPhoneNumber.length > 100) {
                setPhoneNumberHelperText('Trường này được quá 100 ký tự!');
            } else {
                setPhoneNumberHelperText('');
            }
        } else {
            setPhoneNumberHelperText('');
        }
        setPhoneNumber(inputPhoneNumber);
    };

    const handlePhoneNumberBlur = () => {
        if (phoneNumber === '') {
            setPhoneNumberHelperText('Trường này không được để trống!');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            shippingAddress: {
                fullName: fullName,
                streetAddress: streetAddress,
                ward: ward,
                district: district,
                province: province,
                zipCode: zipCode,
                phoneNumber: phoneNumber,
            },
            cartItems: cartItems,
            cartTotalQuantity: cart.cartTotalQuantity,
            cartTotalAmount: cart.cartTotalAmount,
        };
        if (
            fullNameHelperText ||
            streetAddressHelperText ||
            wardHelperText ||
            districtHelperText ||
            provinceHelperText ||
            zipCodeHelperText ||
            phoneNumberHelperText
        ) {
            toast.error('Thông tin nhập vào chưa đúng. Vui lòng kiểm tra lại!');
            return;
        }

        const reqData = { data, navigate };

        if (cartItems.length > 0) {
            dispatch(createOrder(reqData));
        }
    };

    const handleSubmitAddress = () => {
        const data = {
            shippingAddress: {
                fullName: user?.address[0].fullName,
                streetAddress: user?.address[0].streetAddress,
                ward: user?.address[0].ward,
                district: user?.address[0].district,
                province: user?.address[0].province,
                zipCode: user?.address[0].zipCode,
                phoneNumber: user?.address[0].phoneNumber,
            },
            cartItem: cartItems,
            cartTotalQuantity: cart.cartTotalQuantity,
            cartTotalAmount: cart.cartTotalAmount,
        };

        const reqData = { data, navigate };

        if (cartItems.length > 0) {
            dispatch(createOrder(reqData));
        }
    };

    console.log(cartItems);

    return (
        <div className="mx-auto max-w-7xl pb-5">
            <Grid container>
                <Grid item xs={4} className="bg-white border rounded-lg overflow-y-scroll max-h-[300px]">
                    <div className="px-5 py-7 border-b cursor-pointer">
                        <AddressCard address={user?.address[0]} />
                        <Button
                            onClick={handleSubmitAddress}
                            sx={{
                                fontWeight: 500,
                                marginTop: '10px',
                                '&:hover': {
                                    bgcolor: 'red',
                                    color: 'white',
                                },
                            }}
                            color="error"
                            size="large"
                            variant="contained"
                        >
                            Sử dụng địa chỉ này
                        </Button>
                    </div>
                </Grid>

                <Grid item xs={8} className="bg-white rounded-lg">
                    <Box className="border shadow-md p-5">
                        <div className="font-bold text-lg mb-2">Thông tin địa chỉ giao hàng</div>

                        <form ref={formRef} onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="fullName"
                                        name="fullName"
                                        label="Họ tên"
                                        fullWidth
                                        autoComplete="given-name"
                                        error={fullNameHelperText && true}
                                        helperText={fullNameHelperText}
                                        onChange={handleFullNameChange}
                                        onBlur={handleFullNameBlur}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        label="Số điện thoại"
                                        fullWidth
                                        autoComplete="given-name"
                                        error={phoneNumberHelperText && true}
                                        helperText={phoneNumberHelperText}
                                        onChange={handlePhoneNumberChange}
                                        onBlur={handlePhoneNumberBlur}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="streetAddress"
                                        name="streetAddress"
                                        label="Số nhà/Tên đường"
                                        fullWidth
                                        autoComplete="given-name"
                                        multiline
                                        rows={3}
                                        error={streetAddressHelperText && true}
                                        helperText={streetAddressHelperText}
                                        onChange={handleStreetAddressChange}
                                        onBlur={handleStreetAddressBlur}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="ward"
                                        name="ward"
                                        label="Xã/Phường"
                                        fullWidth
                                        autoComplete="given-name"
                                        error={wardHelperText && true}
                                        helperText={wardHelperText}
                                        onChange={handleWardChange}
                                        onBlur={handleWardBlur}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="district"
                                        name="district"
                                        label="Quận/Huyện"
                                        fullWidth
                                        autoComplete="given-name"
                                        error={districtHelperText && true}
                                        helperText={districtHelperText}
                                        onChange={handleDistrictChange}
                                        onBlur={handleDistrictBlur}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="province"
                                        name="province"
                                        label="Tỉnh/Thành phố"
                                        fullWidth
                                        autoComplete="given-name"
                                        error={provinceHelperText && true}
                                        helperText={provinceHelperText}
                                        onChange={handleProvinceChange}
                                        onBlur={handleProvinceBlur}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="zipCode"
                                        name="zipCode"
                                        label="Zip / Postal Code"
                                        fullWidth
                                        autoComplete="shipping postal-code"
                                        error={zipCodeHelperText && true}
                                        helperText={zipCodeHelperText}
                                        onChange={handleZipCodeChange}
                                        onBlur={handleZipCodeBlur}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12} className="flex justify-end">
                                    <Button
                                        type="submit"
                                        sx={{
                                            fontWeight: 500,
                                            marginTop: '10px',
                                            '&:hover': {
                                                bgcolor: 'red',
                                                color: 'white',
                                            },
                                        }}
                                        color="error"
                                        size="large"
                                        variant="contained"
                                    >
                                        Sử dụng địa chỉ này
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}
