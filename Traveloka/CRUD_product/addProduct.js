let linkImg = document.querySelector(".link");
let title = document.querySelector(".title");
let content = document.querySelector(".content");
let btnAdd = document.querySelector(".btnAdd");
let table = document.querySelector("table");
btnAdd.addEventListener("click", function () {
  let imgLink = linkImg.value;
  let productTitle = title.value;
  let productContent = content.value;

  // Tạo các phần tử HTML mới
  let newRow = document.createElement("tr");
  let imgAdd = document.createElement("td");
  let titleAdd = document.createElement("td");
  let contentAdd = document.createElement("td");

  // Đưa link thành dạng ảnh
  let imgElement = document.createElement("img");
  imgElement.src = imgLink;
  imgAdd.appendChild(imgElement);

  // Đẩy nội dung
  titleAdd.innerHTML = productTitle;
  contentAdd.innerHTML = productContent;

  // Thêm các ô vào hàng mới
  newRow.appendChild(imgAdd);
  newRow.appendChild(titleAdd);
  newRow.appendChild(contentAdd);

  // Thêm hàng mới vào bảng
  table.appendChild(newRow);

  //reset lại ô input
  linkImg.value = "";
  title.value = "";
  content.value = "";

  //Đẩy những thứ vừa thêm vào web list sản phẩm

  //Lấy mảng tours từ local
  let toursList = JSON.parse(localStorage.getItem("tours"));

  //Tạo 1 obj
  let newTour = {
    img: imgLink,
    title: productTitle,
    content: productContent,
  };
  //Đẩy obj vào tours
  toursList.push(newTour);

  //Lưu mảng vào local
  localStorage.setItem("tours", JSON.stringify(toursList));

  renderProductList();
});

//Xóa listCard
// let tableDelete = document.getElementsByClassName("delete");
// tableDelete = tableDelete[0];
let tableDelete = document.getElementById("delete");
console.log(tableDelete);

let toursListDelete = JSON.parse(localStorage.getItem("tours"));

toursListDelete.forEach(function (element, i) {
  let rowDelete = tableDelete.insertRow(-1);
  let titleDelete = rowDelete.insertCell(0);
  titleDelete.innerHTML = element.title;

  let buttonCell = rowDelete.insertCell(1);
  let deleteButton = document.createElement("button");
  deleteButton.className = "btnDelete";
  deleteButton.innerHTML = "Xóa";
  buttonCell.appendChild(deleteButton);

  deleteButton.addEventListener("click", function (id) {
    //Xem hang nut button
    let row = this.parentNode.parentNode;

    //Lay tieu de cua o trong dong xoa
    let tourTitle = row.cells[0].innerHTML;

    //lay danh sach tours tu localStorage
    let toursList = JSON.parse(localStorage.getItem("tours"));

    //Tim vi tri cua tour can xoa
    let number = toursList.findIndex(function (tour) {
      return tour.title == tourTitle;
    });
    //Xoa khoi danh sach
    if (number != -1) {
      toursList.splice(number, 1);
    }
    //Sau khi xoa xong. cap nhat lai danh sach
    localStorage.setItem("tours", JSON.stringify(toursList));
    //Xoa dong
    row.remove();
  });
});
