function LIST() {
    this.arr = [];
    this.themList = function (e) {
      this.arr.push(e);
    };
  
    this.timMaSo = function(maSo) {
      for (let i = 0 ; i < this.arr.length; i ++) {
          let index = this.arr[i].maSo
          if(index == maSo) {
              return i
          }
      }
      return -1
    }
  
    this.xoaDS = function (maSo) {
      let index = this.timMaSo(maSo)
      if (index != -1) {
          this.arr.splice(index, 1)
      }
    }
  
    this.updateDS = (khachHang) =>{
      let index = this.timMaSo(khachHang.maSo)
      if (index != -1) {
        this.arr[index] = khachHang
      }
    }
  }
  
  export default LIST;
  