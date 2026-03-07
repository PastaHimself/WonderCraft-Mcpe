import { world } from "@minecraft/server";

const LOG_PREFIX = "[WonderCraft Add-on]";

world.events.tick.subscribe(() => {
  console.debug(`${LOG_PREFIX} tick event`);
});
