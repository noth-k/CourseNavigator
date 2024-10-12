"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../resources/images/logo.png';

interface NavbarProps {
  currentPage: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage }) => {
  const [isMobile, setIsMobile] = useState(false); // To track if it's mobile view
  const [menuOpen, setMenuOpen] = useState(false); // To track if the dropdown menu is open

  // Toggle the dropdown menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle resizing the window
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setMenuOpen(false); // Close menu if resizing back to desktop
      }
    };

    // Set the initial state
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <Image src={Logo} alt="Logo" width={85} height={60} />
      </div>

      {/* Mobile Menu Icon */}
      {isMobile ? (
        <div style={styles.menuIcon} onClick={toggleMenu}>
          {/* This is the menu icon */}
          <div style={styles.burgerLine}></div>
          <div style={styles.burgerLine}></div>
          <div style={styles.burgerLine}></div>
        </div>
      ) : (
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link href="/">
              <a
                style={
                  currentPage === 'home'
                    ? { ...styles.navLink, ...styles.activeLink }
                    : styles.navLink
                }
              >
                Home
              </a>
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link href="/courses">
              <a
                style={
                  currentPage === 'courses'
                    ? { ...styles.navLink, ...styles.activeLink }
                    : styles.navLink
                }
              >
                Courses
              </a>
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link href="/matching">
              <a
                style={
                  currentPage === 'matching'
                    ? { ...styles.navLink, ...styles.activeLink }
                    : styles.navLink
                }
              >
                Matching
              </a>
            </Link>
          </li>
        </ul>
      )}

      {/* Dropdown Menu for Mobile View */}
      {menuOpen && isMobile && (
        <div style={styles.dropdownMenu}>
          <ul style={styles.dropdownNavList}>
            <li style={styles.dropdownNavItem}>
              <Link href="/">
                <a
                  style={
                    currentPage === 'home'
                      ? { ...styles.navLink, ...styles.activeLink }
                      : styles.navLink
                  }
                >
                  Home
                </a>
              </Link>
            </li>
            <li style={styles.dropdownNavItem}>
              <Link href="/courses">
                <a
                  style={
                    currentPage === 'courses'
                      ? { ...styles.navLink, ...styles.activeLink }
                      : styles.navLink
                  }
                >
                  Courses
                </a>
              </Link>
            </li>
            <li style={styles.dropdownNavItem}>
              <Link href="/matching">
                <a
                  style={
                    currentPage === 'matching'
                      ? { ...styles.navLink, ...styles.activeLink }
                      : styles.navLink
                  }
                >
                  Matching
                </a>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

// Inline styles using CSS-in-JS types
const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    backgroundColor: '#D1DBED',
    padding: '1rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  navList: {
    display: 'flex',
    justifyContent: 'space-between',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 1rem',
  },
  navLink: {
    fontFamily: 'Inter, sans-serif',
    textDecoration: 'none',
    color: '#6c757d',
    fontSize: '15px',
    fontWeight: 500,
    paddingBottom: '5px',
    borderBottom: '2px solid transparent',
    transition: 'color 0.3s, border-bottom 0.3s',
  },
  activeLink: {
    color: '#007bff',
    borderBottom: '2px solid #007bff',
  },
  menuIcon: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
    height: '24px',
    width: '30px',
  },
  burgerLine: {
    height: '3px',
    width: '100%',
    backgroundColor: '#6c757d',
    marginBottom: '5px',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '4rem',
    right: '1rem',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    borderRadius: '8px',
  },
  dropdownNavList: {
    listStyle: 'none',
    margin: 0,
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  dropdownNavItem: {
    marginBottom: '0.75rem', // Add some margin between items
    padding: '0.5rem 0',     // Increase padding for larger clickable area
  },
};

export default Navbar;