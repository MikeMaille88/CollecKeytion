describe('Login Flow', () => {
    beforeEach(() => {
      // Visiter la page de connexion avant chaque test
      cy.visit('/login');
    });
  
    it('displays the login form correctly', () => {
      // Vérifier que les éléments de la page de connexion sont présents
      cy.get('input[type="email"]').should('be.visible');
      cy.get('input[type="password"]').should('be.visible');
      cy.get('button[type="submit"]').contains('Connexion').should('be.visible');
    });
  
    it('validates form input fields', () => {
      // Soumettre le formulaire sans remplir les champs
      cy.get('button[type="submit"]').click();
  
      // Vérifier que le formulaire n'est pas soumis (car les champs sont requis)
      cy.url().should('include', '/login');
    });
  
    it('shows error message for invalid credentials', () => {
      // Intercepter l'appel API pour simuler une erreur
      cy.intercept('POST', '**/users/login', {
        statusCode: 401,
        body: { message: 'Invalid credentials' }
      }).as('loginAttempt');
  
      // Remplir le formulaire avec des identifiants incorrects
      cy.get('input[type="email"]').type('wrong@example.com');
      cy.get('input[type="password"]').type('wrongpassword');
      cy.get('input[type="checkbox"]').check();
      cy.get('button[type="submit"]').click();
  
      // Attendre la requête et vérifier l'alerte
      cy.wait('@loginAttempt');
      cy.on('window:alert', (text) => {
        expect(text).to.equal('Identifiants incorrects');
      });
    });
  
    it('navigates to registration page', () => {
      cy.contains('Créer un compte ici').click();
      cy.url().should('include', '/registration');
    });
  });
  