// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html className="h-full bg-gray-50">
        <Head>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css"/>
        </Head>
        <body className="h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument