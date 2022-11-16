import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import DarkModeSwitch from "./DarkModeSwitch";
import { Flex, Container, Box, Text, Button } from "@chakra-ui/react";
import styles from "./Navbar.module.css";

const Navbar = ({ children }) => {
  const { user, logOut } = useAuth();
  const router = useRouter();
  const [isNavActive, setIsNavActive] = useState(false);
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
                  <Text fontSize="2xl" fontWeight="bold">
                    Bookbrooch
                  </Text>
                </Link>
              </div>

              <nav>
                <ul
                  className={`${styles.nav} ${
                    isNavActive ? styles.active : ""
                  }`}
                >
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
                </ul>
              </nav>
              <div>
                <DarkModeSwitch />
                <Button
                  display={{ base: "inline-flex", md: "none" }}
                  position="relative"
                  zIndex="1100"
                  aria-label="Toggle menu"
                  ml="5px"
                  p="3"
                  className={`${styles["nav-btn"]} ${
                    isNavActive ? styles.active : ""
                  }`}
                  onClick={() => setIsNavActive(!isNavActive)}
                >
                  <span aria-hidden></span>
                </Button>
              </div>
            </Flex>
          </Container>
        </header>
      </Box>
      {children}
    </>
  );
};

export default Navbar;
