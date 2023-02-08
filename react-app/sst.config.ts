import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";
import { Api } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "react-app",
      region: "us-east-1",
    };
  },
  stacks(app) {    app.stack(API)
},
} satisfies SSTConfig;
