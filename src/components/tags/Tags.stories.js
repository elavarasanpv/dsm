import { FTags, FIcon } from '../../index.js'

export default {
  title: 'Components/Display/Tags',
  component: FTags,
  argTypes: {
    appearance: {
      options: ['simple', 'action', 'status', 'accent'],
      control: { type: 'radio' },
      defaultValue: 'simple',
    },
    statusType: {
      options: [
        'default',
        'information',
        'success',
        'danger',
        'warning',
        'neutral',
      ],
      control: { type: 'radio' },
      defaultValue: 'default',
      if: { arg: 'appearance', eq: 'status' },
    },
    disabled: {
      options: [true, false],
      control: { type: 'radio' },
      defaultValue: false,
    },
    isClickable: {
      options: [true, false],
      control: { type: 'radio' },
      defaultValue: true,
    },
    accentColor: {
      options: [
        'blue',
        'green',
        'red',
        'orange',
        'yellow',
        'grey',
        'cyan',
        'violet',
        'purple',
        'pink',
      ],
      control: { type: 'radio' },
      defaultValue: 'grey',
      if: { arg: 'appearance', eq: 'accent' },
    },
    accentLevel: {
      options: ['L1', 'L2', 'L3'],
      control: { type: 'radio' },
      defaultValue: 'L2',
      if: { arg: 'appearance', eq: 'accent' },
    },
    width: {
      control: { type: 'text' },
      defaultValue: '100px',
    },
    actionType: {
      options: ['dropdown', 'removable'],
      control: { type: 'radio' },
      defaultValue: 'removable',
      if: { arg: 'appearance', eq: 'action' },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FTags, FIcon },
  data() {
    return {
      optionsArr: [
        {
          label: 'Volvo',
          value: 'volvo',
        },
        {
          label: 'BMW',
          value: 'bmw',
        },
        {
          label: 'Audi',
          value: 'audi',
        },
        {
          label: 'Fiat',
          value: 'fiat',
        },
      ],
      defaultVal: 'fiat',
      showTag: true,
    }
  },
  computed: {
    tagProps() {
      const { appearance, disabled, isClickable } = this
      const baseProps = {
        appearance,
        disabled,
        isClickable,
      }
      if (appearance === 'simple') {
        const simpleProps = {
          text: 'Tag Label',
        }
        Object.assign(baseProps, simpleProps)
      } else if (appearance === 'action') {
        const actionProps = {
          width: this.width,
          text: 'Tag Label',
          actionType: this.actionType,
        }
        if (this.actionType === 'dropdown') {
          actionProps.selectedOption = this.defaultVal
          actionProps.options = this.optionsArr
        }
        Object.assign(baseProps, actionProps)
      } else if (appearance === 'status') {
        const statusProps = {
          statusType: this.statusType,
          text: 'Status',
        }
        Object.assign(baseProps, statusProps)
      } else if (appearance === 'accent') {
        const accentProps = {
          accentColor: this.accentColor,
          accentLevel: this.accentLevel,
          text: 'Accent',
        }
        Object.assign(baseProps, accentProps)
      }
      return baseProps
    },
  },
  methods: {
    onSuffixClick(ev) {
      console.log('suffix click action', ev)
    },
    tagRemoved() {
      this.showTag = false
    },
  },
  template: `
  <FTags v-if="showTag" v-bind="tagProps" @close="tagRemoved">
  </FTags>
  `,
})

export const Default = Template.bind({})
