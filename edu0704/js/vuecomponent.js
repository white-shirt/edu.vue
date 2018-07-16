
var loginModal = Vue.component('login-modal', {
  props: ['post'],
  data: function () {
    return {
      errInfo: '',
      btntext: '登录',
      disabled: false,
      validity: false,
      username: '',
      password: ''
    }
  },
  template: `<div class="login loginWrap">
                <span class="close" v-on:click="close()"><i class="fa fa-times-circle"></i></span>
                <div class="modalhead">aieggy | 欢迎登录</div>
                <ul class="enterWrap">
                  <li class="inputList"><span class="faIcon"><i class="fa fa-user"></i></span><input v-model="username" v-on:blur="onblur(username)" class="username" type="text" placeholder="请输入用户名" /></li>
                  <li class="inputList"><span class="faIcon"><i class="fa fa-unlock-alt"></i></span><input v-model="password" v-on:blur="onblur(password)" class="password" type="password" placeholder="请输入密码" /></li>
                </ul>
                <span class="errInfo">{{ errInfo }}</span>
                <div class="loginBtn"><button v-on:click="submit(username, password)" :disabled="disabled">{{ btntext }}</button></div>
                <div class="bottomBtn">
                  <span class="botToRegister">立即注册</span>
                  <span class="botTofind">找回密码</span>
                </div>
            </div>`,
  methods: {
    close() {
      ModalBox.loginModalStatus = false;
    },
    onblur(msg) {
      if (msg === '') this.errInfo = '帐号密码不能为空';
      else this.errInfo = '';
    },
    submitState() {
      this.errInfo = '';
      this.disabled = true;
      this.btntext = '登录中';
    },
    submit(un, pwd) {
      var _this = this;
      if (un === '' || pwd === '') {
        this.errInfo = "帐号密码不能为空";
      } else {
        this.submitState();
        $.ajax({
          url: './sign.json',
          type: 'post',
          dataType: 'json',
          async: false,
          data: {
            username: un,
            password: pwd
          },
          success: function (data) {
            //2001成功返回数据
            if (data.rescode == 2001) {
              _this.close();
              var robotData = new Array();
              //设备信息排序 在线排在前
              if (data.resbody.eqInfo.length > 0) {
                for (var i = 0; i < data.resbody.eqInfo.length; i++) {
                  if (data.resbody.eqInfo[i].state === true) robotData.unshift(data.resbody.eqInfo[i]);
                  if (data.resbody.eqInfo[i].state === false) robotData.push(data.resbody.eqInfo[i]);
                }
              }
              if (data.resbody.userInfo.userName) {
                //完善了个人信息 登录状态为true
                login.status = true;
                //robot实例赋值设备信息
                robot.robotData = robotData;
              } else {
                //没有完善个人信息
                ModalBox.stuInfoStatus = true;
                //临时储存设备信息
                ModalBox.loginTempData = robotData;
              }
            } else {
              alert("服务器开小差啦~deng deng deng")
            }
          },
          error: function () {
            alert("服务器开小差啦~deng deng deng")
          }
        });

      }
    }
  }
});

