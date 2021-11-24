import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User } from '../../interfaces/user.interface';
import * as Yup from 'yup';
import http from '../../services/api';
import { saveToken, setAuthSlice } from './authSlice';
import { setUser } from './userSlice';
import { AuthResponse } from '../../services/mirage/routes/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../store';

 
const schema = Yup.object().shape({
    username: Yup.string()
        .required('What? No username?')
        .max(16, 'Username cannot be longer than 16 characters.'),
    password: Yup.string().required('Without a password, None shall pass'),
    email: Yup.string().email('Please provide a valid email address (human@example.com)')
});

const Auth = () => {
    const { handleSubmit, register, formState: { errors } } = useForm<User>({
        resolver: yupResolver(schema)
    });


    const [login, isLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const submitForm = async (data: User) => {
        const path = login ? '/auth/login' : '/auth/signup';
        try {
            const res = await http.post<User, AuthResponse>(path, data);
            const { user, token } = res;
            console.log(user, token);
            
            dispatch(saveToken(token));
            dispatch(setUser(user));
            dispatch(setAuthSlice(true));
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div className="auth">
            <div className="card">
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="inputWrapper">
                        <input {...register("username", { required: true })} name="username" placeholder="Username" />
                        {errors && errors.username && (
                            <p className="error">{errors.username.message}</p>
                        )}
                    </div>
                    <div className="inputWrapper">
                        <input {...register("password", { required: true })} name="password" placeholder="Password" />
                        {errors && errors.password && (
                            <p className="error">{errors.password.message}</p>
                        )}
                    </div>
                    {!login && (
                    <div className="inputWrapper">
                        <input {...register("email", { required: true })} name="email" placeholder="Email (optional)" />
                        {errors && errors.email && (
                            <p className="error">{errors.email.message}</p>
                        )}
                    </div>
                    )}
                    <div className="inputWrapper">
                        <button type="submit" disabled={loading}>
                            {login ? 'Login' : 'Create Account'}
                        </button>
                    </div>
                    <p
                    onClick={() => isLogin(!login)} style={{cursor: 'pointer', opacity: 0.7}}>
                        {login ? 'No account? Create One' : "Already have an account?"}
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Auth;