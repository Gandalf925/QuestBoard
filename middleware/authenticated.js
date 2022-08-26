export default function (context) {
  if (
    !context.store.getters.isAuthenticated &&
    !context.route.path.match(/\/auth\//)
  ) {
    context.redirect('/auth/landing')
  }
}
