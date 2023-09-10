import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { loginUserAuth } from '../../service/api/userAuthApi';
import Login from '../../views/Login';
import {BrowserRouter} from "react-router-dom";

jest.mock('../../service/api/userAuthApi', () => ({
    loginUserAuth: jest.fn()
}));

describe('Login Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders form inputs', () => {
        render(<Login />);

        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('updates state when input values change', () => {
        render(<Login />);

        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

        expect(usernameInput.value).toBe('testuser');
        expect(passwordInput.value).toBe('testpassword');
    });

    it('calls loginUserAuth with correct parameters on form submission', async () => {
        render(<BrowserRouter>
            <Login />
        </BrowserRouter>);

        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

        loginUserAuth.mockResolvedValueOnce({ data: { status: 1, userId: 123 } });

        fireEvent.click(loginButton);

        expect(loginUserAuth).toHaveBeenCalledWith({ username: 'testuser', password: 'testpassword' });

        // Wait for the success message to appear
        await screen.findByText('登陆成功');

        expect(screen.getByText('登陆成功')).toBeInTheDocument();
        expect(localStorage.getItem('userId')).toBe('123');
    });

    it('displays warning messages for incorrect username or password', async () => {
        render(<Login />);

        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');
        const loginButton = screen.getByRole('button', { name: 'Login' });

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

        loginUserAuth.mockResolvedValueOnce({ data: { status: 0 } });

        fireEvent.click(loginButton);

        expect(await screen.findByText('账号或者密码输入错误')).toBeInTheDocument();

        loginUserAuth.mockResolvedValueOnce({ data: { status: 2 } });

        fireEvent.click(loginButton);

        expect(await screen.findByText('该账号已被禁用')).toBeInTheDocument();
    });
});
