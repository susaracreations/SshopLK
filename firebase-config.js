// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXQxty-9mU_PFONIE0RGgs3gg2G8gi1ng",
  authDomain: "sshop-lk.firebaseapp.com",
  projectId: "sshop-lk",
  storageBucket: "sshop-lk.firebasestorage.app",
  messagingSenderId: "1032750720586",
  appId: "1:1032750720586:web:3b08580929f8e1686f68b3",
  measurementId: "G-4XQTJVKS72"
};

// Check if Firebase is available
if (typeof firebase === 'undefined') {
  console.error('Firebase is not loaded. Please check your script tags.');
} else {
  console.log('Firebase is loaded successfully');
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore with optimized settings
const db = firebase.firestore();

// Initialize Firebase Auth with error handling
let auth;
try {
  auth = firebase.auth();
  console.log('Firebase Auth initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase Auth:', error);
  // Fallback: create a mock auth object for development
  auth = {
    currentUser: null,
    onAuthStateChanged: (callback) => {
      console.log('Mock auth state listener called');
      callback(null);
      return () => {};
    },
    signInWithEmailAndPassword: async () => {
      throw new Error('Firebase Auth not available');
    },
    createUserWithEmailAndPassword: async () => {
      throw new Error('Firebase Auth not available');
    },
    signOut: async () => {
      throw new Error('Firebase Auth not available');
    },
    sendPasswordResetEmail: async () => {
      throw new Error('Firebase Auth not available');
    }
  };
}

// Configure Firestore settings for better performance
db.settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
  merge: true
});

// User Authentication Service
const AuthService = {
  // Get current user
  getCurrentUser() {
    return auth.currentUser;
  },

  // Sign up with email and password
  async signUp(email, password) {
    try {
      console.log('Attempting to sign up user:', email);
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      console.log('Successfully signed up user:', userCredential.user.uid);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing up user:', error);
      throw error;
    }
  },

  // Sign in with email and password
  async signIn(email, password) {
    try {
      console.log('Attempting to sign in user:', email);
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      console.log('Successfully signed in user:', userCredential.user.uid);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in user:', error);
      throw error;
    }
  },

  // Sign out
  async signOut() {
    try {
      console.log('Attempting to sign out user');
      await auth.signOut();
      console.log('Successfully signed out user');
    } catch (error) {
      console.error('Error signing out user:', error);
      throw error;
    }
  },

  // Password reset
  async resetPassword(email) {
    try {
      console.log('Attempting to reset password for:', email);
      await auth.sendPasswordResetEmail(email);
      console.log('Successfully sent password reset email');
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  },

  // Listen for auth state changes
  onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
  }
};

