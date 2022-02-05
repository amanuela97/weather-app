const checkImageHost = (url) => {
  const validHosts = ['lh3.googleusercontent.com', 'firebasestorage.googleapis.com']
  return validHosts.includes(url)
}

export default checkImageHost