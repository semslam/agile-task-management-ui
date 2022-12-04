import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement} from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";

// import axios from "axios";
import WebHook from "../../services/webhook";
import { useState } from "react";
// import { useHistory } from "react-router";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  // const history = useHistory();

  const [name, setName] = useState();
  const [username, setEmail] = useState();
  const [gender, setGender] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  // const [image, setImage] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async (e) => {
    setPicLoading(true);
    console.log(name, username, password, gender);
    if (!name || !username || !password || !confirmpassword || !gender) {
      toast({
        title: "Please Fill all the Felids",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setPicLoading(false);
      return;
    }
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!username.match(emailRegex)){
      toast({
        title: "Invalid Email Address",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setPicLoading(false);
      return;
    }
     console.log(name, username, password, gender);
    try {
      // const config = {
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      // };
      // const { data } = await axios.post(
      //   "/api/v1/users/create",
      //   {
      //     name,
      //     username,
      //     password,
      //     pic,
      //   },
      //   config
      // );


     const data = await new WebHook().create("users/create",{
        name,
        username,
        password,
        gender
      })
      console.log(data);
      toast({
        title: "Registration Successful, Please login",
        status: "success",
        duration: 8000,
        isClosable: true,
        position: "top",
      });
      // localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      
      setName("")
      setEmail("")
      setGender("")
      setConfirmpassword("")
      setPassword("")

      // history.push("/chats");
      return;
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setPicLoading(false);
    }
  };

  // const postDetails = (images) => {
  //   setPicLoading(true);

  //   const file = images;
  //   console.log(file)
  // if (file.size > 1024)
  // {
  //   toast({
  //     title: "File size cannot exceed more than 1MB",
  //     status: "warning",
  //     duration: 5000,
  //     isClosable: true,
  //     position: "top",
  //   });
  //   setPicLoading(false);
  //   return;
  // }
   
  //   if (images === undefined) {
  //     toast({
  //       title: "Please Select an Image!",
  //       status: "warning",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "top",
  //     });
  //     return;
  //   }
  //   console.log(images);
  //   if (images.type === "image/jpeg" || images.type === "image/png") {
  //     // const data = new FormData();
  //     // data.append("file", images);
  //     // data.append("upload_preset", "task-manager");
  //     // data.append("cloud_name", "dmzvclqvz");
  //     // console.log(data);
  //     // fetch("https://api.cloudinary.com/v1_1/dmzvclqvz/image/upload", {
  //     //   method: "post",
  //     //   body: data,
  //     // })
  //     //   .then((res) => res.json())
  //     //   .then((data) => {
  //     //     setImage(data.url.toString());
  //     //     console.log(data.url.toString());
  //     //     setPicLoading(false);
  //     //   })
  //     //   .catch((err) => {
  //     //     console.log(err);
  //     //     setPicLoading(false);
  //     //   });
  //     const data = new FormData();
  //     data.append("file", images);
  //     data.append("fileName", images.name);
  //     // data.append("cloud_name", "dmzvclqvz");

  //     console.log(data)
  //     setImage(data);
  //     setPicLoading(false);
  //   } else {
  //     toast({
  //       title: "Please Select an Image!",
  //       status: "warning",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "top",
  //     });
  //     setPicLoading(false);
  //     return;
  //   }
  // };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="username" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="gender" isRequired>
        <FormLabel>Gender</FormLabel>
        <RadioGroup   spacing={5} isInline 
        onChange={setGender} value={gender}>
          <Radio variantColor="green" value='male'>
            Male
          </Radio>
          <Radio variantColor="blue" value='female'>
            Female
          </Radio>
        </RadioGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      
      {/* <FormControl id="image">
        <FormLabel>Upload your Image</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl> */}
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
