// File name: demo.js

import {MyToolkit} from './mytoolkit.js';

// Implement a MyToolkit Button
var btn = new MyToolkit.Button;
btn.setText('click!');
btn.setClickedText('clicked!');
btn.move(100,100);
btn.onclick(function(e){
	console.log(btn.checkClickFlag());
});
console.log(btn.checkState());

// Implement a MyToolkit Checkbox
var checkbox = new MyToolkit.CheckBox;
checkbox.move(100, 100);
checkbox.setText = 'click here!'
checkbox.onclick(function(e){
	console.log(checkbox.checkClickFlag());
});

// Implement a MyToolkit radiobutton
var radbtn = new MyToolkit.Radiobutton;
radbtn.setNumBtns(4);
radbtn.setBtnText('Option 1', 0);
radbtn.setBtnText('Option 2', 1);
radbtn.setBtnText('Option 3', 2);
radbtn.setBtnText('Option 4', 3);
radbtn.move(100,100);

// Implement a MyToolkit textbox
var textbox = new MyToolkit.TextBox;

// Implement a MyToolKit scrollbar
var scrollbar = new MyToolkit.Scrollbar;
scrollbar.setHeight(200);
scrollbar.move(100, 100);