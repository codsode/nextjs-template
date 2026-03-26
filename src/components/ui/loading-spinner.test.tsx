import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { LoadingSpinner } from './loading-spinner';

describe('LoadingSpinner', () => {
  it('renders with default message', () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getAllByText('Loading...').length).toBeGreaterThan(0);
  });

  it('renders with custom message', () => {
    render(<LoadingSpinner message="Please wait" />);
    expect(screen.getAllByText('Please wait').length).toBeGreaterThan(0);
  });

  it('has role="status" for accessibility', () => {
    render(<LoadingSpinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has aria-label for accessibility', () => {
    render(<LoadingSpinner message="Fetching data" />);
    expect(screen.getByRole('status')).toHaveAttribute(
      'aria-label',
      'Fetching data',
    );
  });

  it('applies fullScreen styles when fullScreen is true', () => {
    render(<LoadingSpinner fullScreen />);
    const el = screen.getByRole('status');
    expect(el.className).toContain('min-h-screen');
  });

  it('does not apply fullScreen styles when false', () => {
    render(<LoadingSpinner fullScreen={false} />);
    const el = screen.getByRole('status');
    expect(el.className).not.toContain('min-h-screen');
  });
});
