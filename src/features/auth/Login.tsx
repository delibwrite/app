import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  Input,
  Box,
  FormControl,
  FormLabel,
  Icon,
  useToast,
} from "@chakra-ui/react";
import Link from "../../components/Link";
import { BiLogoGoogle } from "react-icons/bi";
import LoaderOverlay from "../../components/LoaderOverlay";
import { useForm, SubmitHandler } from "react-hook-form";
import { UnknownError } from "../../utils";

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const toast = useToast();
  const [loginError, setLoginError] = useState<Error | null>(null);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const handleSuccessfulLogin = () => {
    navigate("/");
  };

  useEffect(() => {
    if (loginError) {
      toast({
        title: "An error occurred while logging in.",
        description: loginError.message,
        status: "error",
        isClosable: true,
      });
    }
  }, [loginError]);

  const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
    try {
      // await logInWithEmailAndPassword(email, password);
      handleSuccessfulLogin();
    } catch (error) {
      setLoginError(
        new UnknownError(error, "An uknown error occurred while logging in.")
      );
    }
  };

  const onGoogleSignIn = async () => {
    try {
      // await signInWithGoogle();
      handleSuccessfulLogin();
    } catch (error) {
      setLoginError(
        new UnknownError(error, "An uknown error occurred while logging in.")
      );
    }
  };

  return (
    <Flex direction="column" m="2">
      {isSubmitting && <LoaderOverlay message="Logging in..." />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.email} isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            {...register("email", { required: "Email is required" })}
            type="email"
            autoComplete="email"
          />
        </FormControl>
        <FormControl isInvalid={!!errors.password} isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            {...register("password", { required: "Password is required" })}
            type="password"
            autoComplete="current-password"
          />
        </FormControl>
        <Button w="100%" my="2" type="submit">
          Login
        </Button>
      </form>
      <Button
        onClick={onGoogleSignIn}
        leftIcon={<Icon as={BiLogoGoogle} />}
        colorScheme="red"
      >
        Login with Google
      </Button>
      <Link to="/reset-password">Forgot Password</Link>
      <Box>
        Don't have an account? <Link to="/signup">Register</Link> now.
      </Box>
    </Flex>
  );
};

export default Login;
