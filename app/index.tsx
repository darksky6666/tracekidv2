// app/index.tsx
import { useAuth } from '~/providers/AuthProvider';
import { Redirect } from 'expo-router';

export default function Index() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Redirect href="/home" /> : <Redirect href="/login" />;
}
