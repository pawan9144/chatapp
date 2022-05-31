// import React, { useState } from 'react'
// import { Button, Col, Container, Form, Row } from 'react-bootstrap'
// import './login.css';
// import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// const Login = () => {
//     const auth = getAuth();
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const [authing, setAuthing] = useState(false);

//     const handlelogin = (e: any) => {
//         e.preventDefault()
//         console.log(e.target)

//     }
    // const signInWithGoogle = async () => {
    //     setAuthing(true);

    //     signInWithPopup(auth, new GoogleAuthProvider())
    //         .then((response) => {
    //             console.log("<<<<<<<<<<<<<<<<<<<<<<<<<",response.user);

    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             setAuthing(false);
    //         });
    // };
//     return (
//         <>

//             <Container>
//                 <Row className="justify-content-lg-center">
//                     <Col lg={4} >
//                         <div className='loginlogocenter'>

//                             <h2>TELEGRAM</h2>
//                         </div>
//                         <div>

//                             <Form onSubmit={handlelogin}>
//                                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                                     <Form.Label>Email address</Form.Label>
//                                     <Form.Control type="email" placeholder="Enter email" value={email}
//                                         onChange={(e) => setEmail(e.target.value)} />

//                                 </Form.Group>

//                                 <Form.Group className="mb-3" controlId="formBasicPassword">
//                                     <Form.Label>Password</Form.Label>
//                                     <Form.Control type="password" placeholder="Password" value={password}
//                                         onChange={(e) => setPassword(e.target.value)} />
//                                 </Form.Group>
//                                 <Form.Group className="mb-3" controlId="formBasicCheckbox">
//                                     <Form.Check type="checkbox" label="keep login me!" />
//                                 </Form.Group>
//                                 <Button variant="primary" type="submit">
//                                     LOGIN
//                                 </Button>
//                             </Form>
//                             {/* <span className="googleicon" onClick={(event) => {
//                                 event.preventDefault();
//                                 signInWithGoogle();
//                             }}><AiOutlineGooglePlus /> google</span> */}
//                             <div>
//                                 <button onClick={() => signInWithGoogle()} disabled={authing}>
//                                     Sign in with Google
//                                 </button>

//                             </div>
//                         </div>

//                     </Col>

//                 </Row>
//             </Container>



//         </>
//     )
// }

// export default Login
























// onClick={() => setShow(!show)}










// onClick={() => sendrequest(post.data().newUser?.uid)}