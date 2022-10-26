import {
  CART_ROUTE,
  FAVORITE_ROUTE,
  HOME_ROUTE,
  MENU_USER_ROUTE,
  REGISTRATION_ROUTE,
} from "../../constants/route";
import Cart from "../../pages/cart/Cart";
import Home from "../../pages/home/Home";
import UserMenu from '../../pages/userMenu/UserMenu'
import Registration from "../../pages/registration/Registration";
import Favorite from "../../pages/favorite/Favorite";
export const routes = [
  {
    path: HOME_ROUTE,
    element: <Home />,
  },
  {
    path: REGISTRATION_ROUTE,
    element: <Registration />,
  },

];
export const PrivatRoutes = [
  {
    path: MENU_USER_ROUTE,
    element: <UserMenu />,
  },
  {
    path: FAVORITE_ROUTE,
    element: <Favorite />,
  },
  {
    path: CART_ROUTE,
    element: <Cart />,
  },
]
