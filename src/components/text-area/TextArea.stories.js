import { FTextArea } from '../../index.js'

export default {
  title: 'Components/Inputs/TextArea',
  component: FTextArea,
  argTypes: {
    placeholder: { control: 'text', defaultValue: 'Enter a name' },
    disabled: { type: 'boolean' },
    rows: { type: 'number', defaultValue: 4 },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FTextArea },
  data: () => ({ val: '' }),
  methods: {
    changeInput() {
      console.log('changed')
    },
  },
  template: `<FTextArea @change="changeInput" v-model="val" :rows="rows"  :placeholder="placeholder" :disabled="disabled" ></FTextArea>`,
})

const Template2 = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FTextArea },
  template: `<FTextArea :placeholder="placeholder" :disabled="true" ><template #suffix>Suf</template><template #prefix>Pre</template></FTextArea>`,
})

export const Default = Template.bind({})

export const WithPrefixAndSuffix = Template2.bind({})
