import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../services/authService';

const Login = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),
        onSubmit: async (values, { setStatus }) => {
            try {
                const response = await login(values);
                const token = response.token;  // JWT token
                localStorage.setItem('userToken', token);
                navigate('/');
            } catch (error) {
                console.log('Error during login', error);
                setStatus({ failure: error.message });
            }
        },
    });

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={formik.handleSubmit}>
                {formik.status && formik.status.failure &&
                    <div style={{ color: 'red' }}>{formik.status.failure}</div>
                }
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    {formik.errors.username ? <div>{formik.errors.username}</div> : null}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;