// Firebase functions for product management
const FirebaseService = {
  // Get all products from Firebase
  async getProducts() {
    try {
      console.log('Attempting to fetch products from Firebase...');
      const snapshot = await db.collection('products').get();
      const products = [];
      snapshot.forEach(doc => {
        products.push({
          id: doc.id,
          ...doc.data()
        });
      });
      console.log('Successfully fetched products from Firebase:', products);
      return products;
    } catch (error) {
      console.error('Error getting products from Firebase:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      return [];
    }
  },

  // Add a new product to Firebase
  async addProduct(productData) {
    try {
      console.log('Attempting to add product to Firebase:', productData);
      const docRef = await db.collection('products').add(productData);
      console.log('Successfully added product with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding product to Firebase:', error);
      throw error;
    }
  },

  // Update an existing product
  async updateProduct(productId, productData) {
    try {
      console.log('Attempting to update product in Firebase:', productId, productData);
      await db.collection('products').doc(productId).update(productData);
      console.log('Successfully updated product:', productId);
      return true;
    } catch (error) {
      console.error('Error updating product in Firebase:', error);
      throw error;
    }
  },

  // Delete a product
  async deleteProduct(productId) {
    try {
      console.log('Attempting to delete product from Firebase:', productId);
      await db.collection('products').doc(productId).delete();
      console.log('Successfully deleted product:', productId);
      return true;
    } catch (error) {
      console.error('Error deleting product from Firebase:', error);
      throw error;
    }
  },

  // Delete all products
  async deleteAllProducts() {
    try {
      console.log('Attempting to delete all products from Firebase...');
      const snapshot = await db.collection('products').get();
      const deletePromises = snapshot.docs.map(doc => doc.ref.delete());
      await Promise.all(deletePromises);
      console.log('Successfully deleted all products from Firebase');
      return true;
    } catch (error) {
      console.error('Error deleting all products from Firebase:', error);
      throw error;
    }
  },

  // Get categories from Firebase
  async getCategories() {
    try {
      console.log('Attempting to fetch categories from Firebase...');
      const snapshot = await db.collection('categories').get();
      const categories = [];
      snapshot.forEach(doc => {
        categories.push({
          id: doc.id,
          ...doc.data()
        });
      });
      console.log('Successfully fetched categories from Firebase:', categories);
      return categories;
    } catch (error) {
      console.error('Error getting categories from Firebase:', error);
      return [];
    }
  },

  // Real-time listener for products
  onProductsChange(callback) {
    console.log('Setting up real-time listener for products...');
    return db.collection('products').onSnapshot(snapshot => {
      const products = [];
      snapshot.forEach(doc => {
        products.push({
          id: doc.id,
          ...doc.data()
        });
      });
      console.log('Real-time products update:', products);
      callback(products);
    }, error => {
      console.error('Error in real-time listener:', error);
    });
  },

  // Get website settings from Firebase
  async getWebsiteSettings() {
    try {
      console.log('Attempting to fetch website settings from Firebase...');
      const doc = await db.collection('settings').doc('website').get();
      if (doc.exists) {
        const settings = doc.data();
        console.log('Successfully fetched website settings from Firebase:', settings);
        return settings;
      } else {
        console.log('No website settings found in Firebase, returning default');
        return {
          heroImage: 'https://placehold.co/600x400/805ad5/ffffff?text=S+Shop+LK'
        };
      }
    } catch (error) {
      console.error('Error getting website settings from Firebase:', error);
      return {
        heroImage: 'https://placehold.co/600x400/805ad5/ffffff?text=S+Shop+LK'
      };
    }
  },

  // Update website settings in Firebase
  async updateWebsiteSettings(settings) {
    try {
      console.log('Attempting to update website settings in Firebase:', settings);
      await db.collection('settings').doc('website').set(settings, { merge: true });
      console.log('Successfully updated website settings in Firebase');
      return true;
    } catch (error) {
      console.error('Error updating website settings in Firebase:', error);
      throw error;
    }
  },

  // Add user data to Firestore
  async addUser(userData) {
    try {
      console.log('Attempting to add user data to Firebase:', userData);
      await db.collection('users').doc(userData.uid).set(userData);
      console.log('Successfully added user data to Firebase:', userData.uid);
      return true;
    } catch (error) {
      console.error('Error adding user data to Firebase:', error);
      throw error;
    }
  },

  // Get user data from Firestore
  async getUser(uid) {
    try {
      console.log('Attempting to fetch user data from Firebase:', uid);
      const doc = await db.collection('users').doc(uid).get();
      if (doc.exists) {
        const userData = doc.data();
        console.log('Successfully fetched user data from Firebase:', userData);
        return userData;
      } else {
        console.log('No user data found in Firebase for:', uid);
        return null;
      }
    } catch (error) {
      console.error('Error getting user data from Firebase:', error);
      return null;
    }
  },

  // Update user data in Firestore
  async updateUser(uid, userData) {
    try {
      console.log('Attempting to update user data in Firebase:', uid, userData);
      await db.collection('users').doc(uid).update(userData);
      console.log('Successfully updated user data in Firebase:', uid);
      return true;
    } catch (error) {
      console.error('Error updating user data in Firebase:', error);
      throw error;
    }
  },

  // Chat Management Functions
  async createChat(chatData) {
    try {
      console.log('Attempting to create chat in Firebase:', chatData);
      const docRef = await db.collection('chats').add({
        ...chatData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        lastMessageAt: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'active',
        unreadCount: 0
      });
      console.log('Successfully created chat with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error creating chat in Firebase:', error);
      throw error;
    }
  },

  async getChats() {
    try {
      console.log('Attempting to fetch chats from Firebase...');
      // Use a simpler query that doesn't require composite index
      const snapshot = await db.collection('chats')
        .orderBy('lastMessageAt', 'desc')
        .get();
      
      const chats = [];
      snapshot.forEach(doc => {
        const chatData = doc.data();
        // Filter active chats in JavaScript instead of Firestore query
        if (chatData.status === 'active' || !chatData.status) {
          chats.push({
            id: doc.id,
            ...chatData
          });
        }
      });
      console.log('Successfully fetched chats from Firebase:', chats);
      return chats;
    } catch (error) {
      console.error('Error getting chats from Firebase:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      
      // If it's an index error, try a simpler query
      if (error.code === 'failed-precondition') {
        console.log('Trying simpler query without composite index...');
        try {
          const snapshot = await db.collection('chats').get();
          const chats = [];
          snapshot.forEach(doc => {
            const chatData = doc.data();
            if (chatData.status === 'active' || !chatData.status) {
              chats.push({
                id: doc.id,
                ...chatData
              });
            }
          });
          // Sort by lastMessageAt in JavaScript
          chats.sort((a, b) => {
            if (!a.lastMessageAt || !b.lastMessageAt) return 0;
            return b.lastMessageAt.toDate() - a.lastMessageAt.toDate();
          });
          console.log('Successfully fetched chats with fallback query:', chats);
          return chats;
        } catch (fallbackError) {
          console.error('Fallback query also failed:', fallbackError);
          return [];
        }
      }
      
      return [];
    }
  },

  async getChat(chatId) {
    try {
      console.log('Attempting to fetch chat from Firebase:', chatId);
      const doc = await db.collection('chats').doc(chatId).get();
      if (doc.exists) {
        const chatData = doc.data();
        console.log('Successfully fetched chat from Firebase:', chatData);
        return { id: doc.id, ...chatData };
      } else {
        console.log('No chat found in Firebase for:', chatId);
        return null;
      }
    } catch (error) {
      console.error('Error getting chat from Firebase:', error);
      return null;
    }
  },

  async updateChat(chatId, chatData) {
    try {
      console.log('Attempting to update chat in Firebase:', chatId, chatData);
      await db.collection('chats').doc(chatId).update(chatData);
      console.log('Successfully updated chat in Firebase:', chatId);
      return true;
    } catch (error) {
      console.error('Error updating chat in Firebase:', error);
      throw error;
    }
  },

  async deleteChat(chatId) {
    try {
      console.log('Attempting to delete chat from Firebase:', chatId);
      await db.collection('chats').doc(chatId).delete();
      console.log('Successfully deleted chat from Firebase:', chatId);
      return true;
    } catch (error) {
      console.error('Error deleting chat from Firebase:', error);
      throw error;
    }
  },

  async addMessage(chatId, messageData) {
    try {
      console.log('Attempting to add message to Firebase:', chatId, messageData);
      const docRef = await db.collection('chats').doc(chatId)
        .collection('messages').add({
          ...messageData,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
      console.log('Successfully added message with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding message to Firebase:', error);
      throw error;
    }
  },

  async getMessages(chatId) {
    try {
      console.log('Attempting to fetch messages from Firebase:', chatId);
      const snapshot = await db.collection('chats').doc(chatId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .get();
      
      const messages = [];
      snapshot.forEach(doc => {
        messages.push({
          id: doc.id,
          ...doc.data()
        });
      });
      console.log('Successfully fetched messages from Firebase:', messages);
      return messages;
    } catch (error) {
      console.error('Error getting messages from Firebase:', error);
      return [];
    }
  },

  // Real-time listener for chat messages
  onChatMessagesChange(chatId, callback) {
    console.log('Setting up real-time listener for chat messages:', chatId);
    return db.collection('chats').doc(chatId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot(snapshot => {
        const messages = [];
        snapshot.forEach(doc => {
          messages.push({
            id: doc.id,
            ...doc.data()
          });
        });
        console.log('Real-time chat messages update:', messages);
        callback(messages);
      }, error => {
        console.error('Error in real-time chat listener:', error);
      });
  }
};

// Export for use in other files
window.FirebaseService = FirebaseService;
window.AuthService = AuthService; 