import { get } from "./ajax";
import { storage } from "../utils/util";

const prefix = "/api_weixin/";

const appid = "wx46d79d44faabe832",
  secret = "b57671fb9ca1c3f5df38be63d05dbbdc";

export default {
  token: () => {
    const access_token = storage.getItem("access_token");
    if (access_token) return Promise.resolve(access_token);
    else
      return get(prefix + "cgi-bin/token", {
        grant_type: "client_credential",
        appid,
        secret
      }).then(res => {
        storage.setItem("access_token", res.access_token);
        return Promise.resolve(res.access_token);
      });
  },
  getticket: access_token => {
    const ticket = storage.getItem("ticket ");
    if (ticket) return Promise.resolve(ticket);
    return get(prefix + "cgi-bin/ticket/getticket", {
      access_token,
      type: "jsapi"
    }).then(res => {
      storage.setItem("ticket", res.ticket);
      return Promise.resolve(res.ticket);
    });
  }
};
