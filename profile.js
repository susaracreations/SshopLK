class ProfilePage {
    constructor() {
        this.currentUser = null;
        this.userData = null;
        this.isEditMode = false;
        this.originalData = {};

        this.currentTab = 'profile';
        // Bind methods to the instance
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleAvatarUpload = this.handleAvatarUpload.bind(this);
    }

    init() {
        this.setupEventListeners();
        this.setupAuthState();
    }

    setupEventListeners() {
        const editProfileBtn = document.getElementById('editProfileBtn');
        const profileForm = document.getElementById('profileForm');
        const navItems = document.querySelectorAll('.nav-item');
        const avatarInput = document.getElementById('avatarInput');

        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', this.toggleEditMode);
        }
        if (profileForm) {
            profileForm.addEventListener('submit', this.handleFormSubmit);
        }
        if (navItems) {
            navItems.forEach(item => {
                item.addEventListener('click', (e) => this.handleTabSwitch(e));
            });
        }
        if (avatarInput) {
            avatarInput.addEventListener('change', this.handleAvatarUpload);
        }

        // Example listener for security form
        const securityForm = document.getElementById('securityForm');
        if (securityForm) {
            securityForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // In a real app, you would handle password change logic here.
                // For now, we'll just show a success message.
                this.showToast('Password update functionality is not yet implemented.', 'success');
                securityForm.reset();
            });
        }
    }

    setupAuthState() {
        if (window.AuthService) {
            AuthService.onAuthStateChanged((user) => {
                if (user) {
                    this.currentUser = user;
                    this.loadUserProfile();
                } else {
                    window.location.href = 'login.html';
                }
            });
        } else {
            // Fallback if AuthService is not ready
            setTimeout(() => this.setupAuthState(), 100);
        }
    }

    async loadUserProfile() {
        if (!this.currentUser || !window.FirebaseService) return;

        try {
            this.userData = await FirebaseService.getUser(this.currentUser.uid);
            const displayName = this.currentUser.displayName || (this.userData && this.userData.displayName) || (this.userData && this.userData.username) || this.currentUser.email.split('@')[0];

            if (this.userData) {
                this.updateProfileDisplay({ ...this.userData, displayName });
                document.getElementById('username').value = this.userData.username || displayName;
                document.getElementById('email').value = this.userData.email || this.currentUser.email || '';
                document.getElementById('bio').value = this.userData.bio || '';
            } else {
                // Create a new user profile if one doesn't exist
                const newUserProfile = {
                    uid: this.currentUser.uid,
                    username: displayName,
                    email: this.currentUser.email,
                    displayName: this.currentUser.displayName,
                    photoURL: this.currentUser.photoURL,
                    bio: '',
                    createdAt: new Date().toISOString(),
                    profileViews: 0,
                    lastActive: new Date().toISOString(),
                    provider: this.currentUser.providerData[0]?.providerId || 'email'
                };
                await FirebaseService.addUser(newUserProfile);
                this.userData = newUserProfile;
                this.loadUserProfile(); // Reload to display the new data
            }
        } catch (error) {
            console.error('Error loading user profile:', error);
            this.showToast('Error loading profile data.', 'error');
        }
    }

    updateProfileDisplay(data) {
        const displayName = data.displayName || data.username || 'User';
        const email = data.email || this.currentUser.email || 'user@example.com';
        const initials = this.getInitials(displayName);

        document.getElementById('profileName').textContent = displayName;
        document.getElementById('profileEmail').textContent = email;
        
        const profileAvatar = document.getElementById('profileAvatar');
        if (data.photoURL) {
            profileAvatar.innerHTML = `<img src="${data.photoURL}" alt="${displayName}" class="w-full h-full object-cover">`;
        } else {
            profileAvatar.innerHTML = `<span id="profileInitials">${initials}</span>`;
        }

        if (data.createdAt) {
            const daysSince = Math.floor((new Date() - new Date(data.createdAt)) / (1000 * 60 * 60 * 24));
            const memberSinceEl = document.getElementById('memberSince');
            if (memberSinceEl) memberSinceEl.textContent = daysSince;
        }
        const profileViewsEl = document.getElementById('profileViews');
        if (profileViewsEl) profileViewsEl.textContent = data.profileViews || 0;

        if (data.lastActive) {
            const daysActive = Math.floor((new Date() - new Date(data.lastActive)) / (1000 * 60 * 60 * 24));
            const lastActiveEl = document.getElementById('lastActive');
            if (lastActiveEl) lastActiveEl.textContent = daysActive;
        }
    }

    getInitials(name) {
        if (!name) return 'U';
        return name.split(' ').map(word => word.charAt(0).toUpperCase()).join('').slice(0, 2);
    }

    toggleEditMode() {
        this.isEditMode = !this.isEditMode;
        const editBtn = document.getElementById('editProfileBtn');
        const actionButtons = document.getElementById('actionButtons');
        const formInputs = document.querySelectorAll('#profileForm input:not([readonly]), #profileForm textarea');

        if (this.isEditMode) {
            editBtn.innerHTML = `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg><span>Cancel</span>`;
            editBtn.classList.replace('bg-blue-600', 'bg-gray-600');
            editBtn.classList.replace('hover:bg-blue-700', 'hover:bg-gray-700');
            actionButtons.classList.remove('hidden');
            formInputs.forEach(input => input.disabled = false);

            this.originalData = {
                username: document.getElementById('username').value,
                bio: document.getElementById('bio').value
            };
        } else {
            editBtn.innerHTML = `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg><span>Edit</span>`;
            editBtn.classList.replace('bg-gray-600', 'bg-blue-600');
            editBtn.classList.replace('hover:bg-gray-700', 'hover:bg-blue-700');
            actionButtons.classList.add('hidden');
            formInputs.forEach(input => input.disabled = true);

            // Revert to original data if it exists
            if (Object.keys(this.originalData).length > 0) {
                document.getElementById('username').value = this.originalData.username || '';
                document.getElementById('bio').value = this.originalData.bio || '';
            }
        }
    }

    cancelEdit() {
        this.toggleEditMode();
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        if (!this.isEditMode) return;

        const username = document.getElementById('username').value.trim();
        const bio = document.getElementById('bio').value.trim();

        if (username.length < 3 || username.length > 20 || !/^[a-zA-Z0-9_]+$/.test(username)) {
            this.showToast('Username must be 3-20 characters and contain only letters, numbers, or underscores.', 'error');
            return;
        }

        try {
            const updatedData = {
                ...this.userData,
                username: username,
                displayName: username, // Also update displayName for consistency
                bio: bio,
                updatedAt: new Date().toISOString(),
                lastActive: new Date().toISOString()
            };

            await FirebaseService.updateUser(this.currentUser.uid, updatedData);
            this.userData = updatedData;
            this.updateProfileDisplay(updatedData);
            this.toggleEditMode();
            this.showToast('Profile updated successfully!', 'success');
        } catch (error) {
            console.error('Error updating profile:', error);
            this.showToast('Error updating profile. Please try again.', 'error');
        }
    }

    async handleAvatarUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            this.showToast('Please select an image file.', 'error');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            this.showToast('Image size should be less than 5MB.', 'error');
            return;
        }

        try {
            this.showToast('Uploading image...', 'success');
            
            const formData = new FormData();
            formData.append('image', file);
            
            // REPLACE THIS WITH YOUR IMGBB API KEY
            const API_KEY = '9e45c2a61b049286d6230275e700a932'; 
            
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                const photoURL = data.data.display_url;
                await FirebaseService.updateUser(this.currentUser.uid, { photoURL });
                this.userData.photoURL = photoURL;
                this.updateProfileDisplay(this.userData);
                this.showToast('Profile picture updated!', 'success');
            } else {
                throw new Error(data.error ? data.error.message : 'Upload failed');
            }
        } catch (error) {
            console.error('Error uploading avatar:', error);
            this.showToast('Failed to upload image. Check API key.', 'error');
        }
    }

    showToast(message, type = 'success') {
        const containerId = type === 'success' ? 'successMessage' : 'errorMessage';
        const textId = type === 'success' ? 'successMessageText' : 'errorMessageText';

        const messageContainer = document.getElementById(containerId);
        const messageText = document.getElementById(textId);

        if (!messageContainer || !messageText) return;

        messageText.textContent = message;
        messageContainer.classList.remove('hidden', 'translate-x-full');

        setTimeout(() => {
            messageContainer.classList.add('translate-x-full');
            setTimeout(() => {
                messageContainer.classList.add('hidden');
            }, 300);
        }, 5000);
    }

    handleTabSwitch(e) {
        e.preventDefault();
        const newTab = e.currentTarget.dataset.tab;

        if (newTab === this.currentTab) return;

        // Update nav item active state
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        e.currentTarget.classList.add('active');

        // Hide all content panels
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });

        // Show the selected content panel
        document.getElementById(`${newTab}-content`).classList.remove('hidden');

        this.currentTab = newTab;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // The header component script will handle its own initialization.
    // We just need to initialize our page-specific logic.
    const profilePage = new ProfilePage();
    profilePage.init();

    // Make functions accessible from inline HTML (for cancel button)
    window.toggleEditMode = profilePage.toggleEditMode;
    window.cancelEdit = profilePage.cancelEdit;
});