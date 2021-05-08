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
        var circle1 = draw.circle(20).fill('white');
        circle1.stroke({ color: 'blue', opacity: 0.6, width: 2 });
        var circle2 = draw.circle(20).fill('white');
        circle2.stroke({ color: 'blue', opacity: 0.6, width: 2 });
        circle2.move(0,30);

        group.add(circle1);
        group.add(circle2);

        var btnArray = [circle1, circle2];

        return {
            move: function(x, y) {
                group.move(x, y);
            }
        }
    }
return {Button, CheckBox, Radiobutton}
}());

export{MyToolkit}