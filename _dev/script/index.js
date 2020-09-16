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

  if(list[0].tag === "p"){
    return addTextArea(list);
  }
  if(list[0].tag === "h2" || list[0].tag === "h3"){
    return addTitleArea(list[0]);
  }
  


});


addBtn.addEventListener("click",() => {
  addTextArea();
},false);

addBtnTitle.addEventListener("click",() => {
  addTitleArea();
},false);

saveBtn.addEventListener("click",function() {

  let data = [];
  tinyMCE.triggerSave();

  const sect = form.querySelectorAll("input[type='text'],textarea");

  sect.forEach((content,block) => {

    const nodes = createHTML(content.value);

    if(nodes.length !== 0 ) {
      [...nodes].forEach(item => {
        data.push({
          block,
          tag: item.tagName.toLowerCase(),
          class: item.className,
          content: item.innerHTML,
          // encode: escape(item.innerHTML)
        })
      })

      return;
    }

    data.push({
      block,
      tag: content.className.toLowerCase(),
      class: "",
      content: content.value,
      // encode: escape(item.innerHTML)
    })

  });

  console.log(JSON.stringify(data));

  function createHTML(str){
    const tempEl = document.createElement('div');
    tempEl.innerHTML = str;
    return tempEl.querySelectorAll(":scope > *");
  }

});


function addTextArea(list){

  const len = form.querySelectorAll("input[type='text'],textarea").length;

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
      'FF0000', 'Red',
      '0000FF', 'Blue',
    ],
    custom_colors: false,
    setup: function(editor){

      editor.ui.registry.addIcon('bgNone',`<svg width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="1" fill-rule="evenodd" fill="transparent" stroke-dasharray="4" stroke="#333"></rect></svg>`);
      editor.ui.registry.addIcon('bgBlue',`<svg width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="1" fill-rule="evenodd" fill="#f5e9f7"></rect></svg>`);
      editor.ui.registry.addIcon('bgRed',`<svg width="24" height="24"><rect x="3" y="3" width="18" height="18" rx="1" fill-rule="evenodd" fill="#fee5e5"></rect></svg>`);

      editor.ui.registry.addMenuButton('textBg', {
        // text: '座布団',
        icon: 'fill',
        fetch: function (callback) {
          var items = [
            {
              type: 'menuitem',
              text: '無',
              icon: 'bgNone',
              onAction: function (_) {
                editor.formatter.remove('bgRed');
                editor.formatter.remove('bgBlue');
              },
              onSetup: function(api) {
                return function() {};
              }
            },
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

function addTitleArea(list){

  const len = form.querySelectorAll("input[type='text'],textarea").length;


  let value = "";

  if(list){
    value += list.content;
  }

  const flagment = document.createElement("div");

  flagment.innerHTML =  `
    <section>
      <div class="radio__box">
        <input type="radio" name="radio_${len + 1}" value="h2">中
        <input type="radio" name="radio_${len + 1}" value="h3">小
      </div>
      <input id="textarea_${len + 1}" data-id="${len + 1}" type="text" value="${value}">
    </section>`;

  form.appendChild(flagment.querySelector("section"));

  const radios = document.querySelectorAll(`input[name='radio_${len + 1}']`);
  const text = document.querySelector(`#textarea_${len + 1}`);

  radios.forEach(radio => {

    radio.addEventListener("change",()=>{
      radios.forEach(target => {
        if(target.checked){
          text.classList.add(target.value)
        }else {
          text.classList.remove(target.value)
        }
      })
    })

  });

  radios.forEach((radio,idx) => {
    if(list){
      if(radio.value === list.tag) radio.click()
    } else {
      if(idx === 0) {

        radio.click()
      }
    };
  })



}