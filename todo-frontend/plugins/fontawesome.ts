import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus, faList, faCircle, faCheckCircle, faTrash, faCheck, faRotateLeft} from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faList, faCircle, faCheckCircle, faTrash, faCheck, faRotateLeft)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
})
