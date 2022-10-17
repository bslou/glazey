import {
  Flex,
  Heading,
  Select,
  Link,
  Button,
  Image,
  Collapse,
  Text,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "./firebaseconfig";

const Main = () => {
  const navigate = useNavigate();
  const [eml, setEml] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      db.collection("users")
        .doc(localStorage.getItem("id"))
        .get()
        .then((doc) => {
          if (!doc.exists) return;
          console.log(doc.data().email);
          setEml(doc.data().email);
        });

      if (localStorage.getItem("id") === null) {
        navigate("/");
      }

      db.collection("jobs")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            console.log(doc.data().jobTitle);
            setJobs((prevJobs) => [...prevJobs, doc.data()]);
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    };
    fetchData();
    setJobs([]);
  }, []);
  console.log(eml);

  function logOut() {
    localStorage.removeItem("id");
    navigate("/");
  }

  // logOut();

  const [num, setNum] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  const [major, setMajor] = useState("Any");

  var array = [];

  return (
    <Flex direction={"column"} alignItems={"center"}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Flex direction={"column"}>
                <Text fontWeight={700} marginBottom={"1vh"}>
                  Major:
                </Text>
                <Select
                  value={major}
                  onChange={(e) => {
                    setMajor(e.target.value);
                  }}
                  width={"10vw"}
                >
                  <option value="Any" name="Any">
                    Any
                  </option>
                  <option value="Accounting" name="Any">
                    Accounting
                  </option>
                  <option
                    value="Aerospace Engineering"
                    name="Aerospace Engineering"
                  >
                    Aerospace Engineering
                  </option>
                  <option value="African Studies" name="African Studies">
                    African Studies
                  </option>
                  <option value="Agriculture" name="Agriculture">
                    Agriculture
                  </option>
                  <option value="Animal Sciences" name="Animal Sciences">
                    Animal Sciences
                  </option>
                  <option
                    value="Applied Mathematics"
                    name="Applied Mathematics"
                  >
                    Applied Mathematics
                  </option>
                  <option value="Architecture" name="Architecture">
                    Architecture
                  </option>
                  <option value="Art" name="Art">
                    Art
                  </option>
                  <option value="Asian Studies" name="Asian Studies">
                    Asian Studies
                  </option>
                  <option value="Astronomy" name="Astronomy">
                    Astronomy
                  </option>
                  <option value="Biology" name="Biology">
                    Biology
                  </option>
                  <option value="Business" name="Business">
                    Business
                  </option>
                  <option value="Chemistry" name="Chemistry">
                    Chemistry
                  </option>
                  <option
                    value="Chemical Engineering"
                    name="Chemical Engineering"
                  >
                    Chemical Engineering
                  </option>
                  <option value="Civil Engineering" name="Civil Engineering">
                    Civil Engineering
                  </option>
                  <option value="Communications" name="Communications">
                    Communications
                  </option>
                  <option value="Computer Science" name="Computer Science">
                    Computer Science
                  </option>
                  <option
                    value="Computer Engineering"
                    name="Computer Engineering"
                  >
                    Computer Engineering
                  </option>
                  <option value="Construction" name="Construction">
                    Construction
                  </option>
                  <option value="Dance" name="Dance">
                    Dance
                  </option>
                  <option value="Data Science" name="Data Science">
                    Data Science
                  </option>
                  <option value="Dentistry" name="Dentistry">
                    Dentistry
                  </option>
                  <option
                    value="Electrical Engineering"
                    name="Electrical Engineering"
                  >
                    Electrical Engineering
                  </option>
                  <option
                    value="Environmental Science"
                    name="Environmental Science"
                  >
                    Environmental Science
                  </option>
                  <option value="Education" name="Education">
                    Education
                  </option>
                  <option value="Film" name="Film">
                    Film
                  </option>
                  <option
                    value="Food and Technologies"
                    name="Food and Technologies"
                  >
                    Food and Technologies
                  </option>
                  <option value="Geography" name="Geography">
                    Geography
                  </option>
                  <option value="Graphic Design" name="Graphic Design">
                    Graphic Design
                  </option>
                  <option value="History" name="History">
                    History
                  </option>
                  <option value="Human Resources" name="Human Resources">
                    Human Resources
                  </option>
                  <option value="Investment" name="Investment">
                    Investment
                  </option>
                  <option value="Language" name="Language">
                    Language
                  </option>
                  <option value="Latino Studies" name="Latino Studies">
                    Latino Studies
                  </option>
                  <option value="Law" name="Law">
                    Law
                  </option>
                  <option value="Marketing" name="Marketing">
                    Marketing
                  </option>
                  <option value="Mathematics" name="Mathematics">
                    Mathematics
                  </option>
                  <option
                    value="Mechanical Engineering"
                    name="Mechanical Engineering"
                  >
                    Mechanical Engineering
                  </option>
                  <option value="Medicine" name="Medicine">
                    Medicine
                  </option>
                  <option value="Music" name="Music">
                    Music
                  </option>
                  <option value="Natural Resources" name="Natural Resources">
                    Natural Resources
                  </option>
                  <option
                    value="Nuclear Engineering"
                    name="Nuclear Engineering"
                  >
                    Nuclear Engineering
                  </option>
                  <option value="Other" name="Other">
                    Other
                  </option>
                  <option value="Philosophy" name="Philosophy">
                    Philosophy
                  </option>
                  <option value="Photography" name="Photography">
                    Photography
                  </option>
                  <option value="Physical Education" name="Physical Education">
                    Physical Education
                  </option>
                  <option value="Physics" name="Physics">
                    Physics
                  </option>
                  <option value="Political Science" name="Political Science">
                    Political Science
                  </option>
                  <option value="Public Speaking" name="Public Speaking">
                    Public Speaking
                  </option>
                  <option value="Psychology" name="Psychology">
                    Psychology
                  </option>
                  <option value="Sociology" name="Sociology">
                    Sociology
                  </option>
                  <option value="Statistics" name="Statistics">
                    Statistics
                  </option>
                  <option value="Theatre" name="Theatre">
                    Theatre
                  </option>
                  <option value="Travel" name="Travel">
                    Travel
                  </option>
                  <option value="Wildlife" name="Wildlife">
                    Wildlife
                  </option>
                  <option value="Womens Studies" name="Womens Studies">
                    Womens Studies
                  </option>
                </Select>
              </Flex>
              <br />
              <Flex direction={"column"}>
                <Text fontWeight={700} marginBottom={"1vh"}>
                  Job Type:
                </Text>
                <Select width={"10vw"}>
                  <option>Any</option>
                  <option>Internship</option>
                  <option>Job</option>
                  <option>Research</option>
                </Select>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              direction={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Text fontSize={"1.7vw"} marginBottom={"3vh"} marginTop={"3vh"}>
                {eml}
              </Text>
              <Link fontSize={"1.4vw"} marginBottom={"3vh"}>
                Job Postings
              </Link>
              <Link fontSize={"1.4vw"} marginBottom={"3vh"}>
                Set Info
              </Link>
              <Link fontSize={"1.4vw"} marginBottom={"3vh"} onClick={logOut}>
                Logout
              </Link>
              <Button
                fontSize={"1.4vw"}
                fontWeight={500}
                marginBottom={"3vh"}
                onClick={onClose2}
              >
                Close
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Flex
        direction={"row"}
        padding={"1vw"}
        gap={"11.5vw"}
        alignItems={"center"}
        justifyContent={"center"}
        borderBottom={"1px solid #909090"}
        width={"100vw"}
      >
        <Flex
          direction={"row"}
          gap={"1vw"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Link width={"4vw"} href={"/Main"}>
            <Image src={require("./assets/logo.png")} alt="Glazey" />
          </Link>
          <Button
            background={"transparent"}
            fontSize={"1.2vw"}
            onClick={onOpen}
          >
            Filter
          </Button>
        </Flex>
        <Flex
          gap={"3vw"}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <form>
            <Input
              type={"text"}
              placeholder={"Search here..."}
              width={"50vw"}
              border={"1.5px solid black"}
              fontSize={"1.2vw"}
            />
          </form>
        </Flex>
        <Flex
          direction={"row"}
          gap={"1vw"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Link fontSize={"1.2vw"} href={"/PostJob"}>
            Post Job
          </Link>
          <Link width={"1.8vw"}>
            <Image src={require("./assets/Doorbell.png")} alt="Notifications" />
          </Link>
          <Link width={"4vw"} onClick={onOpen2}>
            <Image src={require("./assets/Profile.png")} />
          </Link>
        </Flex>
      </Flex>
      <Flex direction={"column"} alignItems={"center"}>
        {jobs && jobs.map((job, index) => <Jobs data={job} />)}
      </Flex>
    </Flex>
  );
};

const Jobs = (props) => {
  const [show, setShow] = React.useState(false);

  const handleToggle = () => setShow(!show);

  // data == job.data()
  // data.description == job.data().description

  return (
    <>
      {props.data && (
        <Flex
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          borderBottom={"0.4px solid gray"}
        >
          <Image
            src={props.data.logo}
            alt={"Company logo"}
            width={"8vw"}
            backgroundSize={"100% 100%"}
          />
          <Flex
            width={"45vw"}
            direction={"column"}
            justifyContent={"center"}
            margin={"1.5vw"}
          >
            <Text
              fontWeight={800}
              fontSize={"2vw"}
              margin={0}
              lineHeight={"5vh"}
            >
              {props.data.jobTitle}
            </Text>
            <Text fontSize={"1.5vw"} lineHeight={"4vh"}>
              {props.data.companyName}
            </Text>
            <Collapse startingHeight={"3vh"} in={show}>
              <Text fontSize={"1vw"}>{props.data.description}</Text>
            </Collapse>
            <Flex>
              <Text fontSize={"1.1vw"} color={"#888888"}>
                Salary: ${props.data.salary}
              </Text>
              <Text
                fontSize={"1.1vw"}
                color={"#888"}
                position={"absolute"}
                right={"28vw"}
              >
                Location: {props.data.jobLocation}
              </Text>
            </Flex>
          </Flex>
          <Flex direction={"column"} justifyContent={"center"} gap={"1vh"}>
            <Button
              backgroundColor={"#999999"}
              color={"white"}
              fontWeight={700}
              fontSize={"1vw"}
              onClick={handleToggle}
            >
              View {show ? "Less" : "More"}
            </Button>
            <Button
              backgroundColor={"#0047FF"}
              color={"white"}
              fontWeight={700}
              fontSize={"1vw"}
              onClick={() => console.log(props.data)}
            >
              Apply
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default Main;
