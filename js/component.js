//blockly
Vue.component('blockly-code', {
  data: function() {
    return {
      seen: true
    }
  },
  template: '<span v-if="seen">blockly编程</span>'
});

//登录组件
Vue.component('not-login', {
  template: '<div class="notLogin"><span class="tosign">登录</span><span class="register">注册</span></div>'
});

//画线编程
Vue.component('path-code', {
  data: function() {
    return {
      seen: false
    }
  },
  template: '<span v-if="seen">画线编程</span>'
})

//代码编程
Vue.component('write-code', {
  data: function() {
    return {
      seen: false
    }
  },
  template: '<span v-if="seen">代码编程</span>'
})

var login = new Vue({
  el: '.signIn'
});

var blocklyCode = new Vue({
  el: '#mainContent'
})