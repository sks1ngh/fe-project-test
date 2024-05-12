import React from 'react';
import { render,screen  } from '@testing-library/react';
import DetailPage from './DetailPage';
import { MemoryRouter, Route } from 'react-router-dom';

test('renders detail page with correct details', () => {
  const universityData = [
    { name: 'University A', country: 'Country A', 'state-province': 'Province A', web_pages: ['http://example.com'] },
    { name: 'University B', country: 'Country B', 'state-province': 'Province B', web_pages: ['http://example.com'] }
  ];
  localStorage.setItem('universityData', JSON.stringify(universityData));

  const match = { params: { name: 'University A' } };
  const { getByText } = render(
    <MemoryRouter initialEntries={['/details/University%20A']}>
      <Route path="/details/:name" component={DetailPage} />
    </MemoryRouter>
  );

  expect(screen.getByText('Details for: University A')).toBeInTheDocument();
  expect(screen.getByText('Country: Country A')).toBeInTheDocument();
  expect(screen.getByText('State/Province: Province A')).toBeInTheDocument();
  expect(screen.getByText('Website: http://example.com')).toBeInTheDocument();
});
