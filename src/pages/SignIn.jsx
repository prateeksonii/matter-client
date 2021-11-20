import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { Icon } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import TopLogo from "../components/TopLogo";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { signinUrl } from "../api/endpoints";
import { publicApi } from "../api/api";
import UserContext from "../contexts/UserContext";

const SignIn = ({ refetch }) => {
  const navigate = useNavigate();
  const [, dispatch] = useContext(UserContext);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values) => {
    try {
      const res = await publicApi.post(signinUrl, values);
      localStorage.setItem("matter_token", res.data.result.token);
      refetch();
    } catch (err) {
      console.error(err.message, err);
    }
  };

  return (
    <>
      <Box h='100vh' bg='linear-gradient(90deg, #4776E6 0%, #8E54E9 100%);'>
        <TopLogo />
        <Container
          h='full'
          centerContent
          display='flex'
          flexDir='column'
          alignItems='center'
          justifyContent='center'
        >
          <Heading color='white' mb='10'>
            Sign in to continue
          </Heading>
          <Box
            bgColor='whitesmoke'
            p='14'
            shadow='0px 100px 80px rgba(0, 0, 0, 0.07), 0px 64.8148px 46.8519px rgba(0, 0, 0, 0.0531481), 0px 38.5185px 25.4815px rgba(0, 0, 0, 0.0425185), 0px 20px 13px rgba(0, 0, 0, 0.035), 0px 8.14815px 6.51852px rgba(0, 0, 0, 0.0274815), 0px 1.85185px 3.14815px rgba(0, 0, 0, 0.0168519);'
            borderRadius='10'
          >
            <Box as='form' noValidate onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                mb='4'
                id='email'
                isRequired
                isInvalid={errors?.email}
              >
                <FormLabel>Email address</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Icon as={FiMail} color='gray.600' />
                  </InputLeftElement>
                  <Input
                    type='email'
                    placeholder='john@example.com'
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value:
                          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                mb='8'
                id='password'
                isRequired
                isInvalid={errors?.password}
              >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Icon as={FiLock} color='gray.600' />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder='your password'
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <InputRightElement>
                    {showPassword ? (
                      <Icon
                        as={FiEye}
                        color='gray.600'
                        onClick={handleShowPassword}
                      />
                    ) : (
                      <Icon
                        as={FiEyeOff}
                        color='gray.600'
                        onClick={handleShowPassword}
                      />
                    )}
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              </FormControl>
              <Button type='submit' colorScheme='purple'>
                Sign in
              </Button>
              <Box mt='4' display='flex' alignItems='center'>
                <Text>Not registered?</Text>
                <ChakraLink ml='1' color='purple.600' as={Link} to='/signup'>
                  Signup here
                </ChakraLink>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SignIn;
