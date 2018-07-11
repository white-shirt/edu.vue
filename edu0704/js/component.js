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
      //when success remove login data update state
      this.close();
      console.log($('.username').val(), $('.password').val());
      ModalBox.stuInfoStatus = true;
      login.sign.splice(0, login.sign.length);
      login.sign.push({ name: '', attr: 'userAvatar' }, { name: '退出登录', attr: 'outSign' });
      //登录状态为true
      login.status = true;
      $.ajax({
        url: './components.json',
        type: 'GET',
        dataType: "json",
        async: false,
        success: function (data) {
          var robotData = new Array();
          //数据排序 在线前 不在线后
          if (data.robot) {
            for (var i = 0; i < data.robot.length; i++) {
              if (data.robot[i].flag === true) robotData.unshift(data.robot[i]);
              if (data.robot[i].flag === false) robotData.push(data.robot[i]);
            }
            robot.robotData = robotData;
          }
        }
      });
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
      imgsrc: './img/vm.png',
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
                    <li v-if="count === 2"><span v-on:click="sex='boy';imgsrc='./img/vmboy.png'" :class="{ sex:true, girl:true, active: sex === 'boy' }">男</span><span v-on:click="sex='girl';imgsrc='./img/vmgirl.png'" :class="{ sex:true, girl:true, active: sex === 'girl' }">女</span></li>
                    <li v-if="count === 3">
                      <div class="birthday year"><button v-on:click="year++" class="btn add">+</button><span class="num">{{ year }}年</span><button v-on:click="year--" class="btn sub">-</button></div>
                      <div class="birthday month"><button v-on:click="month++" class="btn add">+</button><span class="num">{{ month }}月</span><button v-on:click="month--" class="btn sub">-</button></div>
                      <div class="birthday day"><button v-on:click="day++" class="btn add">+</button><span class="num">{{ day }}日</span><button v-on:click="day--" class="btn sub">-</button></div>
                    </li>
                    <li v-if="count === 4">
                      <ul class="grade">
                        <li v-for="item in post" v-bind:class="{gradelist:true, gradeactive: grade === item.grade}" v-on:click="getGrade(item.grade, item.name)">{{ item.grade }}</li>
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
        console.log(this.name, this.imgsrc, this.year + '/' + this.month + '/' + this.day, this.sex, this.grade);
      }
    },
    getGrade(gra, nm) {
      this.grade = gra;
      this.imgsrc = './img/vm' + this.sex + nm + '.png';
    }
  }
});

var exampleModal = Vue.component('example-modal', {
  props: ['post'],
  data: function () {
    return {
      curImg: this.post[0].img,
      curTitle: this.post[0].name,
      curKonw: this.post[0].knowledge,
      curDif: this.post[0].difficulty,
      curStory: this.post[0].story
    }
  },
  template: `<div class="login example">
              <span class="close" v-on:click="close()"><i class="fa fa-times-circle"></i></span>
              <div class="modalhead">aieggy | 示例</div>
              <div class="exampleWrap">
                <div class="current" v-on:click="showExa()">
                  <div class="curImg">
                    <img :src="curImg" />
                  </div>
                  <div class="curInfo">
                    <h2 class="curtitle">{{ curTitle }}</h2>
                    <p class="curStory">{{ curStory }}</p>
                    <span class="know"><span class="konwPoint">知识</span><span class="curkonw">{{ curKonw }}</span></span>
                    <span class="know"><span class="difftil">难度</span><span><i v-for="item in curDif" class="fa fa-star"></i></span></span>
                  </div>
                </div>
                <div class="exampleList">
                  <ul class="listWrap">
                    <li class="list" v-on:click="curExa(item)" v-for="item in post">
                      <div class="liImgWrap">
                        <img class="liImg" :src="item.img" />
                      </div>
                      <span class="liname">{{ item.name }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>`,
  methods: {
    close() {
      ModalBox.exampleStatus = false;
    },
    curExa(item) {
      this.curImg = item.img;
      this.curTitle = item.name;
      this.curKonw = item.knowledge;
      this.curDif = item.difficulty;
      this.curStory = item.story;
    },
    showExa() {
      console.log(this.curTitle);
    }
  }
});

//this is robot component
var robotModal = Vue.component('robot-modal', {
  props: ['post'],
  data: function () {
    return {
      robotonline: './img/robotonline.png',
      robotoffline: './img/robotoffline.png',
      curRoName: ''
    }
  },
  template: `<div class="robotWrap">
              <div class="curRoCard">
                <div v-if="post !== null" class="curRoWrap">
                  <img class="curRoImg" :src="post[0].flag === true ? robotonline : robotoffline" />
                  <div class="curRoInfoWrap">
                    <span class="curRoTi">{{ post[0].name }}</span>
                    <ul class="curRoIfWrap">
                      <li class="curRoIfList">
                        <span class="info">游戏时长</span>
                        <span class="info">暂无数据</span>
                        <span class="info">小时</span>
                      </li>
                      <li class="curRoIfList">
                        <span class="info">刷卡次数</span>
                        <span class="info">暂无数据</span>
                        <span class="info">次</span>
                      </li>
                      <li class="curRoIfList">
                        <span class="info">行走里程</span>
                        <span class="info">暂无数据</span>
                        <span class="info">米</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <ul class="listWrap">
                <li v-if="post !== null" v-for="(item, index) in post" class="robotlist" v-on:click="changeRo(item, index)">
                  <div class="imgWrap">
                    <img class="listImg" :title="item.name" :src="item.flag ? robotonline : robotoffline" />
                  </div>
                  <span class="listName">{{ item.name }}</span>
                </li>
                <li class="addMac"><i class="fa fa-plus"></i></li>
              </ul>
            </div>`,
  methods: {
    changeRo(item, index) {
      if (item.flag) {
        var curItem = item;
        this.post.splice(index, 1);
        this.post.unshift(curItem);
      } else {
        alert('请开启设备')
      }
    }
  }
});

var robot = new Vue({
  el: '.sidebarContent',
  data: {
    robotModalStatus: true,
    codeModalStatus: false,
    robotData: null,
    codeData: [

    ]
  },
  components: {
    'robot-modal': robotModal,
    'code-modal': codeModal
  }
});

var codeModal = Vue.component('code-modal', {
  props: ['post'],
  data: function () {
    return {}
  },
  template: `<div>我是代码呀</div>`
});

var ModalBox = new Vue({
  el: '.ModalBox',
  data: {
    loginModalStatus: false,
    registerModalStatus: false,
    stuInfoStatus: false,
    exampleStatus: false,
    login: { count: 3 },
    register: { count: 4 },
    stuInfo: [{ grade: '小班', name: 'child' }, { grade: '中班', name: 'child' }, { grade: '大班', name: 'child' }, { grade: '一年级', name: 'primary' }, { grade: '二年级', name: 'primary' }, { grade: '三年级', name: 'primary' }, { grade: '四年级', name: 'primary' }, { grade: '五年级', name: 'primary' }, { grade: '六年级', name: 'primary' }, { grade: '七年级', name: 'primary' }, { grade: '八年级', name: 'primary' }, { grade: '九年级', name: 'primary' }],
    example: null
  },
  components: {
    'login-modal': loginModal,
    'register-modal': registerModal,
    'stuinfo-modal': stuInfo,
    'example-modal': exampleModal
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
  if (ModalBox.loginModalStatus || ModalBox.registerModalStatus || ModalBox.stuInfoStatus || ModalBox.exampleStatus) {
    mask.css({ 'display': 'block' });
  } else {
    mask.css({ 'display': 'none' });
  }
};