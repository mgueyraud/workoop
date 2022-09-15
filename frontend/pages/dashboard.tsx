import type { GetServerSideProps, NextPage } from "next";
import { signOut } from "next-auth/react";
import verifyAuth from "../utilities/helpers/verifyAuth";
import { Button } from "@chakra-ui/react";
import Navbar from "../partials/Navbar";

const Dashboard = () => {
  return <div>dashboard</div>;
};

export async function getServerSideProps(request: GetServerSideProps) {
  return verifyAuth(request);
}

export default Dashboard;
