var blocklyDiv = document.getElementById('blocklyDiv');

var workspace = Blockly.inject('blocklyDiv',
  {
    media: './media/',
    toolbox: document.getElementById('toolbox'),
    horizontalLayout: false,
    toolboxPosition: 'start',
    comments: false,
    disable: false,
    zoom:
      {
        controls: true,
        wheel: true,
        startScale: 1,
        maxScale: 1.5,
        minScale: 0.6,
        scaleSpeed: 1.2
      },
    trashcan: true
  });

/* init something */
var blocklyTreeLabel = document.querySelectorAll('.blocklyTreeLabel');
var corlorArr = ["#008c97", "#f5821f", "#fec002", "#d80381", "#01bee6", "#01c1b6"];
for (var i = 1; i < blocklyTreeLabel.length; i++) {
  blocklyTreeLabel[i].style.color = corlorArr[i - 1];
};




/* init something end */
