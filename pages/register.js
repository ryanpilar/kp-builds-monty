//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//    @desc    Register, page component
//              - submit credentials to be hashed by bcrypt and store in a MongoDB database
//              - uses Formik for form UX and validation 
//
//    @route   GET /register
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";

import { useFormik } from "formik";
import { registerValidate } from "../lib/formikValidate"; // formik form conditionals that were manually coded

import Layout from "../layouts/layout";
import styles from "../styles/Form.module.css";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";

const Register = () => {
  const router = useRouter();

  const [show, setShow] = useState({
    password: false,
    cpassword: false,
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validate: registerValidate,
    onSubmit,
  });

  // SUBMIT FORM - access all input text values via 'values' variable
  async function onSubmit(values) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };

    await fetch("http://localhost:3000/api/auth/sign-up", options)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          // if the status is ok, or 201, then redirect
          router.push("http://localhost:3000");
        }
      });
  }

  return (
    <Layout>
      <Head>
        <title>Company Title | Register New User</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10 ">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
            officia?
          </p>
        </div>

        {/* FORMIK FORM START */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <div
            className={`${styles.input_group} ${
              formik.errors.username && formik.touched.username
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type="username"
              name="username"
              placeholder="username"
              className={styles.input_text}
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <span className="icon flex items-center px-4">
              <HiOutlineUser size={25} />
            </span>
          </div>
          {/* {formik.errors.username && formik.touched.username ? (
            <span className="text-rose-500">{formik.errors.username}</span>
          ) : (
            <></>
          )} */}
          <div
            className={`${styles.input_group} ${
              formik.errors.email && formik.touched.email
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type="email"
              name="email"
              placeholder="email"
              className={styles.input_text}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          {/* {formik.errors.email && formik.touched.email ? (
            <span className="text-rose-500">{formik.errors.email}</span>
          ) : (
            <></>
          )} */}
          <div
            className={`${styles.input_group} ${
              formik.errors.password && formik.touched.password
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type={`${show.password ? "text" : "password"}`}
              name="password"
              placeholder="password"
              className={styles.input_text}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <span className="icon flex items-center px-4">
              <HiFingerPrint
                size={25}
                onClick={() => setShow({ ...show, password: !show.password })}
              />
            </span>
          </div>

          {/* {formik.errors.password && formik.touched.password ? (
            <span className="text-rose-500">{formik.errors.password}</span>
          ) : (
            <></>
          )} */}

          <div
            className={`${styles.input_group} ${
              formik.errors.cpassword && formik.touched.cpassword
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type={`${show.cpassword ? "text" : "password"}`}
              name="cpassword"
              placeholder="confirm password"
              className={styles.input_text}
              onChange={formik.handleChange}
              value={formik.values.cpassword}
            />
            <span className="icon flex items-center px-4">
              <HiFingerPrint
                size={25}
                onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
              />
            </span>
          </div>
          {/* {formik.errors.cpassword && formik.touched.cpassword ? (
            <span className="text-rose-500">{formik.errors.cpassword}</span>
          ) : (
            <></>
          )} */}

          {/* LOGIN BUTTONS */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Sign Up
            </button>
          </div>
        </form>
        {/* FORMIK FORM END */}

        <p className="text-center text-gray-400 ">
          Already have an account?{" "}
          <Link href={"/login"} className="text-blue-700">
            Sign In
          </Link>
        </p>
      </section>
    </Layout>
  );
};

export default Register;