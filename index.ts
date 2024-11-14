import axios from "axios";
import * as pulumi from "@pulumi/pulumi";
import { LocalWorkspace } from "@pulumi/pulumi/automation";

const pulumiProgram = async () => {
  const response = pulumi.output(axios.get("https://google.com"));
  response.apply((r) => {
    pulumi.log.info(`${r.status}`);
  });
};

(async () => {
  const stack = await LocalWorkspace.createOrSelectStack({
    program: pulumiProgram,
    projectName: "test-async-apply",
    stackName: "dev",
  });

  await stack.up({ onOutput: console.log });
})();
