import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "joao.meira@mail.com",
        },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch("http:localhost:3000/api/sign-in", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const company = await res.json();

        // If no error and we have user data, return it
        if (res.ok && company) {
          return company;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       console.log(user);
  //       token.id = user.id;
  //     }
  //     console.log(token);
  //     return token;
  //   },
  // },
  pages: {
    signIn: "/login",
  },
  // session: {
  //   maxAge: 5,
  // },
};

export default NextAuth(authOptions);
