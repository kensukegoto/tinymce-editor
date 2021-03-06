export default (form,list) => {

  const len = form.querySelectorAll("input[type='text'],textarea").length;

  let value = "";
  if(list){
    list.forEach(item => {
      value += `<${item.tag} class="${item.class}">${item.content}</${item.tag}>`;
    });
  }

  const flagment = document.createElement("div");

  flagment.innerHTML =  `
    <section class="sec">
      <div class="sec__inner">
        <textarea 
          id="textarea_${len + 1}" 
          data-id="${len + 1}" 
        >
        ${value}
        </textarea>
      </div>
      <div class="tool"><a class="delete">削除</a></div>
    </section>`;

  form.appendChild(flagment.querySelector("section"));

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