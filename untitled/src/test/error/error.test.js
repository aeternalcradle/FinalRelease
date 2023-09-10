import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '../../views/error/error';

describe('NotFoundPage', () => {
    it('should render correctly', () => {
        render(<NotFoundPage />);

        // 检查h1元素是否包含正确的文本
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404 - Page Not Found');

        // 检查p元素是否包含正确的文本
        expect(screen.getByText('Sorry, the page you are looking for does not exist.')).toBeInTheDocument();
    });
});
