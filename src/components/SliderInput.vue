<template>
  <div class="slider-container">
    <input type="range" min="0" max="100" v-model="sliderValue" class="slider" @input="onInput" />
  </div>
</template>

<script>
export default {
  name: 'SliderInput',
  emits: ['onChange'],
  data() {
    return {
      sliderValue: 100,
    }
  },
  methods: {
    onInput(event) {
      const val = event.target.value
      const max = event.target.max || 100
      const sliderWidth = event.target.offsetWidth
      const percent = (val / max) * 100

      // рассчёт смещения в px
      const offsetPx = (1 - val / max)

      // итоговая позиция с учётом смещения
      const correctedPercentPx = (sliderWidth * percent) / 100 - offsetPx * (1/10000)

      // перевод в проценты от ширины слайдера
      const correctedPercent = (correctedPercentPx / sliderWidth) * 100

      event.target.style.setProperty('--percent', `${correctedPercent}%`)
      window.localStorage.setItem('sliderVal', this.sliderValue)
      this.$emit('onChange', this.sliderValue)
    },
  },
  created() {
    this.sliderValue = window.localStorage.getItem('sliderVal') || 100
    this.onInput()
  },
}
</script>
