import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  isAdmin: () => boolean; 
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true, 

      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user,
        isLoading: false 
      }),

      logout: () => {
        localStorage.removeItem('accessToken');
        set({ 
          user: null, 
          isAuthenticated: false,
          isLoading: false 
        });
      },

      setLoading: (loading) => set({ isLoading: loading }),
      isAdmin: () => {
        const { user } = get();
        return user?.role === 'admin';
      },
      checkAuth: async () => {
        const token = localStorage.getItem('accessToken');
        
        if (!token) {
          set({ isLoading: false, isAuthenticated: false, user: null });
          return;
        }

        try {
          const response = await fetch('http://localhost:3000/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const user = await response.json();
            set({ 
              user, 
              isAuthenticated: true, 
              isLoading: false 
            });
          } else {
            localStorage.removeItem('accessToken');
            set({ 
              user: null, 
              isAuthenticated: false, 
              isLoading: false 
            });
          }
        } catch (error) {
          console.error('Error verificando autenticación:', error);
          localStorage.removeItem('accessToken');
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false 
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user 
      }),
    }
  )
);