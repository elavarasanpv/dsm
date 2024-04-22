import { FWeatherWidget, FContainer } from '../../index.js'

export default {
  title: 'Components/Widgets/WeatherWidget',
  component: FWeatherWidget,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
      defaultValue: 'medium',
    },
    title: {
      control: 'text',
      defaultValue:
        'DSM provides plenty of UI components to enrich your web applications',
    },
    description: {
      control: 'text',
      defaultValue: 'This is a sample description ',
    },
    moreDetails: {
      type: 'boolean',
      default: false,
    },
    showRightIcon: {
      type: 'boolean',
      default: false,
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FWeatherWidget, FContainer },
  data: () => ({
    weather: {
      time: '12:00 pm',
      temperature: '23',
      unit: 'C',
      icon: 4,
      location: 'Switzerland',
    },
  }),
  template: `<FContainer width="356px"><FWeatherWidget :size="size" :currentWeatherData="weather"/></FContainer>`,
})

export const Default = Template.bind({})
