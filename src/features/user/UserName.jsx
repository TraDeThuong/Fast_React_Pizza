import { useSelector } from "react-redux"

export default function UserName() {
    const username = useSelector((state) => state.user.username)
    if (!username) return null;
  return (
    <p className = "hidden text-white bg-amber-800 px-4 py-2 rounded-full md:block">
      {username}
    </p>
  )
}
