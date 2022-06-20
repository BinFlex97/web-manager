function Validation() {
    this.kiemTraRong = function (value, spanID, messagaer) {
        if (value.trim() == "") {
            //Không hợp lệ.
            document.getElementById(spanID).innerHTML = messagaer;
            return false;
        }
        //Hợp lệ.
        document.getElementById(spanID).innerHTML = "";
        return true;
    };
    this.kiemTraTen = function (value, spanID, messagaer) {
        var pattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s0-9]+$/;
        if (value.match(pattern)) {
            //Hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
        //Không hợp lệ.
        document.getElementById(spanID).innerHTML = messagaer;
        return false;
    };
    this.kiemTraNhanHieu = function (value, spanID, messagaer) {
        var pattern = /^[A-Za-z]+$/;
        if (value.match(pattern)) {
            //Hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
        //Không hợp lệ.
        document.getElementById(spanID).innerHTML = messagaer;
        return false;
    };
    this.kiemTraGia = function (value, spanID, messagaer) {
        var pattern = /^[0-9]+$/;
        if (value.match(pattern)) {
            //Hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
        //Không hợp lệ.
        document.getElementById(spanID).innerHTML = messagaer;
        return false;
    };
    this.kiemTraKichCo = function (value, spanID, messagaer) {
        var pattern = /^(\d{1,2}(\.\d{1,2})?)\w\w$/;
        if (value.match(pattern)) {
            //Hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
        //Không hợp lệ.
        document.getElementById(spanID).innerHTML = messagaer;
        return false;
    };
    this.kiemTraKieuMau = function (selecID, spanID, messagaer) {
        var selectELE = document.getElementById(selecID).selectedIndex;
        if (selectELE > 0) {
            //Hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
        //Không hợp lệ.
        document.getElementById(spanID).innerHTML = messagaer;
        return false;

    };
    this.kiemTraLoaiDay = function (selecID, spanID, messagaer) {
        var selectELE = document.getElementById(selecID).selectedIndex;
        if (selectELE > 0) {
            //Hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
        //Không hợp lệ.
        document.getElementById(spanID).innerHTML = messagaer;
        return false;

    };
    this.kiemTraMota = function (value, spanID, messagaer) {
        var pattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
        if (value.match(pattern)) {
            //Hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
        //Không hợp lệ.
        document.getElementById(spanID).innerHTML = messagaer;
        return false;
    };
    this.kiemTraTrung = function (value, spanID, messagaer, mangSP) {
        var isExist = mangSP.some(function (sp) {
            return value.trim() == sp.name;
        });
        if (isExist) {
            //Không hợp lệ.
            document.getElementById(spanID).innerHTML = messagaer;
            return false;
        }
        //Hợp lệ
        document.getElementById(spanID).innerHTML = "";
        return true;

    };
};
