import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

type LinkProps = React.ComponentProps<typeof ChakraLink>;

const Link: React.FC<LinkProps> = (props) => {
  return <ChakraLink as={RouterLink} {...props} />;
}

export default Link;