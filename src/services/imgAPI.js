import axios from "axios";

export async function api(query, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = '31302238-3bbf3bf14ed620b40113bc545';
  const searchData = new URLSearchParams({
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
  });
  const fetchData = await axios.get(`${BASE_URL}?q=${query}&page=${page}&key=${KEY}&${searchData}`);
  console.log(fetchData.data)
   return fetchData.data;
}


