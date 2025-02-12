import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { theme } from '../theme';
import { FiX } from 'react-icons/fi';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ModalContent = styled(motion.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  cursor: default;
`;

const Image = styled(motion.img)`
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: ${theme.borderRadius.large};
  box-shadow: ${theme.shadows.large};
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: -40px;
  right: 0;
  background: ${theme.colors.white};
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${theme.colors.text};
  box-shadow: ${theme.shadows.medium};
  
  &:hover {
    background: ${theme.colors.lightPink};
    color: ${theme.colors.primary};
  }
`;

const ImageInfo = styled(motion.div)`
  position: absolute;
  bottom: -60px;
  left: 0;
  right: 0;
  background: ${theme.colors.white};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.medium};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${theme.shadows.medium};
`;

const Title = styled.h3`
  color: ${theme.colors.text2};
  font-size: 1.2rem;
  margin: 0;
`;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

function ImageModal({ image, isOpen, onClose }) {
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <ModalContent
            variants={modalVariants}
            onClick={handleContentClick}
          >
            <CloseButton
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiX size={20} />
            </CloseButton>
            
            <Image
              src={image.image}
              alt={image.title}
              layoutId={`image-${image.id}`}
            />
            
            <ImageInfo
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Title>{image.title}</Title>
            </ImageInfo>
          </ModalContent>
        </Overlay>
      )}
    </AnimatePresence>
  );
}

export default ImageModal;
