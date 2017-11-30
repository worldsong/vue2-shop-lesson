/**
 * Created by z on 2017/11/29.
 */
import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN';//引入中文文件

// 配置中文
Validator.addLocale(zh);

const config = {
  locale: 'zh_CN'
};

Vue.use(VeeValidate,config);

// 自定义validate
const dictionary = {
  zh_CN: {
    messages: {
      required: ( field )=> "请输入" + field
    },
    attributes:{
      postCode:'邮政编码',
      streetName:'详细地址',
      userName: '姓名',
      phone: '手机'
    }
  }
};

Validator.updateDictionary(dictionary);

Validator.extend('phone', {
  messages: {
    zh_CN:field => '请输入正确的手机号码',
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});
Validator.extend('postCode', {
  messages: {
    zh_CN:field => '邮政编码必须是6位数字',
  },
  validate: value => {
    return /\d{6}/.test(value)
  }
});
