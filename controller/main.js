import { Student, Staff, Customer } from "../model/DSNV.js";
import LIST from "../model/LIST.js";
const getElement = (selector) => {
  return document.querySelector(selector);
};

let list = new LIST();

window.chonLoai = () => {
  const chucVu = getElement("#chucvu");
  if (chucVu.value == "Student") {
    getElement(".diem_Toan").style.display = "block";
    getElement(".diem_Ly").style.display = "block";
    getElement(".diem_Hoa").style.display = "block";
    getElement(".luong_Ngay").style.display = "none";
    getElement(".so_Ngay").style.display = "none";
    getElement(".ten_Cty").style.display = "none";
    getElement(".hoa_Don").style.display = "none";
    getElement(".danh_Gia").style.display = "none";
  } else if (chucVu.value == "Staff") {
    getElement(".diem_Toan").style.display = "none";
    getElement(".diem_Ly").style.display = "none";
    getElement(".diem_Hoa").style.display = "none";
    getElement(".luong_Ngay").style.display = "block";
    getElement(".so_Ngay").style.display = "block";
    getElement(".ten_Cty").style.display = "none";
    getElement(".hoa_Don").style.display = "none";
    getElement(".danh_Gia").style.display = "none";
  } else if (chucVu.value == "Customer") {
    getElement(".diem_Toan").style.display = "none";
    getElement(".diem_Ly").style.display = "none";
    getElement(".diem_Hoa").style.display = "none";
    getElement(".luong_Ngay").style.display = "none";
    getElement(".so_Ngay").style.display = "none";
    getElement(".ten_Cty").style.display = "block";
    getElement(".hoa_Don").style.display = "block";
    getElement(".danh_Gia").style.display = "block";
  } else {
    getElement(".diem_Toan").style.display = "none";
    getElement(".diem_Ly").style.display = "none";
    getElement(".diem_Hoa").style.display = "none";
    getElement(".luong_Ngay").style.display = "none";
    getElement(".so_Ngay").style.display = "none";
    getElement(".ten_Cty").style.display = "none";
    getElement(".hoa_Don").style.display = "none";
    getElement(".danh_Gia").style.display = "none";
  }
};

