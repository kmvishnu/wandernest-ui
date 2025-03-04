import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { login, logout } from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const token = useSelector((state: RootState) => state.auth.token);

  const loginUser = (token: string) => dispatch(login(token));
  const logoutUser = () => dispatch(logout());

  return { isAuthenticated, token, loginUser, logoutUser };
};
