import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and set the user
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    getSession();
  
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );
  
    return () => {
      subscription?.unsubscribe(); // Correctly access the subscription object
    };
  }, []);

  // Modified signUp method to add the user to the `users` table
  const signUp = async (data) => {
    const { email, password } = data;
    const { data: signUpData, error } = await supabase.auth.signUp({ email, password });
  
    if (error) throw error;
  
    // Insert the user into the `users` table
    const { user } = signUpData;
    const { error: insertError } = await supabase
      .from('users')
      .insert([{ id: user.id, email }]);
  
    if (insertError) throw insertError;
  
    return { user };
  };
  const value = {
    signUp,
    signIn: (data) => supabase.auth.signInWithPassword(data),
    signOut: () => supabase.auth.signOut(),
    user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}