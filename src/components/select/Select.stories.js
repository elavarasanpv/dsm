import { FSelect } from '../../index.js'

export default {
  title: 'Components/Inputs/Select',
  component: FSelect,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
      defaultValue: 'medium',
    },
    multiple: { type: 'boolean', defaultValue: true },
    placeholder: { type: 'text', defaultValue: 'Select' },
    disabled: { type: 'boolean', defaultValue: false },
    filterable: { type: 'boolean', defaultValue: true },
    showAppend: { type: 'boolean', defaultValue: false },
    showPrepend: { type: 'boolean', defaultValue: false },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FSelect },
  data: () => ({
    val: '',
    optionsArray: [
      {
        label: 'Choice 1Lorem ipsum dolor sit amet',
        value: 1,
        unselectable: false,
      },
      { label: '\r\n\t Choice 2', value: 2 },
      { label: 'Choice 3', value: 3 },
      { label: 'Choice 4', value: 4, unselectable: true },
      { label: 'Choice 2', value: 5 },
      { label: 'Choice 3', value: 6, unselectable: true },
      { label: 'Choice 4', value: 7 },
    ],
    prependDetail: {
      text: 'Meter',
      name: 'info',
      group: 'action',
      chevron: true,
    },
    appendDetail: {
      text: 'kWh',
      disable: true,
    },
    isLoading: false,
    dropdownVisibl: false,
    dro: false,
  }),
  mounted() {
    setTimeout(() => {
      this.dropdownVisibl = false
      console.log(this.dropdownVisibl, 'this.dropdownVisibl')
    }, 5000)
  },
  methods: {
    async remote(text, options) {
      let { optionsArray } = this || {}
      options = options || optionsArray
      this.isLoading = true
      let optionsList = await new Promise((resolve) => {
        setTimeout(() => {
          let modifiedOptions = options.filter((option) =>
            option.label.toLowerCase().includes(text.toLowerCase())
          )
          resolve(modifiedOptions)
        }, 1000)
      })
      this.isLoading = false
      return optionsList
    },
  },
  template: `

   
   <FSelect
     v-model="val"
     :remoteMethod="remote"
     :disabled="disabled"
     :filterable="filterable"
     :placeholder="placeholder"
     :options="optionsArray"
     :loadingText="loadingText"
     :size="size"
     :multiple="multiple"
     :showAppend="showAppend"
     :showPrepend="showPrepend"
     :prependDetails="prependDetail"
      :appendDetails="appendDetail"
      :openPrepend.sync="dropdownVisibl"
      :openAppend.sync="dro"
   >
   <template #clickable>Samps</template><template #prepend>select meter</template>
   </FSelect>

  `,
})

const Template2 = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FSelect },
  data: () => ({
    val: null,
    optionsArray: [
      { label: 'Jim', value: 1, iconGroup: 'dsm', iconName: 'info' },
      { label: 'Ninja', value: 2 },
      {
        label: 'Manager',
        options: [
          {
            value: 'jack',
            label: 'Jack',
            iconGroup: 'dsm',
            iconName: 'upload',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
        ],
      },
      {
        label: 'Engineer',
        options: [
          {
            value: 'yiminghe',
            label: 'Yiminghe',
          },
        ],
      },
      { label: 'Bheem', value: 3 },
      { label: 'Choice 4', value: 4 },
    ],
    isLoading: false,
    addLoading: false,
  }),
  methods: {
    async optionAdd(value) {
      let { multiple } = this || {}
      this.addLoading = true
      let { optionsArray } = this || {}
      let newOption = {
        label: value,
        value: optionsArray.length + 1,
      }
      if (multiple) {
        if (Array.isArray(this.val)) this.val.push(optionsArray.length + 1)
        else this.val = [optionsArray.length + 1]
      } else {
        this.val = optionsArray.length + 1
      }
      this.optionsArray.push(newOption)
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 4000)
      })
      this.addLoading = false
    },
  },
  template: `
  <FSelect
    v-model="val"
    :multiple="multiple"
    :disabled="disabled"
    :filterable="filterable"
    :placeholder="placeholder"
    :options="optionsArray"
    :loading="isLoading"
    :loadingText="loadingText"
    :allowCreate="true"
    :addOptionLoading="addLoading"
    :size="size"
    @addOption="optionAdd"
  >
  </FSelect>
  `,
})

export const Default = Template.bind({})
export const WithoutRemoteFilter = Template2.bind({})
