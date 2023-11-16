import React from "react";
import LandCard from "../components/landCard";
import Header from "../components/header";

export default function Home() {
  return (
    <>
      <Header />
      <section className="bg-gradient-to-tr from-teal-900 to-teal-500">
        <LandCard />
      </section>
    </>
  );
}
