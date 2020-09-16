import data from "./data";
import save from "./save";
import addText from "./addText";
import addTitle from "./addTitle";

const form = document.querySelector("#myForm");
const addBtn = document.querySelector(".btn--add-text");
const addBtnTitle = document.querySelector(".btn--add-title");
const saveBtn = document.querySelector(".btn--save");

let items = data.reduce((list,item)=> {

  if(item.tag === "p"){
    list[item.block] = !list[item.block] ? [] : list[item.block];
    list[item.block].push(item);
  } else {
    list[item.block] = item;
  }

  return list

},[]);

items.forEach(list => {

  if(Array.isArray(list)){
    return addText(form,list);
  }

  if(/h2|h3/.test(list.tag)){
    return addTitle(form,list);
  }

});


addBtn.addEventListener("click",() => {
  addText(form);
},false);

addBtnTitle.addEventListener("click",() => {
  addTitle();
},false);

saveBtn.addEventListener("click",() => {
  save(form);
},false);