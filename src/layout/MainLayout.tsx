import { Box, IconButton, Flex, Icon } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { BiHome, BiCompass, BiCollection, BiCog, BiPencil } from "react-icons/bi";
import NavLink from "./NavLink";


const MainLayout: React.FC = () => {
  return (
    <Flex direction="column" width="100%" height="100vh">
      <Box flexGrow={1} overflowY="auto"><Outlet /></Box>
      <Flex direction="row" paddingLeft={2} paddingRight={2} width="100%" justifyContent="space-between" alignItems="center">
        <NavLink icon={BiHome} to="/home">Home</NavLink>
        <NavLink icon={BiCompass} to="/explore">Explore</NavLink>
        <IconButton aria-label="Write" icon={<Icon boxSize={6} as={BiPencil} />} colorScheme="blue" isRound />
        <NavLink icon={BiCollection} to="/collections">Collections</NavLink>
        <NavLink icon={BiCog} to="/settings">Settings</NavLink>
      </Flex>
    </Flex>
  );
};

export default MainLayout;