import { FReadingCard, FIcon } from '../../index.js'

export default {
  title: 'Components/Display/ReadingCard',
  component: FReadingCard,
  argTypes: {},
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FReadingCard, FIcon },
  template: `
  <div>
 

 

 
 
  <FReadingCard type="icon"  helpText="hello\n facilio" :timelineFilter="timeline" :banner="bannerObj" :editDisabled="true" :data="readingData" :heading="cardHeading"  helpText="hello card">
  <template #actions>
    <FIcon
            group="action"
            name="options-horizontal"
            size="16"
            pressable={true}
          />
  </template>
  </FReadingCard>

  <div style="width:760px;border:1px solid black"><FReadingCard :editDisabled="true"   type="noTag"  :timelineFilter="''" :data="testData" heading="check"  helpText="hello card">
  <template #actions>
    <div style="display:block">
      <FIcon
              group="action"
              name="options-horizontal"
              size="16"
              pressable={true}
            />
    </div>
  </template>
  </FReadingCard>
  
  </div>
  
 <br/>
  <div style="width:400px;border:1px solid black"><FReadingCard :editDisabled="true"   type="noTag"  :timelineFilter="''" :data="testData2" heading="check" helpText="hello\n card, im from \n india and youre from \n">
  
    <template #actions>
    <div style="display:none">
      <FIcon
              group="action"
              name="options-horizontal"
              size="16"
              pressable={true}
            />
    </div>
  </template>
  </FReadingCard>
  
  </div>
    <div style="width:400px;border:1px solid black"><FReadingCard :editDisabled="true"   type="noTag"  :timelineFilter="''" :data="testData4" heading="check" helpText="hello\n card, im from \n india and youre from \n">
  
    <template #actions>
    <div style="display:none">
      <FIcon
              group="action"
              name="options-horizontal"
              size="16"
              pressable={true}
            />
    </div>
  </template>
  </FReadingCard>
  
  </div>
    <div style="width:400px;border:1px solid black"><FReadingCard :editDisabled="true"   type="noTag"  :timelineFilter="''" :data="testData5" heading="check" helpText="hello\n card, im from \n india and youre from \n">
  
    <template #actions>
    <div style="display:none">
      <FIcon
              group="action"
              name="options-horizontal"
              size="16"
              pressable={true}
            />
    </div>
  </template>
  </FReadingCard>
  
  </div>
      <div style="width:400px;border:1px solid black"><FReadingCard :editDisabled="true"   type="noTag"  :timelineFilter="''" :data="testData6" heading="check" helpText="hello\n card, im from \n india and youre from \n">
  
    <template #actions>
    <div style="display:none">
      <FIcon
              group="action"
              name="options-horizontal"
              size="16"
              pressable={true}
            />
    </div>
  </template>
  </FReadingCard>
  
  </div>
    </div>
  
 
  </div>
  
  
  
  `,
  data() {
    return {
      bannerObj: { color: '#51049F' },
      testData5: [
        {
          heading: 'heading 1',

          reading: '2',
          styles: {
            displayValue: '',
            backgroundColor: '#f87171',
            blink: false,
          },
        },
      ],
      testData6: [
        {
          heading: 'heading 1',
          timeline: 'This Year',
          reading: '2',
          styles: {
            displayValue: '',
            backgroundColor: '#f87171',
            blink: false,
          },
        },
      ],
      testData2: [
        {
          heading: 'heading 1',
          reading: '29923442432423442342349.8118',
          timeline: 'This Year',
          unit: 'XXXXX/ft2',
          isLeft: true,
          styles: {
            displayValue: '',
            backgroundColor: '#f87171',

            blink: false,
          },
        },
      ],
      testData4: [
        {
          heading:
            'heading heading heading heading heading heading heading heading heading heading 1',
          reading: '233414413224231421421.8118',
          // timeline: 'This Year',
          unit: 'XXXXX/ft2',
          isLeft: true,
          styles: {
            displayValue: '',
            backgroundColor: '#f87171',

            blink: false,
          },
        },
      ],
      testData: [
        {
          heading: 'heading he',
          reading: '8332344535523241999',
          timeline: '30-NOV-2023 TO 30-DEC-2023',
          unit: 'XXXXX/ft2',
          isLeft: true,
          baseline: {
            period: 'this year',
            value: 238218306.87,
            percentage: '1600%',
            status: 'success',
          },
          styles: {
            displayValue: '',
            backgroundColor: '#f87171',

            blink: false,
          },
        },
        {
          heading: 'heading 1',
          reading: '27.33412431424',
          timeline: 'This Year',
          unit: 'XXXXX/ft2',
          // baseline: {
          //   period: 'this year',
          //   value: 238218306.87,
          //   percentage: '98.84%',
          //   status: 'success',
          // },
        },
        {
          heading: 'heading 1',
          reading: '27',
        },
        // {
        //   heading: 'heading 1',
        //   reading: '276278799999999.8118',
        //   timeline: 'This Year',
        //   unit: 'XXXXX/ft2',
        //   baseline: {
        //     period: 'this year',
        //     value: 238218306.87,
        //     percentage: '98.84%',
        //     status: 'success',
        //   },
        // },
        // {
        //   heading: 'heading 2',
        //   reading: '250',
        //   timeline: 'Last Year',
        //   unit: 'kWH',
        //   baseline: {
        //     period: 'this year',
        //     value: 100,
        //     percentage: '150%',
        //     status: 'danger',
        //   },
        // },
      ],
      cardHeading: 'Reading Card Heading',
      timeline: 'This month',
      cardStatusTag: {
        text: '10%',
        statusType: 'success',
      },
      cardBenchmark: {
        reading: 'Reading',
        timeline: 'This Year',
      },
      readingData: [
        {
          heading: 'heading 1',
          reading: 'Reading',
          timeline: 'This Year',
          unit: 'kWH',
          styles: {
            displayValue: '',
            backgroundColor: '#f87171',

            blink: true,
            unitConfig: {
              position: 2,
            },

            decimalPlace: -1,
          },
        },
        {
          heading: 'heading 2',
          reading: 'Reading',
          timeline: 'This Year',
          unit: 'kWH',
        },
        {
          heading: 'heading 3',
          reading: 'Reading',
          timeline: 'This Year',
          unit: 'kWH',
        },
      ],
    }
  },
})

export const Default = Template.bind({})
