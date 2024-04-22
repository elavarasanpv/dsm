import {
  FAccordion,
  FAccordionItem,
  FTooltip,
  FText,
  FContainer,
} from '../../index.js'

export default {
  title: 'Components/Surfaces/Accordion',
  component: FAccordion,
  parameters: {
    docs: {
      description: {
        component:
          'The accordion component allows the user to show and hide sections of related content on a page. To compose an accordian use `FAccordion` with `FAccordionItem` as a child of it.',
      },
    },
  },
  argTypes: {
    disabled: {
      type: 'boolean',
      defaultValue: false,
    },
    header: {
      table: {
        category: 'Slots (Accordian Item)',
      },
      description: 'Use for overriding the accordian header',
    },
    prefix: {
      table: {
        category: 'Slots (Accordian Item)',
      },
      description:
        'Can be used to display or overrided chevron icon in the accordian header',
    },
    panel: {
      table: {
        category: 'Slots (Accordian Item)',
      },
      description: 'This slot can be used to display the accordian content',
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FAccordion, FAccordionItem, FTooltip, FText, FContainer },
  template: `
  <div>
  <FAccordion>
    <FAccordionItem :disabled="disabled">
      <template #header><FText> Accordion 1</FText></template>
      <template #prefix="{open}">
        <fc-icon
          group="navigation"
          :name="open ? 'accordion-down' : 'accordion-right'"
          :size="16"
        ></fc-icon>
      </template>
      <template #panel><FContainer margin="containerLarge containerXxLarge"><FText>This is a sample accordian text</FText></FContainer></template>
    </FAccordionItem>
    <FAccordionItem :disabled="disabled">
      <template #header><FText> Accordion 2</FText></template>
      <template #prefix="{open}">
      <fc-icon
        group="navigation"
        :name="open ? 'accordion-down' : 'accordion-right'"
        :size="16"
      ></fc-icon>
      </template>
      <template #panel><FContainer margin="containerLarge containerXxLarge"><FText>This is a sample accordian text</FText></FContainer></template>
    </FAccordionItem>
  </FAccordion>
</div>

  `,
  methods: {
    click() {
      console.log('clicked')
    },
  },
})

export const Default = Template.bind({})
