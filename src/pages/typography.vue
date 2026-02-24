<script setup lang="ts">
import SweetAlertExamples from '@/views/examples/SweetAlertExamples.vue'
import TypographyHeadlines from '@/views/user-interface/typography/TypographyHeadlines.vue'
import TypographyTexts from '@/views/user-interface/typography/TypographyTexts.vue'
</script>

<template>
  <VRow>
    <VCol cols="12">
      <TypographyHeadlines />
    </VCol>

    <VCol cols="12">
      <TypographyTexts />
    </VCol>

    <VCol cols="12">
      <SweetAlertExamples />
    </VCol>
  </VRow>
</template>
