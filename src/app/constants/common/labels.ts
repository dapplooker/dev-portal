const development = {
  BASE_URL: "http://localhost:3000",
  CLIENT_RESTFUL_API_END_POINT: "http://localhost:3000",
  NEXT_SERVER_RESTFUL_API_END_POINT: "http://localhost:3000",
  LOG_LEVEL: "debug",
  MODE: "development",
};

const production = {
  BASE_URL: "http://localhost:3000",
  CLIENT_RESTFUL_API_END_POINT: "http://localhost:3000",
  NEXT_SERVER_RESTFUL_API_END_POINT: "http://localhost:3000",
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
  page404: "404 | Page Not Found",
  pagenotFound: "Page not found",

  technicalIssue:
    " Sorry, we are having some technical issues (as you can see). Try to refresh the page. Maybe it will work.",
  invalidEmail: "Please enter a valid email address.",
  noPassword: "Password length must be minimum 8 characters.",
  noTermsAndConditionAccepted: "Please accept the terms and conditions.",
  noName: "Please enter your name.",
  unauthorized: "Unauthorized",
  cantAccess: "You can't access this dashboard!",
  // Add more route properties as needed
};

// Object for routes
export const routes = {
  home: `${env.BASE_URL}/`,
  // Add more route properties as needed
};
