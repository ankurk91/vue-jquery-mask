# Vue jQuery Mask Component

[![downloads](https://badgen.net/npm/dt/vue-jquery-mask)](http://npm-stats.com/~packages/vue-jquery-mask)
[![npm-version](https://badgen.net/npm/v/vue-jquery-mask)](https://www.npmjs.com/package/vue-jquery-mask)
[![github-tag](https://badgen.net/github/tag/ankurk91/vue-jquery-mask)](https://github.com/ankurk91/vue-jquery-mask/)
[![license](https://badgen.net/github/license/ankurk91/vue-jquery-mask)](https://yarnpkg.com/en/package/vue-jquery-mask)

Vue.js component for [jQuery Mask Plugin](https://github.com/igorescobar/jQuery-Mask-Plugin)

## Demo on [JSFiddle](https://jsfiddle.net/ankurk91/d92xgzhL/)

### Version matrix

| Vue.js version | Package version | Branch          |
| :---           | :---:           | ---:           | 
| 2.x            | 1.x             | [1.x](https://github.com/ankurk91/vue-jquery-mask/tree/1.x) |
| 3.x            | 2.x             | master          |

## Requirements
* jQuery >=1.7.0 
* Vue 3.x 
 
## Installation
```bash
# Yarn
yarn add vue-jquery-mask

# npm
npm install vue-jquery-mask
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
  import {createApp} from 'vue';
  import VueMask from 'vue-jquery-mask';
  const app = createApp().mount('#app')   
  app.use(VueMask);
```
This will register a global component `<vue-mask>` 

## Available props
The component accepts these props:

| Attribute       | Type               | Default  | Required?   | Description      |
| :---            |  :---:             | :---:    |  :---:      | :---             |
| v-model         | String / `null`    |`null`    |  `true`     | Set or Get input value |
| mask            | String / Function  | ` `      |  `true`     | Masking pattern |
| options         | Object             | `{}`     |  `false`    | Configuration [options](http://igorescobar.github.io/jQuery-Mask-Plugin/docs.html)|
| raw             | Boolean            | `true`   |  `false`    | When set to `false`; emits formatted value with format pattern and delimiters |

## Install in non-module environments (without webpack)
```html
<!-- Vue js -->
<script src="https://cdn.jsdelivr.net/npm/vue@3"></script>
<!-- Lastly add this package -->
<script src="https://cdn.jsdelivr.net/npm/vue-jquery-mask@2"></script>
<!-- Register global component -->
<script>
// Your app init logic may go here
app.use(VuejQueryMask)
</script>
```

## Run examples on your localhost
* Clone this repo
* You should have node-js `>=10.13` and yarn `>=1.x` pre-installed
* Install dependencies - `yarn install`
* Run webpack dev server - `yarn start`
* This should open the demo page at ``http://localhost:9000`` in your default web browser

## Changelog
Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## License
[MIT](LICENSE.txt) License
