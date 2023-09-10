let adminStationery = new Vue({
    el: '#adminStationery',
    data: {
        // 当前登录用户的用户名, 为空字符串表示未登录状态
        name: "",
        // 是否显示新增文具对话框
        showAddStationeryDialog: false,
        // 新增文具的信息
        newStationery: {
            name: "",
            price: 0,
            src: '',
        },
        // 当前的文具列表
        stationeryList: [
        ],
        stationery: {
            stationeryId: "",
            name: "",
            price: "",
            src: '',
        }
    },
    methods: {
        // 判定当前是否登录
        isLogin() {
            if (this.name === "") {
                return false;
            }
            return true;
        },

        // 从服务器检测登录状态
        checkLogin() {
            // 页面最初加载时先访问服务器判定自身的登陆状态.
            console.log("checkLogin");
            $.ajax({
                url: '/checkLogin',
                type: 'post',
                data: '',
                dataType: 'json',
                success: function (data, status) {
                    if (data.ok !== 1) {
                        return;
                    }
                    // 登录成功后
                    // 1. 设置用户名
                    adminStationery.name = data.name;
                    // 2. 获取文具列表
                    adminStationery.getStationeryList();
                }
            });
        },

        // 获取文具信息
        getStationeryList() {
            $.ajax({
                url: '/getStationeryList',
                type: 'post',
                // content: this,
                data: '',
                success: function (data) {
                    adminStationery.stationeryList = JSON.parse(data);
                }
            })
        },

        deleteStationery(stationeryId) {
            $.ajax({
                type: 'delete',
                url: '/deleteStationery?stationeryId=' + stationeryId,
                data: '',
                dataType: 'json',
                success: function (data, status) {
                    if (data.ok !== 1) {
                        alert("删除文具失败! 该文具已经被其他订单使用!");
                        return;
                    } else {
                        adminStationery.getStationeryList();
                        alert("删除文具成功!");
                    }
                }
            })
        },

        addStationery() {
            let formData = new FormData();
            formData.append('img', document.getElementById('img').files[0]);
            let name = document.getElementById('name').value;
            let price = document.getElementById('price').value;
            formData.append('name', name);
            formData.append('price', price);
            $.ajax({
                type: 'post',
                url: '/addStationery',
                data: formData,
                cache: false, //上传文件不需要缓存
                async: false,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false, // 告诉jQuery不要去设置Content-Type请求头
                dataType: 'json',
                success: function (data) {
                    if (data.ok !== 1) {
                        alert("新增文具失败! " + data.reason);
                        return;
                    } else {
                        adminStationery.getStationeryList();
                        alert("新增文具成功!");
                        adminStationery.showAddStationeryDialog = false;
                        adminStationery.newStationery = {};
                    }
                }
            })
        },

        logout() {
            $.ajax({
                url: '/logout',
                type: 'post',
                data: '',
                dataType: 'json',
                success: function (data) {
                    if (data.ok !== 1) {
                        alert("您还未登录")
                    } else {
                        adminStationery.name = null;
                        adminStationery.isAdmin = null;
                        alert("注销成功")
                        location.href = "../html/admin-stationery.html";
                    }
                }
            })
        }
    }
});