export const initializeTiles = (payload) => {
  console.log("initializingTiles: ", payload);
	return {
		type: "tiles.initialize",
		payload,
	}
}
