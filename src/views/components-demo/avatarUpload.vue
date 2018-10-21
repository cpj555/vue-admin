<template>
  <div class="components-container">

    <img-inputer v-model="file" theme="light" size="large" @onChange="fileChange"/>
    <h1><code>no-mask</code></h1>

  </div>
</template>

<script>
import { getToken } from '@/utils/store2'
import { upload } from '@/api/upload'
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
      const fromdata = new FormData()
      fromdata.append('media', file)
      console.log('File --> ', this.file)
      console.log('FileName -->', name)
      upload(fromdata).then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
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

