import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Text } from "@mantine/core";
import { IconChevronDown } from '@tabler/icons-react';
import appLogo from "../assets/applogo_bk.png";
import styles from "../styles/navbar.module.css";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "@mantine/core";


const Navbar = () => {

  const [formData, setFormData] = useState({});
  const { isAuthenticated, logout, userId, fetchWithToken } = useContext(AuthContext);


  useEffect(() => {
    if(userId) {
      getUserProfile();
    }
  }, [userId]);

  const getUserProfile = async () => {
    try {
      const response = await fetchWithToken(
        `/users/${userId}`
      );
      if (response.ok) {
        const userData = await response.json();
        setFormData(userData);
      } else {
        alert("Couldn't fetch user");
        console.log('Something went wrong')
      }
    } catch (error) {
      alert("Couldn't fetch user: " + error);
      console.log(error);
    }
  }

  return (
    <nav>
      {isAuthenticated ? (
        <div className={styles.navbar}>
          <NavLink to="/trips">
            <img src={appLogo} />
          </NavLink>
          <NavLink to="/trips/new">
            New Trip
          </NavLink >
          
          <Menu>
            <Menu.Target>
              <div className={styles.profileEntryContainer}>
                <img className={styles.profileEntryImg} src={formData?.picture}/>
                <div>
                  <Text className={styles.profileEntryText}>{formData?.username}</Text>
                  <Text className={styles.profileEntryText}>{formData?.email}</Text>
                </div>
                <IconChevronDown className={styles.profileEntryIcon} size="1.5rem" />
              </div>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>
                <NavLink to={`/user/${userId}/update`}>
                  <Text>Edit Profile</Text>
                </NavLink >
                
                <Menu.Divider />

                <NavLink to="/">
                  <Text onClick={logout}>Logout</Text>
                </NavLink>
              </Menu.Label>
            </Menu.Dropdown>
          </Menu>
        </div>
      ) : (
        <div className={styles.navbar}>
          <NavLink to="/">
            <img src={appLogo} />
          </NavLink>
          <div>
            <NavLink className={styles.navlinkBtn} to="/signup">
              <Button type="button">
                Signup
              </Button>
            </NavLink>
            <NavLink className={styles.navlinkBtn} to="/login">
              <Button type="button">
                Login
              </Button>
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}; 

export default Navbar;
