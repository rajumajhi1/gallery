import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../theme';
import { FiUpload } from 'react-icons/fi';

const UploadContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
`;

const Title = styled.h2`
  color: ${theme.colors.text};
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const UploadArea = styled.div`
  border: 2px dashed ${theme.colors.primary};
  border-radius: ${theme.borderRadius.large};
  padding: ${theme.spacing.xl};
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${theme.colors.white};

  &:hover {
    border-color: ${theme.colors.accent};
    background: ${theme.colors.background};
  }
`;

const UploadIcon = styled(FiUpload)`
  font-size: 48px;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const PreviewContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
`;

const PreviewImage = styled(motion.div)`
  position: relative;
  border-radius: ${theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${theme.shadows.soft};

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

const UploadButton = styled(motion.button)`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.medium};
  cursor: pointer;
  margin-top: ${theme.spacing.xl};
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.colors.accent};
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

function Upload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);

    // Create preview URLs
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const handleUpload = () => {
    // TODO: Implement actual upload logic
    console.log('Uploading files:', selectedFiles);
  };

  return (
    <UploadContainer>
      <Title>Upload Your Precious Moments</Title>
      <UploadArea
        as="label"
        htmlFor="file-input"
      >
        <UploadIcon />
        <p>Click or drag photos to upload</p>
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </UploadArea>

      {previews.length > 0 && (
        <>
          <PreviewContainer>
            {previews.map((preview, index) => (
              <PreviewImage
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <img src={preview} alt={`Preview ${index + 1}`} />
              </PreviewImage>
            ))}
          </PreviewContainer>
          
          <UploadButton
            onClick={handleUpload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upload Photos
          </UploadButton>
        </>
      )}
    </UploadContainer>
  );
}

export default Upload;
