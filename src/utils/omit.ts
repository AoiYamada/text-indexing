// Reference: https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
const omit = <K extends string[], T extends {}>(keys: K, obj: T) =>
  Object.keys(obj)
    .filter((key) => !keys.includes(key))
    .reduce((acc, key) => {
      acc[key as keyof Omit<T, keyof K>] = obj[key as keyof Omit<T, keyof K>];

      return acc;
    }, {} as Omit<T, keyof K>);

export default omit;
