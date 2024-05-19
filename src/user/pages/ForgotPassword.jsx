import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../../State/apiConfig';
import InvalidToken from '../components/ForgotPassword/InvalidToken';
import ResetPassword from '../components/ForgotPassword/ResetPassword';

function ForgotPassword() {
    const [isUser, setIsUser] = useState(false);
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    useEffect(() => {
        const getUserToken = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/api/user/user_by_reset_token?token=${token}`);
                if (response.status === 200) {
                    setIsUser(true);
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        getUserToken();
    }, [token]);

    return isUser ? <ResetPassword token={token} /> : <InvalidToken />;
}

export default ForgotPassword;
