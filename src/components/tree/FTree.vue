<script>
import ThemeMixin from '../../theme-helpers/ThemeMixin.vue'
import styled from 'vue-emotion'
import { FContainer, FText, FIcon, FSpinner } from '../../index'
import { isEmpty } from '../../utils/validation'
export default {
  name: 'FTree',
  mixins: [ThemeMixin],
  props: {
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
    getChildren: {
      type: Function,
      default: () => {},
    },
    showIcon: {
      type: Boolean,
      default: true,
    },
    showSwitcherIcon: {
      type: Boolean,
      default: true,
    },
    selectedNodeId: {
      type: undefined,
      default: '',
    },
    textWrap: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isOpen: false,
      activeNode: null,
      searching: {},
      selectedNodes: [],
      currentOpenNode: '',
    }
  },
  computed: {
    isRTL() {
      const body = document.body
      const direction = window
        .getComputedStyle(body)
        .getPropertyValue('direction')
      return direction === 'rtl'
    },
  },
  watch: {
    selectedNodeId(newVal, oldVal) {
      if (!isEmpty(newVal) && oldVal !== newVal) {
        this.defaultSelectNode()
      }
    },
  },
  created() {
    if (!isEmpty(this.selectedNodeId)) {
      this.defaultSelectNode()
    }
  },
  mounted() {
    if (this.isRTL) {
      document.documentElement.style.setProperty('--postion1', '12.45px')
      document.documentElement.style.setProperty('--postion2', '14px')
    } else {
      document.documentElement.style.setProperty('--postion1', '-12.45px')
      document.documentElement.style.setProperty('--postion2', '-14px')
    }
  },
  methods: {
    defaultSelectNode() {
      const { node, ancestors } = this.findNodeAndAncestors(
        this.treeData,
        this.selectedNodeId
      )
      this.selectedNodes = ancestors
      if (!isEmpty(node)) {
        this.activeNode = node.id
      }
      this.opendeault(this.treeData)
    },
    findNodeAndAncestors(treeData, targetNodeId) {
      function findNodeAndAncestorsRecursive(node, targetNodeId, ancestors) {
        if (node.id === targetNodeId) {
          return {
            node,
            ancestors: [...ancestors, node.id],
          }
        }
        if (node.children && node.children.length > 0) {
          for (const childNode of node.children) {
            const result = findNodeAndAncestorsRecursive(
              childNode,
              targetNodeId,
              [...ancestors, node.id]
            )

            if (result) {
              return result
            }
          }
        }

        return null
      }

      for (const rootNode of treeData) {
        const result = findNodeAndAncestorsRecursive(rootNode, targetNodeId, [])

        if (result) {
          return result
        }
      }
      return null
    },

    opendeault(nodes) {
      nodes.forEach((node) => {
        if (
          this.selectedNodes.includes(node.id) &&
          node.id !== this.selectedNodeId
        ) {
          node.isOpen = true
        }
        if (!isEmpty(node.children)) {
          this.opendeault(node.children)
        }
      })
    },
    getStyle(state) {
      return this.getCustomStyle({ property: state })
    },
    async toggleNode(node) {
      if (this.currentOpenNode === `${node.id}true`)
        this.currentOpenNode = `${node.id}false`
      else this.currentOpenNode = `${node.id}true`
      if (isEmpty(node.children)) {
        this.searching[node.id] = true
        await this.getChildren(node)
        this.searching[node.id] = false
        // node.isOpen = !node.isOpen
      }
      node.isOpen = !node.isOpen
      if (this.currentOpenNode === `${node.id}true`)
        this.currentOpenNode = `${node.id}false`
      else this.currentOpenNode = `${node.id}true`
    },
    selectedNode(node) {
      this.activeNode = node.id
      this.$emit('onSelect', node)
      if (!this.showSwitcherIcon) {
        this.toggleNode(node)
      }
    },
    getIcon(node) {
      let { showIcon } = this || false
      let { icongroup, iconname } = node || {}
      let iconPresent = !isEmpty(icongroup) && !isEmpty(iconname)
      if (showIcon && iconPresent) {
        return (
          <FContainer
            height="24px"
            width="24px"
            display="flex"
            min-width="24px"
            alignItems="center"
            justifyContent="center"
          >
            <FIcon
              group={icongroup}
              name={iconname}
              size="12"
              pressable={false}
            ></FIcon>
          </FContainer>
        )
      }
    },
  },
  render() {
    let wrapperClass = {
      whiteSpace: 'nowrap',
    }
    const Container = styled('ul')`
      ${this.getStyle('mainLayout')};
      ${this.isRTL
        ? 'padding-right: var(--spacing-sectionSmall)'
        : 'padding-left: var(--spacing-sectionSmall)'};
    `
    const InnerContainer = styled(FContainer)`
      ${this.getStyle('innerContend')}
    `
    const Text = styled(FText)`
      ${this.textWrap && { ...wrapperClass }}
    `
    const renderNode = (node) => (
      <li key={node.id}>
        <span class="dot"></span>
        <InnerContainer
          key={this.currentOpenNode}
          id={`main-node${node.id}`}
          zIndex="1"
          alignItems="center"
          position="relative"
        >
          {this.showSwitcherIcon &&
            (!node.isEnd ? (
              this.searching[node.id] === true ? (
                <FContainer
                  width="24px"
                  height="24px"
                  display="flex"
                  min-width="24px"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FSpinner size={12} />
                </FContainer>
              ) : (
                <FContainer
                  display="flex"
                  gap="containerLarge"
                  width="24px"
                  height="24px"
                  min-width="24px"
                  alignItems="center"
                  justifyContent="center"
                >
                  <FIcon
                    group="navigation"
                    name={
                      !node.isOpen
                        ? 'up-triangle-filled'
                        : 'down-triangle-filled'
                    }
                    size="12"
                    pressable={false}
                    style={{ padding: '0px' }}
                    cursor="pointer"
                    color={
                      !node.isOpen ? 'iconNeutralMedium' : 'iconNeutralLight'
                    }
                    class={!node.isOpen && 'right-triangle'}
                    vOn:click={() => this.toggleNode(node)}
                  ></FIcon>
                </FContainer>
              )
            ) : (
              <FContainer display="flex" gap="containerLarge">
                <FContainer width="24px" height="24px" />
              </FContainer>
            ))}
          <FContainer
            width="fit-content"
            display="flex"
            alignItems="center"
            cursor="pointer"
            borderRadius="medium"
            backgroundColor={
              node.id === this.activeNode ? 'backgroundSelection' : ''
            }
            color={node.id === this.activeNode ? 'textMain' : 'textCaption'}
            hover-color="textMain"
          >
            {this.getIcon(node)}{' '}
            <FContainer
              vOn:click={() => this.selectedNode(node)}
              height="24px"
              display="flex"
              alignItems="center"
              cursor="pointer"
              padding="containerMedium"
              backgroundColor={
                node.id === this.activeNode ? 'backgroundSelection' : ''
              }
              borderRadius="medium"
            >
              <Text
                title={this.textWrap ? node.title : undefined}
                appearance={
                  node.id === this.activeNode ? 'headingMed14' : 'bodyReg14'
                }
              >
                {node.title}
              </Text>
            </FContainer>
          </FContainer>
        </InnerContainer>
        {node.isOpen && node.children && node.children.length > 0 && (
          <Container>
            {node.children.map((childNode) => renderNode(childNode))}
            <FContainer
              tag="span"
              backgroundColor="borderNeutralGrey01Light"
              height="6px"
              width="6px"
              position="absolute"
              borderRadius="full"
              transform={`translate(${this.isRTL ? '15px' : '-15px'}, -15.5px)`}
            ></FContainer>
          </Container>
        )}
      </li>
    )

    return (
      <FContainer class="mycontainer" overflow="scroll">
        <Container
          style={{ margin: '0px', padding: '0px', position: 'relative' }}
        >
          {this.treeData.map((node) => renderNode(node))}
        </Container>
      </FContainer>
    )
  },
}
</script>
<style>
li {
  position: relative;
}
ul::before {
  content: '';
  border: none;
  height: calc(100% - 24px);
  position: absolute;
}
.mycontainer ul:not(:first-child)::before {
  content: '';
  border: 0.5px solid;
  border-color: var(--colors-borderNeutralGrey01Light);
  height: calc(100% - 24px);
  transform: translate(var(--postion1), -10px);
}
.mycontainer ul:not(:first-child) li .dot {
  background-color: var(--colors-borderNeutralGrey01Light);
  height: 4px;
  width: 4px;
  border-radius: 50%;
  position: absolute;
  transform: translate(var(--postion2), 9.5px);
}
.mycontainer fc-icon {
  visibility: visible;
  fill: currentColor;
}
.right-triangle {
  transform: rotate(90deg);
}
</style>
