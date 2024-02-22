import { Box, Container, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  const bg = useColorModeValue("gray.50", "gray.900");

  return (
    <Box paddingTop={12} display="flex" alignItems="center" background={bg}>
      <Container>
        <Outlet />
      </Container>
    </Box>
  );
};

export default AuthLayout;
