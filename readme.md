# Vue jQuery Mask Component

[![vue-js](https://img.shields.io/badge/vue.js-2.x-brightgreen.svg?maxAge=604800)](https://vuejs.org/)
[![downloads](https://img.shields.io/npm/dt/vue-jquery-mask.svg)](http://npm-stats.com/~packages/vue-jquery-mask)
[![npm-version](https://img.shields.io/npm/v/vue-jquery-mask.svg)](https://www.npmjs.com/package/vue-jquery-mask)
[![github-tag](https://img.shields.io/github/tag/ankurk91/vue-jquery-mask.svg?maxAge=1800)](https://github.com/ankurk91/vue-jquery-mask/)
[![license](https://img.shields.io/github/license/ankurk91/vue-jquery-mask.svg?maxAge=1800)](https://yarnpkg.com/en/package/vue-jquery-mask)

Vue.js v2.x component for [jQuery Mask Plugin](https://github.com/igorescobar/jQuery-Mask-Plugin)

## Demo on [JSFiddle](https://jsfiddle.net/ankurk91/d92xgzhL/)

## Requirements
* jQuery >=1.7.0 
 
## Installation
```bash
# npm
npm install vue-jquery-mask --save

# Yarn
yarn add vue-jquery-mask
```

#### Using Webpack?
* Webpack users need to configure [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/)
```js
// webpack.config.js
plugins: [
    new webpack.ProvidePlugin({     
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      $: 'jquery',     
    }),
  ]  
```

## Usage Example
```html
<template>
  <div>
    <vue-mask 
        class="form-control" 
        v-model="date"  
        mask="00/00/0000" 
        :raw="false"
        :options="options"> 
    </vue-mask>
  </div>
</template>

<script>
  // Import this component
  import vueMask from 'vue-jquery-mask';
  
  export default {    
    data () {
      return {
        date: null,
        options: {
          placeholder: '__/__/____',
          // http://igorescobar.github.io/jQuery-Mask-Plugin/docs.html
        }       
      }
    },
    components: {
      vueMask
    }
  }
</script>
```

#### As plugin
```js
  import Vue from 'vue';
  import vueMask from 'vue-jquery-mask';
  Vue.use(vueMask);
```
This will register a global component `<vue-mask>` 

## Available props
The component accepts these props:

| Attribute       | Type               | Default  | Required?   | Description      |
| :---            |  :---:             | :---:    |  :---:      | :---             |
| v-model / value | String / `null`    |`null`    |  `true`     | Set or Get input value |
| mask            | String / Function  | ` `      |  `true`     | Masking pattern |
| keyup           | Function / `null`  | `null`   |  `false`    | Keyup binding to input field |
| options         | Object             | `{}`     |  `false`    | Configuration [options](http://igorescobar.github.io/jQuery-Mask-Plugin/docs.html)|
| raw             | Boolean            | `true`   |  `false`    | When set to `false`; emits formatted value with format pattern and delimiters |

## Install in non-module environments (without webpack)
```html
<!-- Vue js -->
<script src="https://cdn.jsdelivr.net/npm/vue@2.5"></script>
<!-- Lastly add this package -->
<script src="https://cdn.jsdelivr.net/npm/vue-jquery-mask"></script>
<!-- Install global component -->
<script>
Vue.use(VuejQueryMask)
</script>
```

## Run examples on your localhost
* Clone this repo
* You should have node-js `>=6.10` and yarn `>=1.x` pre-installed
* Install dependencies - `yarn install`
* Run webpack dev server - `yarn start`
* This should open the demo page at ``http://localhost:9000`` in your default web browser

## Changelog
Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## License
[MIT](LICENSE.txt) License
