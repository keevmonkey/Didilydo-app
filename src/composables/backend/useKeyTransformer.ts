export default function useKeyTransformer() {
  const toSnakeCase = (key) => key.replace(/([A-Z])/g, '_$1').toLowerCase()
  // const toCamelCase = (key) => key.replace( /([A-Z])/g, "_$1" )

  const deepConvertKeysToSnakeCase = (obj) => {
    const isAnObject = (value) => typeof value === 'object' && !Array.isArray(value) && value !== null
    const isAnArray = (value) => typeof value === 'object' && Array.isArray(value) && value !== null
  
    const convertedObj = {}
    Object.entries(obj).forEach(([key, value]) => {
      //if (isAnArray(value))
      if (isAnObject(value)) {
        return convertedObj[toSnakeCase(key)] = deepConvertKeysToSnakeCase(value)
      }
      convertedObj[toSnakeCase(key)] = value
    })
    return convertedObj
  }

  return { toSnakeCase, deepConvertKeysToSnakeCase }
}
