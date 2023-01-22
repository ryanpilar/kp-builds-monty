
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//    @desc    The Dashboard, PROTECTED page component
//              - uses getServerSideProps to first validate sessions
//              - once sessions is obtained, decide between Guest view or User view
//
//    @route   GET /dashboard
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import Head from "next/head";
import Link from "next/link";

import { useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

// Guest View
const Guest = ({ session }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="container mx-auto text-center py-20">
        <h3 className="text-4xl font-bold">Guest </h3>

        <div className="flex justify-center">
          <Link
            href={"/login"}
            className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray"
          >
            Sign In
          </Link>
        </div>

      </main>
    </>
  );
};

// Authorized User View 
// When you call this user, you will be passing the sesssion which has their name and email
const AuthorizedUser = ({ session, handleSignOut }) => {

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="container mx-auto text-center py-20">
        <h3 className="text-4xl font-bold">Welcome! You are an Authorized User </h3>

        <div className="details">
          <h5 className="">{session.user.name}</h5>
          <h5 className="">{session.user.email}</h5>
        </div>

        <div className="flex justify-center">
          <button onClick={handleSignOut} className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50">
            Sign out
          </button>
        </div>

        <div className="flex justify-center">
          <Link
            href={"/profile"}
            className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray"
          >
            Profile Page
          </Link>
        </div>
      </main>
    </>
  );
};

// Main View - decide which view to display
const Dashboard = () => {

  // access your session variable (users name and email). useSession is going to return session data
  const { data: session } = useSession();

  const handleSignOut = () => {
    // signOut() removes all the values from the cookies
    signOut()
  }

  return (
    <>
      <Head>
        <title>Company Name | Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="container mx-auto text-center py-20">
        <h3 className="text-6xl font-bold">The Dashboard</h3>
      </main>

      {/* once we have the 'session' from above, we return the authorized used or guest */}
      {session ? (
        <AuthorizedUser session={session} handleSignOut={handleSignOut} />
      ) : (
        <Guest session={session} />
      )}
    </>
  );
};

// PROTECT THIS DASHBOARD PAGE - getServerSideProps() will only generate this page when you have the user/sessions data
// If no user, redirect to the login page. req object from getServerSideProps via context.req
export async function getServerSideProps({ req }) {

  // this 'req' object returns the cookies and when we have the session cookies inside the variable we return the session
  const session = await getSession({ req })

  // if the user is not authorized, or we don't have the session variable, redirect them to the login page
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    // pass session in the props. 
    props: { session },
  };
}

export default Dashboard;
