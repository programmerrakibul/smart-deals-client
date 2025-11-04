import { Link, NavLink } from "react-router";
import Container from "../Container/Container";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import useAuthInfo from "../../hooks/useAuthInfo";

const Navbar = () => {
  const { currentUser, signOutUser } = useAuthInfo();
  const navLinks = [
    "home",
    "all products",
    "my products",
    "my bids",
    "create product",
  ].map((link) => (
    <li key={link}>
      <NavLink
        to={link === "home" ? "/" : link.replace(" ", "-")}
        className="navLinks"
      >
        {link}
      </NavLink>
    </li>
  ));

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav>
      <Container>
        <div className="navbar px-0">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost md:hidden"
              >
                <HiOutlineMenuAlt1 size={24} />
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                {navLinks}
              </ul>
            </div>
            <Link to="/" className="text-2xl font-extrabold">
              Smart<span className="text-primary">Deals</span>
            </Link>
          </div>
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal px-0 gap-2">{navLinks}</ul>
          </div>
          <div className="navbar-end gap-1.5">
            {currentUser ? (
              <>
                <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2">
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName}
                    />
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="btn btn-primary text-white"
                >
                  LogOut
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/login" className="btn btn-outline btn-primary">
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="btn btn-primary text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
