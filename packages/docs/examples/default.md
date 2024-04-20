<script setup>
import defaultTheme from './default.json';
import ColorRow from './ColorRow.vue'
</script>

<style scoped>
</style>

# Default Theme

## Colors

<color-row v-for="(value, key) in defaultTheme.colors" :name="key" :value="value" />

## Text

<table>
  <tr>
    <th colspan="2">Names</th>
    <th colspan="3">Medias</th>
  </tr>
  <tr>
    <th>Token</th>
    <th>Variable</th>
    <th>No media</th>
    <th>1060</th>
    <th>360</th>
  </tr>
  <template v-for="(value, key) in defaultTheme.text">
    <tr v-for="(prop, propKey, propIndex) in value" :key="key + propKey">
      <td v-if="propIndex === 0" :rowspan="Object.keys(value).length">{{ key }}</td>
      <td>{{ propKey }}</td>
      <td>{{ prop }}</td>
      <td>{{ prop }}</td>
      <td>{{ prop }}</td>
    </tr>
  </template>
</table>

## Spaces

<table>
  <tr>
    <th>Name</th>
    <th>Value</th>
  </tr>
  <tr v-for="(value, key) in defaultTheme.spaces" :name="key">
    <td>{{ key }}</td>
    <td>{{ value }}</td>
  </tr>
</table>
