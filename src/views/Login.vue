<template>
  <div class="login">
    <img style="width: 37%" src="../assets/login/bg.png" />
    <div style="width: 26%" class="login-img">
      <div>
        <img style="height: 50%" src="../assets/login/equipment2.png" alt="" />
        <img style="height: 45%" src="../assets/login/equipment1.png" alt="" />
      </div>
    </div>
    <div class="login-form" style="width: 37%">
      <div>
        <div>
          <h2 class="login-form-title">双擎科技商业服务平台</h2>
          <el-form
            hide-required-asterisk
            label-position="top"
            :model="login"
            status-icon
            ref="loginForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              :rules="[{ required: true, message: '账号不能为空' }]"
              label="账号"
              prop="userEmail"
            >
              <el-input
                placeholder="请输入账号"
                clearable
                v-model="login.userEmail"
              ></el-input>
            </el-form-item>
            <el-form-item
              :rules="[{ required: true, message: '密码不能为空' }]"
              label="密码"
              prop="password"
            >
              <el-input
                placeholder="请输入密码"
                clearable
                show-password
                type="password"
                v-model="login.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                class="login-form-button"
                type="primary"
                @click="submitForm"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { login } from "@/api/login";

@Component
export default class Login extends Vue {
  $refs: any;

  login = {
    userEmail: "",
    password: "",
  };

  submitForm() {
    this.$refs.loginForm.validate(async (valid: any) => {
      if (valid) {
        try {
          const data = await login(this.login.userEmail, this.login.password);
          if (data) {
            this.$router.push("/");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.login {
  display: flex;
  // background-image: url(../assets/login/bg.png);
  // background-size: auto 100%;
  // background-repeat:no-repeat;
  height: 100%;
  &-img {
    div {
      height: 100%;
      display: flex;
      align-items: flex-end;
    }
  }
  &-form {
    padding: 0 20px;
    > div {
      display: flex;
      align-items: center;
      height: 100%;
      > div {
        width: 100%;
        max-width: 370px;
        .login-form-title {
          font-size: 28px;
          margin-bottom: 50px;
        }
        // height: 100%;
        ::v-deep .el-form-item__label {
          line-height: 16px;
          padding-bottom: 16px;
          font-size: 16px;
          color: #999999;
        }
        ::v-deep .el-input__inner {
          background: #f7fafc;
          border-radius: 0;
          border: none;
        }
        .login-form-button {
          border-radius: 0;
          margin-top: 36px;
          width: 100%;
        }
      }
    }
  }
}
</style>