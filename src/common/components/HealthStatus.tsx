import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import * as React from "react";

import { Health } from "../types/Health";

function getSeverity(health: Health) {
  return health.status;
}

function getAffectedServices(health: Health) {
  const services = [];
  for (const service in health.results) {
    const value = health.results[service];

    if (value === "Degraded" || value === "Unhealthy") services.push(service);
  }

  return services;
}

function getAffectedString(services: string[]) {
  let string = "The affected services are: ";

  services.forEach((x) => (string += x + ", "));
  string = string.slice(0, -2) + ".";

  // ty bb 💖 https://stackoverflow.com/questions/29985085/replace-final-comma-in-a-string-with-and
  string = string.replace(/,(?=[^,]+$)/, ", and");

  return string;
}

type HealthStatusProps = {
  health?: Health;
  isLoading: boolean;
};

export default function HealthStatus({ health, isLoading }: HealthStatusProps) {
  if (isLoading) return null;

  if (!health) {
    return (
      <Alert severity="info">
        <AlertTitle>Status of Saiketsu is currently unknown</AlertTitle>
        The health service is currently unavailable.
      </Alert>
    );
  }

  if (health.status !== "Healthy") {
    const severity = getSeverity(health);

    return (
      <Alert severity={severity === "Degraded" ? "warning" : "error"}>
        <AlertTitle>
          {severity === "Degraded"
            ? "Saiketsu is currently degraded and may be slow"
            : "Saiketsu is not functioning correctly"}
        </AlertTitle>
        {getAffectedString(getAffectedServices(health))}
      </Alert>
    );
  }

  return null;
}
