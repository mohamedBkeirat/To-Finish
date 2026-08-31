import { render } from '@testing-library/react';
import { expect, it, describe,beforeEach } from 'vitest'
import MainHeader from './MainHeader'
import { screen, fireEvent } from '@testing-library/react';

describe('MainHeader', () => {

  beforeEach(() => {
    render(<MainHeader />);
  });

  it('renders task title', () => {

  const headerElement = screen.getByText(/task/i);
  expect(headerElement).toBeInTheDocument();

  });
  it('renders task image', () => {
    
  const imageElement = screen.getByTestId('main-header-image');
  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute('src','images/icons/task.png');
  });
});