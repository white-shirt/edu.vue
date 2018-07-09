var loginModal = Vue.component('login-modal', {
  props: ['post'],
  data: function () {
    return {}
  },
  template: `<div class="login loginWrap">
                <span class="close" v-on:click="close()"><i class="fa fa-times-circle"></i></span>
                <div class="modalhead">aieggy | 欢迎登录</div>
                <ul class="enterWrap">
                  <li class="inputList"><span class="faIcon"><i class="fa fa-user"></i></span><input class="username" type="text" placeholder="请输入用户名" /></li>
                  <li class="inputList"><span class="faIcon"><i class="fa fa-unlock-alt"></i></span><input class="password" type="password" placeholder="请输入密码" /></li>
                </ul>
                <div class="loginBtn" v-on:click="submit()">登录</div>
                <div class="bottomBtn">
                  <span class="botToRegister">立即注册</span>
                  <span class="botTofind">找回密码</span>
                </div>
            </div>`,
  methods: {
    close() {
      ModalBox.loginModalStatus = false;
    },
    submit() {
      //remove login data update state
      this.close();
      console.log($('.username').val(), $('.password').val());
      ModalBox.stuInfoStatus = true;
      login.sign.splice(0, login.sign.length);
      login.sign.push({ name: '', attr: 'userAvatar' }, { name: '退出登录', attr: 'outSign' });
    }
  }
});

var registerModal = Vue.component('register-modal', {
  props: ['post'],
  data: function () {
    return {}
  },
  template: `<div class="login registerWrap">
                <span class="close" v-on:click="close()"><i class="fa fa-times-circle"></i></span>
                <div class="modalhead">aieggy | 欢迎注册</div>
                <ul class="enterWrap">
                  <li class="inputList"><span class="faIcon"><i class="fa fa-user"></i></span><input class="username" type="text" placeholder="请输入用户名" /></li>
                  <li class="inputList"><span class="faIcon"><i class="fa fa-lock"></i></span><input class="password" type="password" placeholder="请输入密码" /></li>
                  <li class="inputList"><span class="faIcon"><i class="fa fa-unlock-alt"></i></span><input class="confirmpwd" type="password" placeholder="请确认密码" /></li>
                </ul>
                <div class="loginBtn" v-on:click="submit()">立即注册</div>
                <div class="bottomBtn">
                  <span class="botToLogin">登录</span>
                </div>
            </div>`,
  methods: {
    close() {
      //remove login data update state
      ModalBox.registerModalStatus = false;
    }
  }
});

var stuInfo = Vue.component('stuinfo-modal', {
  props: ['post'],
  data: function () {
    return {
      count: 1,
      name: '',
      imgsrc: './img/logo0.jpg',
      sex: 'boy',
      year: '2000',
      month: '10',
      day: '10',
      grade: '一年级'
    }
  },
  template: `<div class="login stuInfoWrap">
              <span class="close" v-on:click="close()"><i class="fa fa-times-circle"></i></span>
              <div class="modalhead">aieggy | 创建角色</div>
              <div class="vmpart">
                <div class="vm">
                  <img class="vmPic" :src="imgsrc" />
                  <span class="title">{{ name }}</span>
                </div>
                <div class="userenter">
                  <ul class="info">
                    <li v-if="count === 1"><input v-model="name" class="username" type="text" placeholder="输入你的名字" /></li>
                    <li v-if="count === 2"><span v-on:click="sex='boy';imgsrc='./img/logo0.jpg'" :class="{ sex:true, girl:true, active: sex === 'boy' }">男</span><span v-on:click="sex='girl';imgsrc='./img/logo1.jpg'" :class="{ sex:true, girl:true, active: sex === 'girl' }">女</span></li>
                    <li v-if="count === 3">
                      <div class="birthday year"><button v-on:click="year++" class="btn add">+</button><span class="num">{{ year }}年</span><button v-on:click="year--" class="btn sub">-</button></div>
                      <div class="birthday month"><button v-on:click="month++" class="btn add">+</button><span class="num">{{ month }}月</span><button v-on:click="month--" class="btn sub">-</button></div>
                      <div class="birthday day"><button v-on:click="day++" class="btn add">+</button><span class="num">{{ day }}日</span><button v-on:click="day--" class="btn sub">-</button></div>
                    </li>
                    <li v-if="count === 4">
                      <ul class="grade">
                        <li v-bind:class="{gradelist:true, gradeactive: grade === '小班'}" v-on:click="grade = '小班'">小班</li>
                        <li v-bind:class="{gradelist:true, gradeactive: grade === '中班'}" v-on:click="grade = '中班'">中班</li>
                        <li v-bind:class="{gradelist:true, gradeactive: grade === '大班'}" v-on:click="grade = '大班'">大班</li>
                        <li v-bind:class="{gradelist:true, gradeactive: grade === '一年级'}" v-on:click="grade = '一年级'">一年级</li>
                        <li v-bind:class="{gradelist:true, gradeactive: grade === '二年级'}" v-on:click="grade = '二年级'">二年级</li>
                        <li v-bind:class="{gradelist:true, gradeactive: grade === '三年级'}" v-on:click="grade = '三年级'">三年级</li>
                        <li v-bind:class="{gradelist:true, gradeactive: grade === '四年级'}" v-on:click="grade = '四年级'">四年级</li>
                        <li v-bind:class="{gradelist:true, gradeactive: grade === '五年级'}" v-on:click="grade = '五年级'">五年级</li>
                        <li v-bind:class="{gradelist:true, gradeactive: grade === '六年级'}" v-on:click="grade = '六年级'">六年级</li>
                        <li v-bind:class="{gradelist:true, gradeactive: grade === '七年级'}" v-on:click="grade = '七年级'">七年级</li>
                        <li v-bind:class="{gradelist:true, gradeactive: grade === '八年级'}" v-on:click="grade = '八年级'">八年级</li>
                        <li v-bind:class="{gradelist:true, gradeactive: grade === '九年级'}" v-on:click="grade = '九年级'">九年级</li>
                      </ul>
                    </li>
                  </ul>
                  <div class="next" v-on:click="next()">创建角色{{ count }}/4</div>
                </div>
              </div>
            </div>
            `,
  methods: {
    close() {
      //remove login data update state
      ModalBox.stuInfoStatus = false;
    },
    next() {
      this.count++;
      if (this.count > 4) {
        this.count = 4;
        console.log(this.name,this.imgsrc,this.sex,this.grade);
      }
    }
  }
});

var exampleModal = Vue.component('', {});

var ModalBox = new Vue({
  el: '.ModalBox',
  data: {
    loginModalStatus: false,
    registerModalStatus: false,
    stuInfoStatus: false,
    login: { count: 3 },
    register: { count: 4 },
    stuInfo: { count: 5 }
  },
  components: {
    'login-modal': loginModal,
    'register-modal': registerModal,
    'stuinfo-modal': stuInfo
  },
  //if data updated  update DOM
  updated: function () {
    mask();
    $('.ModalBox').css({ 'left': 50 + '%', 'marginLeft': -$('.login').innerWidth() / 2 + 'px' });
  }
});



//mask toggle none and block
function mask() {
  var mask = $('.mask');
  if (ModalBox.loginModalStatus || ModalBox.registerModalStatus || ModalBox.stuInfoStatus) {
    mask.css({ 'display': 'block' });
  } else {
    mask.css({ 'display': 'none' });
  }
};