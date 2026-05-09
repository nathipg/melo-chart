export const addAllExtraReducers = (builder, slices) => {
  return Object.keys(slices)
    .forEach(key => {
      const { extraReducers = () => null } = slices[key];
      
      extraReducers(builder);
    });
};
