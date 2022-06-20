
const DSSP = new WatchList();
const vali = new Validation();
// Get Products
function getProductList() {
    const promise = DSSP.getList();

    promise.then(function (result) {
        // Thành công
        hienThiTable(result.data);
    });
    promise.catch(function (error) {
        // Thất bại
        console.log(error);
    });
}

getProductList();

function getELE(id) {
    return document.getElementById(id);
}

// Tạo buttton Add Product
document.querySelector("#AddButton").addEventListener("click", function () {
    document.querySelector("#exampleModal .modal-footer").innerHTML = `
        <button onclick = "themSanPham()" class ="btn btn-success">
            <i class="fa-solid fa-plus"></i>
            <span class = "ml-1" >Add Product</span>
        </button>
    `;
    resetInfo();
});


//Add Product
function themSanPham() {
    var tenSP = getELE("nameSP").value;
    var nhanHieu = getELE("brandSP").value;
    var giaSP = getELE("priceSP").value;
    var size = getELE("sizeSP").value;
    var model = getELE("modelSP").value;
    var strap = getELE("strapSP").value;
    var hinhAnhSP = getELE("imgSP").value;
    var moTaSP = getELE("descSP").value;

    var isvali = true;
    //! Các Bước kiểm Tra

    //? Kiểm tra Nhãn Hiệu
    isvali &= vali.kiemTraRong(nhanHieu, "tbNhanHieu", "Nhãn Hiệu không được để trống") && vali.kiemTraNhanHieu(nhanHieu, "tbNhanHieu", "Nhãn Hiệu không đúng định dạng");
    //? Kiểm tra Giá
    isvali &= vali.kiemTraRong(giaSP, "tbGia", "Giá không được để trống") && vali.kiemTraGia(giaSP, "tbGia", " Giá không đúng định dạng");
    //? Kiểm tra Kích cỡ
    isvali &= vali.kiemTraRong(size, "tbSize", "Size không được để trống") && vali.kiemTraKichCo(size, "tbSize", " Size đo bằng 'mm'");
    //? Kiểm tra Kiểu Mẫu
    isvali &= vali.kiemTraKieuMau("modelSP", "tbModel", "Hãy chọn kiểu mẫu");
    //? Kiểm tra Loại dây
    isvali &= vali.kiemTraLoaiDay("strapSP", "tbStrap", "Hãy chọn loại dây");
    //? Kiểm tra Mô tả
    isvali &= vali.kiemTraRong(moTaSP, "tbMoTa", "Hãy mô tả sản phẩm") && vali.kiemTraMota(moTaSP, "tbMoTa", "Mô tả không đúng định dạng");

    //Lấy lại mảng data
    const promise1 = DSSP.getList();
    promise1.then(function (result) {
        //Thành công
        //? kiểm tra Tên 
        isvali &= vali.kiemTraRong(tenSP, "tbName", "Tên không được để trống") && vali.kiemTraTen(tenSP, "tbName", "Tên không đúng định dạng") && vali.kiemTraTrung(tenSP, "tbName", "Tên Sản Phẩm Đã Có", result.data);
        //? Kiểm tra Hình Ảnh
        isvali &= vali.kiemTraRong(hinhAnhSP, "tbHinhAnh", "Hình Ảnh không được để trống") && vali.kiemTraTrung(hinhAnhSP, "tbHinhAnh", "Hình Ảnh Đã Có", result.data);
    });
    promise1.catch(function (error) {
        //Thất bại
        console.log(error);
    });

    if (isvali) {
        var sp = new WatchProduct(tenSP, nhanHieu, giaSP, size, model, strap, hinhAnhSP, moTaSP);
        const promise = DSSP.addProduct(sp);
        promise.then(function (result) {
            // Thành Công
            getProductList();

            document.querySelector("#exampleModal .close").click();
        });
        promise.catch(function (error) {
            // Thất Bại
            console.log(error);
        });
    }

}

//Hiển thị Table
function hienThiTable(mangSP) {
    var content = "";
    var stt = 0;
    mangSP.map(function (sp) {
        content += `
            <tr>
                <th>${++stt}</th>
                <th>${sp.name}</th>
                <th>${sp.price}</th>
                <th>
                    <img style = "width: 100px;" src="${sp.img}" alt="">
                </th>
                <th>${sp.desc}</th>
                <th>
                    <button onclick ="hienThiChiTiet('${sp.id}')" data-toggle="modal" data-target="#exampleModal" class = "btn btn-primary">Xem</button>

                    <button id="clear" type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal${sp.id}">
                        Xóa
                    </button>
                    <!-- Delete Modal -->
                    <div class="modal fade" id="deleteModal${sp.id}" tabindex="-1" aria-labelledby="deleteModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="deleteModalLabel">Bạn có  chắc muốn xóa?</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-footer">
                                    <button onclick ="xoaSanPham('${sp.id}')"type="button" class="btn btn-success" data-dismiss="modal">Agree</button>
                                    <button type="button" class="btn btn-danger"
                                    data-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </th>
            </tr>
        `;
    });
    document.getElementById("tbodyTable").innerHTML = content;
};

