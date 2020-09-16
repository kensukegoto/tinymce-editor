export default form => {

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
}