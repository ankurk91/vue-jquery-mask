import jQuery from 'jquery';
import 'jquery-mask-plugin';

export default {
  name: 'jquery-mask',
  render(el) {
    return el('input', {
      attrs: {
        type: 'text',
      },
      on: {
        input: this.onInput,
        blur: this.onBlur,
      }
    })
  },
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
     * @param event
     */
    onInput(event) {
      this.$nextTick(() => {
        this.$emit('input', this.toEmit(event));
      });
    },
    /**
     * Get value to be emitted
     * @param event
     * @returns {*}
     */
    toEmit(event) {
      return this.raw ? jQuery(this.$el).cleanVal() : event.target.value;
    },
    /**
     * Add support for validation libraries
     *
     * @param event
     */
    onBlur(event) {
      this.$nextTick(() => {
        let value = this.toEmit(event);
        this.$emit('blur', value);
        // jquery-mask plugin may also modify the input value on blur event
        // so lets keep DOM and v-model in sync
        this.$emit('input', value);
      })
    },
  },
  watch: {
    /**
     * Listen to change from outside of component and update DOM
     */
    value(newValue) {
      jQuery(this.$el).val(jQuery(this.$el).masked(newValue));
    },
  },
  beforeDestroy() {
    jQuery(this.$el).unmask();
  }
}
