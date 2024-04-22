import { FRow, FCol } from '../../index.js'

export default {
  title: 'Components/Surfaces/Layout',
  component: FRow,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FRow, FCol },
  template: `
  <div>
    <div>FRow</div>
    <FRow>
      <FCol v-for="count in 2" :key="count" :span="6">
        <div
          style="
            background-color: #a8d9ff;
            padding: 10px 10px;
            border-radius: 5px;
            height: 50px;
            display:flex;
            align-items: center;
          "
        >
          FCol Span: 6
        </div>
      </FCol>
    </FRow>
    <FRow style="margin-top: 10px;">
      <FCol :span="4">
        <div
          style="
            background-color: #a8d9ff;
            padding: 10px 10px;
            border-radius: 5px;
            height: 50px;
            display:flex;
            align-items: center;
          "
        >
          FCol Span: 3
        </div>
      </FCol>
      <FCol :span="3">
        <div
          style="
            background-color: #a8d9ff;
            padding: 10px 10px;
            border-radius: 5px;
            height: 50px;
            display:flex;
            align-items: center;
          "
        >
          FCol Span: 3
        </div>
      </FCol>
      <FCol :span="5">
        <div
          style="
            background-color: #a8d9ff;
            padding: 10px 10px;
            border-radius: 5px;
            height: 50px;
            display:flex;
            align-items: center;
          "
        >
          FCol Span: 6
        </div>
      </FCol>
    </FRow>
  </div>`,
})

export const Default = Template.bind({})
