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
    forced_root_block: false,
    menubar: false,
    height: 500,
    // contextmenu_never_use_native: true,
    content_style: `
      body { font-family:Helvetica,Arial,sans-serif; font-size:14px }
      .left { text-align: left; }
      .bold { font-weight: bold; } 
      `,
    formats: {
      bold: { inline: 'span', classes: 'bold' },
      para: { block: 'p', classes: 'para'},
    },
    toolbar: 'undo redo | para bold forecolor',
    color_map: [
      '333333', 'Black',
      'FF0000', 'Red',
      '0000FF', 'Blue',
    ],
    custom_colors: false,

  });
}