window.typeKH = () => {
  const phanLoai = getElement("#phanLoai");
  if (phanLoai.value == "ALL") {
    getElement("#cardItem1").style.display = "block";
    getElement("#cardItem2").style.display = "block";
    getElement("#cardItem3").style.display = "block";
  } else if (phanLoai.value == "Student") {
    getElement("#cardItem1").style.display = "block";
    getElement("#cardItem2").style.display = "none";
    getElement("#cardItem3").style.display = "none";
  } else if (phanLoai.value == "Staff") {
    getElement("#cardItem1").style.display = "none";
    getElement("#cardItem2").style.display = "block";
    getElement("#cardItem3").style.display = "none";
  } else {
    getElement("#cardItem1").style.display = "none";
    getElement("#cardItem2").style.display = "none";
    getElement("#cardItem3").style.display = "block";
  }
};
const layThongTin = (isEdits) => {
  let arr = [];
  const element = document.querySelectorAll(
    "#fromList input, #fromList select, #fromList textarea"
  );
  element.forEach((v) => {
    const { name, value } = v;
    arr[name] = value;
  });
  const {
    chucVu,
    maSo,
    name,
    address,
    email,
    diemToan,
    diemLy,
    diemHoa,
    luongNgay,
    soNgay,
    tenCty,
    hoaDon,
    danhGia,
  } = arr;
  let isValida = true;
  //kiểm tra lựa chọn :
  isValida &= kiemTraSelect(arr.chucVu, "#tbChucVu", "Chọn chức vụ");

  // kiểm tra tài khoản (ID)
  isValida &=
    kiemTraChuoi(arr.maSo, 1, undefined, "#tbTKNV", "Không được để trống") &&
    kiemTraChuoi(
      arr.maSo,
      3,
      6,
      "#tbTKNV",
      "Tài khoản phải có từ 3 đến 6 ký tự"
    ) &&
    checkTK(isEdits, "#tbTKNV", list.arr, arr.maSo, "Tài khoản đã tồn tại");
  // Kiểm tra họ và tên
  isValida &=
    kiemTraChuoi(arr.name, 1, undefined, "#tbTen", "Không để trống") &&
    checkPattern(
      arr.name,
      /^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$/,
      "#tbTen",
      "Tên phải là chữ không chứa số"
    );
  //Kiểm tra email:
  isValida &=
    kiemTraChuoi(arr.email, 1, undefined, "#tbEmail", "Không để trống") &&
    checkPattern(
      arr.email,
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "#tbEmail",
      "Email không đúng định dạng"
    );
  //Kierm tra address
  isValida &= kiemTraChuoi(
    arr.address,
    1,
    undefined,
    "#tbAddress",
    "Không để trống"
  );
  if (arr.chucVu == "Student") {
    let student = new Student(
      maSo,
      name,
      address,
      email,
      diemToan,
      diemLy,
      diemHoa,
      chucVu
    );
    isValida &=
      kiemTraChuoi(
        arr.diemToan,
        1,
        undefined,
        "#tbDiemToan",
        "Không để trống"
      ) &&
      checkPattern(arr.diemToan, /^[0-9]+$/, "#tbDiemToan", "Điểm là chữ số") &&
      kiemTraChuoi(arr.diemLy, 1, undefined, "#tbDiemLY", "Không để trống") &&
      checkPattern(arr.diemLy, /^[0-9]+$/, "#tbDiemLY", "Điểm là chữ số") &&
      kiemTraChuoi(arr.diemHoa, 1, undefined, "#tbdiemHoa", "Không để trống") &&
      checkPattern(arr.diemHoa, /^[0-9]+$/, "#tbdiemHoa", "Điểm là chữ số");
    return isValida ? student : undefined;
  }
  if (arr.chucVu == "Staff") {
    let staff = new Staff(
      maSo,
      name,
      address,
      email,
      soNgay,
      luongNgay,
      chucVu
    );
    //Kiểm tra lương ngày:
    isValida &=
      kiemTraChuoi(
        arr.luongNgay,
        1,
        undefined,
        "#tbluongNgay",
        "Không để trống"
      ) &&
      checkPattern(
        arr.luongNgay,
        /^[0-9]+$/,
        "#tbluongNgay",
        "Lương phải là số"
      ) &&
      checkSalary(
        arr.luongNgay,
        1e5,
        5e5,
        "#tbluongNgay",
        "Lương ngày từ 100.000VND đến 500.000VND"
      );
    //Kiểm tra số ngày làm:
    isValida &=
      kiemTraChuoi(arr.soNgay, 1, undefined, "#tbsoNgay", "Không để trống") &&
      checkPattern(arr.soNgay, /^[0-9]+$/, "#tbsoNgay", "Ngày làm là chứ số") &&
      checkSalary(
        arr.soNgay,
        1,
        30,
        "#tbsoNgay",
        "Số ngày làm từ 1 đến 31 ngày"
      );
    return isValida ? staff : undefined;
  }
  if (arr.chucVu == "Customer") {
    let customer = new Customer(
      maSo,
      name,
      address,
      email,
      tenCty,
      hoaDon,
      danhGia,
      chucVu
    );
    //Kiểm tra tên cty + hóa đơn + đánh giá:
    isValida &=
      kiemTraChuoi(arr.tenCty, 1, undefined, "#tbtenCty", "Không để trống") &&
      kiemTraChuoi(arr.hoaDon, 1, undefined, "#tbHoaDon", "Không để trống") &&
      kiemTraChuoi(
        arr.danhGia,
        1,
        undefined,
        "#tbDanhGia",
        "Vui lòng đánh giá"
      );
    return isValida ? customer : undefined;
  }
  // Kiểm tra điểm Toán - Lý - Hóa
  // isValida &=
  //   kiemTraChuoi(arr.diemToan, 1, undefined, "#tbDiemToan", "Không để trống") &&
  //   checkPattern(arr.diemToan, /^[0-9]+$/, "#tbDiemToan", "Điểm là chữ số") &&
  //   kiemTraChuoi(arr.diemLy, 1, undefined, "#tbDiemLY", "Không để trống") &&
  //   checkPattern(arr.diemLy, /^[0-9]+$/, "#tbDiemLY", "Điểm là chữ số") &&
  //   kiemTraChuoi(arr.diemHoa, 1, undefined, "#tbdiemHoa", "Không để trống") &&
  //   checkPattern(arr.diemHoa, /^[0-9]+$/, "#tbdiemHoa", "Điểm là chữ số");
  // Kiểm tra lương 1 ngày :
  // isValida &=
  //   kiemTraChuoi(
  //     arr.luongNgay,
  //     1,
  //     undefined,
  //     "#tbluongNgay",
  //     "Không để trống"
  //   ) &&
  //   checkPattern(arr.luongNgay, /^[0-9]+$/, "#tbluongNgay", "Lương phải là số");
  // if (isValida) {
  //   if (chucVu.value == "Staff") {
  //     return new Staff(maSo, name, address, email, soNgay, luongNgay, chucVu);
  //   }
  //   if (chucVu.value == "Student") {
  //     return new Student(
  //       maSo,
  //       name,
  //       address,
  //       email,
  //       diemToan,
  //       diemLy,
  //       diemHoa,
  //       chucVu
  //     );
  //   }
  //   if (chucVu.value == "Customer") {
  //     return new Customer(
  //       maSo,
  //       name,
  //       address,
  //       email,
  //       tenCty,
  //       hoaDon,
  //       danhGia,
  //       chucVu
  //     );
  //   }
  // } else {
  //   return undefined;
  // }
};

