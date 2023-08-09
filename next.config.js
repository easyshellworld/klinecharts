/** @type {import('next').NextConfig} */
const nextConfig = {}

//module.exports = nextConfig
module.exports = {

    async rewrites() { 
      return [ 
       //接口请求 前缀带上/api-text/
        { source: '/api-text', destination: `https://api.mytokenapi.com/currency/kline?com_id=btc_usdt&symbol=btc&anchor=USDT&time="+last+"&market_id=338&period=1d&timestamp=1674739035146&code=ebc161c4c01e448626c3cc30518009d6&platform=web_pc&v=1.0.0&language=en_US&legal_currency=USD` }, 
  
      ]
    },
    }
  
