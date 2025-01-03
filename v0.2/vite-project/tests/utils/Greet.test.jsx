import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Greet from '../../src/utils/Greet';

test('renders greeting with name', () => {
  render(<Greet name="Alice" />);
  expect(screen.getByText(/hello, Alice/i)).toBeInTheDocument();
});
