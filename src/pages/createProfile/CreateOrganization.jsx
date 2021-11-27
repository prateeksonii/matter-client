import { Button } from "@chakra-ui/button";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import Icon from "@chakra-ui/icon";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import {
  Box,
  Container,
  Grid,
  Heading,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Text,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/layout";
import { Textarea } from "@chakra-ui/textarea";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FiCheckCircle, FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { privateApi, publicApi } from "../../api/api";
import { createOrganizationUrl, signinUrl } from "../../api/endpoints";
import TopLogo from "../../components/TopLogo";
import UserContext from "../../contexts/UserContext";

const CreateOrganization = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      primaryColor: "#5E5BFF",
    },
  });

  const onSubmit = async (values) => {
    try {
      const res = await privateApi.post(createOrganizationUrl, values);
      console.log(res);
      // refetch();
    } catch (err) {
      console.error(err.message, err);
    }
  };

  return (
    <Box h='100vh' bg='linear-gradient(90deg, #4776E6 0%, #8E54E9 100%);'>
      <TopLogo />
      <Container
        h='full'
        maxW='80%'
        centerContent
        display='flex'
        flexDir='column'
        alignItems='center'
        justifyContent='center'
      >
        <Heading color='white' mb='10'>
          Setup your organization
        </Heading>
        <Box
          bgColor='whitesmoke'
          p='14'
          shadow='0px 100px 80px rgba(0, 0, 0, 0.07), 0px 64.8148px 46.8519px rgba(0, 0, 0, 0.0531481), 0px 38.5185px 25.4815px rgba(0, 0, 0, 0.0425185), 0px 20px 13px rgba(0, 0, 0, 0.035), 0px 8.14815px 6.51852px rgba(0, 0, 0, 0.0274815), 0px 1.85185px 3.14815px rgba(0, 0, 0, 0.0168519);'
          borderRadius='10'
        >
          <Box as='form' noValidate onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid columns={2} gap='2rem'>
              <FormControl mb='4' id='name' isRequired isInvalid={errors?.name}>
                <FormLabel>Organization Name</FormLabel>
                <InputGroup>
                  <Input
                    type='text'
                    placeholder='My organization'
                    {...register("name", {
                      required: "Organization name is required",
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                mb='4'
                id='secret'
                isRequired
                isInvalid={errors?.secret}
              >
                <FormLabel>Secret</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder='My organization'
                    {...register("secret", {
                      required: "Organization name is required",
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
                <FormErrorMessage>{errors?.secret?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                mb='4'
                gridColumn='1/3'
                id='description'
                isRequired
                isInvalid={errors?.description}
              >
                <FormLabel>Description</FormLabel>
                <InputGroup>
                  <Textarea
                    type='text'
                    placeholder='My organization'
                    {...register("description", {
                      required: "Organization name is required",
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors?.description?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl mb='8' id='primaryColor'>
                <FormLabel>Primary color</FormLabel>
                <InputGroup>
                  <Input type='color' {...register("primaryColor")} />
                </InputGroup>
              </FormControl>
              <FormControl mb='8' id='logo'>
                <FormLabel>Logo</FormLabel>
                <InputGroup>
                  <Input type='file' {...register("logo")} />
                </InputGroup>
              </FormControl>
            </SimpleGrid>
            <Flex alignItems='center' justifyContent='space-between'>
              <ChakraLink ml='1' color='purple.600' as={Link} to='..'>
                Go back
              </ChakraLink>
              <Button type='submit' colorScheme='purple'>
                Continue
              </Button>
            </Flex>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CreateOrganization;