//Xóa Sản Phẩm
function xoaSanPham(id) {
    const promise = DSSP.deleteProduct(id);
    promise.then(function (result) {
        //Thành công
        getProductList(result.data);
    });
    promise.catch(function (error) {
        //Thất Bại
        console.log(error);
    });
}

//Hiển thị chi tiết
function hienThiChiTiet(id) {
    const promise = DSSP.getProductItem(id);
    promise.then(function (result) {
        //Thành Công
        getELE("nameSP").value = result.data.name;
        getELE("brandSP").value = result.data.brand;
        getELE("priceSP").value = result.data.price;
        getELE("sizeSP").value = result.data.size;
        getELE("modelSP").value = result.data.model;
        getELE("strapSP").value = result.data.strap;
        getELE("imgSP").value = result.data.img;
        getELE("descSP").value = result.data.desc;

        document.querySelector("#exampleModal .modal-footer").innerHTML = `
        <button onclick = "capNhapSanPham('${result.data.id}')" class = "btn btn-success">Cập Nhập</button>
    
    `;
    });
    promise.catch(function (error) {
        //Thất Bại
        console.log(error);
    });

}
// Cập Nhập sản Phẩm
function capNhapSanPham(id) {
    var tenSP = getELE("nameSP").value;
    var nhanHieu = getELE("brandSP").value;
    var giaSP = getELE("priceSP").value;
    var size = getELE("sizeSP").value;
    var model = getELE("modelSP").value;
    var strap = getELE("strapSP").value;
    var hinhAnhSP = getELE("imgSP").value;
    var moTaSP = getELE("descSP").value;

    var isvali = true;

    //! Các Bước kiểm Tra

    //? Kiểm tra Nhãn Hiệu
    isvali &= vali.kiemTraRong(nhanHieu, "tbNhanHieu", "Nhãn Hiệu không được để trống") && vali.kiemTraNhanHieu(nhanHieu, "tbNhanHieu", "Nhãn Hiệu không đúng định dạng");
    //? Kiểm tra Giá
    isvali &= vali.kiemTraRong(giaSP, "tbGia", "Giá không được để trống") && vali.kiemTraGia(giaSP, "tbGia", " Giá không đúng định dạng");
    //? Kiểm tra Kích cỡ
    isvali &= vali.kiemTraRong(size, "tbSize", "Size không được để trống") && vali.kiemTraKichCo(size, "tbSize", " Size đo bằng 'mm'");
    //? Kiểm tra Kiểu Mẫu
    isvali &= vali.kiemTraKieuMau("modelSP", "tbModel", "Hãy chọn kiểu mẫu");
    //? Kiểm tra Loại dây
    isvali &= vali.kiemTraLoaiDay("strapSP", "tbStrap", "Hãy chọn loại dây");
    //? Kiểm tra Mô tả
    isvali &= vali.kiemTraRong(moTaSP, "tbMoTa", "Hãy mô tả sản phẩm") && vali.kiemTraMota(moTaSP, "tbMoTa", "Mô tả không đúng định dạng");

    //Lấy lại mảng data
    const promise1 = DSSP.getList();
    promise1.then(function (result) {
        //Thành công
        //? kiểm tra Tên 
        isvali &= vali.kiemTraRong(tenSP, "tbName", "Tên không được để trống") && vali.kiemTraTen(tenSP, "tbName", "Tên không đúng định dạng") && vali.kiemTraTrung(tenSP, "tbName", "Tên Sản Phẩm Đã Có", result.data);
        //? Kiểm tra Hình Ảnh
        isvali &= vali.kiemTraRong(hinhAnhSP, "tbHinhAnh", "Hình Ảnh không được để trống") && vali.kiemTraTrung(hinhAnhSP, "tbHinhAnh", "Hình Ảnh Đã Có", result.data);
    });
    promise1.catch(function (error) {
        //Thất bại
        console.log(error);
    });

    if (isvali) {
        var sp = new WatchProduct(tenSP, nhanHieu, giaSP, size, model, strap, hinhAnhSP, moTaSP);
        const promise = DSSP.updateProduct(sp, id);
        promise.then(function (result) {
            // Thành Công
            getProductList();

            document.querySelector("#exampleModal .close").click();
        });
        promise.catch(function (error) {
            console.log(error);
        });
    }
}
// Clear toàn bộ thông tin
function resetInfo() {
    document.getElementById("formSP").reset();
}