import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Collections from "./features/collections/Collections";
import Login from "./features/auth/Login";
import AuthLayout from "./layout/AuthLayout";
import init from "./service/init";
import ServiceProvider from "./contexts/service";

const queryClient = new QueryClient();

const { worker } = init();

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<div>Hello</div>} />
          <Route path="/collections" element={<Collections />} />
        </Route>
      </>
    )
  );

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <ServiceProvider worker={worker}>
          <RouterProvider router={router} />
        </ServiceProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