var registerModal = Vue.component('register-modal', {
  props: ['post'],
  data: function () {
    return {
      errInfo: '',
      unstate: false,
      pwdstate: false,
      cpwdstate: false,
      prostate: false,
      disabled: false,
      btntext: '立即注册',
      username: '',
      password: '',
      userproperty: '',
      confirmpwd: '',
      protext: [{ name: "学生", attr: 'student' }, { name: "学校", attr: 'school' }, { name: "机构", attr: 'educational' }],
      curPro: null
    }
  },
  template: `<div class="login registerWrap">
                <span class="close" v-on:click="close()"><i class="fa fa-times-circle"></i></span>
                <div class="modalhead">aieggy | 欢迎注册</div>
                <ul class="enterWrap">
                  <li class="inputList"><span class="faIcon"><i class="fa fa-user"></i></span><input v-model="username" v-on:blur="onblur(username, 'un')" class="username" type="text" placeholder="请输入用户名" /></li>
                  <li class="inputList"><span class="faIcon"><i class="fa fa-lock"></i></span><input v-model="password" v-on:blur="onblur(password, 'pwd')" class="password" type="password" placeholder="请输入密码" /></li>
                  <li class="inputList"><span class="faIcon"><i class="fa fa-unlock-alt"></i></span><input v-model="confirmpwd" v-on:blur="onblur(confirmpwd, 'cpwd')" class="confirmpwd" type="password" placeholder="请确认密码" /></li>
                  <ul class="propertyWrap">
                    <li v-for="(item, index) in protext" v-on:click="userproperty = item.attr; curPro = index" v-bind:class="{ prolist: true, curPro: curPro === index }">{{ item.name }}</li>
                  </ul>
                </ul>
                <span class="errInfo">{{ errInfo }}</span>
                <div class="loginBtn"><button v-on:click="submit(username, password, userproperty)" :disabled="disabled">{{ btntext }}</button></div>
                <div class="bottomBtn">
                  <span class="botToLogin">登录</span>
                </div>
            </div>`,
  methods: {
    close() {
      //remove login data update state
      ModalBox.registerModalStatus = false;
    },
    submit(un, pwd, pro) {
      var _this = this;
      if (this.userproperty === '') this.errInfo = '请选择注册属性:学生、老师、机构';
      else this.errInfo = '';
      if (this.unstate && this.pwdstate && this.cpwdstate && this.userproperty !== '') {
        console.log(this.username, this.password, this.userproperty);
        this.btntext = '注册中';
        this.disabled =  true;
        $.ajax({
          url: './register.json',
          type: 'post',
          async: false,
          data: {
            username: un,
            password: pwd,
            userproperty: pro
          },
          success: function (data) {
            if (data.rescode == 200) {
              _this.close();
              ModalBox.loginModalStatus = true;
            } else {
              alert('服务器开小差啦~deng deng deng');
            }
          },
          error: function () {
            alert('服务器开小差啦~deng deng deng')
          }
        });
      }
    },
    //失去焦点判断输入值是否合法
    onblur(msg, el) {
      switch (el) {
        case 'un':
          var reg = /^[a-zA-Z0-9]{4,11}$/;
          if (reg.exec(msg)) {
            this.errInfo = '';
            this.unstate = true;
          }
          else {
            this.errInfo = '用户名示例(4-11位字母和数字):eggtoy123';
            this.unstate = false;
          }
        break;
        case 'pwd':
          var reg = /^.{6,20}$/;
          if (reg.exec(msg)) {
            this.errInfo = '';
            this.pwdstate = true;
          }
          else {
            this.errInfo = '密码长度6-20位';
            this.pwdstate = false;
          }
        break;
        case 'cpwd':
          if (msg === this.password) {
            this.errInfo = '';
            this.cpwdstate = true;
          }
          else {
            this.errInfo = '两次输入的密码不一致';
            this.cpwdstate = false;
          }
        break;
      }
    },
  }
});

var stuInfo = Vue.component('stuinfo-modal', {
  props: ['post'],
  data: function () {
    return {
      count: 1,
      name: '',
      imgsrc: './img/vm.png',
      sex: '',
      year: '2000',
      month: '10',
      day: '10',
      grade: '',
      errInfo: '还没有创建完成哦~~',
      disabled: false
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
                  <span v-if="disabled" class="errInfo">{{ errInfo }}</span>
                  <button class="next" v-on:click="next()">创建角色{{ count }}/4</button>
                </div>
              </div>
            </div>
            `,
  methods: {
    close() {
      ModalBox.stuInfoStatus = false;
    },
    next() {
      switch (this.count) {
        case 1:
          if (this.name === '') this.disabled = true;
          else {
            this.disabled = false;
            this.count++;
          }
        break;
        case 2:
          if (this.sex === '') this.disabled = true;
          else {
            this.disabled = false;
            this.count++;
          }   
        break;
        case 3:
          this.count++;
        break;
        case 4:
          if (this.grade === '') this.disabled = true;
          else {
            this.disabled = false;
            //提交创建的个人信息
            console.log(this.name, this.imgsrc, this.year + '/' + this.month + '/' + this.day, this.sex, this.grade);
            login.status = true;
            robot.robotData = ModalBox.loginTempData;
            this.close();
          }
        break;
      }
    },
    getGrade(gra, nm) {
      this.grade = gra;
      this.imgsrc = './img/vm' + this.sex + nm + '.png';
    }
  }
});

//example示例
var exampleModal = Vue.component('example-modal', {
  props: ['post'],
  data: function () {
    return {
      curImg: this.post[0].img,
      curTitle: this.post[0].name,
      curKonw: this.post[0].knowledge,
      curDif: this.post[0].difficulty,
      curStory: this.post[0].story,
      curxml: this.post[0].xml
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
      this.curxml = item.xml;
    },
    showExa() {
      //回到blockly编程页面
      mainNav.toggle(1, 'blocklyCode');
      var loadXml = confirm("是否要将模块替换成:" + this.curTitle);
      if (loadXml) {
        workspace.clear();
        console.log(this.curxml)
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(this.curxml, workspace));
      }
    }
  }
});

//this is addmac component
var addmacModal = Vue.component('addmac-modal', {
  data: function () {
    return {}
  },
  template: `<div class="login addmacModal">
              <span class="close" v-on:click="close()"><i class="fa fa-times-circle"></i></span>
              <div class="modalhead">aieggy | 绑定机器人</div>
              <div class="addmacWrap">
                <span class="macIcon">MAC</span>
                <input class="macInput" type="text" placeholder="请输入MAC地址" />           
              </div>
              <div v-on:click="submit()" class="boundBtn">绑定机器人</div>
            </div>`,
  methods: {
    close() {
      ModalBox.addmacStatus = false;
    },
    submit() {
      var mockData = { "name": "蛋仔9", "deviceId": "111111", "flag": true };
      if (robot.robotData === null) {
        robot.robotData = [mockData];
      } else {
        if (mockData.flag === true) {
          robot.robotData.unshift(mockData)
        } else {
          robot.robotData.push(mockData)
        }
      }
      this.close();
    }
  }
});

//this is robot component
var robotModal = Vue.component('robot-modal', {
  props: ['post'],
  data: function () {
    return {
      robotonline: './img/robotonline.png',
      robotoffline: './img/robotoffline.png'
    }
  },
  template: `<div class="robotWrap">
              <div class="curRoCard">
                <div v-if="post !== null" class="curRoWrap">
                  <img class="curRoImg" :src="post[0].state === true ? robotonline : robotoffline" />
                  <div class="curRoInfoWrap">
                    <span class="curRoTi">{{ post[0].mac }}</span>
                    <ul class="curRoIfWrap">
                      <li class="curRoIfList">
                        <span class="info">游戏时长</span>
                        <span class="info">{{ post[0].totaltime }}</span>
                        <span class="info">小时</span>
                      </li>
                      <li class="curRoIfList">
                        <span class="info">刷卡次数</span>
                        <span class="info">{{ post[0].totalcard }}</span>
                        <span class="info">次</span>
                      </li>
                      <li class="curRoIfList">
                        <span class="info">行走里程</span>
                        <span class="info">{{ post[0].totalmeters }}</span>
                        <span class="info">米</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <ul class="listWrap">
                <li v-if="post !== null" v-for="(item, index) in post" class="robotlist" v-on:click="changeRo(item, index)">
                  <div class="imgWrap">
                    <img class="listImg" :title="item.mac" :src="item.state ? robotonline : robotoffline" />
                  </div>
                  <span class="listName">{{ item.mac }}</span>
                </li>
                <li v-on:click="addmac()" class="addMac"><i class="fa fa-plus"></i></li>
              </ul>
            </div>`,
  methods: {
    changeRo(item, index) {
      if (item.state) {
        var curItem = item;
        this.post.splice(index, 1);
        this.post.unshift(curItem);
      } else {
        alert('请开启设备');
      }
    },
    addmac() {
      if (login.status) {
        ModalBox.addmacStatus = true;
      } else {
        alert('请登录')
      }
    }
  }
});

var codeModal = Vue.component('code-modal', {
  props: ['post'],
  data: function () {
    return {}
  },
  template: `<div>我是代码呀</div>`
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

var ModalBox = new Vue({
  el: '.ModalBox',
  data: {
    loginModalStatus: false,
    registerModalStatus: false,
    stuInfoStatus: false,
    exampleStatus: false,
    addmacStatus: false,
    login: { count: 3 },
    loginTempData: '',
    register: { count: 4 },
    stuInfo: [{ grade: '小班', name: 'child' }, { grade: '中班', name: 'child' }, { grade: '大班', name: 'child' }, { grade: '一年级', name: 'primary' }, { grade: '二年级', name: 'primary' }, { grade: '三年级', name: 'primary' }, { grade: '四年级', name: 'primary' }, { grade: '五年级', name: 'primary' }, { grade: '六年级', name: 'primary' }, { grade: '七年级', name: 'primary' }, { grade: '八年级', name: 'primary' }, { grade: '九年级', name: 'primary' }],
    example: null
  },
  components: {
    'login-modal': loginModal,
    'register-modal': registerModal,
    'stuinfo-modal': stuInfo,
    'example-modal': exampleModal,
    'addmac-modal': addmacModal
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
  if (ModalBox.loginModalStatus || ModalBox.registerModalStatus || ModalBox.stuInfoStatus || ModalBox.exampleStatus || ModalBox.addmacStatus) {
    mask.css({ 'display': 'block' });
  } else {
    mask.css({ 'display': 'none' });
  }
};