interface ImageData {
    url: string;
  }

async function fetchImage(category: string): Promise<string | null> {
    const apiUrl =
      `https://api.waifu.im/search/?included_tags=${category}&is_nsfw=false`;

    try {
      const fetchData = await fetch(apiUrl)
      const res: { images: ImageData[] } = await fetchData.json();
      const firstImage = res.images[0];
      if (firstImage) {
        const newImageUrl = firstImage.url;
        return newImageUrl;
      } else {
        return null;
      }
    } catch (error) {
      return null
    }
}
 
export default fetchImage