class LoginPage {
    constructor() {
        this.elements = {
            loginForm: document.getElementById('loginForm'),
            emailInput: document.getElementById('email'),
            passwordInput: document.getElementById('password'),
            togglePasswordBtn: document.getElementById('togglePassword'),
            errorMessage: document.getElementById('errorMessage'),
            successMessage: document.getElementById('successMessage'),
            googleSignInBtn: document.getElementById('googleSignInBtn'),
            googleErrorMessage: document.getElementById('googleErrorMessage'),
            forgotPasswordBtn: document.getElementById('forgotPasswordBtn'),
            forgotPasswordModal: document.getElementById('forgotPasswordModal'),
            closeForgotPasswordBtn: document.getElementById('closeForgotPasswordBtn'),
            resetPasswordBtn: document.getElementById('resetPasswordBtn'),
            resetEmailInput: document.getElementById('resetEmail'),
            showSignUpBtn: document.getElementById('showSignUpBtn'),
            signUpModal: document.getElementById('signUpModal'),
            closeSignUpBtn: document.getElementById('closeSignUpBtn'),
            createAccountBtn: document.getElementById('createAccountBtn'),
            signUpUsernameInput: document.getElementById('signUpUsername'),
            signUpEmailInput: document.getElementById('signUpEmail'),
            signUpPasswordInput: document.getElementById('signUpPassword'),
            signUpConfirmPasswordInput: document.getElementById('signUpConfirmPassword'),
            toggleSignUpPasswordBtn: document.getElementById('toggleSignUpPassword'),
            toggleSignUpConfirmPasswordBtn: document.getElementById('toggleSignUpConfirmPassword'),
        };

        this.bindEvents();
    }

    init() {
        this.waitForFirebase().then(() => {
            this.checkAuthState();
            this.setupGoogleSignIn();
            this.handleUrlAction();
        });
    }

    bindEvents() {
        this.elements.loginForm?.addEventListener('submit', this.handleLoginSubmit.bind(this));
        this.elements.forgotPasswordBtn?.addEventListener('click', this.showForgotPasswordModal.bind(this));
        this.elements.closeForgotPasswordBtn?.addEventListener('click', this.closeForgotPasswordModal.bind(this));
        this.elements.resetPasswordBtn?.addEventListener('click', this.handlePasswordReset.bind(this));
        this.elements.showSignUpBtn?.addEventListener('click', this.showSignUpModal.bind(this));
        this.elements.closeSignUpBtn?.addEventListener('click', this.closeSignUpModal.bind(this));
        this.elements.createAccountBtn?.addEventListener('click', this.handleCreateAccount.bind(this));

        // Password visibility toggles
        this.elements.togglePasswordBtn?.addEventListener('click', () => this.togglePasswordVisibility(this.elements.passwordInput, this.elements.togglePasswordBtn));
        this.elements.toggleSignUpPasswordBtn?.addEventListener('click', () => this.togglePasswordVisibility(this.elements.signUpPasswordInput, this.elements.toggleSignUpPasswordBtn));
        this.elements.toggleSignUpConfirmPasswordBtn?.addEventListener('click', () => this.togglePasswordVisibility(this.elements.signUpConfirmPasswordInput, this.elements.toggleSignUpConfirmPasswordBtn));
    }

