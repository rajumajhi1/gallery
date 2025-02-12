import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Global, css } from '@emotion/react';
import Home from './components/Home';
import Gallery from './components/Gallery';
import ScreenshotPrevention from './components/ScreenshotPrevention';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { theme } from './theme';

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${theme.typography.fontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    background: linear-gradient(135deg, #fef6f9 0%, #fff9fb 100%);
  }

  img {
    pointer-events: none;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-touch-callout: none;
  }
`;

function App() {
  return (
    <Router>
      <Global styles={globalStyles} />
      <ScreenshotPrevention />
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
