class Person {
    constructor(maSo, name, address, email) {
      (this.maSo = maSo),
        (this.name = name),
        (this.address = address),
        (this.email = email);
    }
  }
  
  class Student extends Person {
    constructor(maSo, name, address, email, toan, ly, hoa, chucVu) {
      super(maSo, name, address, email);
      this.toan = toan;
      this.ly = ly;
      this.hoa = hoa;
      this.chucVu = chucVu;
    }
  
    tinhDiemTB() {
      return (+this.toan + +this.ly + +this.hoa) / 3;
    }
  }
  
  class Staff extends Person {
    constructor(maSo, name, address, email, soNgay, luongNgay, chucVu) {
      super(maSo, name, address, email);
      this.soNgay = soNgay;
      this.luongNgay = luongNgay;
      this.chucVu = chucVu;
    }
    tinhLuong() {
      return +this.soNgay * +this.luongNgay;
    }
  }
  
  class Customer extends Person {
    constructor(maSo, name, address, email, tenCty, hoaDon, danhGia, chucVu) {
      super(maSo, name, address, email);
      this.tenCty = tenCty;
      this.hoaDon = hoaDon;
      this.danhGia = danhGia;
      this.chucVu = chucVu;
    }
  }
  
  export { Student, Staff, Customer };
  