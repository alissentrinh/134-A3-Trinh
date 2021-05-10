// File name: mytoolkit.js

import {SVG} from './svg.min.js';


var MyToolkit = (function() {
    var Button = function(){
        var draw = SVG().addTo('body').size('300','300');
        var rect = draw.rect(100,50).fill('gold');
        rect.stroke({ color: '#f06', opacity: 0.6, width: 5 });
        var clickEvent = null;
        var defaultText = 'click!';
        var defaultClickedText = 'clicked!';

        var click_flag = 0;
        var btn_state = 0;

        var group = draw.group();

        var text = draw.text(defaultText).attr({x:20, y:5});
        text.font({size: 20, family: 'Helvetica'});
        group.add(rect);
        group.add(text);
        

        group.mouseover(function(){
            if (click_flag==0){
                rect.fill('#e6b800');
            }
            btn_state = 2;
        })

        group.mouseout(function(){
            if (click_flag==0){
                rect.fill('gold');
            }
            btn_state = 0;
        })
        
        group.click(function(event){
            if(click_flag!=0){
                click_flag = 0;
                rect.radius(0);
                rect.fill({ color: 'gold'})
                rect.stroke({color:'#f06'})
                text.text(defaultText);
                btn_state = 0;
            }
            else if (click_flag==0){
                click_flag = 1;
                rect.fill({ color: '#66ccff'})
                rect.stroke({color: 'blue'});
                rect.radius(5);
                text.text(defaultClickedText);
                btn_state = 1;
            }
            if(clickEvent != null)
                clickEvent(event)
        })
        return {
            move: function(x, y) {
                group.move(x, y);
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler;
            },
            setText: function(newText){
                defaultText = newText;
            },
            setClickedText: function(newText){
                defaultClickedText = newText;
            },
            checkClickFlag: function(){
                return click_flag;
            },
            checkState: function(){
                return btn_state;
            }
        }
    }

    // code for creating svg checkbox
    var CheckBox = function(){
        var draw = SVG().addTo('body').size(300,300);
        var group = draw.group();
        var rect = draw.rect(25,25).fill('white');
        rect.stroke({ color: 'blue', opacity: 0.6, width: 2 });

        var defaultText = 'check here!';
        var text = draw.text(defaultText).attr({x:30, y:-4});
        text.font({size: 20, family: 'Helvetica'});

        var tiny_rect = draw.rect(20,20).fill('white');
        tiny_rect.move(2.5,2.5);
        
        group.add(rect);
        group.add(text);
        group.add(tiny_rect);
        
        
        var click_flag = 0;
        var click_event = null;

        group.click(function(event){
            if (click_flag == 0){
                tiny_rect.fill('#66ccff');
                click_flag = 1;
            }
            else{
                tiny_rect.fill('white');
                click_flag = 0;
            }

            if (click_event != null){
                click_event(event);
            }
            
        })

        return {
            move: function(x, y) {
                group.move(x, y);
            },
            setText: function(newText) {
                defaultText = newText;
            },
            checkClickFlag: function() {
                return click_flag;
            },
            checkState: function() {
                return click_flag;
            },
            onclick: function(eventHandler) {
                click_event = eventHandler;
            }
        }
    }

    // code for creating svg radio buttons
    var Radiobutton = function(){
        var draw = SVG().addTo('body').size(300,300);
        var group = draw.group();

        var numButtons = 2;
        var prev_check = null;

        // [ [circle, text, flag]]

        group.click(function(event){
            for(var i=0;i < numButtons; i++){
                if (button_array[i][0] == event.target.instance){
                    // deselect previous button 
                    if (prev_check != null){
                        button_array[prev_check][2] = 0;
                        button_array[prev_check][3].remove();
                        button_array[prev_check].pop();
                    }

                    button_array[i][2] = 1;
                    var check_circle = draw.circle(15).fill('blue');
                    check_circle.move(102.5, i * 30 + 102.5);

                    button_array[i].push(check_circle);
                    prev_check = i;
                
                }
            }
                    
        })

        var button_array = [];

        return {
            move: function(x, y) {
                group.move(x, y);
            },
            setNumBtns: function(numBtns) {
                numButtons = numBtns;
                var temp_move = 0; 
                for(var i=0;i < numButtons; i++){
                    var circle = draw.circle(20).fill('white');
                    circle.stroke({ color: 'blue', opacity: 0.6, width: 2 });
                    circle.move(0,temp_move);
                    button_array.push([circle, '', 0]);
                    temp_move = temp_move + 30;
                    group.add(circle);

                }
                
            },
            // needs text and which circle, starting from 0 - n-1 top down
            setBtnText: function(text, num_circle) {
                var circle_array = button_array[num_circle];
                circle_array[1] = text;
                var text = draw.text(text).attr({x:27, y: num_circle * 30 - 6});
                text.font({size: 18, family: 'Helvetica'});
                group.add(text); 
            },
            checkSelection: function() {
                for (var i = 0; i < numButtons; i++){
                    if (button_array[i][2] == 1){
                        return i;
                    }
                }
                return -1;
            }
        }
    }

    // code for creating textbox widgets
    var TextBox = function() {
        var draw = SVG().addTo('body').size(300,300);
        // var rect = draw.rect(300,300).fill('white');
        // rect.stroke({ color: 'blue', opacity: 0.6, width: 6});
        
        var textbox = draw.foreignObject(250,250);
        var input_text = '';
        textbox.add(SVG('<input type="text" id="input_text" name="input_text">'));
        console.log(input_text);
    }

    // code for creating scrollbar widgets
    var Scrollbar = function() {
        var draw = SVG().addTo('body').size(300,300);

        var bar_height = 100;
        var bar = draw.rect(15, bar_height).fill('white');
        var inner_bar = draw.rect(12, 25).fill('blue');
        inner_bar.stroke({color:'black', opacity: 0.6, width: 1})
        inner_bar.move(1.5,1);
        bar.stroke({color: 'blue', opacity: 0.6, width: 2})

        var group = draw.group();
        group.add(bar);
        group.add(inner_bar);

        return{
            move: function(x, y) {
                group.move(x, y);
            },
            setHeight: function(h) {
                bar_height = h;
                bar.attr('height', bar_height)
            }
        }
    }
return {Button, CheckBox, Radiobutton, TextBox, Scrollbar}
}());

export{MyToolkit}