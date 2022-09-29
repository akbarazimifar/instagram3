<template>
  <div v-if="refresher" class="refresher"></div>
  <!-- <div v-else class="loader"></div> -->
  <div v-else class="loading">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  name: 'LoadSpinner',
  props: ['refresher']
}
</script>

<style lang="scss" scoped>
.refresher {
  background: repeating-linear-gradient(
    to left,
    #4f5bd5,
    #7f50c9,
    #9f45b9,
    #b738a6,
    #c82e92,
    #db3582,
    #e94473,
    #f15665,
    #fd785c,
    #ff9a5b,
    #ffbb62,
    #feda75,    
    #feda75,
    #ffbb62,
    #ff9a5b,
    #fd785c,
    #f15665,
    #e94473,
    #db3582,
    #c82e92,
    #b738a6,
    #9f45b9,
    #7f50c9,
    #4f5bd5,
  );
  width: 100%;
  height: 5px;
  background-size: 200% auto;
  background-position: 0 100%;
  animation: gradient linear 1s infinite;
  animation-fill-mode: forwards;
}

@keyframes gradient { 
  0%   { background-position: 0 0; }
  100% { background-position: -200% 0; }
}



.loading span {
  display: inline-block;
  vertical-align: middle;
  width: .6em;
  height: .6em;
  margin: .19em;
  background: #4f5bd5;
  border-radius: .6em;
  animation: loading 0.7s infinite alternate;
}

.loading span:nth-of-type(2) {
  background: #7f50c9;
  animation-delay: 0.2s;
}
.loading span:nth-of-type(3) {
  background: #db3582;
  animation-delay: 0.4s;
}
.loading span:nth-of-type(4) {
  background: #ff9a5b;
  animation-delay: 0.6s;
}
.loading span:nth-of-type(5) {
  background: #feda75;
  animation-delay: 0.8s;
}

@keyframes loading {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}



// .loader {
//   margin: auto;
//   width: 30px;
//   height: 30px;
//   border-radius: 50%;
//   display: inline-block;
//   position: relative;
//   animation: rotation 1s linear infinite;
// }
// .loader::after {
//   content: '';  
//   position: absolute;
//   left: 3px;
//   top: 4px;
//   width: 7px;
//   height: 7px;
//   color: var(--ion-color-light);
//   background: currentColor;
//   border-radius: 50%;
//   box-shadow: 20px 5px, 6px 19px;
// }

// @keyframes rotation {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }  
</style>
