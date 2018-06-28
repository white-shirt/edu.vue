var stateSwitch = document.querySelectorAll('.stateSwitch');
var signInstate = true;
var retrievestate = false;
var QRcodestate = false;
var getidentifyState = false;
var signIn = document.querySelector('.signIn');
var retrieve = document.querySelector('.retrieve');
var signInBtn = document.querySelector('#signInBtn');
var signInTitle = document.querySelector('.signInTitle');
var forgotPasswordBtn = document.querySelector('.forgotPasswordBtn');
var signInQRcodeBtn = document.querySelector('.signInregisterBtn .routerQRcode');
var retrievebotBackSignInBtn = document.querySelector('.retrievebotBackSignInBtn span');
var mathProblem = document.querySelector('#mathProblem');
var findmathProblem = document.querySelector('#findmathProblem');
var retrieveIdentifyBtn = document.querySelector('#retrieveIdentifyBtn');
var userInfoWrap = document.querySelector(".userInfoWrap");
var userDeviceId = {
	deviceId: '',
	status: false
};
/***************switch to signIn/register/retrieve part***********************/
function Show(e) {
  e.stopPropagation();
  e.preventDefault();
  for (var i = 0; i < stateSwitch.length; i++) {
    stateSwitch[i].classList.remove('show');
    stateSwitch[i].classList.add('hide');
  }
  var _this = document.querySelector('.' + this.getAttribute('router'));
  _this.classList.remove('hide');
  _this.classList.add('show');
  switch (this.getAttribute('router')) {
    case 'signIn':
      signInTitle.innerHTML = "登录";
      signInstate = true;
      retrievestate = false;
      QRcodestate = false;
      break;
    case 'retrieve':
      signInTitle.innerHTML = "找回密码";
      signInstate = false;
      retrievestate = true;
      QRcodestate = false;
      break;
    case 'weChatSignIn':
      signInstate = false;
      retrievestate = false;
      QRcodestate = true;
      window.location.href = 'http://eggtoy.51118518.com/wxLogin';
      break;
  }
  console.log("跳转到" + "-----" + this.getAttribute('router'));
};
/**********************switch to signIn/register/retrieve part end*****************/

/************************initmathAnswer*********************************/
var num1, num2, num3;
function initmathAnswer() {
	num1 = parseInt(10 * Math.random());
	num2 = parseInt(10 * Math.random());
	num3 = parseInt(10 * Math.random());
	findmathProblem.innerHTML = num1 + "+" + num2 + "+" + num3 + "=" + "?";
}
initmathAnswer();      
/****************************initmathAnswer end******************************/

/***************************switch Btn addEventListener*************************/
signInQRcodeBtn.addEventListener('click', Show, false);
forgotPasswordBtn.addEventListener('click', Show, false);
retrievebotBackSignInBtn.addEventListener('click', Show, false);
/**********************switch Btn addEventListener end*************************/

/**********************check phone number*************************************/
var curphoneNum;
var onblurEle;
var errorInfo;
function Checkphone() {
  var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (signInstate) {
    onblurEle = document.querySelector('#signInUsername');
  } else if (retrievestate) {
    onblurEle = document.querySelector('#findPdphoneNum'); 
  }
  errorInfo = onblurEle.nextElementSibling;
  if (JSON.parse(localStorage.getItem("eggtoyEdu"))) {
    curphoneNum = JSON.parse(localStorage.getItem("eggtoyEdu")).name;
    onblurEle.value = JSON.parse(localStorage.getItem("eggtoyEdu")).name;
  } else {
    curphoneNum = onblurEle.value;
  }
  if (curphoneNum === '') {
    errorInfo.innerHTML = "手机号不能为空";
    errorInfo.style.display = "inline-block";
  } else {
    /* phoneNum is right */
    if (reg.exec(curphoneNum)) {
      errorInfo.style.display = "none";
      return true;
    } else {
      errorInfo.innerHTML = "手机号格式不正确";
      errorInfo.style.display = "inline-block";
    }
  }
};
/************************check phone number end*******************************/

