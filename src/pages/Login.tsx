import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Formik, ErrorMessage as Error, Form } from "formik";
import { initialValues, schemas } from "../helper";
import {
  Box,
  Button,
  Card,
  Flex,
  IconButton,
  TextField,
} from "@radix-ui/themes";
import { useState } from "react";

import { useNavigate } from "react-router";
import { useAppDispatch } from "../redux/store";
import { handleLogin } from "../redux/slices/userReducer";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [passwordVisible, setPasswordVisible] = useState(false);

  // const [formValues, setFormValues] = useState({
  //   username: "",
  //   password: "",
  // });

  function toggleVisible() {
    setPasswordVisible((prev) => !prev);
    // !prev - вернуть противоположное состоние
  }

  // function handleChange(event: React.SyntheticEvent) {
  //   const input = event.target as HTMLInputElement;
  //   const { name, value } = input;
  //   // name - username или password
  //   // value - введеное пользователем значение
  //   setFormValues((prev) => ({ ...prev, [name]: value }));
  //   // меняем объект (formValues), берем его предыдущее значение, возвращаем новый объект, копируем предыдущий (...prev), обращаемся по ключу, название которого содержится внутри name и заносим туда значение value
  // }

  function handleSubmit(values: { username: string; password: string }) {
    console.log(values);
    dispatch(handleLogin(values))
      .unwrap()
      .then(() => navigate("/"));

    // navigate("/");
    //  navigate("/") - перевод пользователя на главную страницу
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schemas.custom}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form>
          {" "}
          <Flex
            justify={"center"}
            direction={"column"}
            align={"center"}
            mt={"9"}
          >
            <Box maxWidth={"500px"} width={"100%"}>
              <Card size={"3"}>
                <Flex direction={"column"} gap={"5"}>
                  <TextField.Root
                    id="username"
                    size="3"
                    placeholder="username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Error name="username"></Error>

                  <Flex gap={"2"}>
                    <Box width={"100%"}>
                      <TextField.Root
                        id="password"
                        size="3"
                        placeholder="password"
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <Error name="password"></Error>
                    </Box>
                    <IconButton size={"3"} onClick={toggleVisible}>
                      {passwordVisible ? <EyeNoneIcon /> : <EyeOpenIcon />}
                    </IconButton>
                  </Flex>
                  <Button style={{ cursor: "pointer" }} type="submit">
                    Login
                  </Button>
                </Flex>
              </Card>
            </Box>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}

// import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
// import {
//   Box,
//   Button,
//   Card,
//   Flex,
//   IconButton,
//   TextField,
// } from "@radix-ui/themes";
// import { useState } from "react";
// import axiosInstance, { setAccessToken } from "../axiosInstance";
// import { useNavigate } from "react-router";

// export default function Login() {
//   const navigate = useNavigate();

//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const [formValues, setFormValues] = useState({
//     username: "",
//     password: "",
//   });

//   function toggleVisible() {
//     setPasswordVisible((prev) => !prev);
//     // !prev - вернуть противоположное состоние
//   }

//   function handleChange(event: React.SyntheticEvent) {
//     const input = event.target as HTMLInputElement;
//     const { name, value } = input;
//     // name - username или password
//     // value - введеное пользователем значение
//     setFormValues((prev) => ({ ...prev, [name]: value }));
//     // меняем объект (formValues), берем его предыдущее значение, возвращаем новый объект, копируем предыдущий (...prev), обращаемся по ключу, название которого содержится внутри name и заносим туда значение value
//   }

//   function handleSubmit() {
//     axiosInstance.post(`/user/login`, formValues).then((res) => {
//       console.log(res.data);
//       setAccessToken(res.data.accessToken);
//       navigate("/");
//       //  navigate("/") - перевод пользователя на главную страницу
//     });
//   }

//   return (
//     <Flex justify={"center"} direction={"column"} align={"center"} mt={"9"}>
//       <Box maxWidth={"500px"} width={"100%"}>
//         <Card size={"3"}>
//           <Flex direction={"column"} gap={"5"}>
//             <TextField.Root
//               size="3"
//               placeholder="username"
//               name="username"
//               value={formValues.username}
//               onChange={handleChange}
//             />
//             <Flex gap={"2"}>
//               <Box width={"100%"}>
//                 <TextField.Root
//                   size="3"
//                   placeholder="password"
//                   type={passwordVisible ? "text" : "password"}
//                   name="password"
//                   value={formValues.password}
//                   onChange={handleChange}
//                 />
//               </Box>
//               <IconButton size={"3"} onClick={toggleVisible}>
//                 {passwordVisible ? <EyeNoneIcon /> : <EyeOpenIcon />}
//               </IconButton>
//             </Flex>
//             <Button style={{ cursor: "pointer" }} onClick={handleSubmit}>
//               Login
//             </Button>
//           </Flex>
//         </Card>
//       </Box>
//     </Flex>
//   );
// }
