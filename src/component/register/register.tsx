import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router";

import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";

// import { toast } from "react-toastify";
import "./register.css"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

const Register = () => {
    interface FormValues {
        email: string;
        password: string;
      }
    // const navigate = useNavigate();
    const loginvalue = {
        email: "",
        password: "",
    };



    const EmailRegex = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    const loginSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email")
            .required("Required")
            .matches(EmailRegex, "email not validate"),
        password: Yup.string()
            .min(6, "Password Must br 8 Char")
            .max(15, "Too Long!")
            .required("Required")
            .matches(passwordRegex, "Password not validate"),
    });

    const handleSubmit = async (loginvalue: FormValues) => {
        const { email, password } = loginvalue
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;

        } catch (err: any) {
            console.error(err);
            alert(err.message);
        }

    };

    const signInWithGoogle = async () => {

        try {
            const res = await signInWithPopup(auth, provider);
            const user = res.user;
            
            const newUser = {
                uid: user.uid,
                fullname:user.displayName,
                email:user.email,
                photoURL:user.photoURL,
            };
        } catch (err: any) {
            console.error(err);
            alert(err.message);
        }
    };

    return (
        <div>
            <div className="login_container">
                <div className="login_form_container">
                    <Formik
                        initialValues={loginvalue}
                        onSubmit={handleSubmit}
                        validationSchema={loginSchema}
                    >
                        <div className="left">
                            <Form className="form_container">
                                <h1>Register to Your Account</h1>

                                <Field
                                    placeholder="Email"
                                    name="email"
                                    className="input"
                                />
                                <p className="text-danger">
                                    <ErrorMessage name="email" />
                                </p>

                                <Field
                                    type="text"
                                    placeholder="Password"
                                    name="password"
                                    className="input"
                                />
                                <p className="text-danger">
                                    <ErrorMessage name="password" />
                                </p>
                                <button type="submit" className="green_btn">
                                    Register
                                </button>
                            </Form>
                        </div>

                    </Formik>

                    <div className="right">
                        <h1>New Here ?</h1>

                        <Link to="/">
                            <button type="button" className="white_btn">
                                Login
                            </button>
                        </Link>
                        <div className="googlesignin">
                            <button onClick={() => signInWithGoogle()}>
                                Sign in with Google
                            </button>

                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
};


export default Register;


