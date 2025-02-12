import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../theme';

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  text-align: center;
`;

const Title = styled.h2`
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xl};
  font-size: 2.5rem;
`;

const Content = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.large};
  box-shadow: ${theme.shadows.soft};
  margin-bottom: ${theme.spacing.xl};
`;

const Paragraph = styled.p`
  color: ${theme.colors.text};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
  font-size: 1.1rem;
`;

const HeartIcon = styled(motion.div)`
  font-size: 3rem;
  color: ${theme.colors.primary};
  margin: ${theme.spacing.xl} 0;
`;

function About() {
  return (
    <AboutContainer>
      <Title>About Our Love Gallery</Title>
      <Content>
        <HeartIcon
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          ❤️
        </HeartIcon>
        <Paragraph>
          Welcome to our Love Gallery, a special place where precious moments come to life. 
          This gallery is dedicated to capturing and preserving the beautiful moments that make 
          our journey together so special.
        </Paragraph>
        <Paragraph>
          Here, every photograph tells a story of love, joy, and connection. Whether it's a 
          candid moment, a planned celebration, or just a simple day together, each image 
          represents a chapter in our ongoing story.
        </Paragraph>
        <Paragraph>
          We believe that love is worth celebrating and remembering. Through this gallery, 
          we invite you to share your own precious moments and become part of our growing 
          community of love stories.
        </Paragraph>
      </Content>
    </AboutContainer>
  );
}

export default About;