const reset = () => {
  getElement("#fromList").reset();
};

getElement("#btnThem").onclick = () => {
  getElement("#btnThemNV").style.display = "block";
  getElement("#btnCapNhat").style.display = "none";
  getElement("#chucvu").disabled = false;
  getElement("#tknv").disabled = false;
  reset();
  delALL();
};

getElement("#btnThemNV").onclick = () => {
  const khachHang = layThongTin();
  if (khachHang) {
    list.themList(khachHang);
    render();
    setLocal();
    reset();
  } else {
    alert("Vui lòng điền đầy đủ thông tin");
  }
};

const setLocal = () => {
  localStorage.setItem("list", JSON.stringify(list.arr));
};
const getLocal = () => {
  const parseValue = JSON.parse(localStorage.getItem("list"));
  if (parseValue) {
    let arrNew = [];
    for (let i = 0; i < parseValue.length; i++) {
      let ds = parseValue[i];
      if (ds.chucVu == "Student") {
        let student = new Student(
          ds.maSo,
          ds.name,
          ds.address,
          ds.email,
          ds.toan,
          ds.ly,
          ds.hoa,
          ds.chucVu
        );
        arrNew.push(student);
      }
      if (ds.chucVu == "Staff") {
        let staff = new Staff(
          ds.maSo,
          ds.name,
          ds.address,
          ds.email,
          ds.soNgay,
          ds.luongNgay,
          ds.chucVu
        );
        arrNew.push(staff);
      }
      if (ds.chucVu == "Customer") {
        let customer = new Customer(
          ds.maSo,
          ds.name,
          ds.address,
          ds.email,
          ds.tenCty,
          ds.hoaDon,
          ds.danhGia,
          ds.chucVu
        );
        arrNew.push(customer);
      }
    }
    list.arr = arrNew;
    render();
  }
};
getLocal();

function render(arrNewSx = list.arr) {
  let arr = [];
  let arr2 = [];
  let arr3 = [];
  for (let i = 0; i < arrNewSx.length; i++) {
    let ds = arrNewSx[i];
    if (ds.chucVu == "Student") {
      arr += `<tr>
      <td>${ds.maSo}</td>
      <td>${ds.name}</td>
      <td>${ds.email}</td>
      <td>${ds.address}</td>
      <td>${ds.tinhDiemTB().toFixed(2)}</td>
      <td>
      <button data-toggle="modal" data-target="#myModal" class="btn btn-success" onclick="renderEdits(${
        ds.maSo
      })">Edits</button>
      <button onclick="delDS(${ds.maSo})" class="btn btn-danger">Delete</button>
      </td>
      </tr>
      `;
    }

    if (ds.chucVu == "Staff") {
      arr2 += `<tr>
      <td>${ds.maSo}</td>
      <td>${ds.name}</td>
      <td>${ds.email}</td>
      <td>${ds.address}</td>
      <td>${ds.tinhLuong().toLocaleString()}</td>
      <td>
      <button data-toggle="modal" data-target="#myModal" class="btn btn-success" onclick="renderEdits(${
        ds.maSo
      })">Edits</button>
      <button onclick="delDS(${ds.maSo})" class="btn btn-danger">Delete</button>
      </td>
      </tr>
      `;
    }

    if (ds.chucVu == "Customer") {
      arr3 += `<tr>
      <td>${ds.maSo}</td>
      <td>${ds.name}</td>
      <td>${ds.email}</td>
      <td>${ds.address}</td>
      <td>${ds.tenCty}</td>
      <td>${ds.hoaDon}</td>
      <td>${ds.danhGia}</td>
      <td>
      <button data-toggle="modal" data-target="#myModal" class="btn btn-success" onclick="renderEdits(${ds.maSo})">Edits</button>
      <button onclick="delDS(${ds.maSo})" class="btn btn-danger">Delete</button>
      </td>
      </tr>
      `;
    }
  }
  getElement("#tableDanhSachStudents").innerHTML = arr;
  getElement("#tableDanhSachStaff").innerHTML = arr2;
  getElement("#tableDanhSachCustomer").innerHTML = arr3;
}

