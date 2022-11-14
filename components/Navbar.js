import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import DarkModeSwitch from "./DarkModeSwitch";
import { Flex, Container, Box, Center } from "@chakra-ui/react";

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
    {
      id: 4,
      name: "Game",
      link: "/game",
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
      <Box bg="tomato" marginBottom="5">
        <header>
          <Container maxW="container.lg" paddingY="2">
            <Flex justify="space-between" align="center">
              <div>
                <Link href="/">
                  <span>Bookbrooch</span>
                </Link>
              </div>

              <nav>
                <ul>
                  <Flex gap="2" align="center">
                    <>
                      {!user?.uid ? (
                        <>
                          {menuItems.map((item) => (
                            <li key={item.id}>
                              <Link href={item?.link}>{item?.name}</Link>
                            </li>
                          ))}
                        </>
                      ) : (
                        <>
                          <li>
                            <Link href={`/users/${user.uid}`}>Dashboard</Link>
                          </li>
                          <li>
                            <Link href={`/game`}>Game</Link>
                          </li>
                          <li>
                            <a onClick={handleLogout}>Logout</a>
                          </li>
                        </>
                      )}
                    </>
                    <li>
                      <DarkModeSwitch />
                    </li>
                  </Flex>
                </ul>
              </nav>
            </Flex>
          </Container>
        </header>
      </Box>
      {children}
    </>
  );
};

export default Navbar;
