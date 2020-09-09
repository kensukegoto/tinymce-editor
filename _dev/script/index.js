tinymce.init({
  selector: 'textarea#textarea_01',
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
