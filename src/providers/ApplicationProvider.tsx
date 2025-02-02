import { createContext, useState, useEffect, ReactNode } from "react";
import {
  getApplicationsFromLocalStorage,
  setApplicationsInLocalStorage,
} from "../utils/localStorage";
import { IApplication } from "../types/applicationTypes";

interface IApplicationContext {
  applications: IApplication[];
  addApplication: (app: IApplication) => void;
  updateApplicationStatus: (
    id: string,
    status: "Pending" | "Reviewed" | "Rejected"
  ) => void;
}

export const ApplicationContext = createContext<IApplicationContext | null>(
  null
);

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [applications, setApplications] = useState<IApplication[]>(() =>
    getApplicationsFromLocalStorage()
  );

  useEffect(() => {
    setApplicationsInLocalStorage(applications);
  }, [applications]);

  const addApplication = (app: IApplication) => {
    setApplications((prev) => {
      const updatedApplications = [...prev, app];
      setApplicationsInLocalStorage(updatedApplications);
      return updatedApplications;
    });
  };

  const updateApplicationStatus = (
    id: string,
    status: "Pending" | "Reviewed" | "Rejected"
  ) => {
    setApplications((prev) => {
      const updatedApplications = prev.map((app) =>
        app.id === id ? { ...app, status } : app
      );
      setApplicationsInLocalStorage(updatedApplications);
      return updatedApplications;
    });
  };

  return (
    <ApplicationContext.Provider
      value={{ applications, addApplication, updateApplicationStatus }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
