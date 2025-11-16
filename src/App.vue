<template>
  <div class="main">
    <div>Change your brightness!</div>
    <div>
      {{ theme === 'dark'? 'Dark' : 'Light' }} Time
      <ToggleSwitch @onChange="switchTheme"/>
    </div>
    <SliderInput @onChange="changeBrightness" />

  </div>
</template>

<script>
import SliderInput from './components/SliderInput.vue'
import ToggleSwitch from './components/ToggleSwitch.vue';
export default {
  data() {
    return {
      theme: 'light'
    }
  },
  methods: {
    changeBrightness(value) {
      chrome.runtime.sendMessage({ action: 'setBrightness', value })
    },
    switchTheme(isDark) {
      this.theme = isDark ? 'dark' : 'light'
      window.localStorage.setItem('isDark', isDark)
      document.querySelector('body').classList.toggle('dark-theme')
    }
  },
  components: { SliderInput, ToggleSwitch },
}
</script>
