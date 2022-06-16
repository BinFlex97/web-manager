const DSSP = new WatchList();

function getProductList() {
    const promise = DSSP.getList();

    promise.then(function (result) {
        // lấy thành công
        // console.log(result);
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
function themProduct() {
    var tenSP = getELE("nameSP").value;
    var nhanHieu = getELE("brandSP").value;
    var giaSP = getELE("priceSP").value;
    var size = getELE("sizeSP").value;
    var model = getELE("modelSP").value;
    var strap = getELE("strapSP").value;
    var hinhAnhSP = getELE("imgSP").value;
    var moTaSP = getELE("descSP").value;

    var sp = new WatchProduct(tenSP, nhanHieu, giaSP, size, model, strap, hinhAnhSP, moTaSP);
    // console.log(sp);
    const promise = DSSP.getProduct(sp);
    promise.then(function (result) {
        // lấy Thành Công
        // console.log(result.data);
        getProductList();
    });
    promise.catch(function (error) {
        console.log(error);
    });
}
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
                    <button class = "btn btn-primary">Xem</button>
                    <button class = "btn btn-danger">Xóa</button>                  
                </th>
            </tr>
        `;
    });
    document.getElementById("tbodyTable").innerHTML = content;
}