
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
  
  // Wait for Firebase to be fully loaded
  function initializeFirebase() {
    // Check if Firebase is available
    if (typeof firebase === 'undefined') {
      console.error('Firebase is not loaded. Please check your script tags.');
      return;
    } else {
      console.log('Firebase is loaded successfully');
    }
  
    // Initialize Firebase
    try {
      firebase.initializeApp(firebaseConfig);
      console.log('Firebase app initialized successfully');
    } catch (error) {
      if (error.code === 'app/duplicate-app') {
        console.log('Firebase app already initialized');
      } else {
        console.error('Error initializing Firebase app:', error);
        return;
      }
    }
  
    // Initialize Firestore with optimized settings
    let db;
    try {
      db = firebase.firestore();
      console.log('Firestore initialized successfully');
    } catch (error) {
      console.error('Error initializing Firestore:', error);
      return;
    }
  
    // Initialize Firebase Auth with proper error handling
    let auth;
    try {
      // Check if firebase.auth exists before calling it
      if (typeof firebase.auth === 'function') {
        auth = firebase.auth();
        console.log('Firebase Auth initialized successfully');
      } else {
        throw new Error('firebase.auth is not a function - Firebase Auth module not loaded');
      }
    } catch (error) {
      console.error('Error initializing Firebase Auth:', error);
      console.log('Firebase modules available:', Object.keys(firebase));
      
      // Fallback: create a mock auth object for development
      auth = {
        currentUser: null,
        onAuthStateChanged: (callback) => {
          console.log('Mock auth state listener called');
          callback(null);
          return () => {};
        },
        signInWithPopup: async () => {
          throw new Error('Firebase Auth not available');
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

    // Sign in with Google
    async signInWithGoogle() {
      try {
        console.log('Attempting Google sign-in');
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');
        
        const result = await auth.signInWithPopup(provider);
        console.log('Successfully signed in with Google:', result.user.uid);
        return result.user;
      } catch (error) {
        console.error('Error signing in with Google:', error);
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

    // Reset password
    async resetPassword(email) {
      try {
          console.log('Attempting to send password reset email:', email);
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
    // Save all products to Firebase (bulk operation)
    async saveProducts(products) {
      try {
        console.log('Attempting to save all products to Firebase:', products.length);
        
        // First, delete all existing products
        await this.deleteAllProducts();
        
        // Then add all new products
        const addPromises = products.map(product => this.addProduct(product));
        await Promise.all(addPromises);
        
        console.log('Successfully saved all products to Firebase');
        return true;
      } catch (error) {
        console.error('Error saving products to Firebase:', error);
        throw error;
      }
    },

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
        
        // Convert ISO string timestamps to Firestore timestamps
        const processedData = { ...productData };
        if (processedData.createdAt && typeof processedData.createdAt === 'string') {
          try {
            processedData.createdAt = firebase.firestore.Timestamp.fromDate(new Date(processedData.createdAt));
          } catch (e) {
            console.warn('Could not parse createdAt timestamp, using server timestamp:', e);
            processedData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
          }
        } else if (!processedData.createdAt) {
          processedData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        }
        
        if (processedData.updatedAt && typeof processedData.updatedAt === 'string') {
          try {
            processedData.updatedAt = firebase.firestore.Timestamp.fromDate(new Date(processedData.updatedAt));
          } catch (e) {
            console.warn('Could not parse updatedAt timestamp, using server timestamp:', e);
            processedData.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
          }
        } else if (!processedData.updatedAt) {
          processedData.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
        }
        
        const docRef = await db.collection('products').add(processedData);
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
        
        // Convert ISO string timestamps to Firestore timestamps
        const processedData = { ...productData };
        if (processedData.updatedAt && typeof processedData.updatedAt === 'string') {
          try {
            processedData.updatedAt = firebase.firestore.Timestamp.fromDate(new Date(processedData.updatedAt));
          } catch (e) {
            console.warn('Could not parse updatedAt timestamp, using server timestamp:', e);
            processedData.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
          }
        } else if (!processedData.updatedAt) {
          processedData.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
        }
        
        await db.collection('products').doc(productId).update(processedData);
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
            userId: chatData.userId,
            userName: chatData.userName,
            status: chatData.status || 'active',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastMessageAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastMessage: '',
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
          const docRef = await db.collection('chats').doc(chatId).collection('messages').add({
            text: messageData.text,
            sender: messageData.sender,
            userId: messageData.userId,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          });
          console.log('Successfully added message with ID:', docRef.id);
          return docRef.id;
        } catch (error) {
          console.error('Error adding message to Firebase:', error);
          throw error;
        }
      },

      async sendMessage(chatId, messageText) {
        try {
          console.log('Attempting to send message to Firebase:', chatId, messageText);
          
          // Add the message to the messages subcollection
          const messageData = {
            text: messageText,
            sender: 'admin',
            userId: 'admin',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          };
          
          const messageId = await this.addMessage(chatId, messageData);
          
          // Update the chat's last message and timestamp
          await this.updateChat(chatId, {
            lastMessage: messageText,
            lastMessageAt: firebase.firestore.FieldValue.serverTimestamp(),
            unreadCount: 0 // Reset unread count since admin sent the message
          });
          
          console.log('Successfully sent message with ID:', messageId);
          return messageId;
        } catch (error) {
          console.error('Error sending message to Firebase:', error);
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
      onChatMessagesChange(callback) {
        console.log('Setting up real-time listener for all chat messages');
        
        // Validate callback parameter
        if (typeof callback !== 'function') {
          console.error('onChatMessagesChange: callback must be a function');
          return () => {}; // Return empty cleanup function
        }
        
        // Store callback reference to prevent context issues
        const callbackRef = callback;
        
        try {
          // Listen to all chats for new messages with optimized settings
          return db.collection('chats').onSnapshot({
            includeMetadataChanges: false, // Reduce unnecessary updates
            next: (snapshot) => {
              snapshot.docChanges().forEach(change => {
                if (change.type === 'modified') {
                  const chatId = change.doc.id;
                  const chatData = change.doc.data();
                  
                  // Only get messages if this is an active chat
                  if (chatData.status === 'active' || !chatData.status) {
                    // Get messages for this chat with timeout
                    const messagesPromise = this.getMessages(chatId);
                    const timeoutPromise = new Promise((_, reject) => 
                      setTimeout(() => reject(new Error('Messages timeout')), 2000)
                    );
                    
                    Promise.race([messagesPromise, timeoutPromise])
                      .then(messages => {
                        // Validate callback again before calling with try-catch
                        if (typeof callbackRef === 'function') {
                          try {
                            callbackRef(chatId, messages);
                          } catch (callbackError) {
                            console.error('Error in chat messages callback:', callbackError);
                          }
                        }
                      })
                      .catch(error => {
                        console.error('Error getting messages for chat:', chatId, error);
                      });
                  }
                }
              });
            },
            error: (error) => {
            console.error('Error in chat messages listener:', error);
            }
          });
        } catch (error) {
          console.error('Error setting up chat messages listener:', error);
          return () => {}; // Return empty cleanup function
        }
      },
  
      // Admin status tracking
      async setAdminOnline() {
        try {
          console.log('Setting admin status to online...');
          await db.collection('adminStatus').doc('current').set({
            isOnline: true,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            adminId: 'admin'
          });
          console.log('Admin status set to online successfully');
        } catch (error) {
          console.error('Error setting admin online:', error);
          // Check if it's a permission error
          if (error.code === 'permission-denied' || error.message?.includes('Missing or insufficient permissions')) {
            console.warn('Admin status tracking failed due to permissions - this is normal for non-admin users');
          }
        }
      },
  
      async setAdminOffline() {
        try {
          console.log('Setting admin status to offline...');
          await db.collection('adminStatus').doc('current').set({
            isOnline: false,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            adminId: 'admin'
          });
          console.log('Admin status set to offline successfully');
        } catch (error) {
          console.error('Error setting admin offline:', error);
          // Check if it's a permission error
          if (error.code === 'permission-denied' || error.message?.includes('Missing or insufficient permissions')) {
            console.warn('Admin status tracking failed due to permissions - this is normal for non-admin users');
          }
        }
      },
  
      // Real-time listener for admin status
      onAdminStatusChange(callback) {
        console.log('Setting up real-time listener for admin status');
        try {
          return db.collection('adminStatus').doc('current')
            .onSnapshot(snapshot => {
              if (snapshot.exists) {
                const data = snapshot.data();
                const isOnline = data.isOnline || false;
                console.log('Admin status update:', isOnline);
                callback(isOnline);
              } else {
                console.log('No admin status found, defaulting to offline');
                callback(false);
              }
            }, error => {
              console.error('Error in admin status listener:', error);
              // Check if it's an ad blocker error
              if (error.message && error.message.includes('ERR_BLOCKED_BY_CLIENT')) {
                console.warn('Admin status tracking blocked by ad blocker');
                callback(false); // Default to offline
              } else if (error.code === 'permission-denied' || error.message?.includes('Missing or insufficient permissions')) {
                console.warn('Admin status tracking failed due to permissions - this is normal for non-admin users');
                callback(false); // Default to offline
              } else {
                console.error('Admin status listener error:', error);
                callback(false);
              }
            });
        } catch (error) {
          console.error('Error setting up admin status listener:', error);
          callback(false);
          return () => {}; // Return empty cleanup function
        }
      },
  
      // Admin logging functions
      async logAdminAction(action, details = {}) {
        try {
          console.log('Logging admin action:', action, details);
          await db.collection('adminLogs').add({
            action: action,
            details: details,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            adminId: 'admin',
            sessionId: sessionStorage.getItem('adminSessionId') || 'unknown'
          });
          console.log('Admin action logged successfully');
        } catch (error) {
          console.error('Error logging admin action:', error);
          // Check if it's a permission error
          if (error.code === 'permission-denied' || error.message?.includes('Missing or insufficient permissions')) {
            console.warn('Admin action logging failed due to permissions - this is normal for non-admin users');
          }
        }
      },
  
      async getAdminLogs(limit = 100) {
        try {
          console.log('Fetching admin logs...');
          const snapshot = await db.collection('adminLogs')
            .orderBy('timestamp', 'desc')
            .limit(limit)
            .get();
          
          const logs = [];
          snapshot.forEach(doc => {
            logs.push({
              id: doc.id,
              ...doc.data()
            });
          });
          console.log('Successfully fetched admin logs:', logs);
          return logs;
        } catch (error) {
          console.error('Error fetching admin logs:', error);
          return [];
        }
      },
  
      async clearAdminLogs() {
        try {
          console.log('Clearing admin logs...');
          const snapshot = await db.collection('adminLogs').get();
          const deletePromises = snapshot.docs.map(doc => doc.ref.delete());
          await Promise.all(deletePromises);
          console.log('Admin logs cleared successfully');
          return true;
        } catch (error) {
          console.error('Error clearing admin logs:', error);
          throw error;
        }
      }
    };
  
    // Make Firebase services globally available
  window.FirebaseService = FirebaseService;
  window.AuthService = AuthService; 
    window.db = db;
    window.auth = auth;
  }
  
  // Wait for DOM to be ready and Firebase scripts to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFirebase);
  } else {
    // If DOM is already loaded, wait a bit for Firebase scripts
    setTimeout(initializeFirebase, 100);
  } 
  