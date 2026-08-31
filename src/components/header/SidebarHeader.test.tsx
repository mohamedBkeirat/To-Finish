import { expect, it, describe, beforeEach } from 'vitest'
import { screen, render } from '@testing-library/react';
import SidebarHeader from './SidebarHeader';

describe(('test suite:SidebarHeader'),()=>{

  beforeEach(() => {
    render(<SidebarHeader />);
  });

  it(('renders project name'),()=>{
    const projectTitle = screen.getByText(/To Finish/i)
    expect(projectTitle).toBeInTheDocument()
    expect(projectTitle).toHaveTextContent(/To Finish/i);
})

  it(('renders project icon'),()=>{
  const projectIcon = screen.getByTestId('project-icon')
  expect(projectIcon).toHaveAttribute('src','images/icons/checklist.png')
})

  it(('renders sidebar icon'),()=>{
  const sidebarIcon = screen.getByTestId('sidebar-icon')
  expect(sidebarIcon).toHaveAttribute('src','images/icons/grid.png')
})
})