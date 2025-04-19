// tests/pages/Login.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../../src/pages/login';

// Mock des fonctions importées
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn()
  };
});

// Mock des variables d'environnement
vi.mock('import.meta', () => ({
  env: {
    VITE_COLLECKEYTION_BACKEND_URL: 'https://colleckeytionbackend-mikemaille88s-projects.vercel.appusers/login'
  }
}));

// Mock fetch pour tester les appels API
global.fetch = vi.fn();

// Mock localStorage
global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn()
};

// Mock pour console.error et alert
global.console.error = vi.fn();
global.alert = vi.fn();

describe('LoginPage Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch.mockReset();
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: '' }
    });
  });
  
  it('renders login form correctly', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    
    // Vérifier que tous les éléments du formulaire sont présents
    expect(screen.getByLabelText(/votre email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/votre mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /connexion/i })).toBeInTheDocument();
    expect(screen.getByText(/mot de passe oublié/i)).toBeInTheDocument();
    expect(screen.getByText(/vous n'avez pas encore de compte/i)).toBeInTheDocument();
    expect(screen.getByText(/créer un compte ici/i)).toBeInTheDocument();
  });
  
  it('updates form data on input change', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    
    const emailInput = screen.getByLabelText(/votre email/i);
    const passwordInput = screen.getByLabelText(/votre mot de passe/i);
    
    // Simuler la saisie dans les champs
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // Vérifier que les valeurs ont été mises à jour
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });
  
  it('handles successful login', async () => {
    // Mock de la réponse API réussie
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        authToken: 'fake-token',
        userId: 'user123'
      })
    });
    
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    
    // Remplir le formulaire
    fireEvent.change(screen.getByLabelText(/votre email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/votre mot de passe/i), {
      target: { value: 'password123' }
    });
    
    // Cocher la case "Se souvenir de moi"
    fireEvent.click(screen.getByLabelText(/se souvenir de moi/i));
    
    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /connexion/i }));
    
    // Vérifier l'appel fetch
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('https://colleckeytionbackend-mikemaille88s-projects.vercel.appusers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        })
      });
    });
    
    // Vérifier le stockage dans localStorage
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('authToken', 'fake-token');
      expect(localStorage.setItem).toHaveBeenCalledWith('authId', 'user123');
    });
    
    // Vérifier la redirection
    await waitFor(() => {
      expect(window.location.href).toBe('/');
    });
  });

  
  it('navigates to registration page when link is clicked', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    
    const registrationLink = screen.getByText(/créer un compte ici/i);
    expect(registrationLink).toHaveAttribute('href', '/registration');
  });
  
  it('navigates to forgot password page when link is clicked', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
    
    const forgotPasswordLink = screen.getByText(/mot de passe oublié/i);
    expect(forgotPasswordLink).toHaveAttribute('href', '/forget');
  });
});


//   it('shows alert on login failure', async () => {
//     // Mock d'une erreur d'authentification
//     fetch.mockResolvedValueOnce({
//       ok: false,
//       statusText: 'Unauthorized'
//     });
    
//     render(
//       <BrowserRouter>
//         <LoginPage />
//       </BrowserRouter>
//     );
    
//     // Remplir et soumettre le formulaire
//     fireEvent.change(screen.getByLabelText(/votre email/i), {
//       target: { value: 'wrong@example.com' }
//     });
//     fireEvent.change(screen.getByLabelText(/votre mot de passe/i), {
//       target: { value: 'wrongpassword' }
//     });
//     fireEvent.click(screen.getByRole('button', { name: /connexion/i }));
    
//     // Vérifier que l'alerte est affichée
//     await waitFor(() => {
//       expect(alert).toHaveBeenCalledWith('Identifiants incorrects');
//     });
    
//     // Vérifier que console.error est appelé
//     expect(console.error).toHaveBeenCalledWith('Error logging user:', 'Unauthorized');
//   });
  
//   it('handles network errors during login', async () => {
//     // Mock d'une erreur réseau
//     fetch.mockRejectedValueOnce(new Error('Network error'));
    
//     render(
//       <BrowserRouter>
//         <LoginPage />
//       </BrowserRouter>
//     );
    
//     // Remplir et soumettre le formulaire
//     fireEvent.change(screen.getByLabelText(/votre email/i), {
//       target: { value: 'test@example.com' }
//     });
//     fireEvent.change(screen.getByLabelText(/votre mot de passe/i), {
//       target: { value: 'password123' }
//     });
//     fireEvent.click(screen.getByRole('button', { name: /connexion/i }));
    
//     // Vérifier que console.error est appelé avec le message d'erreur
//     await waitFor(() => {
//       expect(console.error).toHaveBeenCalledWith('Error logging user:', 'Network error');
//     });
//   });