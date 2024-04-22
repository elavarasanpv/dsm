<template>
  <div>
    <div class="row header">
      <div class="title">Widget - {{ id }}</div>
      <button @click="$emit('remove')">X</button>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  font-weight: bold;
  font-size: 0.7rem;
  padding-left: 7px;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
