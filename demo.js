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
radbtn.move(100,100);