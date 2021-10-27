export const useRuntime = jest.fn().mockImplementation(() => {
  return {
    culture: {
      country: 'BR',
    },
  }
})
