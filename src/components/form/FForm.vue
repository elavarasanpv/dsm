<script>
import { eventBus } from '../../utils/event-bus'
import { isEmpty } from '../../utils/validation'

export default {
  name: 'FForm',
  provide() {
    return {
      model: () => {
        return this.model
      },
      position: this.position,
      rules: this.rules,
      eventBus: eventBus,
      uniqueKey: this.uniqueKey,
    }
  },
  props: {
    model: {
      type: Object,
      default: () => {},
    },
    position: {
      type: String,
      default: 'top',
      validator: (value) => {
        return ['top', 'left'].includes(value)
      },
    },
    rules: {
      type: Object,
      default: () => {},
    },
    uniqueId: {
      type: [Number, String],
      default: '',
    },
  },
  data: () => ({ isInvalid: false, errorList: [] }),
  computed: {
    uniqueKey() {
      let { uniqueId } = this || {}
      return `${!isEmpty(uniqueId) ? '-' : ''}${uniqueId || ''}`
    },
  },
  mounted() {
    let { uniqueKey } = this || {}
    eventBus.$on(`throw-form-invalid${uniqueKey}`, (props) => {
      let { errorList } = this || {}
      let { invalid, prop } = props || {}
      if (invalid) {
        if (!errorList.includes(prop)) this.errorList = [...errorList, prop]
      } else {
        this.errorList = errorList.filter((name) => name !== prop)
      }
      this.isInvalid = invalid
    })
  },
  methods: {
    children() {
      let { $slots } = this || {}
      let { default: defaultChild } = $slots || {}
      return defaultChild
    },
    validate(formObj) {
      let fieldsHash = {}
      if (!isEmpty(formObj)) {
        let { sections } = formObj || {}
        sections.forEach((section) => {
          let { fields } = section || {}
          fields.forEach((field) => {
            let { name } = field || {}
            fieldsHash[name] = field
          })
        })
      }
      let { model, uniqueKey } = this || {}
      this.isInvalid = false
      Object.keys(model).forEach((key) => {
        let canCheck = true
        if (!isEmpty(fieldsHash)) {
          let { [key]: fieldObj } = fieldsHash || {}
          if (!isEmpty(fieldObj)) {
            let { required } = fieldObj || {}
            canCheck = required
          }
        }
        if (canCheck) {
          let msg = `form-invalid-${key}${uniqueKey}`
          eventBus.$emit(msg, { triggerType: 'form' })
        }
      })
      return isEmpty(this.errorList)
    },
    getErrorList() {
      let { model, errorList } = this || {}
      let fields = Object.keys(model)
      return fields.filter((fieldName) => errorList.includes(fieldName))
    },
  },
  render() {
    return <div>{this.children()}</div>
  },
}
</script>

<style scoped></style>
