export default (form,list) => {

  const len = form.querySelectorAll("input[type='text'],textarea").length;

  let value = "";

  if(list){
    value += list.content;
  }

  const flagment = document.createElement("div");

  flagment.innerHTML =  `
    <section class="sec">
      <div class="sec__inner">
        <div class="radio__box">
          <input type="radio" name="radio_${len + 1}" value="h2">中
          <input type="radio" name="radio_${len + 1}" value="h3">小
        </div>
        <input id="textarea_${len + 1}" data-id="${len + 1}" type="text" value="${value}">
      </div>
      <div class="tool"><a class="delete">削除</a></div>
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