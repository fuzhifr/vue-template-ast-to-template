const compiler = require('vue-template-compiler')
const TemplateTransform = require('../lib/index')
const mpTemplateTransform = require('./mp-template-transform')

const str = `
<div id="app" data-hi="okoko"
  v-show="isShow"
  class="app go"
  :class="{newCls: classObject}"
  style="font-size: 24px;"
  v-bind:style="[styleObject]"
  @click.stop="clickItem(item)"
  name="ddd"
  @touchstart.capture="clickItem" >
  <div v-html="vHtml" ref="vHtml-dom">
    <slot name="demo"></slot>
    <p v-if="isShow">3</p>
    <p v-else-if="isHide">34</p>
    <p v-else></p>
  </div>
  hello
  <input v-model.number.trim="bindCls" focus :placeholder="inputType"/>
  <ul :class="bindCls" class="list" v-if="isShow && isHide">
      <li v-for="(item, key) in data" v-bind:key="key" @click="clickItem(index)">
        {{item}}:{{index}}
        <slot v-bind:todo="todo">
          {{ todo.text }}
        </slot>
      </li>
  </ul>
</div>
`

const { ast } = compiler.compile(str)

const { code } = mpTemplateTransform.generate(ast)
console.log(code)