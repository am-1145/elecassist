import React from 'react';
import { render, screen } from '../../test-utils';
import MapComponent from './MapComponent';

jest.mock('@react-google-maps/api', () => ({
  GoogleMap: ({ children }: { children: React.ReactNode }) => <div data-testid="google-map">{children}</div>,
  useJsApiLoader: () => ({ isLoaded: true, loadError: null }),
  MarkerF: () => <div data-testid="marker" />,
  InfoWindowF: ({ children }: { children: React.ReactNode }) => <div data-testid="info-window">{children}</div>,
}));

describe('MapComponent', () => {
  it('renders the map component header', () => {
    render(<MapComponent />);
    expect(screen.getByText(/Nearby Polling Booths/i)).toBeInTheDocument();
  });

  it('renders the google map container', () => {
    render(<MapComponent />);
    expect(screen.getByTestId('google-map')).toBeInTheDocument();
  });
});
