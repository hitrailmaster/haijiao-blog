const CookieUtils = {

  // get cookie
  getCookie(name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return (unescape(arr[2]));
    else
      return null;
  },

  //set cookie
  setCookie(c_name, value, expiredays) {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
  },

  //delete one cookie
  deleteCookie(name) {
    this.setCookie(name, '', -1);
  },

  //delete all cookies
  deleteAllCookies() {
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (let i = keys.length; i--;)
        document.cookie =
        keys[i] + "=0;expires=" + new Date(0).toUTCString();
    }
  }


}


export default CookieUtils;