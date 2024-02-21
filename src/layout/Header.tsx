import { Flex, Heading } from "@chakra-ui/react";
import { useEffect, type ReactNode } from "react";

interface HeaderProps {
  text: string;
  actions?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ text, actions }) => {
  useEffect(() => {
    document.title = text;
  }, [text]);

  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      padding={4}
    >
      <Heading as="h1" size="lg">{text}</Heading>
      <div>{actions}</div>
    </Flex>
  );
};

export default Header;
