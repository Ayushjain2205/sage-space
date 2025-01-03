import React from "react";
import Layout from "../components/Layout";
import CreateCompanionForm from "../components/CreateCompanionForm";

export default function CreatePage() {
  return (
    <Layout>
      <div
        className="min-h-screen py-12"
        style={{ backgroundColor: "#10002B" }}
      >
        <div className="container mx-auto px-4">
          <h1
            className="text-4xl font-bold mb-8 font-permanent-marker text-center"
            style={{ color: "#3BF4FB" }}
          >
            Create Sage
          </h1>
          <CreateCompanionForm />
        </div>
      </div>
    </Layout>
  );
}
