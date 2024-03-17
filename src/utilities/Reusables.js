export const removeObjectWithId = (arr, id) => {
    return arr.filter((obj) => obj._id !== id);
  };