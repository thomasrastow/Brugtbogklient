var SDK = {

  serverURL: "https://localhost:8000",

  request: function (options, cb) {


    //Perform XHR
    $.ajax({
      url: SDK.serverURL + options.url,
      method: options.method,
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify(options.data),
      xhrFields:{withCredentials: true},
      success: function (data, status, xhr) {
        cb(null, data, status, xhr);
      },
      error: function (xhr, status, errorThrown) {
        cb({xhr: xhr, status: status, error: errorThrown});
      }
    });
  },

  Book: {
    getAll: function (cb) {
      SDK.request({method: "GET", url: "/getbooks"}, cb);
    },
    create: function (data, cb) {
      SDK.request({method: "POST", url: "/createbook", data:data}, cb);
    }
  },

  User: {
    getAll: function (cb) {
      SDK.request({method: "GET", url: "/getusers"}, cb);
    },

    create: function (data,cb) {
      SDK.request({method: "POST", url: "/createuser", data:data}, cb);
    },

    current:function () {
      return SDK.Storage.load("user");
    }
  },

  Publisher: {
    getAll: function (cb) {
      SDK.request({method: "GET", url: "/publishers"}, cb);
    }
  },

  Ad: {
    getAll: function (cb) {
      SDK.request({method: "GET", url: "/getads"}, cb);
    },
    getMyAds: function (cb) {
      SDK.request({method: "GET", url: "/getmyads"}, cb);
    },
    create: function (data, cb) {
      SDK.request({method: "POST", url: "/createad", data:data}, cb);
    }
  },

  Author: {
    getAll: function (cb) {
      SDK.request({method: "GET", url: "/authors"}, cb);
    }
  },

  logOut:function() {
    SDK.Storage.remove("tokenId");
    SDK.Storage.remove("userId");
    SDK.Storage.remove("user");
  },

  login: function (username, password, cb) {
    this.request({
      data: {
        username: username,
        password: password
      },
      url: "/login",
      method: "POST"
    }, function (err, data) {

      //On login-error
      if (err) return cb(err);

      SDK.Storage.persist("tokenId", data.id);
      SDK.Storage.persist("userId", data.userId);
      SDK.Storage.persist("user", data.user);

      cb(null, data);

    });
  },

  Storage: {
    prefix: "BookStoreSDK",
    persist: function (key, value) {
      window.localStorage.setItem(this.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
    },
    load: function (key) {
      var val = window.localStorage.getItem(this.prefix + key);
      try {
        return JSON.parse(val);
      }
      catch (e){
        return val;
      }
    },
    remove:function (key) {
      window.localStorage.removeItem(this.prefix + key);
    }
  }

};
