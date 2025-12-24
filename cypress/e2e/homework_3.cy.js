import LoginPage from "../support/pages/loginpage";
import { loginData } from "../fixtures/loginData";
describe('Login Test - Data Driven', () => {
   const loginPage = new LoginPage();
   beforeEach(() => {
      loginPage.visit();
      cy.contains('h1', 'Test Login page for Automation Testing Practice').should('be.visible');
   });
   loginData.forEach((data) => {
      it(data.name, () => {
         loginPage.login(data.username, data.password);
         cy.url().should('include', data.url);
         if (data.success) {
            cy.get(loginPage.logoutBtn).should('be.visible');
         }
         else {
            cy.get('#flash').should('be.visible').and('contain.text', 'invalid');
         }
      })
   })
});

describe('locator', () => {
   it('Tìm selector', () => {
      cy.visit('https://practice.expandtesting.com/locators');
      cy.findByRole('link', { name: 'Contact' }).should('be.visible');
      cy.findByText(/Hot Deal: Buy 1 Get 1 Free/).should('exist');
      cy.findByLabelText('Choose a country').should('be.visible');
      cy.findByLabelText('Email for newsletter').should('be.visible');
      cy.findByPlaceholderText('Search the site').should('be.visible');
      cy.findByAltText('User avatar').should('be.visible');
      cy.findByTitle('Settings panel').should('be.visible');
      cy.findByTestId('status-message').should('be.visible');
      cy.findByTestId('user-name').should('be.visible');
      cy.get('.legacy-css').should('be.visible');
      cy.xpath("//ul[@class='list-group legacy-list']/li").should('have.length', 3);
      cy.xpath("//tr[td[text()='Headphones']]/td[3]").should('have.text', '12');
      let totalStock = 0;
      cy.xpath("//tr[td[text()='Available']]/td[3]").each(($el) => {
         totalStock += Number($el.text());
      }).then(() => {
         expect(totalStock).to.eq(17);
      });
   });
});
// describe('Drag and Drop circles', () => {
//    it('Kéo 3 hình tròn vào hình chữ nhật theo thứ tự', () => {
//       cy.visit('https://practice.expandtesting.com/drag-and-drop-circles');
//       const circles = ['.red', '.blue', '.green'];
//       for (let i = 0; i < circles.length; i++) {
//          cy.get(circles[i]).trigger('mousedown', { which: 1 });
//          cy.get('#target').trigger('mousemove').trigger('mouseup', { force: true });
//       };
//    });
// });
describe('Drag and Drop circles', () => {
   it('Kéo 3 hình tròn vào hình chữ nhật theo thứ tự', () => {
      cy.visit('https://practice.expandtesting.com/drag-and-drop-circles');
      const circles = ['.red', '.blue', '.green'];
      for (let i = 0; i < circles.length; i++) {
         const circle = circles[i];
         cy.get(circle).then($el => {
            const dataTransfer = new DataTransfer();
            cy.get(circle).trigger('dragstart', { dataTransfer });
            cy.get('#target').trigger('drop', { dataTransfer });
            cy.get(circle).trigger('dragend', { dataTransfer });
         });
      }
   });
});
describe.only('Form Validation page for Automation Testing Practice', () => {
   beforeEach(() => {
      cy.visit('https://practice.expandtesting.com/form-validation');
   });
   it('heading', () => {
      cy.contains('h1', 'Form Validation page for Automation Testing Practice').should('be.visible');
   });
   it('Contact Name', () => {
      cy.get('#validationCustom01').type('dodo');
      cy.get('button[type="submit"]').click();
      cy.get('#validationCustom01').closest('.col-md-6').find('.valid-feedback').should('be.visible').and('contain', 'Looks good!');
   });
   it('empty Contact number', () => {
      cy.get('input[name="contactnumber"]').clear();
      cy.get('button[type="submit"]').click();
      cy.get('input[name="contactnumber"]').should('have.css', 'border-color').and('not.eq', 'rgb(206, 212, 218)');
      cy.get('input[name="contactnumber"]').closest('.col-md-6').find('.invalid-feedback').should('be.visible').and('contain', 'Please provide your Contact number.');
   });
   it('invalid Contact number', () => {
      cy.get('input[name="contactnumber"]').clear();
      cy.get('input[name="contactnumber"]').type('abc');
      cy.get('button[type="submit"]').click();
      cy.get('input[name="contactnumber"]').should('have.css', 'border-color').and('not.eq', 'rgb(206, 212, 218)');
      cy.get('input[name="contactnumber"]').closest('.col-md-6').find('.invalid-feedback').should('be.visible').and('contain', 'Please provide your Contact number.');
   });
   it('valid Contact number', () => {
      cy.get('input[name="contactnumber"]').clear();
      cy.get('input[name="contactnumber"]').type('012-3456789');
      cy.get('input[name="contactnumber"]').should('not.have.class', 'is-invalid')
   });
   it('PickUp Date', () => {
      cy.get('input[name="pickupdate"]').should('be.visible');
      cy.get('input[name="pickupdate"]').type('2025-11-30');
      cy.get('input[name="pickupdate"]').should('not.have.class', 'is-invalid')
   });
   it('Payment Method', () => {
      cy.get('#validationCustom04').select('card');
   });
   it('button Register - invalid case', () => {
      cy.get('#validationCustom01').clear().type('dodo');
      cy.get('input[name="contactnumber"]').clear();
      cy.get('input[name="pickupdate"]').clear();
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/form-validation')
      cy.get('.invalid-feedback').filter(':visible').should('have.length.greaterThan', 0);
   });
   it('button Register - valid case', () => {
      cy.get('#validationCustom01').clear();
      cy.get('#validationCustom01').type('dodo');
      cy.get('input[name="contactnumber"]').type('012-3456789');
      cy.get('input[name="pickupdate"]').type('2025-11-30');
      cy.get('#validationCustom04').select('card');
      cy.get('button[type="submit"]').click();
      cy.url().should('include','/form-confirmation');
      cy.contains('Thank you for validating your ticket').should('be.visible');
   });
});