/****************************check mathProblem**************************************/
var findmathAnswervalue;
function checkmathProblem() {
	if (retrievestate) {
		var findmathAnswerVal = "" + (num1 + num2 + num3);
		findmathAnswervalue = document.querySelector('#findmathAnswer').value;
		var findmathError = document.querySelector('.findmathError');
		/* checkmathProblem is right */
		if (findmathAnswerVal === findmathAnswervalue) {
			findmathError.style.display = "none";
			return true;
		} else {
			findmathError.style.display = "inline-block";
		}
	}
}
findmathProblem.addEventListener('click', initmathAnswer, false);
/*****************************check mathProblem end******************************/

/*****************************check identifycode*********************************/
var retrieveIdentifyBtn = document.querySelector('#retrieveIdentifyBtn');
var gettedidentify = "我爱你";
function checkidentifyCode() {
	if (retrievestate) {
		var retrieveIdentifyValue = document.querySelector("#retrieveIdentifyCode").value;
		var retrieveIdentifyError = document.querySelector('.retrieveIdentifyError');
		/* identifyCode is right */
		if (gettedidentify == retrieveIdentifyValue) {
			retrieveIdentifyError.style.display = "none";
			return true;
		} else {
			retrieveIdentifyError.style.display = "inline-block";
		}
	}
};
function getidentify() {
if (retrievestate) {
		if (!getidentifyState) {
			getidentifyState = true;
			if (Checkphone() && checkmathProblem()) {
				Countdown(retrieveIdentifyBtn);
				console.log("发验证码给" + "-----" + curphoneNum);
				$.ajax({
					url : 'phone',
					type : 'post',
					data : {
						username : curphoneNum
					},
					success : function(result) {
						console.log(result.success);
						if (result.success) {
							gettedidentify = result.success;
						} else {
							alert(result.error);
						}
					},
					error : function() {

					}
				});
			}
		}
	}
};
function Countdown(ele) {
	var count = 90;
	var countTimer;
	ele.innerHTML = count + "s后可重发";
	ele.style.background = "rgb(105, 105, 105)";
	countTimer = setInterval(function() {
		count--;
		ele.style.background = "rgb(105, 105, 105)";
		ele.innerHTML = count + "s后可重发";
		if (count === 0) {
			clearInterval(countTimer);
			getidentifyState = false;
			ele.style.background = "rgb(255, 200, 0)";
			ele.innerHTML = "获取短信验证码";
		}
	}, 1000);
}
retrieveIdentifyBtn.addEventListener('click', getidentify, false);
/**************************check identifycode end*****************************/

/**************************signInpart click signInBtn toSignIn**********************/
function getUserInfo(result) {
  var gettedData = result;
  var useravatar = document.querySelector(".useravatar");
  var userName = document.querySelector(".userName");
  var userBirthday = document.querySelector(".userBirthday");
  var userGrade = document.querySelector(".userGrade");
  var userAge = document.querySelector(".userAge");
  var userSex = document.querySelector(".userSex");
	for (var i = 0; i < stateSwitch.length; i++) {
		stateSwitch[i].classList.remove('show');
		stateSwitch[i].classList.add('hide');
	}
	userInfoWrap.classList.remove('hide');
	userInfoWrap.classList.add('show');
	signInTitle.innerHTML = "欢迎回来";
	signInUsername.value = "";
	signInPassword.value = "";
	if (gettedData.useravatar) {
		useravatar.style.background = "url(" + result.useravatar + ")";  
	} else {
		useravatar.style.background = "url(" + gettedData.uImg + ")";
	}	
	useravatar.style.backgroundSize = "100% 100%";
	userName.innerHTML = gettedData.userName || "蛋玩科技";
	userBirthday.innerHTML = gettedData.userBirthday || "2-29";
	userGrade.innerHTML = gettedData.userGrade || "幼儿园";
	userAge.innerHTML = gettedData.userAge + "岁" || "8岁";
	userSex.innerHTML = gettedData.userSex || "男";
	userDeviceId.deviceId = gettedData.deviceId;
	console.log(userDeviceId.deviceId);
	signInBtn.innerHTML = "登 录";
	signInBtn.style.background = "rgb(255, 200, 0)";
};
var postPassword;
function toSignIn() {
	Checkphone();
	if (JSON.parse(localStorage.getItem("eggtoyEdu"))) {
    postPassword = JSON.parse(localStorage.getItem("eggtoyEdu")).pwd;
  } else {
    postPassword = document.querySelector('#signInPassword').value;
  }
	if (Checkphone() == true) {
		signInBtn.innerHTML = "登录中.....";
		signInBtn.style.background = "#888";
		$.ajax({
			url : "login",
			type : "POST",
			data : {
				phoneAccount : curphoneNum,
				password : postPassword
			},
			success : function(result) {
				console.log(result)
				if (result.success) {
					checkStorage(curphoneNum, postPassword);
					getUserInfo(result);
				};
				if (result.error) {
					alert("手机号或密码有误");
					signInBtn.innerHTML = "登 录";
					signInBtn.style.background = "rgb(255, 200, 0)";
				};
			},
			error : function() {
        signInBtn.innerHTML = "登 录";
        signInBtn.style.background = "rgb(255, 200, 0)";
        alert("请检查您的网络");
			}
		});
	}
};
signInBtn.addEventListener('click', toSignIn, false);
/*************************signInpart click signInBtn toSignIn end*******************************/

