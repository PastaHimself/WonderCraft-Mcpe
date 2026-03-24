const REGULATOR_DEFAULTS = {
  capacity: 0,
  maxInput: 0,
  maxOutput: 0,
};

export const STORAGE_NODE_DEFS = {
  "wondercraft:energy_regulator": {
    kind: "transport",
    rate: 0,
    maxInput: REGULATOR_DEFAULTS.maxInput,
    maxOutput: REGULATOR_DEFAULTS.maxOutput,
    capacity: REGULATOR_DEFAULTS.capacity,
    canGenerate: false,
  },
  "wondercraft:basic_battery": {
    kind: "storage",
    rate: 0,
    maxInput: 128,
    maxOutput: 128,
    capacity: 512,
    canGenerate: false,
  },
  "wondercraft:advanced_battery": {
    kind: "storage",
    rate: 0,
    maxInput: 256,
    maxOutput: 256,
    capacity: 2048,
    canGenerate: false,
  },
  "wondercraft:reinforced_battery": {
    kind: "storage",
    rate: 0,
    maxInput: 512,
    maxOutput: 512,
    capacity: 8192,
    canGenerate: false,
  },
  "wondercraft:industrial_battery": {
    kind: "storage",
    rate: 0,
    maxInput: 1024,
    maxOutput: 1024,
    capacity: 32768,
    canGenerate: false,
  },
  "wondercraft:elite_battery": {
    kind: "storage",
    rate: 0,
    maxInput: 2048,
    maxOutput: 2048,
    capacity: 131072,
    canGenerate: false,
  },
  "wondercraft:quantum_battery": {
    kind: "storage",
    rate: 0,
    maxInput: 4096,
    maxOutput: 4096,
    capacity: 1048576,
    canGenerate: false,
  },
};

export function createEnergyNodeDefinitions(nonStorageDefs) {
  return {
    ...nonStorageDefs,
    ...STORAGE_NODE_DEFS,
  };
}

export function ensureStorageCharge(storageCharge, key) {
  if (storageCharge.has(key)) {
    return false;
  }

  storageCharge.set(key, 0);
  return true;
}

export function loadStorageChargeState(rawState, storageCharge) {
  let parsed;
  try {
    parsed = JSON.parse(rawState);
  } catch {
    return undefined;
  }

  const savedStorages = parsed.storages ?? parsed.regulators ?? {};
  for (const [key, charge] of Object.entries(savedStorages)) {
    storageCharge.set(key, Math.max(Number(charge) || 0, 0));
  }

  return parsed;
}

export function serializeStorageChargeState(storageCharge, extraState = {}) {
  return JSON.stringify({
    ...extraState,
    storages: Object.fromEntries(storageCharge),
  });
}
