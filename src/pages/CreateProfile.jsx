import { Box, Container, Grid, Heading, Text } from "@chakra-ui/layout";
import TopLogo from "../components/TopLogo";

const CreateProfile = () => {
  return (
    <Box h='100vh' bg='linear-gradient(90deg, #4776E6 0%, #8E54E9 100%);'>
      <TopLogo />
      <Container
        h='full'
        maxW='4xl'
        centerContent
        display='flex'
        flexDir='column'
        alignItems='center'
        justifyContent='center'
      >
        <Heading color='white' mb='10'>
          Setup your profile
        </Heading>
        <Grid templateColumns='1fr 1fr' gap='4rem'>
          <Box
            bgColor='whitesmoke'
            p='14'
            shadow='0px 100px 80px rgba(0, 0, 0, 0.07), 0px 64.8148px 46.8519px rgba(0, 0, 0, 0.0531481), 0px 38.5185px 25.4815px rgba(0, 0, 0, 0.0425185), 0px 20px 13px rgba(0, 0, 0, 0.035), 0px 8.14815px 6.51852px rgba(0, 0, 0, 0.0274815), 0px 1.85185px 3.14815px rgba(0, 0, 0, 0.0168519);'
            borderRadius='10'
          >
            <Text fontSize='xl' fontWeight='500'>
              I want to create an <Text fontWeight='700'>organization</Text>
              account
            </Text>
          </Box>
          <Box
            bgColor='whitesmoke'
            p='14'
            shadow='0px 100px 80px rgba(0, 0, 0, 0.07), 0px 64.8148px 46.8519px rgba(0, 0, 0, 0.0531481), 0px 38.5185px 25.4815px rgba(0, 0, 0, 0.0425185), 0px 20px 13px rgba(0, 0, 0, 0.035), 0px 8.14815px 6.51852px rgba(0, 0, 0, 0.0274815), 0px 1.85185px 3.14815px rgba(0, 0, 0, 0.0168519);'
            borderRadius='10'
          >
            ok
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default CreateProfile;
