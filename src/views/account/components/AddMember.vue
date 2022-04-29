<template>
  <div>
    <el-button
      @click.native.prevent="add"
      :type="!data ? 'primary' : 'text'"
      size="small"
    >
      {{ title }}
    </el-button>
    <el-dialog
      :destroy-on-close="true"
      width="500px"
      :title="title"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        hide-required-asterisk
        :model="form"
        label-width="40px"
        ref="addUserForm"
        :rules="rules"
      >
        <el-form-item prop="userName" label="账号">
          <el-input v-model="form.userName"></el-input>
          <p class="explain">
            请输入6-16位数账号，请使用英文（支持大小写）、数字（不支持特殊符号）
          </p>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            @blur="blurPsw"
            @focus="focusPsw"
            :type="type"
            v-model="form.password"
          ></el-input>
          <p class="explain">
            请输入8-16位数密码，请使用英文（支持大小写）、数字（不支持特殊符号）
          </p>
        </el-form-item>
        <el-form-item prop="roleId" label="身份">
          <el-select
            style="width: 100%"
            v-model="form.roleId"
            placeholder="请选择身份"
          >
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { createUser, updateUser } from "@/api/user";
import { generateUUID } from "@/utils";

@Component
export default class AddMember extends Vue {
  $refs: any;
  @Prop() data?: any;

  title = "添加新账户";

  id: any = null;

  dialogFormVisible = false;

  newPsw = true;

  oldPsw = "";

  realPsw = "";

  editData: any = {};

  form = {
    userName: "",
    password: "",
    email: "",
    roleId: 3,
  };
  rules = {
    userName: [
      { required: true, message: "账号必须输入" },
      { min: 6, message: "用户名至少6位" },
      { max: 16, message: "用户名最多16位" },
      { pattern: /^[0-9a-zA-Z_]+$/, message: "账号必须是英文数字组合" },
    ],
    email: [
      { required: true, message: "请输入邮箱地址", trigger: "blur" },
      {
        type: "email",
        message: "请输入正确的邮箱地址",
        trigger: ["blur", "change"],
      },
    ],
    password: [
      { required: true, message: "密码必须输入" },
      { min: 8, message: "密码至少8位" },
      { max: 16, message: "密码最多16位" },
      { pattern: /^[0-9a-zA-Z_]+$/, message: "密码必须是英文数字组合" },
    ],
  };
  @Watch("data", {
    immediate: true,
  })
  dataChange(val: any) {
    if (val) {
      this.editData = val;
      this.id = val.id;
      this.newPsw = false;
      this.title = "编辑";
      // this.form = {
      //   ...val,
      //   password: Math.floor(
      //     (Math.random() + Math.floor(Math.random() * 9 + 1)) *
      //       Math.pow(10, 10 - 1)
      //   ),
      // };
    }
  }

  get type() {
    return this.id && !this.newPsw ? "password" : "text";
  }
  get roles() {
    return this.$store.state.roleId === "2"
      ? this.$store.state.role.filter((item: any) => item.id > 2)
      : this.$store.state.role;
  }

  mounted() {
    console.log("mounted");
  }

  blurPsw() {
    if (this.id && !this.form.password) {
      this.form.password = this.oldPsw;
      this.newPsw = false;
    }
  }

  focusPsw() {
    if (this.id && this.oldPsw === this.form.password) {
      this.form.password = "";
      this.newPsw = true;
    }
  }

  add() {
    this.dialogFormVisible = true;
    if (this.id) {
      const { userName, email, roleId } = this.editData;
      this.oldPsw = generateUUID(10);
      this.form = {
        userName,
        email,
        roleId,
        password: this.oldPsw,
      };
    } else {
      this.form = {
        userName: "",
        email: "",
        password: "",
        roleId: 3,
      };
    }
  }

  ok() {
    this.$refs.addUserForm.validate(async (valid: any) => {
      if (valid) {
        try {
          if (this.id) {
            const send: any = {
              ...this.form,
              id: this.id,
            };
            if (!this.newPsw) {
              send.password = "";
            }
            await updateUser(send);
            this.$message.success("修改成功");
          } else {
            await createUser({ ...this.form });
            this.$message.success("添加成功");
          }
          this.dialogFormVisible = false;
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
}
</script>
 
<style scoped lang="less">
.explain {
  font-size: 12px;
  color: #8c8c8c;
}
</style>