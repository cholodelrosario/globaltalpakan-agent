import { firebase,firebaseAuth } from 'src/boot/firebase'
import { Dialog } from 'quasar'
import Store from 'src/store'

export function logoutUser ({ commit,rootState }){
    let self = this
    Dialog.create({
        title: `Are you sure you want to logout?`,
        type: 'negative',
        color: 'light-blue-10',
        textColor: 'white',
        icon: 'warning',
        ok: 'Ok',
        cancel: {
            color: 'grey',
            flat: true,
        }
        
    }).onOk(()=>{
      firebaseAuth.signOut()
        .then(async () => {
            commit('unsetDashboardUser')
            self.$router.push('/')
        })
    }) 

}