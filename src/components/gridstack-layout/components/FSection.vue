<template>
  <div>
    <div class="row header">
      <div class="title">Section - {{ id }}</div>
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
  padding-left: 10px;
  font-size: 0.9rem;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
