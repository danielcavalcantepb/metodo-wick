export type MetricsConfig = {
  clientsServed: number | null
  yearsOfExperience: number | null
  consultanciesCompleted: number | null
}

export const metricsConfig: MetricsConfig = {
  clientsServed: null,
  yearsOfExperience: null,
  consultanciesCompleted: null,
}

export const hasPublishedMetrics = Object.values(metricsConfig).some(
  (value) => typeof value === 'number' && Number.isFinite(value),
)
