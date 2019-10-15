require('./removeByValue')();

module.exports =  (io) => {
  const userList = []; //사용자 리스트를 저장할곳
  const userColor = {};
  io.on('connection', (socket) => {
    //아래 두줄로 passport의 req.user의 데이터에 접근한다.
    const session = socket.request.session.passport;
    const user = (typeof session !== 'undefined') ? ( session.user ): '';
    // console.log(user);
    // userList 필드에 사용자 명이 존재 하지 않으면 삽입
    if (!userList.includes(user.displayname)){
      userList.push(user.displayname);
    }
    io.emit('server message', { message: `${user.displayname}님이 입장하셨습니다.`, displayname: '알림' });
    io.emit('join', userList);

    //사용자 명과 메시지를 같이 반환한다.
    socket.on('client message', (data) => {
      io.emit('server message', { message: data.message, displayname: user.displayname });
    });

    socket.on('disconnect', () => {
      userList.removeByValue(user.displayname);
      io.emit('server message', { message: `${user.displayname}님이 퇴장하셨습니다.`, displayname: '알림' });
      io.emit('leave', userList);
    });
  });
};
