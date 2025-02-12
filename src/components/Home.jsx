/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../theme';
import ImageModal from './ImageModal';
import Countdown from './Countdown';
import { galleryItems } from '../config/galleryConfig';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  min-height: calc(100vh - 60px);
  margin-top: 60px;
  padding: ${theme.layout.containerPadding.mobile};
  display: flex;
  flex-direction: column;
  align-items: center;
  
  ${theme.mediaQueries.md} {
    padding: ${theme.layout.containerPadding.tablet};
  }
  
  ${theme.mediaQueries.lg} {
    padding: ${theme.layout.containerPadding.desktop};
  }
`;

const Header = styled.h1`
  color: ${theme.colors.text};
  font-size: ${theme.typography.heading.mobile.h1};
  font-weight: ${theme.typography.fontWeight.bold};
  line-height: ${theme.typography.lineHeight.tight};
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
  padding: 0 ${theme.spacing.sm};
  
  ${theme.mediaQueries.md} {
    font-size: ${theme.typography.heading.tablet.h1};
    margin-bottom: ${theme.spacing.xl};
  }
  
  ${theme.mediaQueries.lg} {
    font-size: ${theme.typography.heading.desktop.h1};
  }
  
  span {
    color: ${theme.colors.primary};
  }
`;

const Tagline = styled.p`
  color: ${theme.colors.text};
  font-size: ${theme.typography.text.base};
  line-height: ${theme.typography.lineHeight.relaxed};
  text-align: center;
  max-width: 90%;
  margin: 0 auto ${theme.spacing.xl};
  opacity: 0.9;
  
  ${theme.mediaQueries.md} {
    font-size: ${theme.typography.text.large};
    max-width: 75%;
  }
`;

const FeaturedSection = styled.section`
  margin-top: ${theme.spacing.xxl};
  
  ${theme.mediaQueries.md} {
    margin-top: ${theme.spacing.xxxl};
  }
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${theme.spacing.md};
  width: 100%;
  padding: ${theme.spacing.md};
  
  ${theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.lg};
  }
  
  ${theme.mediaQueries.lg} {
    grid-template-columns: repeat(3, 1fr);
    gap: ${theme.spacing.xl};
    max-width: ${theme.layout.maxWidth.lg};
    margin: 0 auto;
  }
`;

const ImageCard = styled(motion.div)`
  position: relative;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  aspect-ratio: 1;
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.sm};
  
  ${theme.mediaQueries.md} {
    aspect-ratio: 3/4;
    box-shadow: ${theme.shadows.md};
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
      box-shadow: ${theme.shadows.lg};
      transform: translateY(-4px);
      
      img {
        transform: scale(1.05);
      }
    }
  }
`;

const HeartIcon = styled(motion.div)`
  color: ${theme.colors.primary};
  font-size: 2rem;
  margin: ${theme.spacing.md} 0;

  ${theme.mediaQueries.tablet} {
    font-size: 2.5rem;
    margin: ${theme.spacing.lg} 0;
  }
`;

const ViewGalleryButton = styled(Link)`
  margin-top: ${theme.spacing.xl};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  text-decoration: none;
  border-radius: ${theme.borderRadius.md};
  transition: ${theme.transitions.default};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
`;

const featuredImages = galleryItems.slice(0, 3).map(item => ({
  id: item.id,
  title: item.title,
  image: new URL(`../assets/${item.imagePath}`, import.meta.url).href
}));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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

function Home() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <HomeContainer>
      <Header>Welcome to Our <span>Love Gallery</span></Header>
      <Tagline>A beautiful collection of our memories together, filled with love, laughter, and countless precious moments.</Tagline>
      <Countdown />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <HeartIcon
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3
          }}
        >
          {/* No heart icon needed */}
        </HeartIcon>
      </motion.div>
      
      <FeaturedSection>
        <ImageGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {featuredImages.map((image, index) => (
            <ImageCard
              key={index}
              variants={itemVariants}
              onClick={() => handleImageClick(image)}
            >
              <img 
                src={image.image} 
                alt={image.title}
              />
            </ImageCard>
          ))}
        </ImageGrid>
      </FeaturedSection>

      <ViewGalleryButton to="/gallery">
        View Full Gallery
      </ViewGalleryButton>

      <ImageModal
        image={selectedImage}
        isOpen={!!selectedImage}
        onClose={handleCloseModal}
      />
    </HomeContainer>
  );
}

export default Home;
