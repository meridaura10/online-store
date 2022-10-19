import {
  CART_ROUTE,
  HOME_ROUTE,
  MENU_USER_ROUTE,
  REGISTRATION_ROUTE,
} from "../../constants/route";
import Cart from "../../pages/cart/Cart";
import Home from "../../pages/home/Home";
import UserMenu from '../../pages/userMenu/UserMenu'
import Registration from "../../pages/registration/Registration";
export const routes = [
  {
    path: HOME_ROUTE,
    element: <Home />,
  },
  {
    path: CART_ROUTE,
    element: <Cart />,
  },
  {
    path: REGISTRATION_ROUTE,
    element: <Registration />,
  },
  {
    path: MENU_USER_ROUTE,
    element: <UserMenu />,
  },
];
