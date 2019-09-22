function getCookie(cname){
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(unescape(document.cookie));
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookieHour(name, value, hours){
  var now = new Date();
  var time = now.getTime();
  time += 3600 * 1000 * hours;
  now.setTime(time);
  document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + now.toUTCString() + ";"
}

const handleCart = ({ productId, thumbnail, name }) => {
  if(confirm('장바구니에 담겠습니까?')){
    const localDataCartList = getCookie('cartList');
    const cartList = localDataCartList ? JSON.parse(localDataCartList) : {};
    // //갯수와 총량을 담는다.
    var count = Number($('input[name=number]').val());
    var amount = Number($('input[name=amount]').val());
    let cartListByUserId = {};
    if (userId && cartList[userId]) cartListByUserId = {...cartList[userId]};
    let cartItemByPrdId = cartListByUserId[productId] ? {
      ...cartListByUserId[productId],
      count: cartListByUserId[productId].count + count,
      amount: cartListByUserId[productId].amount + amount,
    } : {
      thumbnail,
      name,
      id: productId,
      count,
      amount,
    };
    cartListByUserId[productId] = cartItemByPrdId;

    setCookieHour( "cartList" , JSON.stringify({ ...cartList, [userId]: cartListByUserId }), (10 * 365 * 24) );

    alert("장바구니에 담았습니다.");
  }
};
