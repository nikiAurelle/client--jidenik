export const formatToCamelCase = (name: String) =>{
  return name.charAt(0).toUpperCase()+name.slice(1)
}

export const generateId = () =>{
  var timestamp  = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function (){
    return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
}
export  const getExtension = (filename: String) =>{
  var parts = filename.split('.')
  return parts[parts.length - 1]
}

export const isImage = (filename: String) =>{
  var ext = getExtension(filename)
  switch (ext.toLowerCase()){
    case 'jpg':
    case 'gif':
    case 'png':
      return true
  }
  return false
}
