import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Register from '../views/Signup';


describe('Register Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders form inputs', () => {
        render(<Register/>);

        expect(screen.getByLabelText('Username')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('updates state when input values change', () => {
        render(<Register/>);

        const usernameInput = screen.getByLabelText('Username');
        const passwordInput = screen.getByLabelText('Password');

        fireEvent.change(usernameInput, {target: {value: 'testuser'}});
        fireEvent.change(passwordInput, {target: {value: 'testpassword'}});

        expect(usernameInput.value).toBe('testuser');
        expect(passwordInput.value).toBe('testpassword');
    });

})
