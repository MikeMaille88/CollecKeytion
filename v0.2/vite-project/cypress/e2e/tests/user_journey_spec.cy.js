// cypress/e2e/user_journey_spec.cy.js
describe('Complete User Journey', () => {
  // Login before tests
  beforeEach(() => {
    // Intercept pour simuler la connexion
    cy.intercept('POST', '**/users/login', {
      statusCode: 200,
      body: {
        userId: 'testuser123',
        authToken: 'fake-token-for-testing'
      }
    }).as('login');

    // Simuler localStorage pour maintenir la session
    cy.window().then((win) => {
      win.localStorage.setItem('authToken', 'fake-token-for-testing');
      win.localStorage.setItem('authId', 'testuser123');
    });

    // Visiter la page de login
    cy.visit('/login');
    
    // Se connecter
    cy.get('input[type="email"]').type('test@test.com');
    cy.get('input[type="password"]').type('testtest');
    cy.get('input[type="checkbox"]').check();
    cy.get('button[type="submit"]').click();
    
    // Attendre le succès de la connexion
    cy.wait('@login');
    
    // Vérifier la redirection vers la page d'accueil
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('navigates through main features of the application', () => {
    // 1. Page d'accueil - vérifier des éléments de la page d'accueil
    cy.contains('CollecKeytion').should('be.visible');
    
    // 2. Aller à la page "Mes Clefs"
    cy.contains('Mes Clefs').click();
    cy.url().should('include', '/mykeys');
    
    // 3. Aller à la page "Toutes les Clefs"
    cy.contains('Toutes les Clefs').click();
    cy.url().should('include', '/allKeys');
    cy.get('.grid').should('exist');
    
    // 4. Naviguer par Land
    // Cliquer sur le menu Lands pour l'ouvrir
    cy.contains('button', 'Lands').click();
    
    // Attendre que le menu dropdown soit visible
    cy.contains('Frontierland').should('be.visible');
    
    // Cliquer sur Frontierland dans le menu dropdown
    cy.contains('Frontierland').click();
    cy.url().should('include', '/land/Frontierland');
    
    // 5. Visualiser une clef spécifique
    // Revenir à toutes les clefs pour avoir plus de chances d'en trouver une
    cy.contains('Toutes les Clefs').click();
    
    // Intercepter la requête de détail de clef
    cy.intercept('GET', '**/keys/*').as('getKeyDetails');
    
    // Attendre que les cartes de clefs soient chargées et cliquer sur la première
    cy.get('a[href*="/keys/"]').first().click();
    
    // Vérifier que l'URL contient le pattern de détail d'une clef
    cy.url().should('include', '/keys/');
    
    // 6. Accéder au profil - Cliquer sur l'avatar pour ouvrir le menu dropdown
    cy.get('img.h-8.w-8.rounded-full').click({force: true});
    
    // Attendre que le menu dropdown soit visible et cliquer sur "Profil"
    cy.contains('Profil').should('be.visible').click();
    cy.url().should('include', '/profile');
    
    // 7. Se déconnecter - Cliquer à nouveau sur l'avatar
    cy.get('img.h-8.w-8.rounded-full').click({force: true});
    
    // Attendre que le menu dropdown soit visible et cliquer sur "Déconnexion"
    cy.contains('Déconnexion').should('be.visible').click();
    
    // Vérifier que l'utilisateur est redirigé vers la page de login
    cy.url().should('include', '/login');
  });
});
