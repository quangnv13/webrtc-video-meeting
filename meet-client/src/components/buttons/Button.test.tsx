import React from 'react'
import { render, screen } from '@testing-library/react'
import Button from './Button'
test('unit test button', () => {
  render(<Button text="click me" />)
  const linkElement = screen.getByText(/click me/i)
  expect(linkElement).toBeInTheDocument()
})
