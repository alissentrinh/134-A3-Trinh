// File name: mytoolkit.js

import {SVG} from './svg.min.js';


var MyToolkit = (function() {
    var Button = function(){
        var draw = SVG().addTo('body').size('300','300');
        var rect = draw.rect(100,50).fill('gold');
        rect.stroke({ color: '#f06', opacity: 0.6, width: 5 });
        var clickEvent = null;
        var stateEvent = null;
        var defaultText = 'click!';
        var defaultClickedText = 'clicked!';

        // flag, 0 = not clicked, 1 = is clicked
        var click_flag = 0;

        // 0 = not clicked, not hovered, 1 = clicked, 2 = hovered, not clicked
        // 3 = hovered, clicked, 4 = not hovered, clicked
        var btn_state = 0;

        var group = draw.group();

        var text = draw.text(defaultText).attr({x:20, y:5});
        text.font({size: 20, family: 'Helvetica'});
        group.add(rect);
        group.add(text);
        

        group.mouseover(function(event, state){
            if (click_flag==0){
                rect.fill('#e6b800');
                btn_state = 2;
            }
            else{
                btn_state = 3;
            }
            
            state = btn_state;
            if (stateEvent != null){
                stateEvent(state);
            }
        })

        group.mouseout(function(event, state){
            if (click_flag==0){
                rect.fill('gold');
                state = 0;
            }
            else{
                state = 4;
            }
            if (stateEvent != null){
                stateEvent(state);
            }

        })
        
        group.click(function(event, clicked, state){
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
            clicked = click_flag;
            if(clickEvent != null)
                clickEvent(clicked);

            state = btn_state;
            if (stateEvent != null){
                stateEvent(state);
            }
            
        })
        return {
            move: function(x, y) {
                group.move(x, y);
            },
            onclick: function(eventHandler){
                clickEvent = eventHandler;
            },
            onstateChange: function(eventHandler) {
                stateEvent = eventHandler;
            },
            setText: function(newText){
                defaultText = newText;
            },
            setClickedText: function(newText){
                defaultClickedText = newText;
            }
        }
    }

    // code for creating svg checkbox widgets
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

        // 1 = clicked, 0 = not clicked, default state
        var click_event = null;
        var stateEvent = null;

        group.click(function(event, clicked){
            if (click_flag == 0){
                tiny_rect.fill('blue');
                click_flag = 1;
            }
            else{
                tiny_rect.fill('white');
                click_flag = 0;
            }

            if (click_event != null){
                clicked = click_flag;
                click_event(clicked);
            }
            if (stateEvent != null){
                stateEvent(clicked);
            }
            
        })

        return {
            move: function(x, y) {
                group.move(x, y);
            },
            setText: function(newText) {
                defaultText = newText;
            },
            onclick: function(eventHandler) {
                click_event = eventHandler;
            },
            onstateChange: function(eventHandler) {
                stateEvent = eventHandler;
            },
            
        }
    }

    // code for creating svg radio buttons
    var Radiobutton = function(){
        var draw = SVG().addTo('body').size(300,300);
        var group = draw.group();

        var numButtons = 2;
        var prev_check = null;

        // 0 if none are checked *default, 1 if one button is checked
        var state = null;
        var click_event = null;
        var stateEvent = null;

        // [ [circle, text, flag, inner circle if checked] ]

        group.click(function(event, clicked){
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

                    if (click_event != null){
                        clicked = prev_check;
                        click_event(clicked);
                    }
                    if (stateEvent != null){
                        stateEvent(clicked);
                    }
                
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

                // if no radio buttons are checked
                return -1;
            },
            onclick: function(eventHandler) {
                click_event = eventHandler;
            },
            onstateChange: function(eventHandler) {
                stateEvent = eventHandler;
            }
            
        }
    }

    // code for creating textbox widgets
    var TextBox = function() {
        var draw = SVG().addTo('body').size(300,300);
        var rect = draw.rect(300,300).fill('white');
        rect.stroke({ color: 'blue', opacity: 0.6, width: 6});
        
        // var textbox = draw.foreignObject(250,250);
        // var input_text = '';
        // textbox.add(SVG('<input type="text" id="input_text" name="input_text">'));
        // console.log(input_text);
    }

    // code for creating scrollbar widgets
    var Scrollbar = function() {
        var draw = SVG().addTo('body').size(300,300);

        var bar_height = 100;
        var bar = draw.rect(15, bar_height).fill('white');
        var inner_bar = draw.rect(12, 40).fill('blue');
        inner_bar.stroke({color:'black', opacity: 0.6, width: 1})
        inner_bar.move(1.5,1);
        bar.stroke({color: 'blue', opacity: 0.6, width: 2})

        var group = draw.group();
        group.add(bar);
        group.add(inner_bar);

        // if user has clicked on the inner bar = 1, else 0
        var clicked_flag = 0;

        // click_event returns y position of inner bar
        var click_event = null;

        // stateEvent = 0 if bar not being interacted with
        // 1 if bar is being moved
        // 2 if bar is being moved while cursor in the outer box
        // 3 if bar is at an end point
        var stateEvent = null;
        var prev_state = null;

        inner_bar.mousedown(function(event, state){
            inner_bar.fill('#0000b3');
            clicked_flag = 1;
            if (stateEvent != null){
                state = 1;
                if (prev_state != state){
                    stateEvent(state)
                }
                prev_state = state;
                
            }
        })

        inner_bar.mousemove(function(event, movement, state){
            if (clicked_flag == 1){
                if (inner_bar.attr('y') > bar.attr('y')){
                    if (inner_bar.attr('y') < bar.attr('y') + bar_height - 40){
                        if (event.layerY > bar.attr('y') && (event.layerY < bar.attr('y')+bar_height - 40)){
                            inner_bar.attr('y', event.layerY);
                            if (click_event != null){
                                movement = inner_bar.attr('y');
                                click_event(movement);
                            }
                            if (stateEvent != null){
                                state = 1;
                                if (prev_state != state){
                                    stateEvent(state)
                                }
                                prev_state = state;
                            }
                        }
                        else{
                            if (event.layerY <= bar.attr('y')){
                                inner_bar.attr('y', bar.attr('y') + 1);
                            }
                            else{
                                inner_bar.attr('y', bar.attr('y')+bar_height - 41);
                            }
                            if (stateEvent != null){
                                state = 3;
                                if (prev_state != state){
                                    stateEvent(state)
                                }
                                prev_state = state;
                            }
                        }
                        
                    }
                    
                }
                
            }
        })

        inner_bar.mouseup(function(event, state){
            inner_bar.fill('blue');
            clicked_flag = 0;

            if (stateEvent != null){
                state = 0;
                if (prev_state != state){
                    stateEvent(state)
                }
                prev_state = state;
            }
        })

        bar.mousemove(function(event, movement, state){
            if (clicked_flag == 1){
                if (inner_bar.attr('y') > bar.attr('y')){
                    if (inner_bar.attr('y') < bar.attr('y') + bar_height - 40){
                        if (event.layerY > bar.attr('y') && (event.layerY < bar.attr('y')+bar_height - 40)){
                            inner_bar.attr('y', event.layerY);
                            if (click_event != null){
                                movement = inner_bar.attr('y');
                                click_event(movement);
                            }
                            if (stateEvent != null){
                                state = 2;
                                if (prev_state != state){
                                    stateEvent(state)
                                }
                                prev_state = state;
                            }
                        }
                        
                    }
                    
                }
            }
        })

        bar.mouseup(function(event, state){
            if (clicked_flag == 1){
                clicked_flag = 0;
                inner_bar.fill('blue');
                
                if (stateEvent != null){
                    state = 0;
                    if (prev_state != state){
                        stateEvent(state)
                    }
                    prev_state = state;
                }
            }
        })


        return{
            move: function(x, y) {
                group.move(x, y);
            },
            setHeight: function(h) {
                bar_height = h;
                bar.attr('height', bar_height)
            },
            getBarPosition: function() {
                return inner_bar.attr(['x','y']);
            },
            onclick: function(eventHandler) {
                click_event = eventHandler;
            },
            onstateChange: function(eventHandler) {
                stateEvent = eventHandler;
            }

        }
    }

    // code for creating progress bar widgets
    var Progressbar = function() {
        var draw = SVG().addTo('body').size(300,300);

        var bar_width = 100;
        var increment_val = 10;

        var bar = draw.rect(bar_width, 15).fill('white');
        var inner_bar = draw.rect(25, 12).fill('blue');
        inner_bar.stroke({color:'black', opacity: 0.6, width: 1})
        inner_bar.move(1.5,1.5);
        bar.stroke({color: 'blue', opacity: 0.6, width: 2})

        var group = draw.group();
        group.add(bar);
        group.add(inner_bar);

        // inc_event returns -1 if bar has not been incremented
        // 0 - 100 if increment value has changed
        var inc_event = null;

        // stateEvent returns 0 if state has not changed
        // 1 if state has changed
        var stateEvent = null;

        return{
            move: function(x, y) {
                group.move(x, y);
            },
            setWidth: function(w) {
                bar_width = w;
                bar.attr('width', bar_width);
            },
            getBarPosition: function() {
                return inner_bar.attr(['x','y']);
            },
            setIncrement: function(x) {
                if (increment_val == x && stateEvent != null){
                    stateEvent(0);
                }
                else{
                    increment_val = x;
                    inner_bar.attr('width', x * bar_width / 100 )
                    if (stateEvent != null){
                        stateEvent(1);
                    }
                    if (inc_event != null){
                        inc_event(x);
                    }
                }
                
            },
            getIncrement: function() {
                return increment_val;
            },
            onIncrement: function(eventHandler) {
                inc_event = eventHandler;
            },
            onstateChange: function(eventHandler) {
                stateEvent = eventHandler;
            }
            
        }
    }

    var Toolbar = function() {
        var draw = SVG().addTo('body').size(300,300);
        var group = draw.group()

        var prev_check = null;

        var numButtons = 2;

        var button_array = [];

        var checked_color = 'black';

        return{
            move: function(x, y) {
                group.move(x, y);
            },
            setNumBtns: function(numBtns) {
                numButtons = numBtns;
                var temp_move = 0; 
                for(var i=0;i < numButtons; i++){
                    var rect = draw.rect(50, 30).fill('white');
                    rect.stroke({ color: 'blue', opacity: 0.6, width: 2 });
                    rect.move(temp_move,0);
                    button_array.push([rect, 0]);
                    temp_move = temp_move + 50;
                    group.add(rect);

                }
                console.log(button_array);
                
            },
            // needs text and which button, starting from 0 - n-1 top down
            setBtnColor: function(color, num_button) {
                button_array[num_button][0].attr('fill', color);    
            },
            setCheckedColor: function(color) {
                checked_color = color;
            },
            checkSelection: function() {
                for (var i = 0; i < numButtons; i++){
                    if (button_array[i][2] == 1){
                        return i;
                    }
                }

                // if no buttons are checked
                return -1;
            },
            onclick: function(eventHandler) {
                click_event = eventHandler;
            },
            onstateChange: function(eventHandler) {
                stateEvent = eventHandler;
            }
        }
    }
return {Button, CheckBox, Radiobutton, TextBox, Scrollbar, Progressbar, Toolbar}
}());

export{MyToolkit}