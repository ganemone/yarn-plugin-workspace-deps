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
        let locatorHashEntries = new Set<LocatorHash>(); // set of locatorHash 
        for (const [identHash, descriptor] of workspace.dependencies) {
          locatorHashEntries.add(project.storedResolutions.get(descriptor.descriptorHash));
        }
        for (const depLocatorHash of locatorHashEntries) {
          const pkg = project.storedPackages.get(depLocatorHash);
          for (const [identHash, descriptor] of pkg.dependencies) {
            locatorHashEntries.add(project.storedResolutions.get(descriptor.descriptorHash));
          }
        }
        const workspaceDepsContent = Array.from(locatorHashEntries).map(locatorHash => {
          const pkg = project.storedPackages.get(locatorHash);
          const name = pkg.scope ? `@${pkg.scope}/${pkg.name}` : pkg.name;
          return `${name}:${locatorHash}`;
        }).join('\n');
        await write(join(workspace.cwd, 'workspace-deps.txt'), workspaceDepsContent);
      }))
    },
  },
};

export default plugin;
