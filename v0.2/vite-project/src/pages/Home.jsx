//Home.jsx
import React from "react";
import LandCard from "../components/landCard";
import Header from "../components/header";

export default function Home() {
  return (
    <>
      <Header />
      <section className="bg-slate-700">
        <LandCard />
      </section>
    </>
  );
}
