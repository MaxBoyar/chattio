import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../../api/api-client.js';
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '../../../utils/constants.js';
import { useAppStore } from '../../../store/index.js';

export function useAuthUtils() {
    const navigate = useNavigate();
    const { setUserInfo } = useAppStore();

    async function handleLogin(email, password) {
        const response = await apiClient.post(
            LOGIN_ROUTE,
            {
                email,
                password,
            },
            { withCredentials: true }
        );
        const user = response.data.user;
        if (user.id) {
            setUserInfo(user);
            if (user.profileSetup) {
                navigate('/chat');
            } else {
                navigate('/profile');
            }
        }
    }

    async function handleSignup(email, password) {
        const response = await apiClient.post(
            SIGNUP_ROUTE,
            {
                email,
                password,
            },
            { withCredentials: true }
        );
        if (response.status === 201) {
            setUserInfo(response.data.user);
            navigate('/profile');
        }
    }

    return { handleLogin, handleSignup };
}
