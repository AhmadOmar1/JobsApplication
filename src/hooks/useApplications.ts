import { useContext } from "react";
import { ApplicationContext } from "../providers/ApplicationProvider";

export const useApplications = () => {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error(  
      "useApplications must be used within an ApplicationProvider"
    );
  }

  const { applications, addApplication, updateApplicationStatus } = context;

    console.log("Applications in Hook:", applications);

  return { applications, addApplication, updateApplicationStatus };
};
