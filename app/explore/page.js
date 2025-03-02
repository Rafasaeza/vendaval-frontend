import BuscarArticulo from "@/components/forms/buscarArticulo";
import Footer from '@/components/global/footer';
import Nav from '@/components/global/nav';
import { auth } from "@/auth";
export default async function EventoDetalles() {
        const session = await auth(); // Ejecuta auth en el servidor
        const user = session.user;
  return (user?
    <>
  <Nav></Nav>
  <BuscarArticulo userEmail={user.email}/>
  <Footer></Footer>
  </>: <h1>Not authenticated</h1>);
}