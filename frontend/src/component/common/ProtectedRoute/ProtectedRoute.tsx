import type { IRoute } from 'interfaces/route';
import { useAuthUser } from 'hooks/api/getters/useAuth/useAuthUser';
import { LoginRedirect } from 'component/common/LoginRedirect/LoginRedirect';

type ProtectedRouteProps = {
  route: IRoute;
};

export const ProtectedRoute = ({ route }: ProtectedRouteProps) => {
  const { user } = useAuthUser();
  const isLoggedIn = Boolean(user?.id);

  if (!isLoggedIn && route.type === 'protected') {
    return <LoginRedirect />;
  }

  return <route.component />;
};
