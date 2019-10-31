import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  RelayedMessage,
  GasPriceChanged,
  RequiredBlockConfirmationChanged,
  DailyLimitChanged,
  ExecutionDailyLimitChanged,
  EternalOwnershipTransferred
} from "../generated/Contract/Contract"
import { ExampleEntity } from "../generated/schema"

export function handleRelayedMessage(event: RelayedMessage): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.recipient = event.params.recipient
  entity.value = event.params.value

  // Entities can be written to the store with `.save()`
  entity.save()

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

export function handleGasPriceChanged(event: GasPriceChanged): void {}

export function handleRequiredBlockConfirmationChanged(
  event: RequiredBlockConfirmationChanged
): void {}

export function handleDailyLimitChanged(event: DailyLimitChanged): void {}

export function handleExecutionDailyLimitChanged(
  event: ExecutionDailyLimitChanged
): void {}

export function handleEternalOwnershipTransferred(
  event: EternalOwnershipTransferred
): void {}
