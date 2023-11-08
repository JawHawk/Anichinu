interface ImageData {
    url: string;
  }
type bgType = 'sfw' | 'nsfw';

async function fetchImage(category: string, bgType: bgType): Promise<string | null> {
    const apiUrl =
      `https://api.waifu.im/search/?included_tags=${category}&is_nsfw=${bgType == "nsfw" ? "true" : "false"}`;

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