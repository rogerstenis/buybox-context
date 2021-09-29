import {
  compare,
  evaluateShippingEstimate,
  splitShippingEstimate,
  UnitTime,
  UnitTimeWeight,
} from '../../utils/shippingEstimate'

describe('evaluateShippingEstimate', () => {
  it('should be return business days weight correctly', () => {
    // arrange
    const shippingEstimate = '8bd'

    // act
    const result = evaluateShippingEstimate(shippingEstimate)

    // assert
    expect(result).toEqual(8 * UnitTimeWeight.bd)
  })
  it('should be return days weight correctly', () => {
    // arrange
    const shippingEstimate = '1d'

    // act
    const result = evaluateShippingEstimate(shippingEstimate)

    // assert
    expect(result).toEqual(1 * UnitTimeWeight.d)
  })
  it('should be return hours weight correctly', () => {
    // arrange
    const shippingEstimate = '2h'

    // act
    const result = evaluateShippingEstimate(shippingEstimate)

    // assert
    expect(result).toEqual(2 * UnitTimeWeight.h)
  })
  it('should be return minutes weight correctly', () => {
    // arrange
    const shippingEstimate = '30m'

    // act
    const result = evaluateShippingEstimate(shippingEstimate)

    // assert
    expect(result).toEqual(30 * UnitTimeWeight.m)
  })
})

describe('splitShippingEstimate', () => {
  it('should be return business days correctly', () => {
    // arrange
    const shippingEstimate = '8bd'

    // act
    const { timeAmount, unitTime } = splitShippingEstimate(shippingEstimate)

    // assert
    expect(timeAmount).toEqual(8)
    expect(UnitTime[unitTime]).toEqual(UnitTime.bd)
  })

  it('should be return days correctly', () => {
    // arrange
    const shippingEstimate = '1d'

    // act
    const { timeAmount, unitTime } = splitShippingEstimate(shippingEstimate)

    // assert
    expect(timeAmount).toEqual(1)
    expect(UnitTime[unitTime]).toEqual(UnitTime.d)
  })

  it('should be return hours correctly', () => {
    // arrange
    const shippingEstimate = '2h'

    // act
    const { timeAmount, unitTime } = splitShippingEstimate(shippingEstimate)

    // assert
    expect(timeAmount).toEqual(2)
    expect(UnitTime[unitTime]).toEqual(UnitTime.h)
  })
  it('should be return minutes correctly', () => {
    // arrange
    const shippingEstimate = '30m'

    // act
    const { timeAmount, unitTime } = splitShippingEstimate(shippingEstimate)

    // assert
    expect(timeAmount).toEqual(30)
    expect(UnitTime[unitTime]).toEqual(UnitTime.m)
  })
})

describe('compare', () => {
  it('should be return 1 when the first value is greater', () => {
    // arrange
    const shippingEstimateA = '8bd'
    const shippingEstimateB = '7bd'

    // act
    const result = compare(shippingEstimateA, shippingEstimateB)

    // assert
    expect(result).toEqual(1)
  })

  it('should be return -1 when the first value is smaller', () => {
    // arrange
    const shippingEstimateA = '7bd'
    const shippingEstimateB = '8bd'

    // act
    const result = compare(shippingEstimateA, shippingEstimateB)

    // assert
    expect(result).toEqual(-1)
  })
  it('should be return 0 when two vales are equal', () => {
    // arrange
    const shippingEstimateA = '8bd'
    const shippingEstimateB = '8bd'

    // act
    const result = compare(shippingEstimateA, shippingEstimateB)

    // assert
    expect(result).toEqual(0)
  })

  it('should be return 1 when the first value is a work day', () => {
    // arrange
    const shippingEstimateA = '1bd'
    const shippingEstimateB = '1d'

    // act
    const result = compare(shippingEstimateA, shippingEstimateB)

    // assert
    expect(result).toEqual(1)
  })
  it('should be return 1 when the first value is a day', () => {
    // arrange
    const shippingEstimateA = '1d'
    const shippingEstimateB = '1h'

    // act
    const result = compare(shippingEstimateA, shippingEstimateB)

    // assert
    expect(result).toEqual(1)
  })
  it('should be return 1 when the first value is a hour', () => {
    // arrange
    const shippingEstimateA = '1h'
    const shippingEstimateB = '1m'

    // act
    const result = compare(shippingEstimateA, shippingEstimateB)

    // assert
    expect(result).toEqual(1)
  })
})
