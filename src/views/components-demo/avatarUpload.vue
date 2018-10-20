<template>
  <div class="components-container">
    <imgInputer v-model="file" accept="image/*" no-mask img-src="http://7xntdk.com1.z0.glb.clouddn.com/12.jpg" @onChange="fileChange"/>
    <h1><code>no-mask</code></h1>

  </div>
</template>

<script>
import { getToken } from '@/utils/store2'
import ImgInputer from 'vue-img-inputer'
import 'vue-img-inputer/dist/index.css'

export default {
  name: 'AvatarUploadDemo',
  components: { ImgInputer },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
      show: true,
      file: undefined,
      headers: {
        'Access-Token': getToken()
      },
      imgDataUrl: '' // the datebase64 url of created image
    }
  },
  methods: {
    fileChange(file, name) {
      console.log('File --> ', file)
      console.log('FileName -->', name)
    },
    onErr(err, file) {
      console.log('​onErr -> file', file)
      console.log('​onErr -> err', err)
    }
  }
}
</script>

<style scoped>
  .avatar{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>

