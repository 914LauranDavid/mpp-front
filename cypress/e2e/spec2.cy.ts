describe('home page', () => {
  it('contains menu', () => {
    cy.visit('http://localhost:5173/');

    cy.contains('All cats');
    cy.contains('Age distribution');
    cy.contains('Toys per cat');
    cy.contains('Profile');
  });

  it('goes to all cats when you press All cats', () => {
    cy.visit('http://localhost:5173/');

    cy.contains('All cats').click();

    cy.url().should('include', '/cats');
    cy.contains("Next");
    cy.contains("Name");
  })
});

describe('all cats page', () => {
  it('goes to next page when pressing Next', () => {
    cy.visit('http://localhost:5173/cats');

    cy.contains('Next').click();

    cy.contains('Page 2');
  });

  it('goes to previous page when pressing Prev', () => {
    cy.visit('http://localhost:5173/cats');

    cy.contains('Next').click();
    cy.contains('Page 2');

    cy.contains('Prev').click();
    cy.contains('Page 1');
  });

  it('sorts cats decreasingly when pressing the button', () => {
    cy.visit('http://localhost:5173/cats');

    cy.wait(1000);

    cy.contains('Sort decreasingly').click();

    cy.wait(1000);

    cy.get('table tbody tr:nth-child(1) td:nth-child(1) a').then(($firstCat) => {
      const firstCatName = $firstCat.text();

      cy.get('table tbody tr:nth-child(2) td:nth-child(1) a').then(($secondCat) => {
        const secondCatName = $secondCat.text();

        expect(firstCatName.localeCompare(secondCatName)).to.be.greaterThan(0);
      });
    });
  });

  it('goes to detail page when clicking on cat', () => {
    cy.visit('http://localhost:5173/cats');

    cy.get('table tbody tr:nth-child(1) td:nth-child(1) a').click();

    cy.url().should('include', '/cats/');
  });
});


describe('age distribution page', () => {
  it('contains chart', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Age distribution').click();

    cy.contains('year olds');

    cy.get('.MuiPieArc-root').should('exist');
    cy.get('.MuiChartsLegend-root').should('exist');
  });
});

describe('toys per cat page', () => {
  it('contains list', () => {
    cy.visit('http://localhost:5173/');
    cy.contains('Toys per cat').click();

    cy.contains('Cat Name');
    cy.contains('Number of Toys');

    cy.get('.MuiTableRow-root').should('exist');
    cy.get('.MuiTableCell-root').should('exist');
  });
});


describe('cat crud', () => {
  before(() => {
    cy.visit('http://localhost:5173/');

    cy.contains('Log/Sign In').click();

    cy.wait(3000);

    cy.origin('https://dev-71pxajof3gt25bcw.us.auth0.com', () => {
      cy.get('[id="username"]').type("cypreslfkjdsflsd@fkdslfklsd.com");
      cy.get('[id="password"]').type("fjl34jlf#$FJOL$JFOf");
      cy.contains('Continue').click();
    });
  })

  it('add, update, delete same cat', () => {
    cy.contains('Add a new cat').click();

    let oldCatName = "0000000000000000cypress cat";

    cy.get('input[placeholder="Name"]').type(oldCatName);
    cy.get('input[placeholder="Age"]').type('20');
    cy.get('input[placeholder="Weight"]').type('1.2');
    cy.get('[data-testid="AddCircleOutlineIcon"]').click();

    cy.contains('All cats').click();
    cy.contains(oldCatName).click();

    let newCatName = "0000000000000000new cypress cat";
    cy.get('[aria-label="openNameInput"]').click();
    cy.get('input[placeholder="New name"]').type(newCatName);
    cy.get('[aria-label="submitName"]').click();

    cy.contains('All cats').click();
    cy.contains(newCatName).should('exist');

    cy.get('[data-testid="DeleteForeverIcon"]').first().click();
    cy.wait(1000);
    cy.contains(newCatName).should('not.exist');
  })
});


describe('user management', () => {
  const newUserEmail = "fjw4oifj0f03f3029898@kfleklfeslkfek0.com"
  const newUserInitialName = "oldName";
  const newUserPassword = "kf3l@#FLFL#)0fds@4";

  before(() => {
    cy.visit('http://localhost:5173/');

    cy.contains('Log/Sign In').click();

    cy.wait(3000);

    cy.origin('https://dev-71pxajof3gt25bcw.us.auth0.com', () => {
      cy.get('[id="username"]').type("cypreslfkjdsflsd@fkdslfklsd.com");
      cy.get('[id="password"]').type("fjl34jlf#$FJOL$JFOf");
      cy.contains('Continue').click();
    });
  })

  // it('profile shows my info', () => {
  //   cy.contains('Profile').click();
  //   cy.wait(1000);

  //   cy.contains('cypress_man').should('exist');
  //   cy.contains('Admin').should('exist');
  //   cy.contains('Your email: cypreslfkjdsflsd@fkdslfklsd.com').should('exist');
  // })

  it('can create, update, delete users as admin', () => {
    cy.contains('All users').click();

    cy.get('input[placeholder="Name"]').type(newUserInitialName);
    cy.get('input[placeholder="Email"]').type(newUserEmail);
    cy.get('input[placeholder="Password"]').type(newUserPassword);
    cy.get('[data-testid="AddCircleOutlineIcon"]').click();

    cy.contains('Log Out').click();

    cy.contains('Log/Sign In').click();

    cy.wait(3000);

    cy.origin('https://dev-71pxajof3gt25bcw.us.auth0.com', { args: { newUserEmail: newUserEmail, newUserPassword: newUserPassword } },
      ({ newUserEmail, newUserPassword }) => {
        cy.get('[id="username"]').type(newUserEmail);
        cy.get('[id="password"]').type(newUserPassword);
        cy.contains('Continue').click();
        cy.contains('Accept').click();
      });

    cy.contains('Profile').click();
    // cy.contains(newUserInitialName).should('exist');
    cy.contains("Regular User").should('exist');

    cy.contains('Log Out').click();

    cy.contains('Log/Sign In').click();

    cy.wait(3000);

    cy.origin('https://dev-71pxajof3gt25bcw.us.auth0.com',
      () => {
        cy.get('[id="username"]').type("cypreslfkjdsflsd@fkdslfklsd.com");
        cy.get('[id="password"]').type("fjl34jlf#$FJOL$JFOf");
        cy.contains('Continue').click();
      });

    cy.contains('All users').click();
    cy.wait(1000);
    cy.contains('td', newUserInitialName).parent('tr').within(() => {
      cy.contains('Regular User').click();
    });
    cy.get('.MuiMenuItem-root[data-value="Manager"]').click();

    cy.wait(3000);

    cy.contains('td', newUserInitialName).parent('tr').within(() => {
      cy.contains('Manager').should('exist');
      cy.contains('Regular User').should('not.exist');
      cy.get('[data-testid="DeleteForeverIcon"]').first().click();
    });
    cy.wait(2000);

    cy.contains('All cats').click();
    cy.contains('All users').click();
    cy.wait(3000);
    cy.contains(newUserEmail).should('not.exist');
  })
});