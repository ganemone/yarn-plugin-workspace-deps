import {
  LocatorHash,
  Plugin,
  Hooks,
} from "@yarnpkg/core";

import {promisify} from 'util';
import {writeFile} from "fs";
import {join} from "path";

const write = promisify(writeFile);

const plugin: Plugin<Hooks> = {
  hooks: {
    afterAllInstalled: async (project) => {
      await Promise.all(project.workspaces.map(async workspace => {
        let depEntries = new Set<LocatorHash>(); // set of locatorHash 
        for (const [identHash, descriptor] of workspace.dependencies) {
          depEntries.add(project.storedResolutions.get(descriptor.descriptorHash));
        }
        for (const depLocatorHash of depEntries) {
          const pkg = project.storedPackages.get(depLocatorHash);
          for (const [identHash, descriptor] of pkg.dependencies) {
            depEntries.add(project.storedResolutions.get(descriptor.descriptorHash));
          }
        }
        await write(join(workspace.cwd, 'dep-hash.workspace'), Array.from(depEntries).join('\n'));            
      }))
    },
  },
};

export default plugin;
