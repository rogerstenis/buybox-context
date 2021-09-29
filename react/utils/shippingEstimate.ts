// eslint-disable-next-line no-restricted-syntax
export enum UnitTime {
  m = 0, // minutes
  h = 1, // hours
  d = 2, // days
  bd = 3, // business days
}

export const UnitTimeWeight: { [key in keyof typeof UnitTime]: number } = {
  m: 1,
  h: 1000,
  d: 100000,
  bd: 1000000,
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
