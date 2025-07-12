export const buildSlicePart = (slices, slicePart) => {
  return Object.keys(slices)
    .map(key => slices[key][slicePart])
    .reduce((acc, cur) => ({ ...acc, ...cur }), {});
};
