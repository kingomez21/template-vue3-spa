<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

const { locale, setLocale } = useLocale()

const languageOptions = [
  { title: 'Español', value: 'es', flag: '🇪🇸' },
  { title: 'English', value: 'en', flag: '🇺🇸' },
]
</script>

<template>
  <VMenu>
    <template #activator="{ props }">
      <IconBtn v-bind="props">
        <VIcon icon="ri-global-line" />
      </IconBtn>
    </template>

    <VList>
      <VListItem
        v-for="lang in languageOptions"
        :key="lang.value"
        :active="locale === lang.value"
        @click="setLocale(lang.value as 'es' | 'en')"
      >
        <template #prepend>
          <span class="text-h6 me-2">{{ lang.flag }}</span>
        </template>
        <VListItemTitle>{{ lang.title }}</VListItemTitle>
      </VListItem>
    </VList>
  </VMenu>
</template>
