
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//    @desc    login, page component
//              - login form using next-auth, formik and bcrypt for hashing
//              - many pages redirect to this login
//
//    @route   GET /login
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useState } from "react";
import { useRouter } from "next/router"; 
import { signIn } from "next-auth/react";

import Layout from "../layouts/layout";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { useFormik } from "formik";
import login_validate from "../lib/formikValidation";

import styles from "../styles/Form.module.css";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";

export default function Login() {
  const [show, setShow] = useState(false);
  const router = useRouter()

  // FORMIK HOOK
  // first specify the initial value, which is your input text box's name
  // from formik, you can access the onsubmit handler function
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // decouple validation because it is long. see login_validate
    validate: login_validate,
    onSubmit,
  });
  // Formik will not run onSubmit until you have an empty object inside of errors
  // console.log("err", formik.errors);

  // input text values via 'values' variable
  async function onSubmit(values) {

    // Connects to mongo and varify existance. Will return the status of the transaction
    const status = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/dashboard",
    });

    console.log('status', status);
    if (status.ok) {
      // if the status is ok, or 201 then redirect to the provided url
      router.push(status.url)
    }
  }

  // Google Handler Function
  async function handleGoogleSignin() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }

  // GitHub Handler Function
  async function handleGitHubSignin() {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  }

  return (
    <Layout>
      <Head>
        <title>Company Title | login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Dashboard Login</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
            officia?
          </p>
        </div>

        {/* FORM START */}
        {/* you don't have to worry about writing your own onSubmit method, formik does it */}

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">

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
              placeholder="Email"
              className={styles.input_text}
              onChange={formik.handleChange} // if you type anything inside that text box formik will handle the change
              value={formik.values.email}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          {/* TOUCHED CONDITION for better UX */}
          {/* {formik.errors.email && formik.touched.email ? <span className='text-rose-500'>{formik.errors.email}</span> : <></>} */}
          <div
            className={`${styles.input_group} ${
              formik.errors.password && formik.touched.password
                ? "border-rose-600"
                : ""
            }`}
          >
            <input
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="password"
              className={styles.input_text}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <span className="icon flex items-center px-4">
              <HiFingerPrint size={25} onClick={() => setShow(!show)} />
            </span>
          </div>
          {/* {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>} */}
          {/* login buttons */}
          <div className="input-button">
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div className="input-button">
            {/* make a call to signin from next-auth, which is going to make a request to [...nextauth].js and then send you to the google authenticatio page */}
            <button
              type="button"
              onClick={handleGoogleSignin}
              className={styles.button_custom}
            >
              Sign In with Google{" "}
              <Image src={"/assets/google.svg"} width="20" height={20}></Image>
            </button>
          </div>
          <div className="input-button">
            <button
              type="button"
              onClick={handleGitHubSignin}
              className={styles.button_custom}
            >
              Sign In with Github{" "}
              <Image src={"/assets/github.svg"} width={25} height={25}></Image>
            </button>
          </div>
        </form>
        {/* FORM END */}

        {/* bottom */}
        <p className="text-center text-gray-400 ">
          Don't have an account yet?{" "}
          <Link href={"/register"} className="text-blue-700">
            Sign Up
          </Link>
        </p>
      </section>
    </Layout>
  );
}
