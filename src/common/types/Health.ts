enum ServiceStatus {
  Healthy = "Healthy",
  Unhealthy = "Unhealthy",
  Degraded = "Degraded",
}

export type Health = {
  status: string;
  results: { [key: string]: ServiceStatus };
};
