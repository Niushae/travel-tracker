<script lang="ts" setup>
const props = withDefaults(defineProps<{
  error?: string;
  name: string;
  label: string;
  fieldType?: "text" | "textarea";
  disabled?: boolean;
}>(), {
  fieldType: "text",
});
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <Field
      :as="props.fieldType === 'textarea' ? 'textarea' : 'input'"
      :type="props.fieldType"
      :disabled="props.disabled"
      :name="props.name"
      class="w-full"
      :class="{ 'input-error': props.error, 'input': props.fieldType === 'text' || 'number', 'textarea': props.fieldType === 'textarea' }"
      :placeholder="props.label"
    />
    <p v-if="props.error" class="label">
      {{ props.error }}
    </p>
  </fieldset>
</template>
