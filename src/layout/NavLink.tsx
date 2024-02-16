import { Box, Button, Icon } from "@chakra-ui/react";
import { Component, ComponentProps, PropsWithChildren } from "react";
import { NavLink as ReactRouterNavLink } from "react-router-dom";

interface NavLinkProps {
  icon: ComponentProps<typeof Icon>["as"];
  to: ComponentProps<typeof ReactRouterNavLink>["to"];
}

const NavLink: React.FC<PropsWithChildren<NavLinkProps>> = ({
  icon,
  children,
  to,
}) => {
  return (
    <Button
      fontWeight="normal"
      as={ReactRouterNavLink}
      flexDirection="column"
      alignItems="center"
      height="auto"
      to={to}
      variant="ghost"
      padding={2}
      lineHeight="unset"
      fontSize="sm"
      colorScheme="blue"
    >
      <Icon boxSize={18} as={icon} />
      {children}
    </Button>
  );
};

export default NavLink;
