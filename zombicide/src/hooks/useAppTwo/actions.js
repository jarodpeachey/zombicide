// export const updated = (payload: any) => {
//   return {
//     type: "updated",
//     payload,
//   };
// };

export const initializeTiles = (payload) => {
  console.log('initializingTiles: ', payload)
  return {
    type: 'initialize_tiles',
    payload,
  }
}
