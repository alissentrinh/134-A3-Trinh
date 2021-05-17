// File name: demo.js

import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.setText('click!');
btn.setClickedText('clicked!');
btn.move(100,100);
btn.onclick(function(e){
	console.log('Button has been clicked');
	console.log(e);
});
btn.onstateChange(function(e){
	console.log('Button state has changed');
	console.log(e);
})


// Implement a MyToolkit Checkbox
var checkbox = new MyToolkit.CheckBox;
checkbox.move(100, 100);
checkbox.setText = 'click here!'
checkbox.onclick(function(e){
	console.log('Checkbox has been clicked')
	console.log(e);
});
checkbox.onstateChange(function(e){
	console.log('Checkbox state has changed');
	console.log(e);
})

// Implement a MyToolkit radiobutton
var radbtn = new MyToolkit.Radiobutton;
radbtn.setNumBtns(4);
radbtn.setBtnText('Option 1', 0);
radbtn.setBtnText('Option 2', 1);
radbtn.setBtnText('Option 3', 2);
radbtn.setBtnText('Option 4', 3);
radbtn.move(100,100);
radbtn.onclick(function(e){
	console.log('Radio Button has been clicked at option (0 - n-1):');
	console.log(e);
})
radbtn.onstateChange(function(e){
	console.log('Radio Button state has changed');
})

// Implement a MyToolkit textbox
var textbox = new MyToolkit.TextBox;
textbox.onType(function(e){
	console.log(e);
})
textbox.onstateChange(function(e){
	console.log(e);
})

// Implement a MyToolKit scrollbar
var scrollbar = new MyToolkit.Scrollbar;
scrollbar.setHeight(200);
scrollbar.move(100, 100);
scrollbar.onclick(function(e){
	console.log('Scroll bar is being moved to y position:');
	console.log(e);
})
scrollbar.onstateChange(function(e){
	console.log('Scroll bar state has changed to:');
	console.log(e);
})

// Implement a MyToolkit progressbar
var progressbar = new MyToolkit.Progressbar;
progressbar.setWidth(200);
progressbar.move(100,100);
progressbar.setIncrement(35);
progressbar.onIncrement(function(e){
	console.log('Progress bar has been incremented to this percentage:');
	console.log(e);
})
progressbar.onstateChange(function(e){
	console.log('Progress bar state:');
	console.log(e);
})
progressbar.setIncrement(35);
progressbar.setIncrement(50);

// Implement a MyToolkit toolbar
var toolbar = new MyToolkit.Toolbar;
toolbar.setNumBtns(3);
toolbar.move(100, 100);
toolbar.setBtnColor('#0000b3', 0)
toolbar.setBtnColor('gold', 2)
toolbar.onclick(function(e){
	console.log('Toolbar Button has been clicked at option (0 - n-1):');
	console.log(e);
})
toolbar.onstateChange(function(e){
	console.log('Toolbar state has changed');
})