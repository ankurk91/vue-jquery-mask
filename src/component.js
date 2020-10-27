import jQuery from 'jquery';
import 'jquery-mask-plugin';
import {h} from 'vue';

export default {
  name: 'jquery-mask',
  render() {
    return h('input', {
      type: 'text',
      onInput: this.onInput,
      onBlur: this.onBlur,
      ref: 'root'
    })
  },
  props: {
    modelValue: {
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
  mounted() {
    // Clone configs
    let newOptions = jQuery.extend(true, {}, this.options);
    // Lastly init the mask
    jQuery(this.$refs.root).mask(this.mask, newOptions);
    // Set initial value
    jQuery(this.$refs.root).val(jQuery(this.$refs.root).masked(this.modelValue));
  },
  methods: {
    /**
     * Update v-model upon change triggered by user
     * @param event
     */
    onInput(event) {
      this.$nextTick().then(() => {
        this.$emit('update:modelValue', this.toEmit(event));
      });
    },
    /**
     * Get value to be emitted
     * @param event
     * @returns {*}
     */
    toEmit(event) {
      return this.raw ? jQuery(this.$refs.root).cleanVal() : event.target.value;
    },
    /**
     * Add support for validation libraries
     *
     * @param event
     */
    onBlur(event) {
      this.$nextTick().then(() => {
        let value = this.toEmit(event);
        this.$emit('blur', value);
        // jquery-mask plugin may also modify the input value on blur event
        // so lets keep DOM and v-model in sync
        this.$emit('update:modelValue', value);
      })
    },
  },
  watch: {
    /**
     * Listen to change from outside of component and update DOM
     */
    modelValue(newValue) {
      jQuery(this.$refs.root).val(jQuery(this.$refs.root).masked(newValue));
    },
  },
  beforeUnmount() {
    jQuery(this.$refs.root).unmask();
  }
}
