import  {handleSignOut}  from "@/components/actions/handleSignOut"

export default function SignOut() {
  return (
    <form
      action={handleSignOut}
    >
      <button type="submit">Sign Out</button>
    </form>
  )
}