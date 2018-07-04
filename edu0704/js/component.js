
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
Vue.component('blocklyCode', {
  template: '<p>this is blockly</p>'
});

//path
Vue.component('pathCode', {
  template: '<p>this is path</p>'
});
//code
Vue.component('codeCode', {
  template: '<p>this is code</p>'
});

var mainNav = new Vue({
  el: '#nav',
  data: {
    active: 1,
    tabs: [
      { name: '画线编程', attr: 'path', view: 'pathCode' },
      { name: '图形化编程', attr: 'blockly', view: 'blocklyCode' },
      { name: '代码编程', attr: 'code', view: 'codeCode' }
    ]
  },
  methods: {
    toggle(index, view) {
      this.active = index;
      for (var i = 0; i < $('.contentWrap').length; i++) {
        $('.contentWrap').eq(i).css({ 'display': 'none' })
      }
      $('.' + view).css({ 'display': 'block' });
    }
  }
});






