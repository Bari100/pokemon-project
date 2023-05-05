export const findByString = (array: string[], searchValue: string) =>
  array.reduce((res: string[], str) => {
    if (str.includes(searchValue)) return [...res, str]
    return res
  }, [])
