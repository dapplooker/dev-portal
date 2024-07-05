class Utils {

  /**
   * Is var null or undefined?
   *
   * @param {object/string/integer/boolean} variable
   *
   * @returns {boolean}
   */
  private isVarNullOrUndefined(variable: any): boolean {
    return typeof variable === 'undefined' || variable == null;
  }

  validateNonEmptyObject(variable: object): boolean {
    const oThis = this;
    if (oThis.isVarNullOrUndefined(variable) || typeof variable !== 'object') {
      return false;
    }

    for (const prop in variable) {
      try {
        if (Object.prototype.hasOwnProperty.call(variable, prop)) {
          return true;
        }
      } catch (error) {
        return false;
      }
    }

    return false;
  }

}

const utils = new Utils()
export default utils;