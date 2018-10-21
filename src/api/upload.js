import requset from '@/utils/request'

export function upload(formdata) {
  formdata.append('key', 'value')
  console.log(formdata)
  // return axios.post(process.env.BASE_API+'/upload',formdata)
  // axios.post()
  return requset.post('/upload',
    formdata,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      transformRequest: null
    })
}
