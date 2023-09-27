"use client";

import { useEffect } from "react";

const UpdateUserPackage = ({ customer }: any) => {
  if (!customer) return null;

  console.clear();
  console.log(customer);
  useEffect(() => {
    if (customer && customer.email) {
      // TODO: update the user package in the database
    }
  }, [customer]);

  return (
    <div>
      <h3>Loading...</h3>
    </div>
  );
};

export default UpdateUserPackage;
