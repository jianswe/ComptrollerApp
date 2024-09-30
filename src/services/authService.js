import { baseUrl, fetchClient } from './fetchClient';

const API_URL = `${baseUrl}/api/auth`; 

export const register = async (userData) => {
    const result = await fetchClient(`${API_URL}/register`, 'POST', userData)
    return result
};

export const login = async (credentials) => {
    try {
        const result = await fetchClient(`${API_URL}/login`, 'POST', credentials);
        return result;
    } catch (error) {
        if (error.message.includes('401')) {
            throw new Error('Unable to Login! Wrong username or password');
        } else {
            console.error('Other error:', error);
        }
    }
};

export const logout = () => {
    // Clear user session data
    localStorage.removeItem('userToken');
    localStorage.removeItem('user'); // Remove user data if stored

    // Redirect to the login page or homepage, which is done through Navbar component, since useNavigate cannot be used outside of component. 
};

export const getCurrentUser = () => {
    return localStorage.getItem('userToken');
};