window.delDS = (maSo) => {
  list.xoaDS(maSo);
  setLocal();
  render();
};

window.renderEdits = (maSo) => {
  getElement("#btnThemNV").style.display = "none";
  getElement("#btnCapNhat").style.display = "block";
  getElement("#chucvu").disabled = true;
  getElement("#tknv").disabled = true;

  let index = list.timMaSo(maSo);
  let arrNew = list.arr[index];
  if (arrNew.chucVu == "Student") {
    getElement(".diem_Toan").style.display = "block";
    getElement("#diemToan").value = arrNew.toan;
    getElement(".diem_Ly").style.display = "block";
    getElement("#diemLy").value = arrNew.ly;
    getElement(".diem_Hoa").style.display = "block";
    getElement("#diemHoa").value = arrNew.hoa;
    getElement(".luong_Ngay").style.display = "none";
    getElement(".so_Ngay").style.display = "none";
    getElement(".ten_Cty").style.display = "none";
    getElement(".hoa_Don").style.display = "none";
    getElement(".danh_Gia").style.display = "none";
    getElement("#chucvu").value = arrNew.chucVu;
    getElement("#tknv").value = arrNew.maSo;
    getElement("#name").value = arrNew.name;
    getElement("#email").value = arrNew.email;
    getElement("#address").value = arrNew.address;
  } else if (arrNew.chucVu == "Staff") {
    getElement(".diem_Toan").style.display = "none";
    getElement(".diem_Ly").style.display = "none";
    getElement(".diem_Hoa").style.display = "none";
    getElement(".luong_Ngay").style.display = "block";
    getElement("#luongNgay").value = arrNew.luongNgay;
    getElement(".so_Ngay").style.display = "block";
    getElement("#soNgay").value = arrNew.soNgay;
    getElement(".ten_Cty").style.display = "none";
    getElement(".hoa_Don").style.display = "none";
    getElement(".danh_Gia").style.display = "none";
    getElement("#chucvu").value = arrNew.chucVu;
    getElement("#tknv").value = arrNew.maSo;
    getElement("#name").value = arrNew.name;
    getElement("#email").value = arrNew.email;
    getElement("#address").value = arrNew.address;
  } else if (arrNew.chucVu == "Customer") {
    getElement(".diem_Toan").style.display = "none";
    getElement(".diem_Ly").style.display = "none";
    getElement(".diem_Hoa").style.display = "none";
    getElement(".luong_Ngay").style.display = "none";
    getElement(".so_Ngay").style.display = "none";
    getElement(".ten_Cty").style.display = "block";
    getElement("#tenCty").value = arrNew.tenCty;
    getElement(".hoa_Don").style.display = "block";
    getElement("#hoaDon").value = arrNew.hoaDon;
    getElement(".danh_Gia").style.display = "block";
    getElement("#danhGia").value = arrNew.danhGia;
    getElement("#chucvu").value = arrNew.chucVu;
    getElement("#tknv").value = arrNew.maSo;
    getElement("#name").value = arrNew.name;
    getElement("#email").value = arrNew.email;
    getElement("#address").value = arrNew.address;
  }
};

getElement("#btnCapNhat").onclick = () => {
  const khachHang = layThongTin(true);
  list.updateDS(khachHang);
  render();
  setLocal();
};

