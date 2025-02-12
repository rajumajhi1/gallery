import { useEffect } from 'react';
import styled from '@emotion/styled';

const ProtectionOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 9999;
  user-select: none;
`;

const ScreenshotPrevention = () => {
  useEffect(() => {
    // Prevent right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Prevent keyboard shortcuts
    const handleKeyDown = (e) => {
      // Prevent PrintScreen
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        return false;
      }

      // Prevent Ctrl + Shift + I (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }

      // Prevent Ctrl + Shift + C (Developer Tools)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
      }

      // Prevent Ctrl + P (Print)
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        return false;
      }

      // Prevent Ctrl + S (Save)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Clean up
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <ProtectionOverlay 
      onCopy={(e) => e.preventDefault()}
      onDrag={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
      onSelect={(e) => e.preventDefault()}
    />
  );
};

export default ScreenshotPrevention;
