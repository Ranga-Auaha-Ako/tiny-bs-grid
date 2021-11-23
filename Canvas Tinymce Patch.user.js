// ==UserScript==
// @name        Canvas Tinymce Patch
// @author      Zac, adapted from Wen's original patch script
// @description Test and use the Canvas Grid Tinymce plugin without installing for account or course.
// @include     /https://canvas\..+/courses/.+/edit/
// @version     1.1
// ==/UserScript==

(function() {
    var myCheck = setInterval(checkTinymce, 1000 );
    function checkTinymce(){
      var setOnce = 0;
      if ( typeof( tinymce )!='undefined' ) {
          clearInterval(myCheck);
          tinymce.EditorManager.editors.forEach(function(editor) {
              if ( setOnce==0 ) {
                  var old_global_settings = tinymce.settings;
                  var settings = editor.settings;
                  ////////////external plugin trial
                  var externalPlugins = settings.external_plugins;
                  var plugins = settings.plugins;
                  var toolbar = settings.toolbar;

                  //add a sample chemistry plugin
                  //debugger
                  toolbar[toolbar.length-1].items.push("canvasgrid");

                  //load external plugin
                  externalPlugins['canvasgrid'] = 'https://ranga-auaha-ako.github.io/tiny-canvas-grid/src/plugin.js';
                  plugins += " canvasgrid";


                  settings.external_plugins = externalPlugins;
                  settings.plugins = plugins;
                  settings.toolbar = toolbar;
                  //console.log( settings );
                  /////////////////
                  //add new settings to tinymce
                  // settings.media_live_embeds=false;
                  tinymce.settings = settings;
                  setOnce = 1;
              }
              tinymce.EditorManager.execCommand('mceRemoveEditor', false, editor.id);
              tinymce.EditorManager.execCommand('mceAddEditor', false, editor.id);

          });
      }
    }

})();
