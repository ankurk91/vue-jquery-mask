import Component from './component.js';

const Plugin = (Vue, params) => {
  let name = 'vue-mask';
  /* istanbul ignore else */
  if (typeof params === 'string') name = params;

  Vue.component(name, Component);
};

Component.install = Plugin;

export default Component;
export {Component, Plugin};
