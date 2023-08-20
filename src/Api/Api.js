import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api'
export const feachPictures = async params => {
  try {
    const { data } = await axios.get('/', {
      params: {
        key: '38243208-1c51fba615c3da50a804f6e01',
        image_type: 'photo',
        orientation: 'horizontal',
        ...params,
      },
    });
    return data
  } catch {}
}