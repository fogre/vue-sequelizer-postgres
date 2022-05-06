<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    fields: { type: Array, required: true },
    fieldsAs: Array,
    gridColumns: { type: String, required: true }
  })
  const emits = defineEmits(['sortList'])

  const labels = computed(() => {
    if (props.fieldsAs) {
      if (props.fieldsAs.length !== props.fields.length) {
        throw new Error('props fieldsAs and fields length is not the same')
      }
      return props.fieldsAs
    }
    return props.fields
  })
</script>

<template>
  <div class="listlabel-wrapper">
    <div
      class="list-grid-field"
      :style="{ gridTemplateColumns: props.gridColumns }"
    >
      <button
        v-for="(label, index) in labels"
        @click="$emit('sortList', index)"
        :key="label"
        class="g-flex-centered g-unstyled-button listlabel-button"
      >
        {{ label }}
      </button>
    </div>
  </div>
</template>

<style scoped>
  .listlabel-wrapper {
    position: sticky;
    left: 0;
    top:  0;
    background-color: inherit;
    box-shadow: 0px 7px 5px -6px rgba(0,0,0,0.4);
  }

  .listlabel-button {
    font-weight: 700;
    color: var(--color-secondary);
    height: 40px;

    &:hover {
      color: var(--color-primary);
    }
  }
</style>