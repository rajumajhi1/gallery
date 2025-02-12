/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../theme';
import ImageModal from './ImageModal';
import { galleryItems } from '../config/galleryConfig';

const GalleryContainer = styled.div`
  padding: ${theme.spacing.lg} ${theme.spacing.md};
  max-width: 100%;
  margin: 0 auto;

  ${theme.mediaQueries.sm} {
    padding: ${theme.spacing.xl};
  }

  ${theme.mediaQueries.md} {
    padding: ${theme.spacing.xxl};
    max-width: 1200px;
  }

  ${theme.mediaQueries.lg} {
    padding: ${theme.spacing.xxxl};
    max-width: 1400px;
  }

  ${theme.mediaQueries.xl} {
    max-width: 1600px;
  }
`;

const Title = styled.h2`
  color: ${theme.colors.text};
  font-size: ${theme.typography.heading.mobile.h2};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  
  ${theme.mediaQueries.sm} {
    font-size: ${theme.typography.heading.tablet.h2};
  }
  
  ${theme.mediaQueries.md} {
    font-size: ${theme.typography.heading.desktop.h2};
    margin-bottom: ${theme.spacing.xxl};
  }

  ${theme.mediaQueries.lg} {
    font-size: ${theme.typography.heading.desktop.h1};
  }
  
  span {
    color: ${theme.colors.primary};
  }
`;

const GalleryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};

  ${theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.lg};
    padding: ${theme.spacing.lg};
  }

  ${theme.mediaQueries.md} {
    grid-template-columns: repeat(3, 1fr);
    gap: ${theme.spacing.xl};
    padding: ${theme.spacing.xl};
  }

  ${theme.mediaQueries.lg} {
    grid-template-columns: repeat(3, 1fr);
    gap: ${theme.spacing.xxl};
    padding: 0;
  }

  ${theme.mediaQueries.xl} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ImageCard = styled(motion.div)`
  position: relative;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  aspect-ratio: 3/4;
  cursor: pointer;
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.sm};

  ${theme.mediaQueries.sm} {
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${theme.shadows.md};
  }

  ${theme.mediaQueries.md} {
    border-radius: ${theme.borderRadius.xl};
    box-shadow: ${theme.shadows.lg};
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: ${theme.transitions.fast};
  }

  &:active {
    transform: scale(0.98);
  }
  
  ${theme.mediaQueries.lg} {
    &:hover {
      box-shadow: ${theme.shadows.xl};
      transform: translateY(-4px);
      
      img {
        transform: scale(1.05);
      }
    }
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const getGalleryItems = () => {
  return galleryItems.map(item => ({
    ...item,
    image: new URL(`../assets/${item.imagePath}`, import.meta.url).href
  }));
};

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [items] = useState(getGalleryItems());

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <GalleryContainer>
      <Title>Our <span>Precious</span> Moments</Title>
      <GalleryGrid>
        <AnimatePresence>
          {items.map((item) => (
            <ImageCard
              key={item.id}
              variants={itemVariants}
              onClick={() => handleImageClick(item)}
            >
              <img 
                src={item.image} 
                alt={item.title}
              />
            </ImageCard>
          ))}
        </AnimatePresence>
      </GalleryGrid>

      <ImageModal
        image={selectedImage}
        isOpen={!!selectedImage}
        onClose={handleCloseModal}
      />
    </GalleryContainer>
  );
}

export default Gallery;
