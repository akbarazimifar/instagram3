import { Preferences } from '@capacitor/preferences';
import axios from 'axios';

let config = {
  headers: {}
}

const posts = {
  async create(formData) {
    const ret = await Preferences.get({ key: 'token' });
    config.headers.authorization = 'Bearer ' + JSON.parse(ret.value);
    const res = await axios.post(`${process.env.VUE_APP_API_URL}/posts`, formData, config);
    return res;
  }
}

export default posts;

