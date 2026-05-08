interface ImageData {
    url: string;
  }
type bgType = 'sfw' | 'nsfw';

async function fetchImage(category: string, bgType: bgType): Promise<string | null> {
    const apiUrl =
      `https://api.waifu.im/images?IncludedTags=${category}&IsNsfw=${bgType == "nsfw" ? "True" : "False"}`;

    try {
      const fetchData = await fetch(apiUrl)
      const res: { items: ImageData[] } = await fetchData.json();
      const firstImage = res.items[0];
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