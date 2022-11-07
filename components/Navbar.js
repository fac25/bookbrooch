import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ children }) => {
  const { user, logOut } = useAuth();
  const router = useRouter();
  const menuItems = [
    {
      id: 1,
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      name: "Login",
      link: "/login",
    },
    {
      id: 3,
      name: "Sign Up",
      link: "/signup",
    },
  ];

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <header>
        <div>
          <Link href="/">
            <span>Firebase Authentication with Next.js</span>
          </Link>
        </div>

        <nav>
          <ul>
            <>
              {!user.uid ? (
                menuItems.map((item) => (
                  <li key={item.id}>
                    <Link href={item?.link}>{item?.name}</Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </>
              )}
            </>
          </ul>
        </nav>
      </header>
      {children}
    </>
  );
};

export default Navbar;
