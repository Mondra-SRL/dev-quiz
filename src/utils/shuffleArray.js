// shuffle an array to randomize question and answer order
export function shuffleArray(items = []) {
  // copy input first 
  const shuffled = [...items];
  // then loop i backwards from shuffled.length - 1 down to 1 
  for (let i = shuffled.length - 1; i > 0; i--) {
    // get a random index j in [0, 1]
    const j = Math.floor(Math.random() * (i + 1));
    // swap shuffled[i] with shuffled[j]
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
