import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // 使用MemoryRouter包装组件
import App from './Home';

test('renders App component', () => {
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );

});

test('logout button click should redirect to /initial', () => {
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );

    // 找到“Logout”按钮并模拟点击
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    // 验证是否成功重定向到 /initial
    expect(window.location.pathname).toBe('/initial');
});
