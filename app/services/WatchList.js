function WatchList() {

    this.getList = function () {
        // GET request for remote image in node.js
        return axios({
            method: 'get',
            url: 'https://62a8007ca89585c1770aba5e.mockapi.io/watch-list',
        });
    };

    this.getProduct = function (sp) {
        // Send a POST request
        return axios({
            method: 'post',
            url: 'https://62a8007ca89585c1770aba5e.mockapi.io/watch-list',
            data: sp,
        });
    };
}