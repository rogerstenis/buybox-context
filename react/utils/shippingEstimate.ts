// eslint-disable-next-line no-restricted-syntax
export enum UnitTime {
  m = 0, // minutes
  h = 1, // hours
  d = 2, // days
  bd = 3, // business days
}

const MINUTES = 1
const HOUR_IN_MINUTES = MINUTES * 60
const DAYS_IN_MINUTES = HOUR_IN_MINUTES * 24
const BUSINESS_DAYS_IN_MINUTES = DAYS_IN_MINUTES * 1.4

export const UnitTimeWeight: { [key in keyof typeof UnitTime]: number } = {
  m: MINUTES,
  h: HOUR_IN_MINUTES,
  d: DAYS_IN_MINUTES,
  bd: BUSINESS_DAYS_IN_MINUTES,
}

export const splitShippingEstimate = (shippingEstimate: string) => {
  const timeAmount = Number(shippingEstimate.split(/\D+/)[0])
  const unitTime = shippingEstimate.split(/[0-9]+/)[1] as keyof typeof UnitTime

  return { timeAmount, unitTime }
}

export const evaluateShippingEstimate = (shippingEstimate: string) => {
  const { timeAmount, unitTime } = splitShippingEstimate(shippingEstimate)

  return timeAmount * UnitTimeWeight[unitTime]
}

export const compare = (
  shippingEstimateA: string,
  shippingEstimateB: string
) => {
  const { timeAmount: timeAmountA, unitTime: unitTimeA } =
    splitShippingEstimate(shippingEstimateA)

  const { timeAmount: timeAmountB, unitTime: unitTimeB } =
    splitShippingEstimate(shippingEstimateB)

  if (unitTimeA !== unitTimeB) {
    return UnitTime[unitTimeA] - UnitTime[unitTimeB]
  }

  if (timeAmountA !== timeAmountB) {
    return timeAmountA - timeAmountB
  }

  return 0
}
