//登录组件
Vue.component('not-login', {
  template: '<div class="notLogin"><span class="tosign">登录</span><span class="register">注册</span></div>'
});

var login = new Vue({
  el: '.signIn'
})