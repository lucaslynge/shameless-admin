import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("credentials", credentials);
        try {
            const res = await fetch('https://hiv-be.onrender.com/user/adminLogin/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            });
  
            const user = await res.json();  
            // Return the user object if the request was successful
            if (res.ok && user?.token) {

              return user;
            }
            // Return null if the credentials are invalid
            return null;
          } catch (error) {
            console.error('Error in authorize:', error);
            return null;
          }
        
      },
    }),
  ],
  pages:{
    signIn: '/auth/signin',
  },
  session:{
    jwt:true
  },
  callbacks:{
    async jwt({token,user}){
      if(user){
        token.accessToken=user.token
      }
      return token
    }
  }
  
});
