export const routes = {
    home:{
        key: 'home',
        getPath: ()=> '/'
    },
    landing:{
        key: 'landing',
        getPath: ()=> '/landing'
    },
    signUp:{
        key: 'signUp',
        getPath: ()=> '/signUp:type'
    },
    login:{
        key: 'login',
        getPath: ()=> '/login:type'
    },
    buyer:{
        key: 'buyer',
        getPath: ()=> '/buyer'
    },
    seller:{
        key: 'seller',
        getPath: ()=> '/seller'
    },
    sellerProfile:{
        key: 'sellerProfile',
        getPath: ()=> '/sellers/:id'
    },
    appointment:{
        key: 'appointment',
        getPath: ()=> '/appointment'
    },
    slots:{
        key: 'slots',
        getPath: ()=> '/slots'
    },
    newSlot:{
        key: 'newSlot',
        getPath: ()=> '/slots/new'
    },

}