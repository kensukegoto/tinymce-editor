tinymce.init({
  selector: 'textarea#textarea_01',
  contextmenu: false,
  forced_root_block: false,
  menubar: false,
  height: 500,
  // contextmenu_never_use_native: true,
  content_style: `
    body { font-family:Helvetica,Arial,sans-serif; font-size:14px }
    .left { text-align: left; }
    .bold { font-weight: bold; } 
    .tablerow1 { background-color: #D3D3D3; }
    .bgBlue { padding: 8px; background-color: #f5e9f7 }
    .bgRed { padding: 8px; background-color: #fee5e5 }
    `,
  formats: {
    bold: { inline: 'span', classes: 'bold' },
    h1: { block: 'h1', classes: 'h1'},
    h2: { block: 'h2', classes: 'h2'},
    para: { block: 'p', classes: 'para'},
    bgBlue : { selector: 'p', classes: 'bgBlue'},
    bgRed : { selector: 'p', classes: 'bgRed'},
  },
  style_formats: [
    { title: '黒枠', selector: 'p', styles: { 'padding': '8px', 'border': '1px solid #333'}, classes: 'bdrBlack'}
  ],
  toolbar: 'undo redo | para bold forecolor | myHeading textBg',
  color_map: [
    '333333', 'Black',
    'FF0000', 'Red',
    '0000FF', 'Blue',
  ],
  custom_colors: false,
  /**
   * 
   * @param {*} editor 
   * 
   */
  setup: function (editor) {

    editor.ui.registry.addButton('para', {
      icon: 'format',
      tooltip: '通常の文字',
      onAction: function (_) {
        editor.execCommand('mceToggleFormat', false, 'p');
      },
      onSetup: function (api) {
        editor.formatter.formatChanged('p', function (state,elem) {
          // console.log(e)
          // api.setActive(state);
        });
      }
    });

    /**
     * 見出し
     */
    editor.ui.registry.addMenuButton('myHeading', {
      text: 'タイトル',
      fetch: function (callback) {
        var items = [
          {
            type: 'menuitem',
            text: '大見出し',
            onAction: function (_) {
              editor.execCommand('mceToggleFormat', false, 'h1');
            },
            onSetup: function (api) {
              editor.formatter.formatChanged('h1', function (state) {
                // api.setActive(state);
              });
            }
          },
          {
            type: 'menuitem',
            text: '中見出し',
            onAction: function (_) {
              editor.execCommand('mceToggleFormat', false, 'h2');
            },
            onSetup: function (api) {
              editor.formatter.formatChanged('h2', function (state) {
                // api.setActive(state);
              });
            }
          },
          {
            type: 'menuitem',
            text: '小見出し',
            onAction: function (_) {
              editor.execCommand('mceToggleFormat', false, 'h3');
            },
            onSetup: function (api) {
              editor.formatter.formatChanged('h3', function (state) {
                // api.setActive(state);
              });
            }
          },
        ];
        callback(items);
      }
    });

    /**
     * 座布団
     */
    editor.ui.registry.addMenuButton('textBg', {
      text: '座布団',
      fetch: function (callback) {
        var items = [
          {
            type: 'menuitem',
            text: '青座布団',
            onAction: function (_) {
              editor.formatter.remove('bgRed');
              editor.formatter.toggle('bgBlue');
            },
            onSetup: function(api) {
              return function() {};
            }
          },
          {
            type: 'menuitem',
            text: '赤座布団',
            onAction: function (_) {
              editor.formatter.remove('bgBlue');
              editor.formatter.toggle('bgRed');
            },
            onSetup: function(api) {
              return function() {};
            }
          }
        ];
        callback(items);
      }, // fetch
    });


    
    // https://www.tiny.cloud/docs/ui-components/contexttoolbar/
    editor.ui.registry.addContextToolbar('textselection', {
      predicate: function (node) {
        return !editor.selection.isCollapsed();
      },
      items: 'bold',
      position: 'selection',
      scope: 'node'
    });
  },



});
