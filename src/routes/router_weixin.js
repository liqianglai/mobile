export default {
  path: "/weixin",
  component: "/weixin",
  exact: false,
  children: {
    location: {
      path: "/weixin/location",
      component: "/weixin/location"
    }
  }
};
