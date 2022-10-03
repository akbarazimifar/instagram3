import { Preferences } from '@capacitor/preferences';
import axios from 'axios';

let config = {
  headers: {}
}

const users = {
  async login(data) {
    const res = await axios.post(`${process.env.VUE_APP_API_URL}/auth/login`, data);
    if (res.status == 200) {
      delete res.data.user.password;
      await Preferences.set({
        key: 'user',
        value: JSON.stringify(res.data.user),
      });
      await Preferences.set({
        key: 'token',
        value: JSON.stringify(res.data.token),
      }); 
    } else {
      return res.data;
    }
  },

  async register(data) {
    const res = await axios.post(`${process.env.VUE_APP_API_URL}/auth/register`, data);
    if (res.status == 201) {
      delete res.data.user.password;
      await Preferences.set({
        key: 'user',
        value: JSON.stringify(res.data.user),
      });
      await Preferences.set({
        key: 'token',
        value: JSON.stringify(res.data.token),
      }); 
    } else {
      return res.data;
    }
  },

  async editProfile(data) {
    const ret = await Preferences.get({ key: 'token' });
    config.headers.authorization = 'Bearer ' + JSON.parse(ret.value);
    const res = await axios.put(`${process.env.VUE_APP_API_URL}/users/edit`, data, config);
    if (res.status == 201) {
      await Preferences.set({
        key: 'user',
        value: JSON.stringify(data),
      });
    }
    return res;
  },

  async editPassword(data) {
    const ret = await Preferences.get({ key: 'token' });
    config.headers.authorization = 'Bearer ' + JSON.parse(ret.value);
    const res = await axios.put(`${process.env.VUE_APP_API_URL}/users/password`, data, config);
    return res;
  },

  async profilePicture(data) {
    let ret = await Preferences.get({ key: 'token' });
    config.headers.authorization = 'Bearer ' + JSON.parse(ret.value);
    const res = await axios.post(`${process.env.VUE_APP_API_URL}/images`, data.image);
    if (res.status == 201) {
      ret = await Preferences.get({ key: 'user' });
      let user = JSON.parse(ret.value);
      const image = user.id + data.type.replace('image/', '.');
      user.profile_picture = String(image);
      await Preferences.set({
        key: 'user',
        value: JSON.stringify(user),
      });
      return res.status;
    }
  }
}

export default users;