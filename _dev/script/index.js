import data from "./data";


const form = document.querySelector("#myForm");
const addBtn = document.querySelector(".btn--add");
const saveBtn = document.querySelector(".btn--save");

data.forEach(item => {
  addTextArea(item.type,item.content);
})

addBtn.addEventListener("click",addTextArea,false);

saveBtn.addEventListener("click",function() {
  tinyMCE.triggerSave();
  const list = form.querySelectorAll("textarea");
  list.forEach(item => {
    console.log(item.value);
  });
});

function addTextArea(type,content){

  const len = form.querySelectorAll("textarea").length;

  const section = document.createElement("section");
  const textarea = document.createElement("textarea");
  textarea.setAttribute("id",`textarea_${len + 1}`);

  let tag;
  if(type && content){
    textarea.value = `<${type}>${content}</${type}>`;
  }

  section.appendChild(textarea);

  form.appendChild(section);

  tinymce.init({
    selector: `textarea#textarea_${len + 1}`,
    plugins: 'paste',
    paste_as_text: true,
    contextmenu: false,
    // forced_root_block: false,　// 改行をpとbrどちらにするか
    menubar: false,
    height: 500,
    // contextmenu_never_use_native: true,
    content_style: `
      body { font-family:Helvetica,Arial,sans-serif; font-size:14px }
      .left { text-align: left; }
      .bold { font-weight: bold; } 
      .bgBlue { padding: 8px; background-color: #f5e9f7 }
      .bgRed { padding: 8px; background-color: #fee5e5 }
      `,
    formats: {
      bold: { inline: 'span', classes: 'bold' },
      para: { block: 'p', classes: 'para'},
      bgBlue : { selector: 'p', classes: 'bgBlue'},
      bgRed : { selector: 'p', classes: 'bgRed'},
    },
    toolbar: 'undo redo | para bold forecolor | textBg alignment',
    color_map: [
      '333333', 'Black',
      'FF0000', 'Red',
      '0000FF', 'Blue',
    ],
    custom_colors: false,
    setup: function(editor){

      editor.ui.registry.addIcon('bgBlue',`<svg width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="1" fill-rule="evenodd" fill="#f5e9f7"></rect></svg>`);
      editor.ui.registry.addIcon('bgRed',`<svg width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="1" fill-rule="evenodd" fill="#fee5e5"></rect></svg>`);

      editor.ui.registry.addMenuButton('textBg', {
        // text: '座布団',
        icon: 'fill',
        fetch: function (callback) {
          var items = [
            {
              type: 'menuitem',
              text: '青',
              icon: 'bgBlue',
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
              text: '赤',
              icon: 'bgRed',
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

    }
  });
}