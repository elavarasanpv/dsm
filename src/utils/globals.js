// import Vue from 'vue'
// const TOLGEE_CONFIG = Symbol.for('@facilio/tolgee')
// export function setVuePrototypeT() {
//   // Check if window[TOLGEE_CONFIG] is present
//   if (window[TOLGEE_CONFIG]) {
//     // If present, set Vue.prototype.$t to Tolgee's translation function
//     Vue.prototype.$t = window[TOLGEE_CONFIG].t
//   } else {
//     // If not present, set Vue.prototype.$t to a function that returns the second argument
//     Vue.prototype.$t = (_, defaultValue) => defaultValue
//   }
// }

const tolgeeMixin = {
  created() {
    const TOLGEE_CONFIG = Symbol.for('@facilio/tolgee')
    if (window[TOLGEE_CONFIG]) {
    } else {
      this.$t = (_, defaultValue) => defaultValue
    }
  },
}

export default tolgeeMixin
