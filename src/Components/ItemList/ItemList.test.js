import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ItemList from './ItemList';

test('renders item list with correct items', () => {
  const onDeleteItem = jest.fn();
  const listings = [
    { name: 'University A', country: 'Country A', 'state-province': 'Province A', web_pages: ['http://example.com'] },
    { name: 'University B', country: 'Country B', 'state-province': 'Province B', web_pages: ['http://example.com'] }
  ];

  const { getByText, getByLabelText } = render(<ItemList listings={listings} onDeleteItem={onDeleteItem} />);
  
  expect(screen.getByText('University A')).toBeInTheDocument();
  expect(screen.getByText('Country A')).toBeInTheDocument();
  expect(screen.getByText('Province A')).toBeInTheDocument();
  expect(screen.getByText('University B')).toBeInTheDocument();
  expect(screen.getByText('Country B')).toBeInTheDocument();
  expect(screen.getByText('Province B')).toBeInTheDocument();

  const deleteButtons = screen.getByLabelText('delete-button');
  fireEvent.click(deleteButtons[0]);
  expect(onDeleteItem).toHaveBeenCalledWith(0);
});
