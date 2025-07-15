export const apiUrls = {
  projects: {
    profile: "profile/projects",
    featured: "/projects/featured",
    search: "/projects/search",
    single: "/project",
  },
  locations: {
    countries: "/countries",
    provinces: "/provinces",
    cities: "/cities",
  },
  categories: {
    active: "/active-project-categories",
  },
  user: {
    single: "/user",
    info: "/user-info",
    profile: "/profile/users",
  },
  auth: {
    login: "/login",
    register: "/register",
    logout: "/logout",
    verifyNotification: "/email/verification-notification",
    checkVerification: "/profile/check-verification",
  },
  files: {
    image: "/upload-image",
    video: "/upload-video",
    file: "/upload-file",
  },
  identity: {
    records: "/profile/identity-records",
    recordsInfo: "/profile/identity-records-info"
  },
  wallet: {
    all: "/profile/wallet",
    topUp: "/profile/wallet/top-up",
    transfer: "/profile/wallet/transfer",
    transactions: "/profile/wallet-transaction",
    withdraws: "/profile/withdraws"
  },
  withdraw: {
    all: "/profile/withdraws",
  },
  plans: {
    all: "/plans",
    active: "/active-plans"
  },
  subscription: {
    profile: "/profile/subscribe"
  }
};
