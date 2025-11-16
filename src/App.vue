<template>
    <div class="main">
      <SliderInput :v-model="brightness" :modelValue="brightness" @onChange="changeBrightness" />
      <p>{{ brightness }}%</p>
    </div>
</template>

<script>
import SliderInput from './components/SliderInput.vue'
export default {
    data() {
        return {
            theme: 'light',
            brightness: 100,
        }
    },
    methods: {
        changeBrightness(value) {
            this.brightness = value
            chrome.storage.sync.set({ lastRequest: { action: 'setBrightness', value } })
        },
    },
    created() {
        chrome.storage.sync.get('lastRequest').then(items => {
            this.brightness = items.lastRequest.value
        })
    },
    components: { SliderInput },
}
</script>
