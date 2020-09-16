import data from "./data";

const form = document.querySelector("#myForm");
const addBtn = document.querySelector(".btn--add-text");
const addBtnTitle = document.querySelector(".btn--add-title");
const saveBtn = document.querySelector(".btn--save");

let items = data.reduce((list,item)=> {

  if(!list[item.block]){
    list[item.block] = [];
    list[item.block].push(item);
  } else {
    list[item.block].push(item);
  }

  return list

},[]);

items.forEach(list => {
  addTextArea(list);
});


addBtn.addEventListener("click",() => {
  addTextArea();
},false);

addBtnTitle.addEventListener("click",() => {
  addTextArea(null,true);
},false);

saveBtn.addEventListener("click",function() {

  let data = [];
  tinyMCE.triggerSave();

  const sect = form.querySelectorAll("textarea");
  sect.forEach((content,block) => {
    const nodes = createHTML(content.value);
    [...nodes].forEach(item => {
      data.push({
        block,
        tag: item.tagName,
        class: item.className,
        content: item.innerHTML,
        // encode: escape(item.innerHTML)
      })
    })
  });

  console.log(JSON.stringify(data));

  function createHTML(str){
    const tempEl = document.createElement('div');
    tempEl.innerHTML = str;
    return tempEl.querySelectorAll(":scope > *");
  }

});


function addTextArea(list,isTitle){

  const len = form.querySelectorAll("textarea").length;

  const section = document.createElement("section");
  const textarea = document.createElement("textarea");
  textarea.setAttribute("id",`textarea_${len + 1}`);

  let value = "";
  if(list){
    list.forEach(item => {
      value += `<${item.tag} class="${item.class}">${item.content}</${item.tag}>`;
    });
  }

  textarea.value = value;

  section.appendChild(textarea);

  form.appendChild(section);

  if(isTitle){
    tinymce.init({
      selector: `textarea#textarea_${len + 1}`,
      plugins: 'paste',
      paste_as_text: true,
      contextmenu: false,
      // forced_root_block: false,　// 改行をpとbrどちらにするか
      menubar: false,
      height: 100,
      // contextmenu_never_use_native: true,
      content_style: `
        body { font-family:Helvetica,Arial,sans-serif; font-size:14px }
        `,
      formats: {
        bold: { inline: 'span', classes: 'bold' },
      },
      toolbar: 'bold forecolor',
      color_map: [
        '333333', 'Black',
        'FF0000', 'Red',
        '0000FF', 'Blue',
      ],
      custom_colors: false,
    })
    return;
  }

  tinymce.init({
    selector: `textarea#textarea_${len + 1}`,
    plugins: 'paste',
    paste_as_text: true,
    contextmenu: false,
    // forced_root_block: false,　// 改行をpとbrどちらにするか
    menubar: false,
    height: 320,
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
      bgBlue : { selector: 'p', classes: 'bgBlue'},
      bgRed : { selector: 'p', classes: 'bgRed'},
    },
    toolbar: 'bold forecolor | textBg alignment',
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