    handleUrlAction() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('action') === 'signup') {
            this.showSignUpModal();
        }
    }

    togglePasswordVisibility(input, button) {
        if (!input || !button) return;

        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';

        const eyeIcon = `
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>`;
        const eyeOffIcon = `
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>`;

        button.innerHTML = isPassword ? eyeOffIcon : eyeIcon;
    }

    waitForFirebase() {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (window.AuthService && window.FirebaseService) {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        });
    }

    checkAuthState() {
        window.AuthService.onAuthStateChanged((user) => {
            if (user) {
                window.location.href = 'index.html';
            }
        });
    }

    async handleLoginSubmit(e) {
        e.preventDefault();
        this.hideMessages();

        const email = this.elements.emailInput.value.trim();
        const password = this.elements.passwordInput.value;

        try {
            const user = await window.AuthService.signIn(email, password);
            
            // Check if email is verified
            if (user && !user.emailVerified) {
                this.showError('Email not verified. Please check your inbox.');
                
                // Add resend button to error message
                const resendLink = document.createElement('a');
                resendLink.href = '#';
                resendLink.className = 'block mt-2 text-sm font-bold underline hover:text-red-800';
                resendLink.textContent = 'Resend Verification Email';
                resendLink.onclick = async (ev) => {
                    ev.preventDefault();
                    try {
                        await window.AuthService.sendEmailVerification();
                        alert('Verification email sent! Please check your inbox.');
                    } catch (err) {
                        console.error('Error resending verification:', err);
                        alert('Failed to send verification email. Please try again later.');
                    }
                };
                this.elements.errorMessage.appendChild(resendLink);
                return;
            }

            this.elements.successMessage.classList.remove('hidden');
            setTimeout(() => { window.location.href = 'index.html'; }, 1500);
        } catch (error) {
            console.error('Login error:', error);
            this.showError(this.getAuthErrorMessage(error.code));
            this.elements.passwordInput.value = '';
        }
    }

    showForgotPasswordModal() {
        this.elements.forgotPasswordModal.classList.remove('hidden');
    }

    closeForgotPasswordModal() {
        this.elements.forgotPasswordModal.classList.add('hidden');
        this.elements.resetEmailInput.value = '';
    }

    async handlePasswordReset() {
        const email = this.elements.resetEmailInput.value.trim();
        if (!email) {
            alert('Please enter your email address.');
            return;
        }

        try {
            await window.AuthService.resetPassword(email);
            alert('Password reset email sent! Please check your inbox.');
            this.closeForgotPasswordModal();
        } catch (error) {
            console.error('Password reset error:', error);
            alert('Error sending password reset email. Please try again.');
        }
    }

    showSignUpModal() {
        this.elements.signUpModal.classList.remove('hidden');
    }

    closeSignUpModal() {
        this.elements.signUpModal.classList.add('hidden');
        this.elements.signUpUsernameInput.value = '';
        this.elements.signUpEmailInput.value = '';
        this.elements.signUpPasswordInput.value = '';
        this.elements.signUpConfirmPasswordInput.value = '';
    }

    async handleCreateAccount() {
        const username = this.elements.signUpUsernameInput.value.trim();
        const email = this.elements.signUpEmailInput.value.trim();
        const password = this.elements.signUpPasswordInput.value;
        const confirmPassword = this.elements.signUpConfirmPasswordInput.value;

        if (!username || !email || !password || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }
        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return;
        }
        if (username.length < 3 || username.length > 20 || !/^[a-zA-Z0-9_]+$/.test(username)) {
            alert('Username must be 3-20 characters and contain only letters, numbers, or underscores.');
            return;
        }

        try {
            const user = await window.AuthService.signUp(email, password);
            if (user) {
                await window.FirebaseService.addUser({
                    uid: user.uid,
                    username: username,
                    displayName: username,
                    email: email,
                    createdAt: new Date().toISOString(),
                    provider: 'email'
                });

                // Send verification email
                await window.AuthService.sendEmailVerification();
            }
            alert('Account created successfully! A verification email has been sent to your inbox. Please verify your email before signing in.');
            this.closeSignUpModal();
        } catch (error) {
            console.error('Sign up error:', error);
            alert(this.getAuthErrorMessage(error.code, 'Error creating account.'));
        }
    }

    setupGoogleSignIn() {
        const handleResult = async (result) => {
            if (!result || !result.user) return;
            try {
                const existingUser = await window.FirebaseService.getUser(result.user.uid);
                if (!existingUser) {
                    await window.FirebaseService.addUser({
                        uid: result.user.uid,
                        username: result.user.displayName || result.user.email.split('@')[0],
                        email: result.user.email,
                        displayName: result.user.displayName,
                        photoURL: result.user.photoURL,
                        createdAt: new Date().toISOString(),
                        provider: 'google'
                    });
                }
            } catch (firestoreError) {
                console.warn('Could not store user data in Firestore:', firestoreError);
            }
            window.location.href = 'index.html';
        };

        // Handle redirect result on page load
        window.auth.getRedirectResult()
            .then(result => {
                if (result && result.user) {
                    handleResult(result);
                }
            })
            .catch(error => {
                console.error('Google sign-in redirect error:', error);
                this.showError(this.getAuthErrorMessage(error.code), this.elements.googleErrorMessage);
            });

        // Handle button click
        this.elements.googleSignInBtn?.addEventListener('click', async () => {
            this.hideMessages(this.elements.googleErrorMessage);
            const provider = new window.firebase.auth.GoogleAuthProvider();

            try {
                const result = await window.auth.signInWithPopup(provider);
                await handleResult(result);
            } catch (error) {
                console.error('Google sign-in error:', error);
                this.showError(this.getAuthErrorMessage(error.code), this.elements.googleErrorMessage);
            }
        });
    }

    getAuthErrorMessage(code, defaultMessage = 'An unknown error occurred.') {
        switch (code) {
            case 'auth/user-not-found':
                return 'No account found with this email address.';
            case 'auth/wrong-password':
                return 'Incorrect password. Please try again.';
            case 'auth/invalid-email':
                return 'Please enter a valid email address.';
            case 'auth/too-many-requests':
                return 'Too many failed attempts. Please try again later.';
            case 'auth/user-disabled':
                return 'This account has been disabled.';
            case 'auth/email-already-in-use':
                return 'An account with this email already exists.';
            case 'auth/weak-password':
                return 'Password is too weak. Please choose a stronger password.';
            case 'auth/popup-closed-by-user':
            case 'auth/cancelled-popup-request':
                return 'Sign-in popup closed. Please try again.';
            case 'auth/popup-blocked':
                return 'Pop-up blocked by browser. Please allow pop-ups for this site.';
            case 'auth/account-exists-with-different-credential':
                return 'An account already exists with this email but different sign-in credentials.';
            default:
                return defaultMessage;
        }
    }

    showError(message, element = this.elements.errorMessage) {
        if (element) {
            element.textContent = message;
            element.classList.remove('hidden');
        }
    }

    hideMessages(element = null) {
        if (element) {
            element.classList.add('hidden');
        } else {
            this.elements.errorMessage.classList.add('hidden');
            this.elements.successMessage.classList.add('hidden');
            this.elements.googleErrorMessage.classList.add('hidden');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginPage = new LoginPage();
    loginPage.init();
});