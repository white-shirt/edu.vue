
var editor = ace.edit('editor');
var JavaScriptMode = ace.require('ace/mode/javascript').Mode;
editor.session.setMode(new JavaScriptMode());
editor.setTheme('ace/theme/textmate');
editor.setValue('/*enter code here*/');
editor.setShowPrintMargin(false);
var userId = $('#DeviceId').val();
var start = {
  startBtn: $('.start'),
  send: function () {
    if (SetTime.flag()) {
      var userCode = editor.getValue();
      aieggy.codeArr = new Array();
      try {
        eval(userCode);
      }
      catch (err) {
        console.log(err.message);
      }
      if (aieggy.codeArr.length > 0) {
        for (var i = 0; i < aieggy.codeArr.length; i++) {
          aieggy.codeArr[i].data.unshift(i);
        };
        var firstOrder = { "cmd": 0, "data": [aieggy.codeArr.length] }
        aieggy.codeArr.unshift(firstOrder);
      };
      console.log(aieggy.codeArr);
      if (aieggy.codeArr.length > 0) {
        var count = 0;
        function send() {
          // $.ajax({
          //   type: 'POST',
          //   url: 'BlocklyOnenet',
          //   data: {
          //     'deviceId': userId,
          //     'cmd': aieggy.codeArr[count].cmd,
          //     'BlocklyData': aieggy.codeArr[count].data
          //   },
          //   traditional : true,
          //   success: function () {
          //     count++;
          //     t = setTimeout(send, 500);
          //     if (count === aieggy.codeArr.length) {
          //       clearTimeout(t);
          //     }
          //   },
          //   error: function () {
          //     alert('指令遗失到外太空啦，再试一次吧~');
          //   }          
          // })
          if (count <= aieggy.codeArr.length) {
            console.log('')
          }
        };
        send();
      }
    }
  }
};

var description = {
  state: false,
  desBtn: $('.description'),
  desWrap: $('.desWrap'),
  desObj: null,
  tap: function () {
    if (!description.state) {
      description.desWrap.animate({ 'bottom': '0' }, 'fast', 'linear', function () {
        description.state = true;
      });
    } else {
      description.desWrap.animate({ 'bottom': -100 + '%' }, 'fast', 'linear', function () {
        description.state = false;
      });
    }
  },
  init: function () {
    var num = 24;
    var width = $('.desWrap').width();
    var desList = $('<ul class="desList"></ul>');
    desList.css({ 'width': width + 'px', 'height': 92 + '%' });
    description.desWrap.append(desList);
    var listW = width / 4;
    for (var i = 0; i < num; i++) {
      var list = $('<li class="list" data_index="' + i + '">' + '</li>');
      list.index = i;
      list.css({
        'width': listW + 'px',
        'height': listW + 'px',
        'margin-top': '15px',
        'background': 'url(./img/course.png)',
        'backgroundPosition': '0 ' + -listW * i + 'px',
        'backgroundSize': listW + 'px'
      });
      desList.append(list);
    }
    $.ajax({
      url: 'json/description.json',
      datatype: 'json',
      type: 'GET',
      success: function (data) {
        description.desObj = data;
      },
      error: function () {
        alert('代码说明——获取失败');
      }
    })
  },
  click: function () {
    var index = $(this).attr('data_index');
    desBox.init();
    desBox.title.html(description.desObj[index].title);
    desBox.code.html(description.desObj[index].code);
    desBox.codeDes.html(description.desObj[index].description);
  }
};

var desBox = {
  ele: $('.boxWrap'),
  mask: $('.desBoxmask'),
  title: $('.boxTitle'),
  code: $('.boxCode'),
  codeDes: $('.boxCodeDes'),
  init: function () {
    desBox.mask.css({ 'display': 'inline-block' });
    desBox.ele.css({ 'display': 'inline-block' });
  },
  close: function () {
    desBox.mask.css({ 'display': 'none' });
    desBox.ele.css({ 'display': 'none' });
  }
}

description.init();
description.desBtn.click(description.tap);
start.startBtn.click(start.send);
$('.list').click(description.click);
$('.closeBtn').click(desBox.close);

