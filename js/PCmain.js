var startEvt, moveEvt, endEvt;
if ('ontouchstart' in window) {
    startEvt = 'touchstart';
    moveEvt = 'touchmove';
    endEvt = 'rouchend';
} else {
    startEvt = 'mousedown';
    moveEvt = 'mousemove';
    endEvt = 'mouseup';
};

/*************************rightsidebarBtn********************************/
var sidebar = {
    state: true,
    width: 500,
    sendBtn: $('.btn'),
    rightSidebar: $('.rightSidebar'),
    PCbg: $('#PCbg'),
    winWidth: $('body').width(),
    sidebarMoveEle: $('.sidebarMove'),
    sidebarMove: function () {
        if (sidebar.state) {
            sidebar.rightSidebar.animate({ 'right': -sidebar.width + 'px' }, 300);
            $('#blocklyDiv').animate({ 'marginRight': '0px' }, 300);
            $('.blocklySvg').width(winWidth);
            sidebar.PCbg.css({ 'width': '100%', 'height': '' });
            setTimeout(function () {
                Blockly.svgResize(workspace);
                sidebar.sendBtn.css({ 'right': '30px' });
            }, 300);
            sidebar.state = false;
        } else {
            setTimeout(function () {
                Blockly.svgResize(workspace);
                sidebar.sendBtn.css({ 'right': '530px' });
                sidebar.PCbg.css({ 'width': '', 'height': '100%' });
            }, 300);
            sidebar.rightSidebar.animate({ 'right': '0px' }, 300);
            $('#blocklyDiv').animate({ 'marginRight': sidebar.width + 'px' }, 300);
            sidebar.state = true;
        }
    }
};

sidebar.sidebarMoveEle.on('click', sidebar.sidebarMove)






/*************************rightsidebarBtn end********************************/


