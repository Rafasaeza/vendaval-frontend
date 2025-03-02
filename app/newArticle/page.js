import { auth } from "@/auth";
import ArticleForm from '@/components/forms/createArticle';
import Footer from '@/components/global/footer';
import Nav from '@/components/global/nav';
export default async function EventoDetalles() {
    const session = await auth(); // Ejecuta auth en el servidor
    const user = session.user;
  return (
   user? <>
  <Nav></Nav>
  <ArticleForm userEmail={user.email}/>
  <Footer></Footer>
  </>: <h1>Not authenticated</h1>);
}