import { ping, refreshJWT } from "@/lib/api/auth.api";

const SessionChecker = () => {
  ping().then((p) => {
    if (!p) {
      refreshJWT({ token: localStorage.getItem("refresh") || "" }).catch(() => {
        location.href = "/login?redirect=" + location.pathname;
      });
    }
  });
};

export default SessionChecker;
