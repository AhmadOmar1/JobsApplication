import { useContext } from "react";
import { ApplicationContext } from "../providers/ApplicationProvider";
import {
  setApplicationsInLocalStorage,
} from "../utils/localStorage";
import { IApplication } from "../types/applicationTypes";

export const useApplications = () => {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error(
      "useApplications must be used within an ApplicationProvider"
    );
  }

  const { applications, addApplication, updateApplicationStatus, deleteApplication } = context;

  const addNewApplication = (newApplication: IApplication) => {
    const updatedApplications = [...applications, newApplication];
    setApplicationsInLocalStorage(updatedApplications);
    addApplication(newApplication);
  };

  return {
    applications,
    addApplication: addNewApplication,
    updateApplicationStatus,
    deleteApplication, 
  };
};