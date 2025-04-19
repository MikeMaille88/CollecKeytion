// tests/components/AuthContext.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../src/components/authContext';
import { useContext } from 'react';

// Mock fetch API
global.fetch = vi.fn();

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    getStore: () => store
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Test component pour accéder aux values du context
const AuthConsumer = ({ onAuthChange }) => {
  const auth = useAuth();
  onAuthChange(auth);
  return <div>Auth Consumer</div>;
};

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    fetch.mockReset();
  });
  
  it('provides default values when no token exists', async () => {
    let authValues;
    const handleAuthChange = (values) => {
      authValues = values;
    };
    
    render(
      <AuthProvider>
        <AuthConsumer onAuthChange={handleAuthChange} />
      </AuthProvider>
    );
    
    // Wait for authContext useEffect to complete
    await waitFor(() => expect(authValues.loading).toBe(false));
    
    // Check default values
    expect(authValues.user).toBeNull();
    expect(localStorageMock.getItem).toHaveBeenCalledWith('authToken');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('authId');
  });
  
  it('fetches user data when token exists', async () => {
    // Setup mocks
    localStorageMock.setItem('authToken', 'fake-token');
    localStorageMock.setItem('authId', 'user123');
    
    const mockUserData = {
      _id: 'user123',
      username: 'testuser',
      email: 'test@example.com'
    };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUserData
    });
    
    let authValues;
    const handleAuthChange = (values) => {
      authValues = values;
    };
    
    render(
      <AuthProvider>
        <AuthConsumer onAuthChange={handleAuthChange} />
      </AuthProvider>
    );
    
    // Wait for authContext useEffect and fetch to complete
    await waitFor(() => expect(authValues.loading).toBe(false));
    
    // Check that user data was fetched and set correctly
    expect(authValues.user).toEqual(mockUserData);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('users/user123'));
  });
  
  it('handles login correctly', async () => {
    // Setup test data
    const mockUserData = { _id: 'user123', username: 'testuser' };
    const mockToken = 'new-auth-token';
    
    let authValues;
    const handleAuthChange = (values) => {
      authValues = values;
    };
    
    render(
      <AuthProvider>
        <AuthConsumer onAuthChange={handleAuthChange} />
      </AuthProvider>
    );
    
    // Wait for initial loading to complete
    await waitFor(() => expect(authValues.loading).toBe(false));
    
    // Perform login action
    act(() => {
      authValues.login(mockUserData, mockToken);
    });
    
    // Verify login effects
    expect(localStorageMock.setItem).toHaveBeenCalledWith('authToken', mockToken);
    expect(authValues.user).toEqual(mockUserData);
  });
  
  it('handles logout correctly', async () => {
    // Setup initial authenticated state
    localStorageMock.setItem('authToken', 'existing-token');
    localStorageMock.setItem('authId', 'user123');
    
    let authValues;
    const handleAuthChange = (values) => {
      authValues = values;
    };
    
    render(
      <AuthProvider>
        <AuthConsumer onAuthChange={handleAuthChange} />
      </AuthProvider>
    );
    
    // Wait for initial loading
    await waitFor(() => expect(authValues.loading).toBe(false));
    
    // Perform logout
    act(() => {
      authValues.logout();
    });
    
    // Verify logout effects
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken');
    expect(authValues.user).toBeNull();
  });
  
  it('handles fetch error by clearing tokens', async () => {
    // Setup mocks for failed fetch
    localStorageMock.setItem('authToken', 'bad-token');
    localStorageMock.setItem('authId', 'user123');
    
    fetch.mockRejectedValueOnce(new Error('Network error'));
    
    let authValues;
    const handleAuthChange = (values) => {
      authValues = values;
    };
    
    render(
      <AuthProvider>
        <AuthConsumer onAuthChange={handleAuthChange} />
      </AuthProvider>
    );
    
    // Wait for authContext to handle the error
    await waitFor(() => expect(authValues.loading).toBe(false));
    
    // Check that tokens were removed
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('authToken');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('authId');
    expect(authValues.user).toBeNull();
  });
});
