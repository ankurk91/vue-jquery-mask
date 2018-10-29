<template>
  <input type="text" @blur="onBlur" @input="onInput" @keyup="onKeyup">
</template>

<script>
  import jQuery from 'jquery';
  import 'jquery-mask-plugin';

  export default {
    name: 'jquery-mask',
    props: {
      value: {
        required: true,
        default: null,
        validator(value) {
          return value === null || typeof value === 'string' || value instanceof String || typeof value === 'number'
        }
      },
      mask: {
        required: true,
        type: [String, Function]
      },
      options: {
        type: Object,
        default: () => ({})
      },
      // Set this prop to false to emit masked value
      raw: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {}
    },
    mounted() {
      // Clone configs
      let newOptions = jQuery.extend(true, {}, this.options);
      // Lastly init the mask
      jQuery(this.$el).mask(this.mask, newOptions);
      // Set initial value
      jQuery(this.$el).val(jQuery(this.$el).masked(this.value));
    },
    methods: {
      /**
       * Update v-model upon change triggered by user
       */
      onInput(event) {
        this.$nextTick(() => {
          let toEmit = this.raw ? jQuery(this.$el).cleanVal() : event.target.value;
          this.$emit('input', toEmit);
        });
      },
      onBlur(event) {
        this.$emit('blur', this.value)
      },
      onKeyup(event) {
        this.$emit('keyup', event)
      }
    },
    watch: {
      /**
       * Listen to change from outside of component and update DOM
       *
       */
      value(newValue) {
        jQuery(this.$el).val(jQuery(this.$el).masked(newValue));
      },
    },
    beforeDestroy() {
      jQuery(this.$el).unmask();
    }
  }
</script>
