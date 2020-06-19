<template>
<div class="login-contrainer">
    <transition name="fade"
                  enter-active-class="fadeInLeft"
                  leave-active-class="fadeOutRight"
                  mode="out-in">
        <router-view/>
    </transition>
</div>
</template>

<script>
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    handleSubmit(e) {
        this.router.push('/home')
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
  },
};
</script>
<style>
.login-contrainer {
    height: 100%;
    /* background: url("../assets/images/login_background.jpg"); */
}
</style>