export const findByString = (array: string[], searchValue: string) =>
  array.reduce((res: string[], str) => {
    if (str.toLowerCase().includes(searchValue.toLowerCase())) return [...res, str]
    return res
  }, [])
