import {
  Button,
  Flex,
  Image,
  Input,
  Link,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styles from "./App.css";
import { auth, db } from "./firebaseconfig";
import { isMobile, browserName } from "react-device-detect";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("id") !== null) {
      navigate("/Main");
    }
  });

  let n = true;
  if (isMobile) {
    n = true;
  } else {
    n = false;
  }
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: n });
  const toast = useToast();
  const toast2 = useToast();
  const toast3 = useToast();
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const addEmail = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast3({
        title: "Email in wrong format!",
        description:
          "This email format is incorrect making it wrong and invalid!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (true) {
      db.collection("waitlist").add({
        email: email,
      });
      setEmail("");
      toast3({
        title: "Email registered!",
        description: "Email just registered to database!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast3({
        title: "Email already exists!",
        description:
          "Email is already registered in the database for waitlist!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const [active, setActive] = useState(false);

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"100vw"}
      height={"97vh"}
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mobile App coming soon...</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              This website is meant to be for computers and desktops. A mobile
              version for funs will be coming out within a year!
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Image
        src={require("./assets/Decoration.png")}
        alt="Decoration"
        position={"absolute"}
        top={0}
        right={0}
        zIndex={-100}
        height={"100vh"}
        width={"39vw"}
      />
      <Flex
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        width={"95vw"}
        gap={"2.5vw"}
        marginLeft={"2.5vw"}
      >
        <Flex direction={"column"} width={"50vw"}>
          <Link
            onMouseOver={() => setActive(true)}
            onMouseOut={() => setActive(false)}
            style={{
              transform: active ? "scale(1.2)" : "scale(1)",
            }}
            width={"22vw"}
            height={"6vw"}
            href={"/SignUp"}
          >
            <Image
              src={require("./assets/BetaButton.png")}
              alt="Beta Button"
              width={"100%"}
              height={"100%"}
            />
          </Link>
          <Flex
            direction={"column"}
            marginTop={"1vh"}
            gap={"-1"}
            marginBottom={"3vh"}
          >
            <Text fontSize={"4vw"} fontWeight={700}>
              Tired looking for opportunities as
            </Text>
            <Text fontSize={"4vw"} fontWeight={700} color={"#0047FF"}>
              community college student.
            </Text>
          </Flex>
          <form
            onSubmit={(e) => {
              addEmail(e);
            }}
          >
            <Flex direction={"row"} gap={"0.5vw"}>
              <Input
                type={"email"}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                color={"black"}
                placeholder={"Email"}
                fontWeight={800}
                padding={8}
                fontSize={"1.3vw"}
                background={"#F9F9F9"}
                borderRadius={15}
                border={"1px solid #bbbbbb"}
              />
              <Button
                type={"submit"}
                color={"white"}
                fontWeight={800}
                padding={8}
                fontSize={"1.3vw"}
                background={"#0047FF"}
                borderRadius={15}
              >
                Join Waitlist
              </Button>
            </Flex>
            <Text
              fontWeight={600}
              color={"#878787"}
              marginTop={"1vh"}
              fontSize={"1.15vw"}
            >
              We’re most definitely going to spam you.
            </Text>
          </form>
        </Flex>
        <Flex
          width={"40vw"}
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Image src={require("./assets/Webpic.png")} alt="glazey.com" />
          <Text color={"white"} fontWeight={600} fontSize={"1.05vw"}>
            Opportunities such as jobs, internships, and research
          </Text>
        </Flex>
      </Flex>
      <Flex
        direction={"row"}
        marginTop={"4vh"}
        width={"94vw"}
        justifyContent={"left"}
      >
        <Flex direction={"row"}>
          <Link
            onClick={() => {
              toast2({
                title: "LinkedIn does not exist yet!",
                description:
                  "LinkedIn does not exist yet but will hopefully be up and running in a few days!",
                status: "info",
                duration: 3000,
                isClosable: true,
              });
            }}
            background={"transparent"}
            width={"5vw"}
          >
            <Image
              src={require("./assets/linkedin.png")}
              alt="Linkedin"
              width={"3vw"}
            />
          </Link>
          <Link
            href="https://twitter.com/GlazeyOfficial"
            target={"_blank"}
            background={"transparent"}
            width={"5vw"}
          >
            <Image
              src={require("./assets/twitter.png")}
              alt="Twitter"
              width={"3vw"}
            />
          </Link>
        </Flex>
        <Flex direction={"row"}>
          <Link
            color={"white"}
            href="https://wood-politician-32a.notion.site/Glazey-Careers-8550c37f3e974546a930959019dfe39c"
            target={"_blank"}
            position={"absolute"}
            right={"10vw"}
            fontSize={"1.2vw"}
            background={"transparent"}
          >
            Careers
          </Link>
          <Link
            color={"white"}
            href="https://wood-politician-32a.notion.site/Privacy-Policy-522957bf1de241d39ff91a8341caa012"
            target={"_blank"}
            position={"absolute"}
            right={"3vw"}
            fontSize={"1.2vw"}
            background={"transparent"}
          >
            Privacy
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MainPage;
