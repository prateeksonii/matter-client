import { Button } from "@chakra-ui/button";
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
} from "@chakra-ui/layout";
import { FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import TopLogo from "../../components/TopLogo";

const CreateProfile = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Heading color='white' mb='10'>
        Setup your profile
      </Heading>
      <SimpleGrid columns={{ sm: 1, lg: 2 }} gap='4rem' w='full'>
        <Box
          bgColor='whitesmoke'
          p='14'
          shadow='0px 100px 80px rgba(0, 0, 0, 0.07), 0px 64.8148px 46.8519px rgba(0, 0, 0, 0.0531481), 0px 38.5185px 25.4815px rgba(0, 0, 0, 0.0425185), 0px 20px 13px rgba(0, 0, 0, 0.035), 0px 8.14815px 6.51852px rgba(0, 0, 0, 0.0274815), 0px 1.85185px 3.14815px rgba(0, 0, 0, 0.0168519);'
          borderRadius='10'
        >
          <Text fontSize='xl' fontWeight='500'>
            I want to create an <strong>Organization</strong> account
          </Text>
          <Text my='1rem'>This includes:</Text>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={FiCheckCircle} color='green' />
              Setting up Organization
            </ListItem>
            <ListItem>
              <ListIcon as={FiCheckCircle} color='green' />
              Setting up roles and permissions
            </ListItem>
          </List>
          <Button
            colorScheme='purple'
            mt='2rem'
            onClick={() => navigate("./organization")}
          >
            Continue
          </Button>
        </Box>
        <Box
          bgColor='whitesmoke'
          p='14'
          shadow='0px 100px 80px rgba(0, 0, 0, 0.07), 0px 64.8148px 46.8519px rgba(0, 0, 0, 0.0531481), 0px 38.5185px 25.4815px rgba(0, 0, 0, 0.0425185), 0px 20px 13px rgba(0, 0, 0, 0.035), 0px 8.14815px 6.51852px rgba(0, 0, 0, 0.0274815), 0px 1.85185px 3.14815px rgba(0, 0, 0, 0.0168519);'
          borderRadius='10'
        >
          <Text fontSize='xl' fontWeight='500'>
            I'm part of an organization
          </Text>
          <Text my='1rem'>This includes:</Text>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={FiCheckCircle} color='green' />
              Manage tasks
            </ListItem>
            <ListItem>
              <ListIcon as={FiCheckCircle} color='green' />
              Handle tasks based on your role
            </ListItem>
          </List>
          <Button colorScheme='purple' mt='2rem'>
            Continue
          </Button>
        </Box>
      </SimpleGrid>
    </Layout>
  );
};

export default CreateProfile;
