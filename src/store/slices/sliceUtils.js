export const allAllExtraReducers = (builder, slices) => {
  return Object.keys(slices)
    .forEach(key => {
      const { extraReducers = () => null } = slices[key];
      
      extraReducers(builder);
    });
};

export const buildSlicePart = (slices, slicePart) => {
  return Object.keys(slices)
    .map(key => slices[key][slicePart])
    .reduce((acc, cur) => ({ ...acc, ...cur }), {});
};
