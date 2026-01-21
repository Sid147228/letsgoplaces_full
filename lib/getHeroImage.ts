export async function getHeroImage(destination: string) {
  const url = `https://source.unsplash.com/1600x900/?${encodeURIComponent(
    destination + " travel"
  )}`;

  return url; // Unsplash random image endpoint
}
