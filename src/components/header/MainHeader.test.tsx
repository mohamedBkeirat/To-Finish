import { expect, it, describe, beforeEach } from 'vitest'
import { screen, render } from '@testing-library/react';
import MainHeader from './MainHeader'

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