/****************************retrievepart click confirmModifyBtn*******************************/
var confirmModifyBtn = document.querySelector('#confirmModifyBtn');
var newPasswordError = document.querySelector('.newPasswordError');
function checkPwd() {
  var newPasswordValue = document.querySelector('#newPassword').value;
  if (newPasswordValue === '') {
    newPasswordError.style.display = "inline-block";
    newPasswordError.innerHTML = "密码不能为空";
  } else if (newPasswordValue.length >= 10){
    newPasswordError.style.display = "inline-block";
    newPasswordError.innerHTML = "密码长度1-9";
  } else if (newPasswordValue.indexOf(" ") !== -1) {
    newPasswordError.style.display = "inline-block";
    newPasswordError.innerHTML = "密码中不能有空格";  
  } else {
    newPasswordError.innerHTML = "";
    newPasswordError.style.display = "none";
    return true;
  }  
};
function tofindPassword() {
	var newPasswordValue = document.querySelector('#newPassword').value;
	if (Checkphone() && checkmathProblem() && checkidentifyCode() && checkPwd()) {
		$.ajax({
			url : 'modifications',
			type : 'post',
			data : {
				phoneAccount : curphoneNum,
				password : newPasswordValue
			},
			success : function(result) {
				if (result.success) {
					console.log("找回密码" + curphoneNum + "---" + newPasswordValue);
					for (var i = 0; i < stateSwitch.length; i++) {
						stateSwitch[i].classList.remove('show');
						stateSwitch[i].classList.add('hide');
					}
					signIn.classList.remove('hide');
					signIn.classList.add('show');
					signInstate = true;
				};
				if (result.error) {
					alert("请检查您的手机号是否已注册");
				}
			},
			error : function() {
				alert("请检查您的网络");
			}
		});
	}
}
confirmModifyBtn.addEventListener('click', tofindPassword, false);
/**************************retrievepart click confirmModifyBtn end*********************************/

/***************************modify userInfo*******************************************/
var midifyUserInfo = document.querySelector(".midifyUserInfo");
var mask = document.querySelector(".mask");
var UsInfoBox = document.querySelector(".UsInfoBox");
var closeBox = document.querySelector(".closeBox");
var upImage = document.querySelector("#upImage");
var upedImg = document.querySelector(".upedImg");
var newError = document.querySelector(".newError");
midifyUserInfo.onclick = function (e) {
  e.preventDefault();
  e.stopPropagation();
  UsInfoBox.style.display = "block";
  mask.style.display = "block";
};
closeBox.onclick = function (e) {
  e.preventDefault();
  e.stopPropagation();
  UsInfoBox.style.display = "none";
  mask.style.display = "none";
};

var modifyInfo = new Object();
modifyInfo.Name = null;
modifyInfo.Birthday = null;
modifyInfo.Grade = null;
modifyInfo.Age = null;
modifyInfo.Sex = null;

