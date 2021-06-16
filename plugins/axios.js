export default function ({
  $axios, redirect, app, store
}) {
  $axios.onRequest((config) => {
    // config.headers.common['dataType'] = 'jsonp';
    // console.log(config)
  })

  $axios.onError((error) => {
    console.log('error: ', error)
  })
}
