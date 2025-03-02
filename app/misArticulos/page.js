'use client';
import { useSession } from "next-auth/react";
import MisArticulos from '@/components/misArticulos';
import Footer from '@/components/global/footer';
import Nav from '@/components/global/nav';
export default  function MyArticlesPage() {

  const { data: session, status } = useSession();
  if (status === "loading") return <p>Loading...</p>;
  if (!session || !session.user) return <h1>Not authenticated</h1>;

  return (
  <>
  <Nav></Nav>
  <MisArticulos userEmail={session.user.email}/>
  <Footer></Footer>
  </>);
}