module.exports = {
  /**
   * Return plain object without specified key
   * @param {String} key
   */
  withoutKey(obj, key) {
    const objCopy = Object.assign({}, obj)
    delete objCopy[key]
    return objCopy
  },
}
