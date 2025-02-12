import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../theme';
import { FiHeart, FiGift } from 'react-icons/fi';

const CountdownContainer = styled.div`
  margin: ${theme.spacing.xl} auto;
  padding: ${theme.spacing.lg} ${theme.spacing.md};
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.lg};

  ${theme.mediaQueries.sm} {
    padding: ${theme.spacing.xl};
    gap: ${theme.spacing.xl};
  }

  ${theme.mediaQueries.md} {
    margin: ${theme.spacing.xxl} auto;
    padding: ${theme.spacing.xxl};
    max-width: 1200px;
  }

  ${theme.mediaQueries.lg} {
    margin: ${theme.spacing.xxxl} auto;
  }
`;

const Title = styled.h2`
  color: ${theme.colors.text};
  font-size: ${theme.typography.heading.mobile.h2};
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
  
  ${theme.mediaQueries.sm} {
    font-size: ${theme.typography.heading.tablet.h2};
  }
  
  ${theme.mediaQueries.md} {
    font-size: ${theme.typography.heading.desktop.h2};
  }
`;

const CountdownGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.lg};
  width: 100%;
  
  ${theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.xl};
  }
`;

const CountdownCard = styled(motion.div)`
  position: relative;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.white};
  box-shadow: ${theme.shadows.sm};
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  
  ${theme.mediaQueries.sm} {
    padding: ${theme.spacing.xl};
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${theme.shadows.md};
  }

  ${theme.mediaQueries.md} {
    padding: ${theme.spacing.xxl};
    border-radius: ${theme.borderRadius.xl};
    box-shadow: ${theme.shadows.lg};
  }
  
  h3 {
    color: ${theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.sm};
    font-size: ${theme.typography.heading.mobile.h3};
    margin-bottom: ${theme.spacing.md};

    ${theme.mediaQueries.sm} {
      font-size: ${theme.typography.heading.tablet.h3};
      gap: ${theme.spacing.md};
    }

    ${theme.mediaQueries.md} {
      font-size: ${theme.typography.heading.desktop.h3};
    }

    svg {
      font-size: 1.2em;
    }
  }
`;

const TimeDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${theme.spacing.sm};
  
  ${theme.mediaQueries.sm} {
    gap: ${theme.spacing.md};
  }

  ${theme.mediaQueries.md} {
    gap: ${theme.spacing.lg};
  }
`;

const TimeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .number {
    font-size: ${theme.typography.heading.mobile.h3};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text1};
    line-height: 1;

    ${theme.mediaQueries.sm} {
      font-size: ${theme.typography.heading.tablet.h3};
    }

    ${theme.mediaQueries.md} {
      font-size: ${theme.typography.heading.desktop.h3};
    }
  }
  
  .label {
    font-size: ${theme.typography.text.small};
    color: ${theme.colors.primary};
    margin-top: ${theme.spacing.xs};

    ${theme.mediaQueries.sm} {
      font-size: ${theme.typography.text.base};
      margin-top: ${theme.spacing.sm};
    }

    ${theme.mediaQueries.md} {
      font-size: ${theme.typography.text.large};
    }
  }
`;

const calculateTimeLeft = (targetDate) => {
  const now = new Date();
  const target = new Date(targetDate);
  
  // If this year's birthday has passed, calculate for next year
  if (now > target) {
    target.setFullYear(target.getFullYear() + 1);
  }
  
  const difference = target - now;
  
  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
};

const Countdown = () => {
  const [rajuTimeLeft, setRajuTimeLeft] = useState(calculateTimeLeft('2025-03-20'));
  const [girlfriendTimeLeft, setGirlfriendTimeLeft] = useState(calculateTimeLeft('2025-02-22'));

  useEffect(() => {
    const timer = setInterval(() => {
      setRajuTimeLeft(calculateTimeLeft('2025-03-20'));
      setGirlfriendTimeLeft(calculateTimeLeft('2025-02-22'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const cardVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  return (
    <CountdownContainer>
      <Title>Birthday Countdown <FiGift style={{ display: 'inline', marginLeft: '8px' }} /></Title>
      <CountdownGrid>
        <CountdownCard
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <h3>
            <FiHeart /> Raju's Birthday <FiHeart />
          </h3>
          <TimeDisplay>
            <TimeUnit>
              <span className="number">{rajuTimeLeft.days}</span>
              <span className="label">Days</span>
            </TimeUnit>
            <TimeUnit>
              <span className="number">{rajuTimeLeft.hours}</span>
              <span className="label">Hours</span>
            </TimeUnit>
            <TimeUnit>
              <span className="number">{rajuTimeLeft.minutes}</span>
              <span className="label">Minutes</span>
            </TimeUnit>
            <TimeUnit>
              <span className="number">{rajuTimeLeft.seconds}</span>
              <span className="label">Seconds</span>
            </TimeUnit>
          </TimeDisplay>
        </CountdownCard>

        <CountdownCard
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <h3>
            <FiHeart /> Kaju's Birthday <FiHeart />
          </h3>
          <TimeDisplay>
            <TimeUnit>
              <span className="number">{girlfriendTimeLeft.days}</span>
              <span className="label">Days</span>
            </TimeUnit>
            <TimeUnit>
              <span className="number">{girlfriendTimeLeft.hours}</span>
              <span className="label">Hours</span>
            </TimeUnit>
            <TimeUnit>
              <span className="number">{girlfriendTimeLeft.minutes}</span>
              <span className="label">Minutes</span>
            </TimeUnit>
            <TimeUnit>
              <span className="number">{girlfriendTimeLeft.seconds}</span>
              <span className="label">Seconds</span>
            </TimeUnit>
          </TimeDisplay>
        </CountdownCard>
      </CountdownGrid>
    </CountdownContainer>
  );
};

export default Countdown;
