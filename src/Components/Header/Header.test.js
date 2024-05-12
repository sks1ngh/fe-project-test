import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Header from './Header';

test('renders header with search and clear buttons', () => {
  const handleSearch = jest.fn();
  const handleClear = jest.fn();
  const { getByPlaceholderText, getByText } = render(<Header onSearch={handleSearch} onClear={handleClear} />);

  const searchInput = screen.getByPlaceholderText('Search...');
  fireEvent.change(searchInput, { target: { value: 'test' } });
  expect(searchInput.value).toBe('test');

  const searchButton = screen.getByText('Search');
  fireEvent.click(searchButton);
  expect(handleSearch).toHaveBeenCalledTimes(1);

  const clearButton = screen.getByText('Clear');
  fireEvent.click(clearButton);
  expect(handleClear).toHaveBeenCalledTimes(1);
});
