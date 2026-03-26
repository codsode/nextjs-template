import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';

import { InputField } from './input-field';

describe('InputField', () => {
  it('renders without label', () => {
    render(<InputField placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders with label and associates it correctly', () => {
    render(<InputField label="Email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toBeInTheDocument();
  });

  it('displays error message with role="alert"', () => {
    render(<InputField label="Email" error="Email is required" />);
    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('Email is required');
  });

  it('sets aria-invalid when error is present', () => {
    render(<InputField label="Email" error="Invalid" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('does not set aria-invalid when no error', () => {
    render(<InputField label="Email" />);
    expect(screen.getByLabelText('Email')).not.toHaveAttribute('aria-invalid');
  });

  it('links error to input via aria-describedby', () => {
    render(<InputField label="Email" error="Required" />);
    const input = screen.getByLabelText('Email');
    const errorId = input.getAttribute('aria-describedby');
    expect(errorId).toBeTruthy();
    const errorEl = errorId ? document.getElementById(errorId) : null;
    expect(errorEl).toHaveTextContent('Required');
  });

  it('accepts user input', async () => {
    const user = userEvent.setup();
    render(<InputField label="Name" />);
    const input = screen.getByLabelText('Name');
    await user.type(input, 'John');
    expect(input).toHaveValue('John');
  });

  it('can be disabled', () => {
    render(<InputField label="Email" disabled />);
    expect(screen.getByLabelText('Email')).toBeDisabled();
  });

  it('renders icon', () => {
    render(
      <InputField label="Search" icon={<span data-testid="icon">@</span>} />,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