window.sapXep = () => {
  const parseValue = JSON.parse(localStorage.getItem("list"));
  let arrNewSx = [];
  for (let i = 0; i < parseValue.length; i++) {
    let ds = parseValue[i];
    console.log(ds);
    if (ds.chucVu == "Student") {
      let student = new Student(
        ds.maSo,
        ds.name,
        ds.address,
        ds.email,
        ds.toan,
        ds.ly,
        ds.hoa,
        ds.chucVu
      );
      arrNewSx.push(student);
    }
    if (ds.chucVu == "Staff") {
      let staff = new Staff(
        ds.maSo,
        ds.name,
        ds.address,
        ds.email,
        ds.soNgay,
        ds.luongNgay,
        ds.chucVu
      );
      arrNewSx.push(staff);
    }
    if (ds.chucVu == "Customer") {
      let customer = new Customer(
        ds.maSo,
        ds.name,
        ds.address,
        ds.email,
        ds.tenCty,
        ds.hoaDon,
        ds.danhGia,
        ds.chucVu
      );
      arrNewSx.push(customer);
    }
  }
  console.log(arrNewSx);
  const upAndDown = getElement('#upAndDown')
  if(upAndDown.value =='Up') {
    arrNewSx.sort((a,b)=> a.name.trim().length - b.name.trim().length)
    render(arrNewSx)
  }
  if(upAndDown.value =='Down') {
    arrNewSx.sort((a,b)=> b.name.trim().length - a.name.trim().length)
    render(arrNewSx)
  }
  
};

//Validation

function kiemTraChuoi(value, minlength, maxlength, selector, messErr) {
  if (value.trim().length < minlength || value.trim().length > maxlength) {
    document.querySelector(selector).innerHTML = messErr;
    document.querySelector(selector).style.display = "block";
    return false;
  } else {
    document.querySelector(selector).style.display = "none";
    return true;
  }
}

const kiemTraSelect = (select, selector, messErr) => {
  if (select == "Select") {
    getElement(selector).style.display = "block";
    getElement(selector).innerHTML = messErr;
    return false;
  } else if (select == "Student") {
    getElement(selector).style.display = "none";
    return true;
  } else if (select == "Staff") {
    getElement(selector).style.display = "none";
    return true;
  } else if (select == "Customer") {
    getElement(selector).style.display = "none";
    return true;
  }
};

const checkTK = (isEdits, selector, arr, maSo, messErr) => {
  if (isEdits) return true;
  let isFlag = true;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].maSo == maSo) {
      isFlag = false;
      break;
    }
  }
  if (!isFlag) {
    getElement(selector).style.display = "block";
    getElement(selector).innerHTML = messErr;
    return false;
  } else {
    getElement(selector).style.display = "none";
    return true;
  }
};

const checkPattern = (value, pattern, selector, messErr) => {
  if (!pattern.test(value)) {
    getElement(selector).style.display = "block";
    getElement(selector).innerHTML = messErr;
    return false;
  } else {
    getElement(selector).style.display = "none";
    return true;
  }
};

const checkSalary = (value, minlength, maxlength, selector, messErr) => {
  debugger;
  if (value * 1 < minlength || value * 1 > maxlength) {
    getElement(selector).style.display = "block";
    getElement(selector).innerHTML = messErr;
    return false;
  } else {
    getElement(selector).style.display = "none";
    return true;
  }
};

const delALL = () => {
  getElement("#tbChucVu").innerHTML = "";
  getElement("#tbTen").innerHTML = "";
  getElement("#tbEmail").innerHTML = "";
  getElement("#tbAddress").innerHTML = "";
  getElement("#tbDiemToan").innerHTML = "";
  getElement("#tbDiemLY").innerHTML = "";
  getElement("#tbdiemHoa").innerHTML = "";
  getElement("#tbluongNgay").innerHTML = "";
  getElement("#tbluongNgay").innerHTML = "";
  getElement("#tbsoNgay").innerHTML = "";
  getElement("#tbtenCty").innerHTML = "";
  getElement("#tbHoaDon").innerHTML = "";
  getElement("#tbDanhGia").innerHTML = "";
  getElement("#tbTKNV").innerHTML = "";
  getElement(".diem_Toan").style.display = "none";
  getElement(".diem_Ly").style.display = "none";
  getElement(".diem_Hoa").style.display = "none";
  getElement(".luong_Ngay").style.display = "none";
  getElement(".so_Ngay").style.display = "none";
  getElement(".ten_Cty").style.display = "none";
  getElement(".hoa_Don").style.display = "none";
  getElement(".danh_Gia").style.display = "none";
};
