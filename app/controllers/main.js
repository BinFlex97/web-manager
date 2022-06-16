
const DSSP = new WatchList();
// Get Products
function getProductList() {
    const promise = DSSP.getList();

    promise.then(function (result) {
        // lấy thành công
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

    var sp = new WatchProduct(tenSP, nhanHieu, giaSP, size, model, strap, hinhAnhSP, moTaSP);
    const promise = DSSP.AddProduct(sp);
    promise.then(function (result) {
        // lấy Thành Công
        getProductList();
    });
    promise.catch(function (error) {
        console.log(error);
    });
}
// Tạo buttton Add Product
const ELE = document.querySelector("#AddButton").addEventListener("click", function () {
    document.querySelector("#exampleModal .modal-footer").innerHTML = `
        <button onclick = "themSanPham()" class = "btn btn-success">
            <i class="fa-solid fa-plus"></i>
            <span class = "ml-1" >Add Product</span>
        </button>
    `;
});
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
                    <button onclick = "xoaSanPham('${sp.id}')" class = "btn btn-danger">Xóa</button>                  
                </th>
            </tr>
        `;
    });
    document.getElementById("tbodyTable").innerHTML = content;
}
//Delete Product
function xoaSanPham(id) {
    const promise = DSSP.deleteProduct(id);
    promise.then(function (result) {
        //Lấy thành công
        getProductList(result.data);
    });
    promise.catch(function (error) {
        console.log(error);
    });
}
//Hiển thị chi tiết
function hienThiChiTiet(id) {
    const promise = DSSP.getProductItem(id);
    promise.then(function (result) {
        //lấy Thành Công
        getELE("nameSP").value = result.data.name;
        getELE("brandSP").value = result.data.brand;
        getELE("priceSP").value = result.data.price;
        getELE("sizeSP").value = result.data.size;
        getELE("modelSP").value = result.data.model;
        getELE("strapSP").value = result.data.strap;
        getELE("imgSP").value = result.data.img;
        getELE("descSP").value = result.data.desc;
    });
    promise.catch(function (error) {
        console.log(error);
    });
}