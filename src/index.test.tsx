import React from 'react';
import { render } from '@testing-library/react';
import { App } from './App';
import '@testing-library/jest-dom';

describe('index.tsx', () => {
  test('renders the app without crashing', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      { container }
    );

    expect(container).toBeInTheDocument();
  });
});