upImage.addEventListener("change", function(e) {
	var files = this.files;
	console.log(curphoneNum)
	if (files) {
		var reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload = function(e) {
			var fileSize = e.total / 1024;
			if (fileSize > 50) {
				alert("文件大小超过了50KB,变小点再传一次吧!");
				return;
			}
			var result = this.result;
			upedImg.style.background = "url(" + result + ")";
			upedImg.style.backgroundSize = "100% 100%";
			modifyInfo.Image = result;
			/*
			 * ajax upload userImage
			 */
			var formData = new FormData($("#upImage")[0]);
			$.ajax({
				url : 'uploading/' + curphoneNum, /* 这是处理文件上传的servlet */
				type : 'POST',
				data : formData,
				async : false,
				cache : false,
				contentType : false,
				processData : false,
				success : function(returndata) {
					console.log(returndata);
				},
				error : function(returndata) {
					console.log(returndata);
				}
			});
		}
	}
}, false);

var uploadNewInfo = document.querySelector(".uploadNewInfo");
uploadNewInfo.onclick = function(e) {
	e.preventDefault();
	e.stopPropagation();
	getNewInfo();
	$.ajax({
		url : "Personal",
		type : "POST",
		data : {
			userName : modifyInfo.Name,
			userBirthday : modifyInfo.Birthday,
			userGrade : modifyInfo.Grade,
			userAge : modifyInfo.Age,
			userSex : modifyInfo.Sex,
			phoneAccount : curphoneNum
		},
		success : function() {
      UsInfoBox.style.display = "none";
      mask.style.display = "none";
      toSignIn();
		},
		error : function() {

		}
	});
};
function getNewInfo() {
  var newUsNameVal = document.querySelector("#newUsName").value.replace(/ /g, '') || "蛋玩科技";
  var newUsMonthVal = document.querySelector("#newUsMonth").value || "2";
  var newUsDayVal = document.querySelector("#newUsDay").value || "29";
  var newUsGradeVal = document.querySelector("#newUsGradeSel").value || "幼儿园";
  var newUsAgeVal = document.querySelector("#newUsAge").value || "8岁";
  var newUsSexVal = document.querySelector("#newUsSex").value || "男";
  if (newUsMonthVal * 1 > 12 || newUsMonthVal * 1 <= 0) {
    newUsMonthVal = 2;
  };
  if (newUsDayVal * 1 > 31 || newUsDayVal * 1 <= 0) {
    newUsDayVal = 29;
  };
  if (newUsAgeVal * 1 > 100 || newUsAgeVal * 1 < 0) {
    newUsAgeVal = "8岁";
  };
  modifyInfo.Name = newUsNameVal;
  modifyInfo.Birthday = newUsMonthVal + "-" + newUsDayVal;
  modifyInfo.Grade = newUsGradeVal;
  modifyInfo.Age = newUsAgeVal;
  modifyInfo.Sex = newUsSexVal;
  console.log(modifyInfo);
};
/************************************modify userInfo end***************************************/

/***********************************auto login*****************************************/
function checkStorage(Username, Userpwd) {
  if (window.localStorage) {
    var userInfoObj = {
      name: Username,
      pwd: Userpwd
    };
    localStorage.setItem("eggtoyEdu", JSON.stringify(userInfoObj));
  }
};
// function signOut() {
// 	localStorage.removeItem("eggtoyEdu");
// 	for (var i = 0; i < stateSwitch.length; i++) {
// 		stateSwitch[i].classList.remove('show');
// 		stateSwitch[i].classList.add('hide');
// 	}
// 	signIn.classList.remove('hide');
// 	signIn.classList.add('show');
// };
// document.querySelector('.signOut').addEventListener('click', signOut, false);
// if (userDeviceId.status === false){
// 	if (localStorage.getItem("eggtoyEdu")) {
// 			toSignIn();
// 	}
// }
var hrefData = {
	DataObj: function () {
    var href = window.location.href;
    var index = href.indexOf('?');
    var DataStr = decodeURI(href.substr(index + 1, href.length));
    var DataObj = JSON.parse(DataStr);
    console.log(DataStr);
    console.log(DataObj);
    return DataObj;
	}
}

if (hrefData.DataObj()) {
	getUserInfo(hrefData.DataObj());
}
/********************************auto login end*************************************/



/*******************************choose equipment************************************/


/*****************************choose equipment end*********************************/
