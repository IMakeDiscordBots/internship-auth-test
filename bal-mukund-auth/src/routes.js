import Login from './routes/Login.svelte';
import MFAVerification from './routes/MFA.svelte';

const routes = [
  {
    name: '/',
    component: Login,
  },
  {
    name: '/mfa-verification',
    component: MFAVerification,
  },
];

export { routes };
