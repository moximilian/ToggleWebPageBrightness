<template>
    <div class="slider-container">
        <span class="slider-w-icon">
            <span class="icon icon-tree move"></span>
            <input
                type="range"
                min="0"
                max="100"
                v-model="value"
                class="slider"
                ref="slider"
                :style="{ '--percent': calcPercent + '%' }"
                @input="onInput"
            />
        </span>
    </div>
</template>

<script>
import debounce from '@/core/functions'
export default {
    props: {
        modelValue: { type: Number, default: () => 100 },
    },
    name: 'SliderInput',
    emits: ['onChange'],
    data() {
        return {
            value: this.modelValue,
            thumbSize: 25,
            calcPercent: this.modelValue,
            width: null,
        }
    },
    watch: {
        value() {
            this.getcalcPosition()
        },
        modelValue() {
            this.value = this.modelValue
        }
    },
    methods: {
        getcalcPosition() {
            const triggerElem = this.$refs.slider
            const triggerRect = triggerElem.getBoundingClientRect()
            this.width = triggerRect.right - triggerRect.left
            const offsetPercent = (this.thumbSize / this.width) * 100
            let percent = this.value >= 50 ? this.value - offsetPercent / 6 : this.value
            this.calcPercent = percent
        },
        emitEmmediate(val) {
            this.$emit('onChange', val)
        },
        onInput() {
            this.emit(this.value)
        },
    },
    mounted() {
      this.value = this.modelValue
      this.getcalcPosition()
    },
    created() {
        this.emit = debounce(this.emitEmmediate, 200)
    },
}
</script>
