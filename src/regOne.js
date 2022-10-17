import { Flex, Text, Image, Input, Icon, Button, Link, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {auth, db} from "./firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegOne = () => {

    const toast = useToast()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [school, setSchool] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("id") !== null){
            navigate("/Main");
        }
    })
    

    function submission(e){
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            db.collection("users").doc(user.uid).set({
                email: email,
                school: school,
                resume: null,
                coverletter: null,
                companyEntries: []
            })
            localStorage.setItem("id", user.uid)
            navigate("/SignUp2")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error " + errorMessage)
            toast({
                title: 'Error occured!',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })

            // ..
        });
    }
 
    return (
        <Flex direction={'row'} alignItems = {'center'} justifyContent = {'center'} width = {'100vw'} height = {'100vh'}>
            <Flex direction={'column'} alignItems = {'center'} justifyContent = {'center'} height = {'100vh'} width = {'50vw'} backgroundColor = {'#648FFF'}>
                <Flex direction={'row'} width = {'34vw'} alignItems = {'center'} justifyContent = {'left'} marginBottom = {'2vh'} marginRight = {'5vw'}>
                    <Image width={'4.5vw'} height = {'4.5vw'} src = {require('./assets/Magnify.png')} alt = "Magnify" />
                    <Text color = {'white'} fontSize = {'1.8vw'} fontWeight = {700}>Glazey |&nbsp; </Text>
                    <Text color = {'white'} fontSize = {'1.6vw'}>Helping students</Text>
                </Flex>
                <Text color = {'white'} fontWeight = {800} fontSize = {'2.6vw'} marginBottom = {'6vh'}>Opportunities you wished you <br/>had before!</Text>
                <Image src = {require('./assets/Roadimg.png')} alt = "College Path" width={'24vw'} height = {'24vw'} />
            </Flex>
            <form onSubmit={(e) => submission(e)}>
                <Flex gap={'2vh'} direction={'column'} alignItems = {'center'} justifyContent = {'center'} height = {'100vh'} width = {'50vw'}>
                    <Text fontWeight={500} fontSize = {'2.7vw'}>Sign Up to Glazey</Text>
                    <Text color={'gray'} fontSize = {'1.1vw'}>Find or post opportunities</Text>
                    <Flex width={'70%'} backgroundColor={'#F9F9F9'} padding = {'1vw'} borderRadius = {20} border = {'1px solid #dfdfdf'} alignItems = {'center'} >
                        <Image src={require('./assets/Mail.png')} alt = {"Email"} width = {'1.5vw'} height = {'1.5vw'} />
                        <Input value = {email} onChange = {(e) => {
                            setEmail(e.target.value)
                        }} required fontSize={'1.2vw'} outline={'none'} type={'email'} placeholder="Email" fontWeight={800} border = {0} boxShadow = {'none'}/>
                    </Flex>
                    <Flex width={'70%'} backgroundColor={'#F9F9F9'} padding = {'1vw'} borderRadius = {20} border = {'1px solid #dfdfdf'} alignItems = {'center'} >
                        <Image src={require('./assets/Lock.png')} alt = {"Password"} width = {'1.5vw'} height = {'1.5vw'} />
                        <Input value={password} onChange = {(e) => {
                            setPassword(e.target.value)
                        }} required fontSize={'1.2vw'} outline={'none'} type={'password'} placeholder="Password" fontWeight={800} border = {0} boxShadow = {'none'}/>
                    </Flex>
                    <Flex width={'70%'} backgroundColor={'#F9F9F9'} padding = {'1vw'} borderRadius = {20} border = {'1px solid #dfdfdf'} alignItems = {'center'} >
                        <Image src={require('./assets/Education.png')} alt = {"Community College"} width = {'1.5vw'} height = {'1.5vw'} />
                        <Input value={school} onChange = {(e) => {
                            setSchool(e.target.value)
                        }} required fontSize={'1.2vw'} outline={'none'} type={'text'} placeholder="Community College" fontWeight={800} border = {0} boxShadow = {'none'}/>
                    </Flex>
                    <Button borderRadius = {20} fontSize={'1.2vw'} padding={'2.3vw'} width = {'70%'} type = {'submit'} color = {'white'} backgroundColor = {'#0047FF'} fontWeight = {700}>
                        Continue
                    </Button>
                    <Flex>
                        <Text fontSize={'1.1vw'}>Have an account? &nbsp; </Text>
                        <Link href="/LogIn" fontSize={'1.1vw'} color={'#0047FF'} fontWeight = {600}>Login</Link>
                    </Flex>
                    
                    
                </Flex>
            </form>
        </Flex>
    );
};

export default RegOne;