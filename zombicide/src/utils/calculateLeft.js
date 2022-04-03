export const calculateLeft = (tile) => {
  // if (name !== '') {
  const tileElement = document.getElementById(`tile-${tile}`)
  const parentElement = document.getElementById(`tiles`)

  if (parentElement && tileElement) {
    let left = 0

    if (tileElement) {
      left = tileElement.getBoundingClientRect().left
    }

    return left || 0
  } else {
    return 0
  }
}
