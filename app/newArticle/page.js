'use client';
import ArticleForm from '@/components/forms/createArticle';
import Footer from '@/components/global/footer';
import Nav from '@/components/global/nav';
import { useSession } from "next-auth/react";
export default  function EventoDetalles() {
  const { data: session, status } = useSession();
  if (status === "loading") return <p>Loading...</p>;
  if (!session || !session.user) return <h1>Not authenticated</h1>;
  return (
   <>
  <Nav></Nav>
  <ArticleForm userEmail={session.user.email}/>
  <Footer></Footer>
  </>);
}