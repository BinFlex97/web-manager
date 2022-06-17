function WatchList() {

    this.getList = function () {
        // GET request for remote image in node.js
        return axios({
            method: 'get',
            url: 'https://62a8007ca89585c1770aba5e.mockapi.io/watch-list',
        });
    };

    this.addProduct = function (sp) {
        // Send a POST request
        return axios({
            method: 'post',
            url: 'https://62a8007ca89585c1770aba5e.mockapi.io/watch-list',
            data: sp,
        });
    };
    this.deleteProduct = function (id) {
        return axios({
            method: 'delete',
            url: `https://62a8007ca89585c1770aba5e.mockapi.io/watch-list/${id}`
        });
    };
    this.getProductItem = function (id) {
        return axios({
            method: 'get',
            url: `https://62a8007ca89585c1770aba5e.mockapi.io/watch-list/${id}`,
        });
    };
    this.updateProduct = function (sp, id) {
        return axios({
            method: 'put',
            url: `https://62a8007ca89585c1770aba5e.mockapi.io/watch-list/${id}`,
            data: sp,
        });
    };
}