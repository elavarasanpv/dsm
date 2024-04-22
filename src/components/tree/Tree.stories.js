import { FTree, FContainer } from '../../index.js'

export default {
  title: 'Components/Display/Tree',
  component: FTree,
  argTypes: {
    treeData: {
      type: Array,
      default: () => {
        return []
      },
    },
    expandedKeys: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FTree, FContainer },
  template: `<FContainer width="230px"><FTree :treeData="data" :selectedNodeId="ids"   :expandedKeys="expandKey" @expand="expandNode" :getChildren="setUploadTimeout" /></FContainer>`,
  data() {
    return {
      ids: null,
      // data: [
      //   {
      //     title: 'building 1',
      //     id: '1',
      //     value: '1',
      //     icongroup: 'default',
      //     iconname: 'building',
      //     isOpen: false,
      //     isLoading: false,
      //     children: [
      //       {
      //         title: 'floor 1',
      //         isLoading: true,
      //         id: '2',
      //         icongroup: 'default',
      //         isOpen: false,
      //         iconname: 'building',
      //         children: [
      //           {
      //             title: 'space1',
      //             isLoading: false,
      //             isOpen: false,
      //             id: '3',
      //             icongroup: 'default',
      //             iconname: 'building',
      //             isEnd: true,
      //           },
      //           {
      //             title: 'space2',
      //             isLoading: false,
      //             isOpen: false,
      //             id: '4',
      //             icongroup: 'default',
      //             iconname: 'building',
      //             isEnd: true,
      //           },
      //         ],
      //       },
      //       {
      //         title: 'floor 2',
      //         isLoading: false,
      //         isOpen: false,
      //         id: '6',
      //         icongroup: 'default',
      //         iconname: 'building',
      //         children: [
      //           {
      //             title: 'space 6',
      //             isLoading: false,
      //             isOpen: false,
      //             id: '9',
      //             icongroup: 'default',
      //             iconname: 'building',
      //             isEnd: true,
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   {
      //     title: 'building 2',
      //     isLoading: false,
      //     isOpen: false,
      //     id: '10',
      //     icongroup: 'default',
      //     iconname: 'building',
      //     children: [
      //       {
      //         title: 'floor1 1',
      //         isLoading: false,
      //         isOpen: false,
      //         id: '12',
      //         icongroup: 'default',
      //         iconname: 'building',
      //         children: [
      //           {
      //             title: 'space1',
      //             isLoading: false,
      //             isOpen: false,
      //             id: '13',
      //             icongroup: 'default',
      //             iconname: 'building',
      //             isEnd: true,
      //           },
      //           {
      //             title: 'space2',
      //             isLoading: false,
      //             isOpen: false,
      //             id: '14',
      //             icongroup: 'default',
      //             iconname: 'building',
      //             isEnd: true,
      //           },
      //         ],
      //       },
      //       {
      //         title: 'floor1 2',
      //         isLoading: false,
      //         isOpen: false,
      //         id: '16',
      //         icongroup: 'default',
      //         iconname: 'building',
      //         children: [
      //           {
      //             title: 'space 4',
      //             isLoading: false,
      //             isOpen: false,
      //             id: '17',
      //             icongroup: 'default',
      //             iconname: 'building',
      //             isEnd: true,
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ],
      data: [
        {
          title: 'central',
          id: 28,
          isLoading: false,
          moduleName: 'Building',
          isEnd: false,
          isOpen: false,
          icongroup: 'default',
          iconname: 'building',
          children: [],
        },
        {
          title: 'egmore fgghggfn',
          id: 29,
          isLoading: false,
          moduleName: 'Building',
          isEnd: false,
          isOpen: false,
          icongroup: 'default',
          iconname: 'building',
        },
        {
          title: 'tambaram fgtjuylo;',
          id: 30,
          isLoading: false,
          moduleName: 'Building',
          isEnd: false,
          isOpen: false,
          icongroup: 'default',
          iconname: 'building',
          children: [
            {
              title: 'santorium dfhgrhyjyuk',
              id: 36,
              moduleName: 'Floor',
              isEnd: false,
              isOpen: false,
              icongroup: 'default',
              iconname: 'building',
              children: [
                {
                  title: 'santorium train',
                  id: 39,
                  moduleName: 'Space',
                  isEnd: false,
                  isOpen: false,
                  icongroup: 'default',
                  iconname: 'building',
                  children: [
                    {
                      title: 'small town',
                      id: 55,
                      moduleName: 'Space',
                      isEnd: false,
                      isOpen: false,
                      icongroup: 'default',
                      iconname: 'building',
                      children: [
                        {
                          title: 'US town',
                          id: 56,
                          moduleName: 'Space',
                          isEnd: false,
                          isOpen: false,
                          icongroup: 'default',
                          iconname: 'building',
                        },
                        {
                          title: 'UK town',
                          id: 67,
                          moduleName: 'Space',
                          isEnd: false,
                          isOpen: false,
                          icongroup: 'default',
                          iconname: 'building',
                        },
                      ],
                    },
                    {
                      title: 'big town',
                      id: 66,
                      moduleName: 'Space',
                      isEnd: false,
                      isOpen: false,
                      icongroup: 'default',
                      iconname: 'building',
                    },
                  ],
                },
                {
                  title: 'santorium train 2 sdgtjytktkjk',
                  id: 40,
                  moduleName: 'Space',
                  isEnd: false,
                  isOpen: false,
                  icongroup: 'default',
                  iconname: 'building',
                },
              ],
            },
          ],
        },
        {
          title: 'spacw1 hjhjhjhjhjj',
          id: 44,
          isLoading: false,
          moduleName: 'Space',
          isEnd: false,
          isOpen: false,
          icongroup: 'default',
          iconname: 'building',
        },
      ],
      keys: ['1'],
    }
  },
  computed: {
    expandKey() {
      let { keys } = this || {}
      return keys
    },
  },
  mounted() {
    // setTimeout(() => {
    //   this.ids = 67
    // }, 5000)
  },
  methods: {
    expandNode(id) {
      this.keys = id
      console.log(id)
    },
    async setUploadTimeout(val) {
      console.log(val)
      await new Promise((resolve) => {
        setTimeout(() => {
          if (val.title === 'central') {
            this.data[0].children = [
              {
                title: 'park jhgfyufig',
                id: 33,
                moduleName: 'Floor',
                isEnd: false,
                isOpen: false,
                icongroup: 'default',
                iconname: 'building',
                children: [
                  {
                    title: 'park train 1',
                    id: 37,
                    moduleName: 'Space',
                    isEnd: false,
                    isOpen: false,
                    icongroup: 'default',
                    iconname: 'building',
                  },
                  {
                    title: 'park train 2',
                    id: 38,
                    moduleName: 'Space',
                    isEnd: false,
                    isOpen: false,
                    icongroup: 'default',
                    iconname: 'building',
                  },
                ],
              },
            ]
          }
          resolve()
        }, 1000)
      })
      return true
    },
  },
})

export const Default = Template.bind({})
