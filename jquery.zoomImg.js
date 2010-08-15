/*   
 *  © copyright 2010 hax4.in. all rights reserved.
 *
 *  name    : zoomImg
 *  version : 1.0
 *
 *  author  : EragonJ 陳佳隆
 *  email   : EragonJ@hax4.in
 *  website : http://hax4.in
 *  blog    : http://eragonj.hax4.in
 *
 *  
 *  This jquery plugin is used to zoom in selected Images.
 *
 *  All you have to do is set $(SELECTOR).zoomImg(afterWidth,afterHeight)
 *  This plugin will first resize the original images and set width and height as your afterWidth and afterHeight.
 *  And after the user click the bundled selectors, the scene and canvas will fadeIn to zoom in the images.
 */
(function($){

  // Initial point
  $.fn.zoomImg = function(newWidth,newHeight){

    /*
     * Functions about dirty html 
     */
    var html={
      canvas:function()
      {
        return "<div id='"+attributes.canvasID()+"'></div>";
      },
      scene:function()
      {
        return "<div id='"+attributes.sceneID()+"'>"+html.canvas()+"</div>";
      }
    };

    /*
     * Values about attributes used in this script
     */
    var attributes={
      oldWidth:0,
      oldHeight:0,
      newWidth:0,
      newHeight:0,
      _this:null,
      root:null,
      opened:false,
      sceneID:function(){
        return utils.pluginName()+"_scene";
      },
      canvasID:function(){
        return utils.pluginName()+"_canvas";
      }
    };

    /*
     * CSS 
     */
    var css={
      scene:{
        'background-color':'#000',
        'position':'absolute',
        'left':'0px',
        'top':'0px',
        'opacity':'0.9'
      },
      canvas:{
        'background-color':'white',
        'position':'relative',
        'left':function(){
          return (attributes.root.width()-attributes.oldWidth)/2;
        },
        'top':function(){
          return (attributes.root.height()-attributes.oldHeight)/2;
        },
        'background-image':function(){
          return "url('"+attributes._this.attr('src')+"')";
        },
        'border':'5px solid #DDD'
      }
    }

    /*
     * About any toolkit
     */
    var utils={
      pluginName:function(){
        return "zoomImg";
      },
      pluginVersion:function(){
        return "1.0";
      },
      pluginAuthor:function(){
        return "EragonJ";
      }
    }

    /*
     * Main functions about zoomImg script
     */
    var zFunctions={
      init:function(){
        attributes.oldWidth  = attributes._this.width();
        attributes.oldHeight = attributes._this.height();
        attributes.root      = ($.browser.msie) ? $("body") : $(window);
      },
      bind:function(){
        if(null==attributes._this)
        {
          return;
        }
        else
        {
          // Resize it to the new value
          attributes._this.width(attributes.newWidth).height(attributes.newHeight);

          attributes._this.click(function(){
            var sceneID  = "#"+attributes.sceneID();
            var canvasID = "#"+attributes.canvasID();
            var root     = attributes.root;
            if(aFunctions.sceneToggle())
            {
              $("body").append(html.scene());
              $(sceneID).width(root.width()).height(root.height()).css(css.scene);
              $(canvasID).width(attributes.oldWidth).height(attributes.oldHeight).css(css.canvas).hide().fadeIn("slow");
            }
            else
            {
              zFunctions.close();
            }
          });
        }
      },
      close:function(){
        var sceneID = "#"+attributes.sceneID();
        attributes.opened = false;
        $(sceneID).remove();
      }
    }

    /*
     * functions about attributes
     */
    var aFunctions={
      // sceneToggle will return opened value to help us when judging
      sceneToggle:function(){
        attributes.opened = (attributes.opened == true ) ? false : true;
        return attributes.opened;
      } 
    };

    // Set the default values
    attributes.newWidth  = newWidth;
    attributes.newHeight = newHeight;

    $("#"+attributes.sceneID()).live('click',function(){
      zFunctions.close();
    });

    $("#"+attributes.canvasID()).live('click',function(e){
      // Do nothing
    });

    return this.each(function(){

      // initialization
      attributes._this = $(this);
      zFunctions.init();

      // Start binding
      zFunctions.bind();
        
    });
  };
})(jQuery);
