const development = {
  apiEndpoint: "http://dev.bi-tool.com:8081",
  BASE_URL: "http://localhost:3300",
  CLIENT_RESTFUL_API_END_POINT: "http://localhost:3300",
  NEXT_SERVER_RESTFUL_API_END_POINT: "http://localhost:3300",
  LOG_LEVEL: "debug",
  MODE: "development",
};

const production = {
  apiEndpoint: "http://dev.bi-tool.com:8081",
  BASE_URL: "https://dev.dapplooker.com",
  CLIENT_RESTFUL_API_END_POINT: "https://dev.dapplooker.com",
  NEXT_SERVER_RESTFUL_API_END_POINT: "https://dev.dapplooker.com",
  LOG_LEVEL: "info",
  MODE: "production",
};

const env = process.env.NODE_ENV === "production" ? production : development;

export default env;

export const commonLabels = {
  signIn: "Sign In",
  login: "Login",
  signup: "Sign up",
  dappLooker: "DappLooker",
  company: "Company",
  community: "Community",
  CLOUDFRONT_BASE_URL: "https://d2yxqfr8upg55w.cloudfront.net",
  logout: "Logout",
  websiteEndpoint: "https://dapplooker.com/",
  somethingWentWrong: "Something Went Wrong",
  tryAgain: "Try Again",
  subscribe: "Subscribe",
  dappLookerAnalyst: "DappLooker Analyst",
  noDataFound: "No Data Found",
  addPromptUrlEntity: "/add-prompt",
  botPromptUrlEntity: "/bot-commands",
  emptyString: "",
  addPromptLabel: "Add New Command",
  selectServerLabel: "Select Server",
  loading: "Loading",
  elipsis: "...",
  editLabel: "Edit",
  registerLabel: "Register",
  deleteLabel: "Delete",
  removeLabel: "Remove",
  addLabel: "Add",
  alreadyExistMsg: "Already exists!",
  cancelLabel: "Cancel",
  confirmLabel: "Confirm",
  saveLabel: "Save",
  asterisk: "*",
  alertLabel: "ALERT",
  success: "success",
  error: "error",
  every: "Every",
  day: "Day",
  hrs: "Hrs",
  mins: "Mins",
  optionalLabel: "Optional",
  csvExtension: ".csv",
  pngExtension: ".png",
  web: "web",
  Id: "id",
  threeDots: "...",
  failed: "failed",
  subscriptionActive: "SUBSCRIPTION_ACTIVE",
  planExpired: "PLAN_EXPIRED",
  planOverUsed: "OVERUSE_ROWS",
  stripeSubscriptionCancelled: "SUBSCRIPTION_CANCELLED",
  stripeRenewFailed: "SUBSCRIPTION_RENEW_FAILED",
  chart: "chart",
  dashboard: "dashboard",
  slash: "/",
  poweredBy: "Powered by",
  api: "API",
  connectWallet: "Connect Wallet",
  loginToMetamask: "Login with MetaMask",
  clickHereToInstall: "Click here to install",
  myHistory: "My History",
  no: "No",
  found: "Found",
  string: "string",
  update: "Update",
  delete: "Delete",
  development: "development",
  production: "production",
  invalidModalName: "INVALID_MODAL_NAME",
  dollarSymbol: "$",
  percentageSymbol: "%",
};

export const errorLabels = {
  insufficientData: "Insufficient data! There's not enough information here to display the page you requested.",
  noDataFound: "No data found",
  oopsNoDataFound: "Oops, No data found!",
  // Add more route properties as needed
};

// Object for routes
export const routes = {
  home: `${env.BASE_URL}/`,
  github: `https://github.com/`
  // Add more route properties as needed
};

export const monthsMap = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
}


export const footerLabels = {
  poweredBy: "Powered By", 
  joinUs: "Join Us",
  dapplookerRoute:'https://dapplooker.com/', 
  socialLinks: [
    {
      tabName: "faTwitter",
      tabLink: "https://twitter.com/dapplooker",
      svgName: "fa-brands fa-medium",
    },
    {
      tabName: "faGithub",
      tabLink: "https://github.com/dapplooker",
      svgName: "fa-brands fa-medium",
    },
    {
      tabName: "faDiscord",
      tabLink: "https://discord.com/invite/s2BYwUMTQ4",
      svgName: "fa-brands fa-medium",
    },
    {
      tabName: "faMedium",
      tabLink: "https://blog.dapplooker.com/",
      svgName: "fa-brands fa-medium",
    },
    {
      tabName: "faTelegram",
      tabLink: "https://t.me/dapplooker",
      svgName: "fa-brands fa-medium",
    },
    {
      tabName: "faYoutube",
      tabLink: "https://www.youtube.com/channel/UC1KJmtb3UhnWSN_sDv71_fg",
      svgName: "fa-brands fa-medium",
    },
    {
      tabName: "faLinkedin",
      tabLink: "https://www.linkedin.com/company/dapplooker?originalSubdomain=in",
      svgName: "fa-brands fa-medium",
    },
  ],
}