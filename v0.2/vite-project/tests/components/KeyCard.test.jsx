// tests/components/KeyCard.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import KeyCard from '../../src/components/keyCard';

describe('KeyCard Component', () => {
  // Mock keyData basé sur votre structure réelle
  const mockKeyData = {
    _id: 'key123',
    name: 'Space Mountain',
    land: 'Discoveryland',
    image: {
      inBox: 'https://res.cloudinary.com/colleckeytion/image/upload/v1741006301/CollecKeytion/space_mountain.jpg'
    }
  };

  // Mock pour keyData sans image
  const mockKeyDataNoImage = {
    _id: 'key456',
    name: 'Pirates of the Caribbean',
    land: 'Adventureland',
    image: {}
  };
  
  it('renders with correct key information', () => {
    render(
      <BrowserRouter>
        <KeyCard keyData={mockKeyData} />
      </BrowserRouter>
    );
    
    // Vérifier que le nom et le land sont affichés
    expect(screen.getByText('Space Mountain')).toBeInTheDocument();
    expect(screen.getByText('Discoveryland')).toBeInTheDocument();
    
    // Vérifier que l'image est présente avec la source transformée
    const image = screen.getByAltText('Space Mountain');
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('f_auto,q_auto,w_300,h_450');
  });
  
  it('renders with placeholder image when no image is provided', () => {
    render(
      <BrowserRouter>
        <KeyCard keyData={mockKeyDataNoImage} />
      </BrowserRouter>
    );
    
    // Vérifier que le placeholder est utilisé
    const image = screen.getByAltText('Pirates of the Caribbean');
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('key_placeholder.jpg');
  });
  
  it('creates correct link to key detail page', () => {
    render(
      <BrowserRouter>
        <KeyCard keyData={mockKeyData} />
      </BrowserRouter>
    );
    
    // Vérifier que le lien pointe vers la bonne page de détail de clé
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/keys/key123');
  });
  
  it('transforms image URL correctly', () => {
    render(
      <BrowserRouter>
        <KeyCard keyData={mockKeyData} />
      </BrowserRouter>
    );
    
    const image = screen.getByAltText('Space Mountain');
    const originalUrl = 'https://res.cloudinary.com/colleckeytion/image/upload/v1741006301/CollecKeytion/space_mountain.jpg';
    const expectedTransformedFragment = '/upload/f_auto,q_auto,w_300,h_450/';
    
    expect(image.src).not.toBe(originalUrl);
    expect(image.src).toContain(expectedTransformedFragment);
  });
});
