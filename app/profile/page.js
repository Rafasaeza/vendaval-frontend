'use client'
import UserAvatar from "@/components/userAvatar"
import { useSession } from "next-auth/react";
import Nav from "@/components/global/nav"
import Footer from "@/components/global/footer"
export default  function Profile() {
  
    const { data: session, status } = useSession();
    if (status === "loading") return <p>Loading...</p>;
    if (!session || !session.user) return <h1>Not authenticated</h1>;
    return (
        <>
            <Nav></Nav>
            <UserAvatar user={session.user}></UserAvatar>
            <Footer></Footer>
        </>
    )
}