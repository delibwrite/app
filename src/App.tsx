import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Collections from './features/collections/Collections';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route element={<MainLayout/>}>
            <Route path="/" element={<div>Hello</div>} />
            <Route path="/collections" element={<Collections />} />
          </Route>
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
