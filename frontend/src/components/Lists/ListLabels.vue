<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    fields: { type: Array, required: true },
    fieldsAs: Array
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
  <div class="list-labels-wrapper">
    <div class="list-grid-field">
      <button
        v-for="(label, index) in labels"
        @click="$emit('sortList', index)"
        :key="label"
        class="g-flex-centered g-unstyled-button list-label-button"
      >
        {{ label }}
      </button>
    </div>
  </div>
</template>