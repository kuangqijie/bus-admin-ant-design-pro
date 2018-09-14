import mockjs from 'mockjs';

const station = {
    list: [
      {key:1, id:25, type:1, fullName:'商丘大学', name:'sqdx', code:'SQDX', area:'商丘'},
      {key:2, id:563, type:2, fullName:'昆明', name:'km', code:'KM', area:'昆明'}
    ]
}


export default {
    '/api/station': station,
}
