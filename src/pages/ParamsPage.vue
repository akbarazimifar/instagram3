<template>
  <base-layout :header="true" :previous="true" :navbar="true">
    <div class="params">
      <div v-for="param in params" :key="param" @click="$router.push({name: param[2]})">
        <ion-icon :name="param[0]"></ion-icon>
        <p>{{ param[1] }}</p>
      </div>
    </div>
  </base-layout>
</template>

<script>
import { IonIcon } from '@ionic/vue';
export default {
  name: 'ParamsPage',
  components: {
    IonIcon
  },
  data() {
    return {
      params: [
        ["shield-checkmark-outline", "Confidentialité et sécurité", "CGU"],
        ["key-outline", "Modifier le mot de passe", "Password"],
        ["help-buoy-outline", "Aide et informations", "Help"]
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
.params {
  width: 100%;
  padding: 0 20px;
  div {
    width: 100%;
    margin: 20px 0;
    display: flex;
    align-items: center;
    ion-icon {
      margin: 0 8px 0 0;
    }
  }
}
</style>