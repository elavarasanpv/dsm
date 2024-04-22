import { isEmpty } from '../../utils/validation'
import {
  FForm,
  FFormItem,
  FInput,
  FButton,
  FSelect,
  FDatePicker,
  FCheckbox,
  FRadioGroup,
  FAttachment,
  FText,
  FContainer,
} from '../../index.js'

export default {
  title: 'Components/Inputs/Form',
  component: FForm,
  argTypes: {
    position: {
      options: ['left', 'top'],
      control: { type: 'radio' },
      defaultValue: 'top',
    },
    validateForm: { type: 'boolean', defaultValue: true },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    FForm,
    FFormItem,
    FInput,
    FButton,
    FSelect,
    FDatePicker,
    FCheckbox,
    FRadioGroup,
    FAttachment,
    FText,
    FContainer,
  },
  data: () => ({
    formModel: {
      name: '',
      number: '',
      date: '',
      isVaccinated: null,
      radio: '',
      file: null,
    },
    formRules: {
      name: {
        trigger: 'blur',
        validator: (value) => {
          if (value === 'test') {
            return {
              errorMessage: 'Please enter anything other than test',
              invalid: true,
            }
          } else if (isEmpty(value)) {
            return {
              errorMessage: 'Please enter your name',
              invalid: true,
            }
          }
        },
      },
      number: { trigger: 'change' },
      date: { trigger: 'change' },
      file: { trigger: 'change' },
    },
  }),
  computed: {
    chtext() {
      return `${10 - this.formModel.name.length} remaining`
    },
  },
  methods: {
    validate() {
      if (this.validateForm) this.$refs['facilio-form'].validate()
    },
  },
  template: ` <div>
      <FForm ref="facilio-form" :model="formModel" :position="position" :rules="formRules">
       <div>
        <FFormItem label="Name" prop="name"><template #header><FContainer display="flex" justifyContent="space-between"><FText appearance="captionReg12" color="textMain">Name</FText><FText appearance="captionReg12" color="textCaption">{{chtext}}</FText></FContainer></template><FInput v-model="formModel.name" :maxlength="10" placeholder="Please enter name" ></FInput></FFormItem>
        </div>
        <br />
        <FFormItem label="Choice" prop="number" >
          <FSelect v-model="formModel.number" placeholder="Select Site" :filterable="true" :options="[
            { label: 'Choice 1', value: 1 },
            { label: 'Choice 2', value: 2 },
            { label: 'Choice 3', value: 3 },
            { label: 'Choice 4', value: 4 },
          ]" />
        </FFormItem>
        <br />
        <FFormItem label="Date of birth" prop="date" >
        <FDatePicker v-model="formModel.date" />
        </FFormItem>
        <br />
        <FFormItem label="Vaccinated" prop="isVaccinated" >
        <FCheckbox v-model="formModel.isVaccinated" />
        </FFormItem>
        <br />
        <FFormItem label="Radio Options" prop="radio" >
        <FRadioGroup v-model="formModel.radio" :options="[
          { label: 'Choice 1', value: 1 },
          { label: 'Choice 2', value: 2 },
          { label: 'Choice 3', value: 3 },
          { label: 'Choice 4', value: 4,disabled:true },
          { label: 'Choice 4', value: 5 },
          { label: 'Choice 4', value: 6 },
          { label: 'Choice 4', value: 7 },
          { label: 'Choice 4', value: 8 },
        ]" />
        </FFormItem>
        <br />
        <FFormItem label="File Attachment" prop="file">
        <FAttachment v-model="formModel.file" />
        </FFormItem>
        <br />
        <FButton @click="validate">Click Me</FButton>
      </FForm>
      </div>
  `,
})

export const Default = Template.bind({})
