// File name: mytoolkit.js

import {SVG} from './svg.min.js';


/** 
 * Interface for classes that represent different widgets that can be rendered
 * 
 * @interface
 */
var MyToolkit = (function() {

    /**
     * Function that creates a button widget by creating a new
     * 300 x 300 body and drawing a clickable rectangle around the middle
     * 
     * The text when the button has not been clicked can be set and changed by the consuming code.
     * The text when the button has been clicked can be set and changed by the consuming code.
     * @namespace Button
     */
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
        
        /**
         * When a mouse goes over the button, if the button has
         * not been pressed yet, the button will become a darker
         * shade of yellow to indicate that it is being hovered over
         */
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
         /**
          * If a button has not been clicked, then when a mouse
          * goes outside of the button space, it will return to the default
          * gold coloring
          */
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
        
        /**
         * If a button has not been clicked, then the button will become 
         * blue and the text will change to the clicked text which is
         * by default "Clicked!" unless it has been set by consuming code.
         * If a button has been clicked, it will "unclick" and return
         * to it's default state.
         */
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
            /**
             * Moves button to inputted (x,y) coordinates on 
             * the button's svg body
             * @param {number} x x-coordinate 
             * @param {number} y y-coordinate
             * @memberof Button
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /**
             * Binds eventHandler to the click event which will run
             * whenever the user clicks on the button
             * @memberof Button
             * @param {function} eventHandler function to be binded to click event
             */
            onclick: function(eventHandler){
                clickEvent = eventHandler;
            },
            /**
             * Binds eventHandler to the state event which will run whenever
             * the button's state is changed
             * {state} | Action to get to state
             * 
             * 0 if button is not clicked
             * 1 if button is clicked
             * @memberof Button
             * @param {eventHandler} eventHandler function to be binded to state event
             */
            onstateChange: function(eventHandler) {
                stateEvent = eventHandler;
            },
            /**
             * Sets the button's default text when it has not been clicked to
             * the inputted string
             * @memberof Button
             * @param {string} newText Text to set button's default text to
             */
            setText: function(newText){
                defaultText = newText;
            },
            /**
             * Sets the button's default text when it has been clicked to
             * the inputted string
             * @memberof Button
             * @param {string} newText Text to set button's default clicked text to
             */
            setClickedText: function(newText){
                defaultClickedText = newText;
            }
        }
    }

    // code for creating svg checkbox widgets
    /**
     * Function that creates a checkbox widget by creating a new
     * 300 x 300 body and drawing a clickable square around the middle
     * with text to it's right
     * 
     * The text next to the checkbox can be set and changed by the consuming code.
     * @namespace CheckBox
     * 
     */
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

        /**
         * If the checkbox has not been clicked, the checkbox will create 
         * a tiny square inside the checkbox to denote that it has been checked.
         * If the checkbox has already been clicked, the checkbox will change
         * the coloring on the tiny rectangle to white, making it blend into the
         * background, denoting that it has been unchecked.
         * 
         */

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
            /**
             * Moves checkbox and it's text to the inputted (x,y) coordinates
             * @param {number} x x-coordinate
             * @param {number} y y-coordinate
             * @memberof CheckBox
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /**
             * Sets the default text to the right of the checkbox to the
             * inputted string
             * @param {text} newText Text to set to the right of the checkbox
             * @memberof CheckBox
             */
            setText: function(newText) {
                defaultText = newText;
            },
            /**
             * Binds  the inputted function to click event that 
             * will run whenever the checkbox has been clicked
             * @param {function} eventHandler function to be binded to click event
             * @memberof CheckBox
             */
            onclick: function(eventHandler) {
                click_event = eventHandler;
            },
            /**
             * Binds the inputted function to state event which will run
             * whenever the checkbox's state changes
             * 
             * {state} | Action to get to state
             * 0 if checkbox is not checked
             * 1 if checkbox is checked
             * @param {function} eventHandler function to be binded to state event
             * @memberof CheckBox
             */
            onstateChange: function(eventHandler) {
                stateEvent = eventHandler;
            }
            
        }
    }

    // code for creating svg radio buttons
    /**
     * Function that creates radio buttons by creating a 
     * 300 x 300 body and drawing n radio buttons vertically 
     * 
     * Users must implement the radio buttons into the HTML document, then 
     * set how many radio buttons to create, otherwise a default of 2 buttons
     * will be generated, by the consuming code. 
     * 
     * The text next to each radio button can be set and changed by the consuming code. 
     * @namespace Radiobutton
     */
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
            /**
             * Moves all Radio buttons to inputted (x,y) coordinates
             * on the svg body
             * @param {number} x x-coordinate
             * @param {number} y y-coordinate
             * @memberof Radiobutton
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /**
             * Sets the number of radio buttons to the inputted number
             * If this is not set by the consuming code, there will only
             * be 2 buttons by default
             * @param {number} numBtns number of radio buttons to create
             * @memberof Radiobutton
             */
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
            /**
             * Sets the text to the right of the inputted button.
             * Buttons are designated by index, top to bottom, the top
             * most button being index 0 and the bottom most button
             * being index n-1, where n is the number of buttons
             * @param {string} text Text to set to the right of the button
             * @param {index} num_circle Index of the button
             * @memberof Radiobutton
             */
            setBtnText: function(text, num_circle) {
                var circle_array = button_array[num_circle];
                circle_array[1] = text;
                var text = draw.text(text).attr({x:27, y: num_circle * 30 - 6});
                text.font({size: 18, family: 'Helvetica'});
                group.add(text); 
            },
            /**
             * Returns the index of the button that is currently selected.
             * Buttons are designated by index, top to bottom, the top
             * most button being index 0 and the bottom most button
             * being index n-1, where n is the number of buttons
             * @returns {index} Index of the button that is selected
             * @memberof Radiobutton
             */
            checkSelection: function() {
                for (var i = 0; i < numButtons; i++){
                    if (button_array[i][2] == 1){
                        return i;
                    }
                }

                // if no radio buttons are checked
                return -1;
            },
            /**
             * Binds  the inputted function to click event that 
             * will run whenever any of the radio buttons has been clicked
             * @param {function} eventHandler function to be binded to click event
             * @memberof Radiobutton
             */
            onclick: function(eventHandler) {
                click_event = eventHandler;
            },
            /**
             * Binds  the inputted function to state event that 
             * will run whenever any of the radio button's state 
             * has been changed
             * 
             * {state} | Action to get to state
             * 0 if no buttons are selected
             * 1 if a button is selected
             * @param {function} eventHandler function to be binded to state event
             * @memberof Radiobutton
             */
            onstateChange: function(eventHandler) {
                stateEvent = eventHandler;
            }
            
        }
    }

    // code for creating textbox widgets
    /**
     * Function that creates a textbox by creating a 300 x 300
     * body and an outline of a rectangle depicting the
     * available area to type. Characters will be outputted to 
     * the left of the carat. Backspace and shift are supported.
     * 
     * Click on the textbox's rectangle to enable typing and a caret will appear. Click
     * on the textbox's rectangle again to disable typing and the caret will disappear. 
     * @namespace Textbox
     */
    var TextBox = function() {
        var draw = SVG().addTo('body').size(300,300);
        var rect = draw.rect(200,30).fill('white');
        rect.stroke({ color: 'blue', opacity: 0.6, width: 3});
        
        var textbox = draw.group();
        var text = textbox.text('Type Here...').move(2,5);
        var caret = textbox.line(45, 2.5, 45, 25).stroke({width: 1, color: 'white'});
        caret.move(85, 3.5);

        var totalChars = 12;
        var maxChars = 30;

        var clicked = 0;

        var textEvent = null;
        var stateEvent = null;

        // state = -1 if typing is not enabled
        // state = 0 if typing is enabled
        var state = -1;


        SVG.on(rect, 'click', (event) => {
            if (clicked == 0){
                caret.stroke({color: 'black'});
                clicked = 1;
                state = 0;
                SVG.on(window, 'keyup', (event) =>{
                    if (event.key == 'Backspace'){
                        if (totalChars == maxChars){
                            state = 0;
                            if (stateEvent != null){
                                stateEvent(state);
                            }
                        }
                        if (totalChars != 0){
                            text.text(text.text().slice(0, -1));
                            caret.move(caret.attr('x1') - 6.5, caret.attr('y1'));
                            totalChars -= 1;
                            if (textEvent != null){
                                textEvent(event.key);
                            }
                            
                        }
                        
                    }
                    else if (event.key == 'Shift'){
                        if (textEvent != null){
                            textEvent(event.key);
                        }
                        
                    }
                    else{
                        if (totalChars < maxChars){
                            text.text(text.text() + event.key);
                            totalChars +=1;
                            if (event.key.toUpperCase() == event.key){
                                caret.move(caret.attr('x1') + 10.5, caret.attr('y1'));
                            }
                            else{
                                caret.move(caret.attr('x1') + 6.5, caret.attr('y1'));
                            }
                            if (textEvent != null){
                                textEvent(event.key);
                            }
                            
                        }
                        else{
                            if (state != 1){
                                state = 1;
                                if (stateEvent != null){
                                    stateEvent(state);
                                }
                            }
                            
                        }
                        
                    }
                    
                    
                    
                    
                })
            }
            else{
                state = -1;
                clicked = 0;
                SVG.off(window, 'keyup');
                caret.stroke({color: 'white'});
            }
            if (stateEvent != null){
                stateEvent(state);
            }
            
        })
        

        return{
            /**
             * Moves the textbox to the inputted (x,y) coordinates
             * in the svg body
             * @param {number} x x-coordinate
             * @param {number} y y-coordinate
             * @memberof Textbox
             */
            move: function(x, y){
                textbox.move(x, y);
            },
            /**
             * Returns the current text in the textbox
             * @returns {string}
             * @memberof Textbox
             */
            getText: function(){
                return text.text();
            },
            /**
             * Binds the inputted function to text event that will run
             * whenever the text inside the textbox is changed
             * @param {function} eventHandler function to be binded to text event
             * @memberof Textbox
             */
            onType: function(eventHandler){
                textEvent = eventHandler;
            },
            /**
             * Binds the inputted function to state event that will run
             * whenever the textbox's state changes
             * 
             * {state} | action to get to state
             * -1 if textbox has typing disabled
             * 0 if textbox has typing enabled
             * 1 if textbox has typing enabled and has reached the character limit
             * @param {function} eventHandler function to be binded to state event
             * @memberof Textbox
             */
            onstateChange: function(eventHandler){
                stateEvent = eventHandler;
            },
            /**
             * Sets the max number of characters that can be typed into the textbox.
             * By default, the max number of characters is 30.
             * 
             * NOTE: This does not change the width of the textbox, meaning if the max
             * is high enough, the characters will bleed outside of the box. 
             * @param {number} max Max characters that can be typed into the textbox
             * @memberof Textbox
             */
            setMaxChars: function(max){
                maxChars = max;
            }
        }

        
    }

    // code for creating scrollbar widgets
    /**
     * Function that creates a scrollbar by creating a 300 x 300
     * body and a verticle rectangle depicting the scrollbar's area
     * and a smaller rectangle inside depicting the actual scrollbar.
     * 
     * The height of the scrollbar can be set and changed by the consuming code. 
     * @namespace Scrollbar
     */
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
            /**
             * Moves the scrollbar to the inputted (x,y) coordinates 
             * in the svg body
             * @param {number} x x-coordinate
             * @param {number} y y-coordinate
             * @memberof Scrollbar
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /**
             * Sets the height of the scrollbar to the inputted number
             * @param {number} h Height of the scrollbar's outer rectangle
             * @memberof Scrollbar
             */
            setHeight: function(h) {
                bar_height = h;
                bar.attr('height', bar_height)
            },
            /**
             * Returns the (x,y) coordinates of the scrollbar's inner bar
             * in respect to the svg body itself
             * @returns {Array} (x,y) coordinates of the inner bar
             * @memberof Scrollbar
             */
            getBarPosition: function() {
                return inner_bar.attr(['x','y']);
            },
            /**
             * Binds the inputted function to click event that will run 
             * whenever the inner bar is clicked
             * @param {function} eventHandler function to be binded click event
             * @memberof Scrollbar
             */
            onclick: function(eventHandler) {
                click_event = eventHandler;
            },
            /**
             * Binds the inputted function to state event that will run
             * whenever the scrollbar's state changes
             * 
             * {state} | Action to get to state
             * 0 if entire scrollbar has not been or is not being interacted with
             * 1 if bar is being moved
             * 2 if bar is being moved while cursor in the outer box
             * 3 if bar is at an end point
             * @param {function} eventHandler function to be binded to state event
             * @memberof Scrollbar
             */
            onstateChange: function(eventHandler) {
                stateEvent = eventHandler;
            }

        }
    }

    // code for creating progress bar widgets
    /**
     * Function that creates a Progressbar by creating a 300 x 300
     * body and a horizontal rectangle depicting the progressbar's area
     * and a smaller rectangle inside depicting the increment of the progressbar
     * or how "filled" the progressbar is.
     *  
     * How filled the progressbar is can be set and changed by the consuming code. 
     * The width of the containing rectangle can be set and changed by the consuming code.
     * 
     * @namespace Progressbar 
     */
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
            /**
             * Moves the progressbar to the inputted (x,y) coordinates in the svg body.
             * @param {number} x x-coordinate
             * @param {number} y y-coordinate
             * @memberof Progressbar
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /**
             * Sets the width of the containing rectangle for the progressbar.
             * @param {number} w width of the progressbar
             * @memberof Progressbar
             */
            setWidth: function(w) {
                bar_width = w;
                bar.attr('width', bar_width);
            },
            /**
             * Returns the (x,y) coordinates in respect to the svg body of the
             * inner bar of the progressbar
             * @returns {Array} (x,y) coordinates of the inner bar
             * @memberof Progressbar
             */
            getBarPosition: function() {
                return inner_bar.attr(['x','y']);
            },
            /**
             * Sets how filled the progressbar should be to
             * the inputted value. The value should be a number
             * between 0 - the width of the progress bar. This value will
             * be converted to a percentage from 0-100%.
             * @param {number} x increment value
             * @memberof Progressbar
             */
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
            /**
             * Returns how filled the Progressbar is. This is the exact increment value and
             * NOT a percentage.
             * @returns {number} increment value
             * @memberof Progressbar
             */
            getIncrement: function() {
                return increment_val;
            },
            /**
             * Binds the inputted function to increment event that runs whenever the progressbar's 
             * increment value changes.
             * @param {function} eventHandler function to be binded to inc event
             * @memberof Progressbar
             */
            onIncrement: function(eventHandler) {
                inc_event = eventHandler;
            },
            /**
             * Binds inputted function to state event that runs whenever the progressbar's state
             * changes.
             * 
             * NOTE: This is different that most other widgets in MyToolkit; state event 
             * returns whether or not the progressbar's state has been changed. This means 
             * that it will return 0 even if setIncrement(x) runs if x is already the
             * current increment value.
             * 
             * {state} | Action to get to state
             * 
             * 0 if bar has not been changed 
             * 1 if bar has been changed, usually because it has been incremented
             * 
             * @param {function} eventHandler function to be binded to state event
             * @memberof Progressbar
             */
            onstateChange: function(eventHandler) {
                stateEvent = eventHandler;
            }
            
        }
    }
    /**
     * Function that creates a toolbar by drawing on a 300 x 300 body
     * and horizontal rectangles, each being a button. These buttons can be clicked on
     * to denote which one will be selected. Only one button can be selected at a time.
     * 
     * Similar to radiobuttons, but instead it is horizontal buttons next to each other.
     * Each button's colours can be changed. The selected button will be denoted by a
     * change of color. The color to denote which button is selected can be
     * set by the consuming code. 
     * @namespace Toolbar
     */
    var Toolbar = function() {
        var draw = SVG().addTo('body').size(300,300);
        var group = draw.group()

        var prev_check = null;

        var stateEvent = null;
        var clickEvent = null;

        var numButtons = 2;

        // [ [rect, color, flag] ]
        var button_array = [];

        var checked_color = 'black';

        group.click(function(event, clicked){
            for(var i=0;i < numButtons; i++){
                if (button_array[i][0] == event.target.instance){
                    // deselect previous button 
                    if (prev_check != null){
                        button_array[prev_check][2] = 0;
                        button_array[prev_check][0].attr('fill', button_array[prev_check][1]);
                    }

                    button_array[i][2] = 1;
                    button_array[i][0].attr('fill', checked_color);

                    prev_check = i;

                    if (clickEvent != null){
                        clicked = prev_check;
                        clickEvent(clicked);
                    }
                    if (stateEvent != null){
                        stateEvent(clicked);
                    }
                
                }
            }
                    
        })

        

        return{
            /**
             * Moves Toolbar to inputted (x,y) coordinates on
             * the svg body
             * @param {number} x x-coordinate
             * @param {number} y y-coordinate 
             * @memberof Toolbar
             */
            move: function(x, y) {
                group.move(x, y);
            },
            /**
             * Sets the number of buttons to create on the toolbar. If not
             * set, the default number of buttons that will be created is 2.
             * @param {number} numBtns Number of buttons to create
             * @memberof Toolbar
             */
            setNumBtns: function(numBtns) {
                numButtons = numBtns;
                var temp_move = 0; 
                for(var i=0;i < numButtons; i++){
                    var rect = draw.rect(50, 30).fill('white');
                    rect.stroke({ color: 'blue', opacity: 0.6, width: 2 });
                    rect.move(temp_move,0);
                    button_array.push([rect, 'white', 0]);
                    temp_move = temp_move + 50;
                    group.add(rect);

                }
                
            },
            /**
             * Sets the inputted button to the inputted color.
             * 
             * Index of the button starts at 0, the leftmost button, and ends with n-1, 
             * the rightmost button, with n being the number of buttons.
             * Color can be inputted either as the english word for the color (i.e 'Blue')
             * or the hex number of the color. If inputting as hex, make sure to include the 
             * '#' before the numbers (i.e #10001111)
             * 
             * By default, buttons will be white until set.
             * @param {(string | hex)} color color either as text or hex 
             * @param {index} num_button Index of the button to change
             * @memberof Toolbar
             */
            setBtnColor: function(color, num_button) {
                button_array[num_button][0].attr('fill', color); 
                button_array[num_button][1] = color;   
            },
            /**
             * Sets the color that the selected button will change into.
             * 
             * Color can be inputted either as the english word for the color (i.e 'Blue')
             * or the hex number of the color. If inputting as hex, make sure to include the 
             * '#' before the numbers (i.e #10001111)
             * 
             * By default, this color is black.
             * @param {{string, hex}} color color either as text or hex
             * @memberof Toolbar 
             */
            setCheckedColor: function(color) {
                checked_color = color;
            },
            /**
             * Returns the index of the currently selected button.
             * Returns -1 if no button is selected.
             * @returns {index} Index of the currently selected button
             * @memberof Toolbar
             */
            checkSelection: function() {
                for (var i = 0; i < numButtons; i++){
                    if (button_array[i][2] == 1){
                        return i;
                    }
                }

                // if no buttons are checked
                return -1;
            },
            /**
             * Binds the inputted function to click event that will run whenever a
             * button has been clicked.
             * @param {function} eventHandler function to be binded to click event
             * @memberof Toolbar
             */
            onclick: function(eventHandler) {
                clickEvent = eventHandler;
            },
            /**
             * Binds the inputted function to state event that will run whenever
             * the Toolbar's state has been changed.
             * 
             * {state} | Action to get to state
             * 
             * @param {function} eventHandler function to be binded to state event
             * @memberof Toolbar
             */
            onstateChange: function(eventHandler) {
                stateEvent = eventHandler;
            }
        }
    }
return {Button, CheckBox, Radiobutton, TextBox, Scrollbar, Progressbar, Toolbar}
}());

export{MyToolkit}