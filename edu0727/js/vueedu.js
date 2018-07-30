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
          this.status = false;
          this.sign.splice(0, this.sign.length);
          this.sign.push({ name: '登录', attr: 'tosign' }, { name: '注册', attr: 'register' });
          //清除设备信息及用户信息
          robot.robotData = null;
          ModalBox.userSignInfo = '';
          break;
      }
    }
  },
  watch: {
    status: function () {
      if (this.status) {
        this.sign.splice(0, this.sign.length);
        this.sign.push({ name: '', attr: 'userAvatar' }, { name: '退出登录', attr: 'outSign' });
      } else {
        this.sign.splice(0, this.sign.length);
        this.sign.push({ name: '登录', attr: 'tosign' }, { name: '注册', attr: 'register' });
      }
    }
  }
});
//导航
var fnNav = new Vue({
  el: '.fnNav',
  data: {
    fnNav: [
      { name: '打开', attr: 'open', able: true },
      { name: '我的项目', attr: 'ownProject', able: true },
      { name: '保存', attr: 'save', able: true },
      { name: '示例', attr: 'example', able: true }
    ]
  },
  methods: {
    tag(attr) {
      switch (attr) {
        case 'example':
          ModalBox.noticeMsg = "获取示例中..";
          $.ajax({
            url: './components.json',
            type: 'GET',
            dataType: "json",
            async: false,
            success: function (data) {
              ModalBox.example = data.example;
              ModalBox.exampleStatus = true;
            }
          });
        break;
        case 'save':
          if (login.status) {
            ModalBox.saveStatus = true;
            mainNav.toggle(1, 'blocklyCode');
          } else {
            ModalBox.noticeMsg = "您还没登录呢~";
          }
        break;
        case 'ownProject':
          if (login.status) {
            console.log(ModalBox.userSignInfo.phoneAccount)
            $.ajax({
              url: './selectSave.json',
              type: 'GET',
              dataType: 'json',
              async: false,
              success: function (data) {
                if (data.resbody.saveInfo.length === 0) {
                  ModalBox.noticeMsg = "蛋仔没有检测到您有保存作品哟~"
                } else {
                  ModalBox.projectStatus = true;
                  ModalBox.userProjectData = data.resbody.saveInfo;
                }
              }
            })
          } else {
            ModalBox.noticeMsg = "您还没登录呢~"
          }
        break;
        case 'open':
          
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
    status: false,
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
        function code() {
          loopCount = 0;
          var blocks = workspace.getAllBlocks();
          robot.codeData = Blockly.JavaScript.workspaceToCode(workspace);
        }
        workspace.addChangeListener(code);
      }
      if (this.status) {
        if (attr === this.active) {
          rightSidebar.animate({ 'right': -rightSidebar.innerWidth() + 'px' }, 'fast');
          $('.blocklyCode').animate({ 'width': $('body').width() + 'px' }, 'fast', function () {
            Blockly.svgResize(workspace);
          });
          this.status = false;
        } else {
          this.active = attr;
        }
      } else {
        rightSidebar.animate({ 'right': 0 }, 'fast');
        $('.blocklyCode').animate({ 'width': $('body').width() - rightSidebar.innerWidth() + 'px' }, 'fast', function () {
          Blockly.svgResize(workspace);
        });
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
