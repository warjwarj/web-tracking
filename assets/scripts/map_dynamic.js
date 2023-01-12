const menu_btn = document.getElementById("collapse_button");
const menu_svg = document.getElementById("menu_svg");
const arrow_svg = document.getElementById("arrow_svg");
const menu = document.getElementById("menu-wrapper");

collapse_button.addEventListener("click", () => {
  if (window.getComputedStyle(menu, null).display == "block"){
    menu.style.display = "none";
    menu_btn.style.left = "2rem"
    arrow_svg.style.display = "none";
    menu_svg.style.display = "block";

  } else {
    menu.style.display = "block";
    menu_btn.style.left = "22rem";
    arrow_svg.style.display = "inline";
    menu_svg.style.display = "none";
  }
})

function sortReg(){
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchReg");
  filter = input.value.toUpperCase();
  table = document.getElementById("menu-table-body");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }   
}

function sortName(){
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchName");
  filter = input.value.toUpperCase();
  table = document.getElementById("menu-table-body");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }   
}