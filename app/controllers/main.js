
const DSSP = new WatchList();
const vali = new Validation();
// Get Products
function getProductList() {
    const promise = DSSP.getList();

    promise.then(function (result) {
        // Thành công
        result.data.map(function (sp,index) {
            DSSP.watchList[index] = sp;
        })
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
        <button id="abc" onclick = "themSanPham()" class ="btn btn-success">
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
    var imgDetailSP = getELE("imgDetail").value;
    var moTaSP = getELE("descSP").value;


    // Lấy lại mảng data
    const promise1 = DSSP.getList();
    promise1.then(function (result) {
        // Thành công
        var isvali = true;
        // ! Các Bước kiểm Tra
        //? kiểm tra Tên
        isvali &= vali.kiemTraRong(tenSP, "tbName", "Vui lòng nhập tên sản phẩm!") && vali.kiemTraTen(tenSP, "tbName", "Tên sản phẩm không đúng định dạng") && vali.kiemTraTrung('-1', tenSP, "tbName", "Tên Sản Phẩm Đã Có ", result.data);
        //? Kiểm tra Nhãn Hiệu
        isvali &= vali.kiemTraRong(nhanHieu, "tbNhanHieu", "Vui lòng nhập Nhãn Hiệu!") && vali.kiemTraNhanHieu(nhanHieu, "tbNhanHieu", "Nhãn Hiệu không đúng định dạng");
        //? Kiểm tra Giá
        isvali &= vali.kiemTraRong(giaSP, "tbGia", "Vui lòng nhập giá!") && vali.kiemTraGia(giaSP, "tbGia", " Giá không đúng định dạng");
        //? Kiểm tra Kích cỡ
        isvali &= vali.kiemTraRong(size, "tbSize", "Vui lòng nhập kích cỡ!") && vali.kiemTraKichCo(size, "tbSize", " kích cỡ bằng 'milimet'");
        //? Kiểm tra Kiểu Mẫu
        isvali &= vali.kiemTraKieuMau("modelSP", "tbModel", "Hãy chọn kiểu mẫu!");
        //? Kiểm tra Loại dây
        isvali &= vali.kiemTraLoaiDay("strapSP", "tbStrap", "Hãy chọn loại dây!");
        //? Kiểm tra Mô tả
        isvali &= vali.kiemTraRong(moTaSP, "tbMoTa", "Vui lòng mô tả sản phẩm!") && vali.kiemTraMota(moTaSP, "tbMoTa", "Mô tả không đúng định dạng");
        //? Kiểm tra Hình Ảnh
        isvali &= vali.kiemTraRong(hinhAnhSP, "tbHinhAnh", "Vui lòng thêm hình ảnh") && vali.kiemTraTrung('-1', hinhAnhSP, "tbHinhAnh", "Hình Ảnh Đã Có", result.data);
        //? Kiểm tra hình Ảnh chi tiết
        isvali &= vali.kiemTraRong(imgDetailSP, "tbimgDetail", "Vui lòng thêm hình ảnh chi tiết của sản phẩm");

        if (isvali) {
            var sp = new WatchProduct(tenSP, nhanHieu, giaSP, size, model, strap, hinhAnhSP, moTaSP, imgDetailSP);
            const promise = DSSP.addProduct(sp);
            promise.then(function (result) {
                // Thành Công
                //Thêm và hiển thị lên Table
                getProductList();
                //Hiển thị table Thành công
                swal("Thêm Thành Công!", "You clicked the button!", "success");
                //Đóng popup
                document.querySelector("#exampleModal .close").click();
            });
            promise.catch(function (error) {
                // Thất Bại
                console.log(error);
            });
        }
    });
    promise1.catch(function (error) {
        //Thất bại
        console.log(error);
    });



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
                <th>${Number(sp.price).toLocaleString()}$</th>
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
        //Xóa Sản phẩm
        getProductList();
        //Xóa thành công
        swal("Xóa Thành Công!", "You clicked the button!", "success");

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
        getELE("imgDetail").value = result.data.imgDetail;

        hiddenVali();

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
    var imgDetailSP = getELE("imgDetail").value;

    var isvali = true;

    //! Các Bước kiểm Tra
    //? Kiểm tra tên
    isvali &= vali.kiemTraRong(tenSP, "tbName", "Vui lòng nhập tên sản phẩm!") && vali.kiemTraTen(tenSP, "tbName", "Tên không đúng định dạng") && vali.kiemTraTrung(id, tenSP, "tbName", "Tên sản phẩm đã tồn tại",DSSP.watchList);
    //? Kiểm tra Nhãn Hiệu
    isvali &= vali.kiemTraRong(nhanHieu, "tbNhanHieu", "Vui lòng nhập nhãn hiệu sản phẩm!") && vali.kiemTraNhanHieu(nhanHieu, "tbNhanHieu", "Nhãn Hiệu không đúng định dạng");
    //? Kiểm tra Giá
    isvali &= vali.kiemTraRong(giaSP, "tbGia", "Vui lòng nhập giá sản phẩm!") && vali.kiemTraGia(giaSP, "tbGia", " Giá không đúng định dạng");
    //? Kiểm tra Kích cỡ
    isvali &= vali.kiemTraRong(size, "tbSize", "Vui lòng nhập kích cỡ sản phẩm!") && vali.kiemTraKichCo(size, "tbSize", "Kích cỡ sản phẩm bằng 'milimet'");
    //? Kiểm tra Kiểu Mẫu
    isvali &= vali.kiemTraKieuMau("modelSP", "tbModel", "Hãy chọn kiểu mẫu");
    //? Kiểm tra Loại dây
    isvali &= vali.kiemTraLoaiDay("strapSP", "tbStrap", "Hãy chọn loại dây");
    //? Kiểm tra Mô tả
    isvali &= vali.kiemTraRong(moTaSP, "tbMoTa", "Hãy mô tả sản phẩm") && vali.kiemTraMota(moTaSP, "tbMoTa", "Mô tả không đúng định dạng");
    //? Kiểm tra Hình Ảnh
    isvali &= vali.kiemTraRong(hinhAnhSP, "tbHinhAnh", "Vui lòng thêm hình ảnh sản phẩm!") && vali.kiemTraTrung(id, hinhAnhSP, "tbHinhAnh", "Hình sản phẩm đã tồn tại", DSSP.watchList);
    //? Kiểm tra chi tiết hình ảnh
    isvali &= vali.kiemTraRong(imgDetailSP, "imgDetail", "Vui lòng thêm hình ảnh chi tiết sản phẩm");

    if (isvali) {
        var sp = new WatchProduct(tenSP, nhanHieu, giaSP, size, model, strap, hinhAnhSP, moTaSP, imgDetailSP);
        const promise = DSSP.updateProduct(sp, id);
        promise.then(function (result) {
            // Thành Công
            // Cập nhập thành công và hiển thị table
            getProductList();
            // Cập nhập thành công
            swal("Cập nhập thành công!", "You clicked the button!", "success");
            // Đóng popup
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
// Tìm kiếm Tên Sản Phẩm
getELE("inputSP").onkeyup = function () {
    var tenTK = document.getElementById("inputSP").value;
    var mangTK = [];

    const promise = DSSP.getList();
    promise.then(function (result) {
        //Thành Công
        mangTK = DSSP.timKiemSanPham(tenTK, result.data);
        hienThiTable(mangTK);
    });
    promise.catch(function (error) {
        //Thất Bại
        console.log(error);
    });
};

// Ẩn validation
function hiddenVali() {
    var hiddenELE = document.querySelectorAll("#exampleModal .tbText");
    for (var i = 0; i < hiddenELE.length; i++) {
        hiddenELE[i].innerHTML = "";
    }
}
