import { BigInt } from "@graphprotocol/graph-ts"
import {
  ForeignBridgeDeployed
} from "../generated/ForeignBridgeFactory/ForeignBridgeFactory"
// import { UserRequestForSignature, CollectedSignatures } from "../generated/templates/HomeBridgeErcToErc/HomeBridgeErcToErc"
// import { ExampleEntity } from "../generated/schema"
import { Token as TokenContract, ForeignBridgeErcToErc as ForeignBridgeErcToErcContract } from "../generated/templates"
import { ForeignBridgeErcToErc } from "../generated/schema"

export function handleForeignBridgeDeployed(event: ForeignBridgeDeployed): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let foreignBridge = ForeignBridgeErcToErc.load(event.params._foreignBridge.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (foreignBridge == null) {
    foreignBridge = new ForeignBridgeErcToErc(event.params._foreignBridge.toHex())
  }

  // Entity fields can be set based on event parameters
  foreignBridge.address = event.params._foreignBridge

  // Entities can be written to the store with `.save()`
  foreignBridge.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.relayedMessages(...)
  // - contract.totalSpentPerDay(...)
  // - contract.isInitialized(...)
  // - contract.getCurrentDay(...)
  // - contract.requiredBlockConfirmations(...)
  // - contract.executionDailyLimit(...)
  // - contract.totalExecutedPerDay(...)
  // - contract.dailyLimit(...)
  // - contract.withinExecutionLimit(...)
  // - contract.executionMaxPerTx(...)
  // - contract.requiredSignatures(...)
  // - contract.owner(...)
  // - contract.validatorContract(...)
  // - contract.deployedAtBlock(...)
  // - contract.getBridgeInterfacesVersion(...)
  // - contract.upgradeabilityAdmin(...)
  // - contract.minPerTx(...)
  // - contract.withinLimit(...)
  // - contract.maxPerTx(...)
  // - contract.gasPrice(...)
  // - contract.initialize(...)
  // - contract.getBridgeMode(...)
  // - contract.erc20token(...)
  // - contract.onTokenTransfer(...)
}