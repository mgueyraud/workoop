
import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  secret: process.env.SECRET_NEXT_AUTH,
  pages: {
    signIn: '/'
  },
  callbacks:{
    async signIn({ user, account, profile, email, credentials }) {

        if(account.provider === 'google'){
            const {access_token, id_token} = account;

            try{
                const response = await axios.post(`${process.env.BACKEND_API}/social/login/google/`,{
                    access_token,
                    id_token
                });

                const { access_token: accessToken } = response.data;
                console.log(response.data);

                account.access_token = accessToken;
            }catch(e){
                return false;
            }
        }

        return true
      },
      async session({ session, token }) {

        session.accessToken = token.accessToken;

        return session
      },
      async jwt({ token, account }) {

        if (account) {
          token.accessToken = account.access_token
        }

        return token
      }
  }
}

export default NextAuth(authOptions)