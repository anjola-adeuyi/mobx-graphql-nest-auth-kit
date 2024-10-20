import { createContext } from 'react';
import { AuthStore } from './stores/auth.store';
import { AuthService } from './services/auth.service';

interface IStoreContext {
  authStore: AuthStore;
}

const authService = new AuthService();
const authStore = new AuthStore(authService);

export const StoreContext = createContext<IStoreContext>({
  authStore,
});
