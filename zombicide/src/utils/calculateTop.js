export const calculateTop = (tile) => {
  const tileElement = document.getElementById(`tile-${tile}`)
  const parentElement = document.getElementById(`tiles`)

  if (parentElement && tileElement) {
    let top = 0

    if (tileElement) {
      top = tileElement.getBoundingClientRect().top
    }

    return top || 0
  } else {
    return 0
  }
}
