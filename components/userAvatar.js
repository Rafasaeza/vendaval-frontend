import Wrapper from "./global/wrapper";

 
export default function UserAvatar({user}) {

 
  return (
    <Wrapper>
      <h1>Hola {user.name}</h1>
      <img src={user.image} alt="User Avatar" />
    </Wrapper>
  )
}