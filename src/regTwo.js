import { Flex, Text, Image, Input, Icon, Button, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {auth, db} from "./firebaseconfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegTwo = () => {

    const [resume, setResume] = useState("")
    const [coverLetter, setCoverLetter] = useState("")

    const navigate = useNavigate()

    function submission(e){
        e.preventDefault();
        const id = String(localStorage.getItem("id"))
        console.log(id)
        
        if (coverLetter !== null){
            db.collection("users").doc(id).update({
                resume: resume,
                coverletter: coverLetter
            })
        }else{
            db.collection("users").doc(id).update({
                resume: resume
            })
        }
            
        navigate("/Main")
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
            <form onSubmit={(e) => {submission(e)}}>
                <Flex gap={'2vh'} direction={'column'} alignItems = {'center'} justifyContent = {'center'} height = {'100vh'} width = {'50vw'}>
                    <Text fontWeight={500} fontSize = {'2.7vw'}>Sign Up to Glazey</Text>
                    <Text color={'gray'} fontSize = {'1.1vw'}>Find or post opportunities</Text>
                    <Flex width={'70%'} backgroundColor={'#F9F9F9'} padding = {'1vw'} borderRadius = {20} border = {'1px solid #dfdfdf'} alignItems = {'center'} >
                        <Image src={require('./assets/Resume.png')} alt = {"Resume"} width = {'1.5vw'} height = {'1.5vw'} />
                        <Text fontSize={'1.2vw'} outline={'none'} fontWeight={800} border = {0}>Resume</Text>
                        <Input accept="application/pdf,application/vnd.ms-excel" value={resume} onChange = {(e) => {
                            setResume(e.target.value)
                        }} required fontSize={'1.2vw'} outline={'none'} type={'file'} placeholder="Resume" fontWeight={800} border = {0} boxShadow = {'none'}/>
                    </Flex>
                    <Flex width={'70%'} backgroundColor={'#F9F9F9'} padding = {'1vw'} borderRadius = {20} border = {'1px solid #dfdfdf'} alignItems = {'center'} >
                        <Image src={require('./assets/CoverLetter.png')} alt = {"Cover Letter"} width = {'1.5vw'} height = {'1.5vw'} />
                        <Text fontSize={'1.2vw'} outline={'none'} fontWeight={800} border = {0}>Letter</Text>
                        <Input accept="application/pdf,application/vnd.ms-excel" value={coverLetter} onChange = {(e) => {
                            setCoverLetter(e.target.value)
                        }} fontSize={'1.2vw'} outline={'none'} type={'file'} placeholder="Cover Letter" fontWeight={800} border = {0} boxShadow = {'none'}/>
                    </Flex>
                    <Button borderRadius = {20} fontSize={'1.2vw'} padding={'2.3vw'} width = {'70%'} type = {'submit'} color = {'white'} backgroundColor = {'#0047FF'} fontWeight = {700}>
                        Continue
                    </Button>
                    
                    
                </Flex>
            </form>
        </Flex>
    );
};

export default RegTwo;