import { FC, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Dialog, TextField } from '@mui/material';

import { StoreContext } from '../../store.context';
import './auth.style.css';

const AuthView: FC = () => {
  const { authStore } = useContext(StoreContext);
  const { isAuthenticated } = authStore;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    authStore.login({ email, password });
  };

  return (
    <Dialog open={!isAuthenticated}>
      <div className="container">
        <TextField
          className="text-field"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className="text-field"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          className="button"
          onClick={handleLogin}
          variant="contained"
        >
          Login
        </Button>
      </div>
    </Dialog>
  );
};

const Auth = observer(AuthView);
export { Auth };
