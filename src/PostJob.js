import {
  Flex,
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
  Textarea,
  Checkbox,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "./firebaseconfig";
import { ref, uploadBytesResumable } from "@firebase/storage";

/**
 * Add company started to users
 *
 * Schema:
 * Date created
 * Job Title
 * Company Name
 * Company Logo
 * Workplace Type
 * Job Location
 * Type
 * Major
 * Salary
 * Description
 * Transcript
 * Custom App Link
 * ApplicantsID
 */

const PostJob = () => {
  const navigate = useNavigate();
  const [eml, setEml] = useState("");
  const [customApp, setCustomApp] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [logo, setLogo] = useState("");
  const [workplace, setWorkplace] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [type, setType] = useState("");
  const [salary, setSalary] = useState(0);
  const [description, setDescription] = useState("");
  const [transcript, setTranscript] = useState(false);
  const [customLink, setCustomLink] = useState("");
  const [major, setMajor] = useState("Any");

  function submission(e) {
    e.preventDefault();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    if (!customApp) {
      setCustomLink("");
    }
    db.collection("jobs")
      .add({
        ownerId: localStorage.getItem("id"),
        date: today,
        jobTitle: jobTitle,
        companyName: companyName,
        companylogo: logo,
        workplace: workplace,
        jobLocation,
        jobLocation,
        type: type,
        major: major,
        salary: salary,
        description: description,
        transcript: transcript,
        customLink: customLink,
        applicants: [],
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        db.collection("users")
          .doc(localStorage.getItem("id"))
          .get()
          .then((doc) => {
            if (!doc.exists) return;
            console.log(doc.data().companyEntries);
            let arr = doc.data().companyEntries;
            arr.push(docRef.id);
            db.collection("users").doc(localStorage.getItem("id")).update({
              companyEntries: arr,
            });
            navigate("/Main");
          });
        const storageRef = ref(storage, `/logos/${localStorage.getItem("id")}`);
        const uploadTask = uploadBytesResumable(storageRef, logo);

        uploadTask.on("state_changed", (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        });
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  useEffect(() => {
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
  });

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
                  Major
                </Text>
                <Select width={"10vw"}>
                  <option value="Any" name="Any">
                    Any
                  </option>
                  <option value="Any" name="Any">
                    Accounting
                  </option>
                  <option value="Any" name="Any">
                    Aerospace Engineering
                  </option>
                  <option value="Any" name="Any">
                    African Studies
                  </option>
                  <option value="Any" name="Any">
                    Agriculture
                  </option>
                  <option value="Any" name="Any">
                    Animal Sciences
                  </option>
                  <option value="Any" name="Any">
                    Applied Mathematics
                  </option>
                  <option value="Any" name="Any">
                    Architecture
                  </option>
                  <option value="Any" name="Any">
                    Art
                  </option>
                  <option value="Any" name="Any">
                    Asian Studies
                  </option>
                  <option value="Any" name="Any">
                    Astronomy
                  </option>
                  <option value="Any" name="Any">
                    Biology
                  </option>
                  <option value="Any" name="Any">
                    Business
                  </option>
                  <option value="Any" name="Any">
                    Chemistry
                  </option>
                  <option value="Any" name="Any">
                    Chemical Engineering
                  </option>
                  <option value="Any" name="Any">
                    Civil Engineering
                  </option>
                  <option value="Any" name="Any">
                    Communications
                  </option>
                  <option value="Any" name="Any">
                    Computer Science
                  </option>
                  <option value="Any" name="Any">
                    Computer Engineering
                  </option>
                  <option value="Any" name="Any">
                    Construction
                  </option>
                  <option value="Any" name="Any">
                    Dance
                  </option>
                  <option value="Any" name="Any">
                    Data Science
                  </option>
                  <option value="Any" name="Any">
                    Dentistry
                  </option>
                  <option value="Any" name="Any">
                    Electrical Engineering
                  </option>
                  <option value="Any" name="Any">
                    Environmental Science
                  </option>
                  <option value="Any" name="Any">
                    Education
                  </option>
                  <option value="Any" name="Any">
                    Film
                  </option>
                  <option value="Any" name="Any">
                    Food and Technologies
                  </option>
                  <option value="Any" name="Any">
                    Geography
                  </option>
                  <option value="Any" name="Any">
                    Graphic Design
                  </option>
                  <option value="Any" name="Any">
                    History
                  </option>
                  <option value="Any" name="Any">
                    Human Resources
                  </option>
                  <option value="Any" name="Any">
                    Investment
                  </option>
                  <option value="Any" name="Any">
                    Language
                  </option>
                  <option value="Any" name="Any">
                    Latino Studies
                  </option>
                  <option value="Any" name="Any">
                    Law
                  </option>
                  <option value="Any" name="Any">
                    Marketing
                  </option>
                  <option value="Any" name="Any">
                    Mathematics
                  </option>
                  <option value="Any" name="Any">
                    Mechanical Engineering
                  </option>
                  <option value="Any" name="Any">
                    Medicine
                  </option>
                  <option value="Any" name="Any">
                    Music
                  </option>
                  <option value="Any" name="Any">
                    Natural Resources
                  </option>
                  <option value="Any" name="Any">
                    Nuclear Engineering
                  </option>
                  <option value="Any" name="Any">
                    Other
                  </option>
                  <option value="Any" name="Any">
                    Philosophy
                  </option>
                  <option value="Any" name="Any">
                    Photography
                  </option>
                  <option value="Any" name="Any">
                    Physical Education
                  </option>
                  <option value="Any" name="Any">
                    Physics
                  </option>
                  <option value="Any" name="Any">
                    Political Science
                  </option>
                  <option value="Any" name="Any">
                    Public Speaking
                  </option>
                  <option value="Any" name="Any">
                    Psychology
                  </option>
                  <option value="Any" name="Any">
                    Sociology
                  </option>
                  <option value="Any" name="Any">
                    Statistics
                  </option>
                  <option value="Any" name="Any">
                    Theatre
                  </option>
                  <option value="Any" name="Any">
                    Travel
                  </option>
                  <option value="Any" name="Any">
                    Wildlife
                  </option>
                  <option value="Any" name="Any">
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

      <form
        onSubmit={(e) => {
          submission(e);
        }}
      >
        <Flex
          direction={"column"}
          borderRadius={5}
          boxShadow={"1px 1px 10px 2px #aaa"}
          padding={4}
          marginTop={"2vh"}
          marginBottom={"2vh"}
        >
          <Text fontWeight={700} fontSize={"1.7vw"}>
            Post a Job, fast and free
          </Text>
          <Text fontSize={"1.1vw"}>
            The limit for posting is 5 job posts per week!
          </Text>
          <Flex direction={"column"}>
            <Text fontSize={"0.92vw"} color={"gray"} marginTop={"1.5vh"}>
              Job Title
            </Text>
            <Input
              onChange={(e) => {
                setJobTitle(e.target.value);
              }}
              required
              type={"text"}
              fontSize={"0.92vw"}
              placeholder={"Add title you are hiring for..."}
              padding={2}
            />
          </Flex>
          <Flex direction={"column"}>
            <Text fontSize={"0.92vw"} color={"gray"} marginTop={"1.5vh"}>
              Company Name
            </Text>
            <Input
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
              required
              type={"text"}
              fontSize={"0.92vw"}
              placeholder={"Name of company..."}
              padding={2}
            />
          </Flex>
          <Flex direction={"column"}>
            <Text fontSize={"0.92vw"} color={"gray"} marginTop={"1.5vh"}>
              Company Logo
            </Text>
            <Input
              required
              type={"file"}
              name={"file"}
              accept="image/png, image/jpg, image/jpeg"
              onChange={(e) => {
                console.log(e.target.value);
                setLogo(e.target.value);
              }}
              fontSize={"0.92vw"}
              placeholder={"Image PNG/JPG/JPEG..."}
              padding={2}
            />
          </Flex>
          <Flex direction={"column"}>
            <Text fontSize={"0.92vw"} color={"gray"} marginTop={"1.5vh"}>
              Workplace Type
            </Text>
            <Select
              onChange={(e) => {
                setWorkplace(e.target.value[0]);
              }}
              fontSize={"0.92vw"}
            >
              <option value="Onsite">Onsite</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
            </Select>
          </Flex>
          <Flex direction={"column"}>
            <Text fontSize={"0.92vw"} color={"gray"} marginTop={"1.5vh"}>
              Job Location
            </Text>
            <Input
              value={jobLocation}
              onChange={(e) => {
                setJobLocation(e.target.value);
              }}
              required
              type={"text"}
              fontSize={"0.92vw"}
              placeholder={
                "What city, state, and country is your job located..."
              }
              padding={2}
            />
          </Flex>
          <Flex direction={"column"}>
            <Text fontSize={"0.92vw"} color={"gray"} marginTop={"1.5vh"}>
              Type
            </Text>
            <Select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
              fontSize={"0.92vw"}
            >
              <option value="Internship">Internship</option>
              <option value="Job">Job</option>
              <option value="Research">Research</option>
            </Select>
          </Flex>
          <Flex direction={"column"}>
            <Text fontSize={"0.92vw"} color={"gray"} marginTop={"1.5vh"}>
              Major
            </Text>
            <Select
              fontSize={"0.92vw"}
              value={major}
              onChange={(e) => {
                setMajor(e.target.value);
              }}
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
              <option value="Applied Mathematics" name="Applied Mathematics">
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
              <option value="Chemical Engineering" name="Chemical Engineering">
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
              <option value="Computer Engineering" name="Computer Engineering">
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
              <option value="Nuclear Engineering" name="Nuclear Engineering">
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
          <Flex direction={"column"}>
            <Text fontSize={"0.92vw"} color={"gray"} marginTop={"1.5vh"}>
              Salary
            </Text>
            <Input
              onChange={(e) => {
                setSalary(e.target.value);
              }}
              value={salary}
              placeholder={"Hourly salary..."}
              required
              type={"number"}
              fontSize={"0.92vw"}
              padding={2}
            />
          </Flex>
          <Flex direction={"column"}>
            <Text fontSize={"0.92vw"} color={"gray"} marginTop={"1.5vh"}>
              Description
            </Text>
            <Textarea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              placeholder={"Description of role..."}
              required
              fontSize={"0.92vw"}
              padding={2}
            ></Textarea>
          </Flex>
          <Flex direction={"column"}>
            <Checkbox
              onChange={() => {
                setTranscript(!transcript);
              }}
              marginTop={"1.5vh"}
              value={transcript}
              name={"Transcript"}
            >
              <Text color={"gray"} fontSize={"0.92vw"}>
                Ask For Transcript
              </Text>
            </Checkbox>
            <Checkbox
              onChange={() => {
                setCustomApp(!customApp);
                console.log(customApp);
              }}
              value={customApp}
              name={"Custom"}
            >
              <Text color={"gray"} fontSize={"0.92vw"}>
                Add Custom Application Link
              </Text>
            </Checkbox>
            {customApp ? (
              <Input
                value={customLink}
                onChange={(e) => {
                  setCustomLink(e.target.value);
                }}
                required
                marginTop={"1.5vh"}
                type={"text"}
                fontSize={"0.92vw"}
                placeholder={"Custom application goes here"}
                padding={2}
              />
            ) : null}
          </Flex>
          <Button
            type={"submit"}
            fontSize={"1.15vw"}
            color={"white"}
            backgroundColor={"#0047FF"}
            marginTop={"1vh"}
          >
            Finish
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default PostJob;
