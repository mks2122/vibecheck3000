// utils/getMemeFromGiphy.ts
export async function getMemeFromGiphy(searchQuery: string): Promise<string | null> {
  const apiKey = process.env.GIPHY_API_KEY; // Store this in your .env file
  const limit = 25; // Fetch more results to have better random selection

  try {
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(
        searchQuery
      )}&limit=${limit}&rating=g`
    );

    const json = await res.json();

    if (json.data && json.data.length > 0) {
      const randomIndex = Math.floor(Math.random() * json.data.length);
      return json.data[randomIndex].images.original.url;
    }

    return null;
  } catch (error) {
    console.error('Error fetching meme from Giphy:', error);
    return null;
  }
}
