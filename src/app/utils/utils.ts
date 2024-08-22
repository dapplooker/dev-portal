import axios from "axios";

class Utils {
  /**
   * Is var null or undefined?
   *
   * @param {object/string/integer/boolean} variable
   *
   * @returns {boolean}
   */
  private isVarNullOrUndefined(variable: any): boolean {
    return typeof variable === "undefined" || variable == null;
  }

  validateNonEmptyObject(variable: object): boolean {
    const oThis = this;
    if (oThis.isVarNullOrUndefined(variable) || typeof variable !== "object") {
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

  public invert(obj: any) {
    const ret: any = {};

    for (const key in obj) {
      ret[obj[key]] = key;
    }

    return ret;
  }

  public getUserById = async (userId: number) => {
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=id:${userId}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      });
      const user = response.data.items[0]; 
      return user.login;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return null;
    }
  };
}

const utils = new Utils();
export default utils;
