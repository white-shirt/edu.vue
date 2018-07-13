/**
 * @author         [zk]
 * @description    [edu.js]
 * @date           [2018.07.05]
 */
var login = new Vue({
  el: '.signIn',
  data: {
    status: false,
    sign: [
      { name: '登录', attr: 'tosign' },
      { name: '注册', attr: 'register' }
    ]
  },
  methods: {
    signIn(attr) {
      switch (attr) {
        case 'tosign':
          ModalBox.loginModalStatus = true;
          break;
        case 'register':
          ModalBox.registerModalStatus = true;
          break;
        case 'outSign':
          this.sign.splice(0, this.sign.length);
          this.sign.push({ name: '登录', attr: 'tosign' }, { name: '注册', attr: 'register' });
          break;
      }
    }
  },
  watch: {
    status: function () {
      if (this) {
        this.sign.splice(0, this.sign.length);
        this.sign.push({ name: '', attr: 'userAvatar' }, { name: '退出登录', attr: 'outSign' });
      }
    }
  }
});
//导航
var fnNav = new Vue({
  el: '.fnNav',
  data: {
    fnNav: [
      { name: '打开', attr: 'open', able: false },
      { name: '下载', attr: 'download', able: false },
      { name: '发布', attr: 'push', able: false },
      { name: '我的项目', attr: 'ownProject', able: false },
      { name: '保存', attr: 'save', able: true },
      { name: '示例', attr: 'example', able: true }
    ]
  },
  methods: {
    tag(attr) {
      switch (attr) {
        case 'example':
          $.ajax({
            url: './components.json',
            type: 'GET',
            dataType: "json",
            async: false,
            success: function (data) {
              ModalBox.example = data.example;
            }
          });
          ModalBox.exampleStatus = true;
          break;
      }
    }
  }
});

//sidebar
var sidebar = new Vue({
  el: '.sidebarBtnGroup',
  data: {
    active: 'robot',
    status: true,
    indexof: 0,
    sidebars: [
      { name: '机器人', attr: 'robot' , able: true },
      { name: '代码', attr: 'code' , able: true }
    ]
  },
  methods: {
    toggle(attr, index) {
      this.indexof = index;
      var rightSidebar = $('#rightSidebar');
      if (attr === 'robot') {
        robot.robotModalStatus = true;
        robot.codeModalStatus = false;
      }
      if (attr === 'code') {
        robot.codeModalStatus = true;
        robot.robotModalStatus = false;
      }
      if (this.status) {
        if (attr === this.active) {
          rightSidebar.animate({ 'right': -rightSidebar.innerWidth() + 'px' }, 'fast');
          this.status = false;
        } else {
          this.active = attr;
        }
      } else {
        rightSidebar.animate({ 'right': 0 }, 'fast');
        this.active = attr;
        this.status = true;
      }
    }
  }
});

var mainNav = new Vue({
  el: '.mainNav',
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
