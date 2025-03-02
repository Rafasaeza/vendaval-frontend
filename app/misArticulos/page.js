import { auth } from "@/auth";
import MisArticulos from '@/components/misArticulos';
import Footer from '@/components/global/footer';
import Nav from '@/components/global/nav';
export default async function EventoDetalles() {
    const session = await auth(); // Ejecuta auth en el servidor
    const user = session.user;
  return (
   user? <>
  <Nav></Nav>
  <MisArticulos userEmail={user.email}/>
  <Footer></Footer>
  </>: <h1>Not authenticated</h1>);
}