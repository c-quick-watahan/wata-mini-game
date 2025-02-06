import { getSignedInUser } from "../auth";

export default function SignIn() {
  return (
    <>
      <button
        onClick={getSignedInUser}
        className="btn bg-white btn-ghost text-[#0066A5] text-lg"
      >
        Sign In
      </button>
    </>
  );
}
