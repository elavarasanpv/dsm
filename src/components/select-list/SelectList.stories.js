import { FSelectList } from '../../index.js'

export default {
  title: 'Components/Inputs/SelectList',
  component: FSelectList,
  argTypes: {
    appearance: {
      options: ['default', 'minimal'],
      control: { type: 'radio' },
      defaultValue: 'default',
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
      defaultValue: 'medium',
    },
    multiple: { type: 'boolean', defaultValue: false },
    placeholder: { type: 'text', defaultValue: 'Select' },
    disabled: { type: 'boolean', defaultValue: false },
    filterable: { type: 'boolean', defaultValue: true },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FSelectList },
  data: () => ({
    val: '',
    optionsArray: [
      {
        label: 'Choice 1',
        value: 1,
      },
      { label: 'Choice 2', value: 2 },
      { label: 'Choice 3', value: 3 },
      { label: 'Choice 4', value: 4 },
      { label: 'Choice 5', value: 5 },
      { label: 'Choice 6', value: 6 },
      { label: 'Choice 7', value: 7 },
      {
        label: 'Choice 1',
        value: 1,
      },
      { label: 'Choice 2', value: 8 },
      { label: 'Choice 3', value: 9 },
      { label: 'Choice 4', value: 10 },
      { label: 'Choice 5', value: 11 },
      { label: 'Choice 6', value: 12 },
      { label: 'Choice 7', value: 13 },
      {
        label: 'Choice 1',
        value: 14,
      },
      { label: 'Choice 2', value: 15 },
      { label: 'Choice 3', value: 16 },
      { label: 'Choice 4', value: 17 },
      { label: 'Choice 5', value: 18 },
      { label: 'Choice 6', value: 19 },
      { label: 'Choice 7', value: 20 },
    ],
    isLoading: false,
  }),
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
   <div style="height:600px;border:1px solid">
  <FSelectList
    v-model="val"
    :remoteMethod="remote"
    :disabled="disabled"
    :filterable="true"
    :placeholder="placeholder"
    :options="optionsArray"
    :loading="isLoading"
    :loadingText="loadingText"
    :appearance="appearance"
    :size="size"
    :multiple="true"
  >
  <template #clickable>Samps</template>
  </FSelectList>
  </div>
  `,
})

const Template2 = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FSelectList },
  data: () => ({
    val: null,
    optionsArray: [
      {
        label: 'Choice 1',
        value: 1,
      },
      { label: 'Choice 2', value: 2 },
      { label: 'Choice 3', value: 3 },
      { label: 'Choice 4', value: 4 },
      { label: 'Choice 5', value: 5 },
      { label: 'Choice 6', value: 6 },
      { label: 'Choice 7', value: 7 },
      {
        label: 'Choice 1',
        value: 1,
      },
      { label: 'Choice 2', value: 8 },
      { label: 'Choice 3', value: 9 },
      { label: 'Choice 4', value: 10 },
      { label: 'Choice 5', value: 11 },
      { label: 'Choice 6', value: 12 },
      { label: 'Choice 7', value: 13 },
      {
        label: 'Choice 1',
        value: 14,
      },
      { label: 'Choice 2', value: 15 },
      { label: 'Choice 3', value: 16 },
      { label: 'Choice 4', value: 17 },
      { label: 'Choice 5', value: 18 },
      { label: 'Choice 6', value: 19 },
      { label: 'Choice 7', value: 20 },
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
  <FSelectList
    v-model="val"
    :multiple="false"
    :disabled="disabled"
    :filterable="true"
    :placeholder="placeholder"
    :options="optionsArray"
    :loading="isLoading"
    :loadingText="loadingText"
    :allowCreate="true"
    :addOptionLoading="addLoading"
    :appearance="appearance"
    :size="size"
    @addOption="optionAdd"
  >
  </FSelectList>
  `,
})

export const Default = Template.bind({})
export const WithoutRemoteFilter = Template2.bind({})
