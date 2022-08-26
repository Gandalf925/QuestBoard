export default function (context) {
  if (sessionStorage.getItem('isLoggedIn')) {
    context.store.commit('setLoginState', sessionStorage.getItem('isLoggedIn'))
    context.store.commit('setHandleName', sessionStorage.getItem('handle'))
    context.store.commit('setPayMail', sessionStorage.getItem('paymail'))
    context.store.commit('setAvatarUrl', sessionStorage.getItem('avatarUrl'))
  }
  if (
    !context.store.getters.getLoggedIn &&
    !context.route.path.match(/\/auth\//)
  ) {
    context.redirect('/auth/landing')
  }
}
