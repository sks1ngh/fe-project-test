import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

jest.mock('axios');

test('renders App component with header and item list', async () => {
  const response = {
    data: [
      { name: 'University A', country: 'Country A', 'state-province': 'Province A', web_pages: ['http://example.com'] },
      { name: 'University B', country: 'Country B', 'state-province': 'Province B', web_pages: ['http://example.com'] }
    ]
  };
  axios.get.mockResolvedValue(response);

  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await screen.findByText('University A');
  expect(screen.getByText('Country A')).toBeInTheDocument();
  expect(screen.getByText('Province A')).toBeInTheDocument();
  expect(screen.getByText('University B')).toBeInTheDocument();
  expect(screen.getByText('Country B')).toBeInTheDocument();
  expect(screen.getByText('Province B')).toBeInTheDocument();
});

test('handles search functionality', async () => {
  const response = {
    data: [
      { name: 'University A', country: 'Country A', 'state-province': 'Province A', web_pages: ['http://example.com'] },
      { name: 'University B', country: 'Country B', 'state-province': 'Province B', web_pages: ['http://example.com'] }
    ]
  };
  axios.get.mockResolvedValue(response);

  const { getByPlaceholderText, getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  await screen.findByText('University A');

  const searchInput = screen.getByPlaceholderText('Search...');
  fireEvent.change(searchInput, { target: { value: 'University A' } });
  fireEvent.submit(searchInput);

  expect(screen.getByText('University A')).toBeInTheDocument();
  expect(screen.getByText('Country A')).toBeInTheDocument();
  expect(screen.getByText('Province A')).toBeInTheDocument();

  expect(screen.queryByText('University B')).toBeNull();
  expect(screen.queryByText('Country B')).toBeNull();
  expect(screen.queryByText('Province B')).toBeNull();
});

test('handles clear functionality', async () => {
  const response = {
    data: [
      { name: 'University A', country: 'Country A', 'state-province': 'Province A', web_pages: ['http://example.com'] },
      { name: 'University B', country: 'Country B', 'state-province': 'Province B', web_pages: ['http://example.com'] }
    ]
  };
  axios.get.mockResolvedValue(response);

  const { getByPlaceholderText, getByText, queryByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  await screen.findByText('University A');

  const searchInput = screen.getByPlaceholderText('Search...');
  fireEvent.change(searchInput, { target: { value: 'University A' } });
  fireEvent.submit(searchInput);

  expect(screen.getByText('University A')).toBeInTheDocument();

  const clearButton = screen.getByText('Clear');
  fireEvent.click(clearButton);

  expect(screen.getByText('University A')).toBeInTheDocument();
  expect(screen.getByText('University B')).toBeInTheDocument();
});

test('handles item deletion', async () => {
  const response = {
    data: [
      { name: 'University A', country: 'Country A', 'state-province': 'Province A', web_pages: ['http://example.com'] },
      { name: 'University B', country: 'Country B', 'state-province': 'Province B', web_pages: ['http://example.com'] }
    ]
  };
  axios.get.mockResolvedValue(response);

  const { getByText, queryByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  await screen.findByText('University A');

  const deleteButton = screen.getByText('Delete');
  fireEvent.click(deleteButton);

  expect(screen.queryByText('University A')).toBeNull();
});
