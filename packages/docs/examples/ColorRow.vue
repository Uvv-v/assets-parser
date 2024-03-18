<template>
  <p class="color-row" :style="{ backgroundColor: value }">
    <span :style="{ color: getTextColor(value) }">{{ name }}</span>
    <button class="color-row__copy" @click="copy(name)"></button>
  </p>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import Color from 'color'

const { isDark } = useData()

defineProps<{
  name: string
  value: string
}>()

const getTextColor = (color: string) => {
  const bgColor = isDark.value ? '#1b1b1f' : '#ffffff'
  const _color = Color(color)
  const contrastColor = (_color.alpha() < 1) ? Color(bgColor).mix(_color, _color.alpha()) : _color
  const contrastWhite = Color('white').contrast(contrastColor)
  const contrastBlack = Color('black').contrast(contrastColor)
  return contrastWhite > contrastBlack ? 'white' : 'black'
}

const copy = (value: string) => {
  navigator.clipboard.writeText(value)
}
</script>

<style scoped>
.color-row {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 12px 12px 12px 24px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}

.color-row:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: repeating-linear-gradient(-45deg, var(--vp-c-divider), var(--vp-c-divider) 1px, transparent 1px, transparent 16px);
  z-index: -1;
}

.color-row .color-row__copy {
  width: 30px;
  height: 30px;
  background: var(--vp-code-copy-code-bg) var(--vp-icon-copy) center center no-repeat;
  background-size: 20px;
  border: 1px solid var(--vp-code-copy-code-border-color);
  border-radius: 4px;
  transition: border-color 0.25s, background-color 0.25s;
}
.color-row .color-row__copy:hover {
  border-color: var(--vp-code-copy-code-hover-border-color);
  background-color: var(--vp-code-copy-code-hover-bg);
}
</style>
