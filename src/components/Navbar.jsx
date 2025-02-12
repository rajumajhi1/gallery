import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../theme';
import { FiHeart, FiMenu, FiX } from 'react-icons/fi';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(41, 36, 36, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${theme.layout.containerPadding.mobile};
  box-shadow: ${theme.shadows.sm};
  z-index: 1000;
  
  ${theme.mediaQueries.md} {
    padding: 0 ${theme.layout.containerPadding.tablet};
    box-shadow: ${theme.shadows.md};
  }
  
  ${theme.mediaQueries.lg} {
    padding: 0 ${theme.layout.containerPadding.desktop};
  }
`;

const Logo = styled(Link)`
  color: ${theme.colors.primary};
  font-size: ${theme.typography.heading.mobile.h3};
  font-weight: ${theme.typography.fontWeight.bold};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  
  ${theme.mediaQueries.md} {
    font-size: ${theme.typography.heading.tablet.h3};
    gap: ${theme.spacing.sm};
  }
  
  svg {
    font-size: 1.2em;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  
  ${theme.mediaQueries.md} {
    gap: ${theme.spacing.lg};
  }
`;

const NavLink = styled(Link)`
  color: ${theme.colors.text};
  font-size: ${theme.typography.text.small};
  font-weight: ${theme.typography.fontWeight.medium};
  text-decoration: none;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.full};
  transition: ${theme.transitions.fast};
  
  &:hover, &.active {
    color: ${theme.colors.primary};
    background: ${theme.colors.lightPink};
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  ${theme.mediaQueries.md} {
    font-size: ${theme.typography.text.base};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  }
`;

const MenuButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${theme.colors.text};
  cursor: pointer;
  padding: ${theme.spacing.sm};
  font-size: 1.2rem;
  
  ${theme.mediaQueries.md} {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.98);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xl};
  padding: ${theme.spacing.xl};
  z-index: 999;

  ${theme.mediaQueries.md} {
    display: none;
  }
`;

const MobileNavLink = styled(NavLink)`
  font-size: ${theme.typography.text.base};
  padding: ${theme.spacing.md};
`;

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <NavbarContainer>
        <Logo to="/">
          <FiHeart />
          Love <span>Gallery</span>
        </Logo>

        <NavLinks>
          <NavLink 
            to="/" 
            className={location.pathname === '/' ? 'active' : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/gallery"
            className={location.pathname === '/gallery' ? 'active' : ''}
            onClick={() => setIsMenuOpen(false)}
          >
            Gallery
          </NavLink>
        </NavLinks>

        <MenuButton
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </MenuButton>
      </NavbarContainer>

      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <MobileNavLink 
              to="/"
              className={location.pathname === '/' ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </MobileNavLink>
            <MobileNavLink 
              to="/gallery"
              className={location.pathname === '/gallery' ? 'active' : ''}
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </MobileNavLink>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
