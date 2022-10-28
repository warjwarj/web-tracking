
function sortReg(){
    let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchReg");
  filter = input.value.toUpperCase();
  table = document.getElementById("menu-table-body");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
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
  // Declare variables
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchName");
  filter = input.value.toUpperCase();
  table = document.getElementById("menu-table-body");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
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