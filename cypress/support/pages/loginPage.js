class LoginPage {
    usernameInput='#username';
    passwordInput='#password';
    loginBtn='#submit-login';
    message='#flash';
    logoutBtn='a[href="/logout"]';
    visit() {
        cy.visit('https://practice.expandtesting.com/login');
    }
    login(username,password) {
        cy.get(this.usernameInput).clear().type(username);
        cy.get(this.passwordInput).clear().type(password);
        cy.get(this.loginBtn).click();
    }
}
export default LoginPage