import { auth } from "@/auth";
import Footer from "@/components/global/footer";
import CreateEventForm  from "@/components/forms/createEventForm";
import Nav from "@/components/global/nav";

export default async function FormularioCiudadPage() {
  const session = await auth(); // Ejecuta auth en el servidor
  const user = session.user;
  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <>
    <Nav></Nav>
    <CreateEventForm organizador={user.email} />
    <Footer></Footer>
    </>
);
}