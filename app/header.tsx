"use client";

import { useUser, useRedirectFunctions, useLogoutFunction } from "@propelauth/nextjs/client";
import styles from "../styles/Home.module.css";

export function Header() {
  const { loading, user } = useUser();
  const { redirectToSignupPage, redirectToLoginPage, redirectToAccountPage } = useRedirectFunctions()
  const logoutFn = useLogoutFunction()

  if (loading) {
    return <header className={styles.header}>
      <div className={styles.appTitle}>Todo App</div>
      <div className={styles.loadingDot}></div>
    </header>
  }

  return (
    <header className={styles.header}>
      <div className={styles.appTitle}>Todo App</div>
      <div className={styles.headerButtons}>
        {user ? (
          <>
            <button 
              className={`${styles.headerBtn} ${styles.accountBtn}`} 
              onClick={() => redirectToAccountPage()}
            >
              Account
            </button>
            <button 
              className={`${styles.headerBtn} ${styles.logoutBtn}`} 
              onClick={logoutFn}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button 
              className={`${styles.headerBtn} ${styles.accountBtn}`} 
              onClick={() => redirectToLoginPage()}
            >
              Login
            </button>
            <button 
              className={`${styles.headerBtn} ${styles.signupBtn}`} 
              onClick={() => redirectToSignupPage()}
            >
              Signup
            </button>
          </>
        )}
      </div>
    </header>
  );
}