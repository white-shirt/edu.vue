
//login
var notlogin = Vue.extend({
  template: '<div class="notLogin"><span class="tosign">登录</span><span class="register">注册</span></div>'
});

var login = new Vue({
  el: '.signIn',
  components: {
    'not-login': notlogin
  }
});

//blockly
Vue.component('blockly-code', {
  template: '<p>this is blockly</p>'
});

//path
Vue.component('path-code', {
  template: '<p>this is path</p>'
});
//code
Vue.component('code-code', {
  template: '<p>this is code</p>'
});

var mainNav = new Vue({
  el: '#section',
  data: {
    active: 1,
    currentView: 'blockly-code',
    tabs: [
      { name: '画线编程', attr: 'path', view: 'path-code' },
      { name: '图形化编程', attr: 'blockly', view: 'blockly-code' },
      { name: '代码编程', attr: 'code', view: 'code-code' }
    ]
  },
  methods: {
    toggle(index, view) {
      this.active = index;
      this.currentView = view;
    }
  }
});





