
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//    @desc    sser profile, PROTECTED, page component
//              - shown only when session cookie exists
//              - profile page to be populated by user data
//
//    @route   GET /profile
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import Link from "next/link"
import { getSession } from "next-auth/react"

const Profile = () => {
  return (
<section className="container mx-auto text-center">
    <h3 className="text-6xl font-bold">Profile Page</h3>

    <Link href={'/'}>Home Page</Link>

</section>
  )
}

export default Profile

// PROTECT THIS PROFILE PAGE 
// getServerSideProps() will only generate this page when you have the user/sessions data. If no user, redirect to x page
// get the req object from getServerSideProps via context.req
export async function getServerSideProps({ req }) {

    // when we have the session cookies (via 'req') we are going to return the session
    const session = await getSession({ req })
  
    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
    // authorize user and return session
    return {
      // pass session in the props. if we have the user, return the session
      props: { session },
    };
  }