import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User as AppUser, Progress } from '../types';
import { auth, db, googleProvider, handleFirestoreError, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '../lib/firebase';
import { onAuthStateChanged, signInWithPopup, signOut, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, getDocFromServer } from 'firebase/firestore';

interface UserContextType {
  user: AppUser | null;
  loading: boolean;
  needsOnboarding: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string, nickname: string) => Promise<void>;
  completeProfile: (name: string, nickname: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProgress: (newProgress: Partial<Progress>) => Promise<void>;
  toggleModuleCompletion: (moduleId: string) => Promise<void>;
  toggleLessonWatched: (lessonId: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const DEFAULT_USER_DATA: Partial<AppUser> = {
  level: 1,
  xp: 0,
  progress: {
    overall: 0,
    streak: 0,
    questionsAnswered: 0,
    successRate: 0,
    byCategory: {
      'Clínica Médica': 0,
      'Cirurgia': 0,
      'Pediatria': 0,
    },
    completedModules: [],
    watchedLessons: []
  }
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await syncUser(firebaseUser);
      } else {
        setUser(null);
        setNeedsOnboarding(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const syncUser = async (firebaseUser: FirebaseUser) => {
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as AppUser;
        // Check if mandatory fields are missing
        if (!userData.nickname || !userData.name) {
          setUser(userData);
          setNeedsOnboarding(true);
        } else {
          setUser(userData);
          setNeedsOnboarding(false);
        }
      } else {
        // New user from Google or just created but no Firestore doc yet
        setNeedsOnboarding(true);
        // We set a partial user so we have the ID/Basic info, but marked as needs onboarding
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName || '',
          email: firebaseUser.email || '',
          avatar: firebaseUser.photoURL || `https://picsum.photos/seed/${firebaseUser.uid}/200/200`,
          nickname: '',
          ...DEFAULT_USER_DATA as any
        });
      }
    } catch (error) {
      handleFirestoreError(error, 'get', `users/${firebaseUser.uid}`);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google Login failed", error);
      throw error;
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error) {
      console.error("Email Login failed", error);
      throw error;
    }
  };

  const registerWithEmail = async (email: string, pass: string, name: string, nickname: string) => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, pass);
      const newUser: AppUser = {
        id: credential.user.uid,
        name,
        nickname,
        email,
        avatar: `https://picsum.photos/seed/${credential.user.uid}/200/200`,
        ...DEFAULT_USER_DATA as any
      };
      await setDoc(doc(db, 'users', credential.user.uid), newUser);
      setUser(newUser);
      setNeedsOnboarding(false);
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const completeProfile = async (name: string, nickname: string) => {
    if (!auth.currentUser) return;
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const updatedData = { 
        id: auth.currentUser.uid,
        name, 
        nickname, 
        email: auth.currentUser.email || '',
        avatar: auth.currentUser.photoURL || `https://picsum.photos/seed/${auth.currentUser.uid}/200/200`,
        ...DEFAULT_USER_DATA as any
      };
      
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        await updateDoc(userRef, { name, nickname });
      } else {
        await setDoc(userRef, updatedData);
      }
      
      setUser(prev => prev ? { ...prev, name, nickname } : updatedData);
      setNeedsOnboarding(false);
    } catch (error) {
      handleFirestoreError(error, 'update', `users/${auth.currentUser.uid}`);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const updateUserProgress = async (newProgress: Partial<Progress>) => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.id);
      const updatedProgress = { ...user.progress, ...newProgress };
      await updateDoc(userRef, { progress: updatedProgress });
      setUser(prev => prev ? { ...prev, progress: updatedProgress } : null);
    } catch (error) {
      handleFirestoreError(error, 'update', `users/${user.id}`);
    }
  };

  const toggleModuleCompletion = async (moduleId: string) => {
    if (!user) return;
    try {
      const currentCompleted = user.progress.completedModules || [];
      const isCompleted = currentCompleted.includes(moduleId);
      const newCompleted = isCompleted 
        ? currentCompleted.filter(id => id !== moduleId)
        : [...currentCompleted, moduleId];
      
      await updateUserProgress({ completedModules: newCompleted });
    } catch (error) {
      console.error("Toggle module failed", error);
    }
  };

  const toggleLessonWatched = async (lessonId: string) => {
    if (!user) return;
    try {
      const currentWatched = user.progress.watchedLessons || [];
      const isWatched = currentWatched.includes(lessonId);
      const newWatched = isWatched 
        ? currentWatched.filter(id => id !== lessonId)
        : [...currentWatched, lessonId];
      
      await updateUserProgress({ watchedLessons: newWatched });
    } catch (error) {
      console.error("Toggle lesson watched failed", error);
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      loading, 
      needsOnboarding, 
      loginWithGoogle, 
      loginWithEmail, 
      registerWithEmail, 
      completeProfile,
      logout, 
      updateUserProgress,
      toggleModuleCompletion,
      toggleLessonWatched
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
