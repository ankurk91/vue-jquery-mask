<template>

  <input :type="type" v-bind="$attrs" v-on="inputListeners">

</template>

<script>
  import jQuery from 'jquery';
  import 'jquery-mask-plugin';

  export default {
    name: 'jquery-mask',
    inheritAttrs: false,
    props: {
      value: {
        required: true,
        default: null,
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
      type: {
        type: String,
        default: 'text'
      }
    },
    data() {
      return {
        onChangeFn: null
      }
    },
    mounted() {
      // Backup onChange callback
      this.onChangeFn = this.options.onChange;
      // Inject our onChange callback
      let newOptions = jQuery.extend(true, {}, this.options, {onChange: this.onChange});
      // Lastly init the mask
      jQuery(this.$el).mask(this.mask, newOptions);
      // Set initial value
      jQuery(this.$el).val(jQuery(this.$el).masked(this.value));
    },
    methods: {
      /**
       * Update v-model upon change triggered by plugin itself
       */
      onChange(...args) {
        let toEmit = this.raw ? jQuery(this.$el).cleanVal() : arguments[0];
        this.$emit('input', toEmit);

        if (typeof this.onChangeFn === 'function') {
          this.onChangeFn.call(this, ...args)
        }
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
    computed: {
      inputListeners() {
        return jQuery.extend(true, {},
          // Add all the listeners from the parent
          this.$listeners,
          {
            blur: (event) => {
              this.$emit('blur', this.value)
            }
          }
        )
      }
    },
    beforeDestroy() {
      jQuery(this.$el).unmask();
      this.onChangeFn = null
    }
  }
</script>
