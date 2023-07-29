import { Session } from "next-auth";

export const redirectLoggedInUsers = (session: Session | null) => {
  if (!!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
