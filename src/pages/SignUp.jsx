import { Button } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import {
  Box,
  Container,
  Heading,
  Flex,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/layout";
import { useForm } from "react-hook-form";
import { useState } from "react";
import TopLogo from "../components/TopLogo";
import { publicApi } from "../api/api";
import { createAccountUrl } from "../api/endpoints";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm();

  const password = watch("password");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (values) => {
    try {
      await publicApi.post(createAccountUrl, {
        ...values,
        confirmPassword: undefined,
      });
      navigate("/signin");
    } catch (err) {
      console.error(err.message, err);
    }
  };

  return (
    <Box minH='100vh' bg='linear-gradient(90deg, #4776E6 0%, #8E54E9 100%);'>
      <TopLogo />
      <Container
        minH='100vh'
        centerContent
        display='flex'
        flexDir='column'
        alignItems='center'
        justifyContent='center'
      >
        <Heading color='white' mb='10'>
          Create account now
        </Heading>
        <Box
          bgColor='whitesmoke'
          p='14'
          shadow='0px 100px 80px rgba(0, 0, 0, 0.07), 0px 64.8148px 46.8519px rgba(0, 0, 0, 0.0531481), 0px 38.5185px 25.4815px rgba(0, 0, 0, 0.0425185), 0px 20px 13px rgba(0, 0, 0, 0.035), 0px 8.14815px 6.51852px rgba(0, 0, 0, 0.0274815), 0px 1.85185px 3.14815px rgba(0, 0, 0, 0.0168519);'
          borderRadius='10'
        >
          <Box as='form' noValidate onSubmit={handleSubmit(onSubmit)}>
            <Flex alignItems='center'>
              <FormControl
                mr='4'
                mb='4'
                id='firstName'
                isRequired
                isInvalid={errors?.firstName}
              >
                <FormLabel>First Name</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Icon as={FiUser} color='gray.600' />
                  </InputLeftElement>
                  <Input
                    placeholder='John'
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors?.firstName?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl mb='4' id='lastName' isInvalid={errors?.lastName}>
                <FormLabel>Last Name</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Icon as={FiUser} color='gray.600' />
                  </InputLeftElement>
                  <Input placeholder='Wick' {...register("lastName")} />
                </InputGroup>
                <FormErrorMessage>{errors?.lastName?.message}</FormErrorMessage>
              </FormControl>
            </Flex>
            <FormControl mb='4' id='email' isRequired isInvalid={errors?.email}>
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
              mb='4'
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
            <FormControl
              mb='8'
              id='confirmPassword'
              isRequired
              isInvalid={errors?.confirmPassword}
            >
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <Icon as={FiLock} color='gray.600' />
                </InputLeftElement>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder='repeat your password'
                  {...register("confirmPassword", {
                    required: "Passwords do not match",
                    validate: (currentValue) => {
                      return (
                        currentValue === password || "Passwords do not match"
                      );
                    },
                  })}
                />
                <InputRightElement>
                  {showConfirmPassword ? (
                    <Icon
                      as={FiEye}
                      color='gray.600'
                      onClick={handleShowConfirmPassword}
                    />
                  ) : (
                    <Icon
                      as={FiEyeOff}
                      color='gray.600'
                      onClick={handleShowConfirmPassword}
                    />
                  )}
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors?.confirmPassword?.message}
              </FormErrorMessage>
            </FormControl>
            <Button type='submit' colorScheme='purple'>
              Create account
            </Button>
            <Box mt='4' display='flex' alignItems='center'>
              <Text>Already registered?</Text>
              <ChakraLink ml='1' color='purple.600' as={Link} to='/signin'>
                Sign in
              </ChakraLink>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Signup;
