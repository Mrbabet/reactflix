import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Heading,
  Text,
  Flex,
  Icon,
  List,
  ListItem,
  ListIcon,
  Box,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, useColorMode } from "@chakra-ui/react";
import {
  SunIcon,
  MoonIcon,
  ViewIcon,
  ViewOffIcon,
  WarningIcon,
  CheckCircleIcon,
} from "@chakra-ui/icons";
import { Link as ChakraLink } from "@chakra-ui/react";
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth, logout, registerWithEmailAndPassword } from "../../config/firebase";

const Register = () => {
  const [user, loading, error] = useAuthState(auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showMatchPassword, setShowMatchPassword] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const [validUserEmail, setValidUserEmail] = useState(false);
  const [userEmailFocus, setUserEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState({
    uppercase: false,
    lowercase: false,
    digit: false,
    specialChar: false,
    minLength: false,
  });
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [matchPassword, setMatchPassword] = useState("");
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const USER_EMAIL_REGEX =
    /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)*|\[((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|IPv6:((((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){6}|::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){5}|[0-9A-Fa-f]{0,4}::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){4}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):)?(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){3}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,2}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){2}|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,3}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,4}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,5}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}))?::)|(?!IPv6:)[0-9A-Za-z-]*[0-9A-Za-z]:[!-Z^-~]+)])/;
  const FULL_PASS_REGEX =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/;
  const PASS_UPPERCASE_LETTER_REGEX = /(?=.*?[A-Z])/;
  const PASS_LOWERCASE_LETTER_REGEX = /(?=.*?[a-z])/;
  const PASS_DIGIT_REGEX = /(?=.*?[0-9])/;
  const PASS_SPEC_CHAR_REGEX = /(?=.*?[#?!@$%^&*-])/;
  const PASS_MIN_LENGTH = /.{6,}/;

  useEffect(() => {
    setValidUserEmail(USER_EMAIL_REGEX.test(userEmail));
  }, [userEmail]);

  useEffect(() => {
    const uppercaseValid = PASS_UPPERCASE_LETTER_REGEX.test(password);
    const lowercaseValid = PASS_LOWERCASE_LETTER_REGEX.test(password);
    const digitValid = PASS_DIGIT_REGEX.test(password);
    const specialCharValid = PASS_SPEC_CHAR_REGEX.test(password);
    const minLengthValid = PASS_MIN_LENGTH.test(password);

    setValidPassword({
      uppercase: uppercaseValid,
      lowercase: lowercaseValid,
      digit: digitValid,
      specialChar: specialCharValid,
      minLength: minLengthValid,
    });

    const matchValid = password === matchPassword;

    setValidMatchPassword(matchValid);
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [userEmail, password, matchPassword]);

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_EMAIL_REGEX.test(userEmail);
    const v2 = FULL_PASS_REGEX.test(password);
    console.log(v1, v2);
    if (!v1 || !v2) {
      setErrMsg("Invalid entry");
      return;
    }

    try {
      registerWithEmailAndPassword(userEmail, password);
      logout
      setUserEmail("");
      setPassword("");
      setMatchPassword("");
      navigate("/welcome", { replace: true });
    } catch (error) {
      console.log(error);
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration failed");
      }
    }
  };
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box w="100vw" h="100vh" display="grid" placeItems="center">
        <IconButton
          aria-label="Toggle theme"
          position={"absolute"}
          top={0}
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
        <Flex gap="60px" flexDirection="column" margin="24px">
          <Icon width="33" height="27" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m26.463.408 3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-3.2l3.2 6.4h-4.8l-3.2-6.4h-1.6a3.186 3.186 0 0 0-3.184 3.2l-.016 19.2a3.2 3.2 0 0 0 3.2 3.2h25.6a3.2 3.2 0 0 0 3.2-3.2V.408h-6.4Z"
              fill="#FC4747"
            />
          </Icon>
          <Box
            bg="#161D2F"
            borderRadius="10px"
            p={("24px", "32px")}
            w={[327, 400]}
          >
            <form onSubmit={handleSubmit}>
              {errMsg && (
                <Text color="red.300" my={4} fontSize="xl">
                  {errMsg}
                </Text>
              )}
              <Heading as="h2" fontSize="xl" fontWeight={300} mb="40px">
                Sign Up
              </Heading>
              <FormControl mb="24px" isInvalid={userEmail && !validUserEmail}>
                <FormLabel m={0} htmlFor="email" fontSize="xs">
                  Email:
                </FormLabel>
                <Input
                  id="email"
                  onChange={(e) => setUserEmail(e.target.value)}
                  value={userEmail}
                  onFocus={() => setUserEmailFocus(true)}
                  onBlur={() => setUserEmailFocus(false)}
                  autoComplete="off"
                  placeholder="Email address"
                  _placeholder={{ fontSize: "sm" }}
                  style={{ caretColor: "#FC4747" }}
                  type="text"
                  borderColor={validUserEmail ? "green.500" : null}
                  focusBorderColor="#fff"
                  variant="flushed"
                  required
                />
                {userEmailFocus && userEmail && !validUserEmail && (
                  <FormErrorMessage>Wrong email address</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                mb="24px"
                isInvalid={
                  password &&
                  !Object.values(validPassword).every((prop) => prop === true)
                }
              >
                <FormLabel m={0} htmlFor="password" fontSize="xs">
                  Password:
                </FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    _placeholder={{ fontSize: "sm" }}
                    style={{ caretColor: "#FC4747" }}
                    borderColor={
                      Object.values(validPassword).every(
                        (prop) => prop === true
                      )
                        ? "green.500"
                        : null
                    }
                    focusBorderColor="#fff"
                    variant="flushed"
                    required
                  />

                  <InputRightElement>
                    <Button
                      bg="transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {passwordFocus && password && (
                  <List spacing={3}>
                    <ListItem>
                      {validPassword.uppercase ? (
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                      ) : (
                        <ListIcon as={WarningIcon} color="red.500" />
                      )}
                      Uppercase letter
                    </ListItem>
                    <ListItem>
                      {validPassword.lowercase ? (
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                      ) : (
                        <ListIcon as={WarningIcon} color="red.500" />
                      )}
                      Lowercase letter
                    </ListItem>
                    <ListItem>
                      {validPassword.digit ? (
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                      ) : (
                        <ListIcon as={WarningIcon} color="red.500" />
                      )}
                      Digit
                    </ListItem>
                    <ListItem>
                      {validPassword.specialChar ? (
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                      ) : (
                        <ListIcon as={WarningIcon} color="red.500" />
                      )}
                      Special charakter
                    </ListItem>
                    <ListItem>
                      {validPassword.minLength ? (
                        <ListIcon as={CheckCircleIcon} color="green.500" />
                      ) : (
                        <ListIcon as={WarningIcon} color="red.500" />
                      )}
                      Minimum length (6 characters)
                    </ListItem>
                  </List>
                )}
              </FormControl>
              <FormControl
                mb="24px"
                isInvalid={matchPassword && !validMatchPassword}
              >
                <FormLabel m={0} htmlFor="confirm_password" fontSize="xs">
                  Confirm Password:
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    id="confirm_password"
                    onChange={(e) => setMatchPassword(e.target.value)}
                    value={matchPassword}
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    type={showMatchPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    _placeholder={{ fontSize: "sm" }}
                    style={{ caretColor: "#FC4747" }}
                    focusBorderColor="#fff"
                    borderColor={
                      matchPassword && validMatchPassword ? "green.500" : null
                    }
                    variant="flushed"
                    required
                  />
                  <InputRightElement>
                    <Button
                      bg="transparent"
                      onClick={() => setShowMatchPassword(!showMatchPassword)}
                    >
                      {showMatchPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {!validMatchPassword && (
                  <FormErrorMessage>
                    Passwords must be the same!
                  </FormErrorMessage>
                )}
              </FormControl>
              <Flex
                gap="24px"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
              >
                <Button
                  variant="primary"
                  fontSize="sm"
                  fontWeight={300}
                  w="100%"
                  h="48px"
                  type="submit"
                >
                  Create an account
                </Button>
                <Text>
                  Already have an account?{" "}
                  <ChakraLink as={Link} color="#FC4747" to="/login">
                    Sign In
                  </ChakraLink>
                </Text>
              </Flex>
            </form>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Register;
