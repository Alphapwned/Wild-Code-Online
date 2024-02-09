
export const calculateEndedAt = (duration: string, status: string, date: Date): Date => {
  const endedAt: Date = new Date()

  if (status === "Active" && duration === "Monthly") {
    endedAt.setUTCMonth(date.getUTCMonth() + 1)
  }

  return endedAt
}
