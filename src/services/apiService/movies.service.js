const INITIAL_REQUEST_URL = process.env.REACT_APP_MOVIE_DB_URL;
export const IMAGE_URL = process.env.REACT_APP_IMAGE_URL;
const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;

export const API_URL = async (type, page) => {
  const response = await fetch(
    `${INITIAL_REQUEST_URL}/movie/${type}?api_key=${API_KEY}&language=en-US&page=${page}`
  );
  return response;
};

export const fallbackImagesFirstLoaded = [
  'https://image.tmdb.org/t/p/original//pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg',
  'https://image.tmdb.org/t/p/original//8yhtzsbBExY8mUct2GOk4LDDuGH.jpg',
  'https://image.tmdb.org/t/p/original//9kg73Mg8WJKlB9Y2SAJzeDKAnuB.jpg',
  'https://image.tmdb.org/t/p/original//29dCusd9PwHrbDqzxNG35WcpZpS.jpg',
  'https://image.tmdb.org/t/p/original//6KErczPBROQty7QoIsaa6wJYXZi.jpg',
  'https://image.tmdb.org/t/p/original//b4gYVcl8pParX8AjkN90iQrWrWO.jpg',
  'https://image.tmdb.org/t/p/original//oBgWY00bEFeZ9N25wWVyuQddbAo.jpg',
  'https://image.tmdb.org/t/p/original//zoeKREZ2IdAUnXISYCS0E6H5BVh.jpg',
  'https://image.tmdb.org/t/p/original//4ZSzEDVdxWVMVO4oZDvoodQOEfr.jpg',
  'https://image.tmdb.org/t/p/original//qfLpiXGV93x8EnZIjmuyO6qXBMx.jpg',
  'https://image.tmdb.org/t/p/original//1rlgIzw129hEl46bFaJZ7wpEEZZ.jpg',
  'https://image.tmdb.org/t/p/original//8mcXb3km7hZ8aJKpxxgnvvxt9gW.jpg',
  'https://image.tmdb.org/t/p/original//66GUmWpTHgAjyp4aBSXy63PZTiC.jpg',
  'https://image.tmdb.org/t/p/original//7S9RvfMBWSTlUZ4VbxDY7oLeenk.jpg',
  'https://image.tmdb.org/t/p/original//t7EUMSlfUN3jUSZUJOLURAzJzZs.jpg',
  'https://image.tmdb.org/t/p/original//svHelD0Hb3TXPAQoPsoBwdDMTvf.jpg',
  'https://image.tmdb.org/t/p/original//zFIjKtZrzhmc7HecdFXXjsLR2Ig.jpg',
  'https://image.tmdb.org/t/p/original//uxWXW1YYQENSv7OzHB4Hds0bK3b.jpg',
  'https://image.tmdb.org/t/p/original//cjzU4g6SlScnP4MdkleyI25KGlR.jpg',
  'https://image.tmdb.org/t/p/original//iIgr75GoqFxe1X5Wz9siOODGe9u.jpg'
];
