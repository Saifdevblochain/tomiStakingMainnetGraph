import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Initialized,
  OwnershipTransferred,
  claimed,
  stakedAPY,
  unStakeAPY
} from "../generated/tomiStaking/tomiStaking"

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createclaimedEvent(
  claimedBy: Address,
  indexClaimed: BigInt,
  claimTime: BigInt,
  claimRewardAmount: BigInt,
  stakesInfo: ethereum.Tuple
): claimed {
  let claimedEvent = changetype<claimed>(newMockEvent())

  claimedEvent.parameters = new Array()

  claimedEvent.parameters.push(
    new ethereum.EventParam("claimedBy", ethereum.Value.fromAddress(claimedBy))
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam(
      "indexClaimed",
      ethereum.Value.fromUnsignedBigInt(indexClaimed)
    )
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam(
      "claimTime",
      ethereum.Value.fromUnsignedBigInt(claimTime)
    )
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam(
      "claimRewardAmount",
      ethereum.Value.fromUnsignedBigInt(claimRewardAmount)
    )
  )
  claimedEvent.parameters.push(
    new ethereum.EventParam("stakesInfo", ethereum.Value.fromTuple(stakesInfo))
  )

  return claimedEvent
}

export function createstakedAPYEvent(
  index: BigInt,
  staker: Address,
  amountStaked: BigInt,
  stakeTime: BigInt,
  lockPeriod: BigInt,
  APY: BigInt,
  stakesInfo: ethereum.Tuple
): stakedAPY {
  let stakedApyEvent = changetype<stakedAPY>(newMockEvent())

  stakedApyEvent.parameters = new Array()

  stakedApyEvent.parameters.push(
    new ethereum.EventParam("index", ethereum.Value.fromUnsignedBigInt(index))
  )
  stakedApyEvent.parameters.push(
    new ethereum.EventParam("staker", ethereum.Value.fromAddress(staker))
  )
  stakedApyEvent.parameters.push(
    new ethereum.EventParam(
      "amountStaked",
      ethereum.Value.fromUnsignedBigInt(amountStaked)
    )
  )
  stakedApyEvent.parameters.push(
    new ethereum.EventParam(
      "stakeTime",
      ethereum.Value.fromUnsignedBigInt(stakeTime)
    )
  )
  stakedApyEvent.parameters.push(
    new ethereum.EventParam(
      "lockPeriod",
      ethereum.Value.fromUnsignedBigInt(lockPeriod)
    )
  )
  stakedApyEvent.parameters.push(
    new ethereum.EventParam("APY", ethereum.Value.fromUnsignedBigInt(APY))
  )
  stakedApyEvent.parameters.push(
    new ethereum.EventParam("stakesInfo", ethereum.Value.fromTuple(stakesInfo))
  )

  return stakedApyEvent
}

export function createunStakeAPYEvent(
  unStaker: Address,
  unStakeTime: BigInt,
  unStakeIndex: BigInt,
  stakesInfo: ethereum.Tuple,
  _reward: BigInt
): unStakeAPY {
  let unStakeApyEvent = changetype<unStakeAPY>(newMockEvent())

  unStakeApyEvent.parameters = new Array()

  unStakeApyEvent.parameters.push(
    new ethereum.EventParam("unStaker", ethereum.Value.fromAddress(unStaker))
  )
  unStakeApyEvent.parameters.push(
    new ethereum.EventParam(
      "unStakeTime",
      ethereum.Value.fromUnsignedBigInt(unStakeTime)
    )
  )
  unStakeApyEvent.parameters.push(
    new ethereum.EventParam(
      "unStakeIndex",
      ethereum.Value.fromUnsignedBigInt(unStakeIndex)
    )
  )
  unStakeApyEvent.parameters.push(
    new ethereum.EventParam("stakesInfo", ethereum.Value.fromTuple(stakesInfo))
  )
  unStakeApyEvent.parameters.push(
    new ethereum.EventParam(
      "_reward",
      ethereum.Value.fromUnsignedBigInt(_reward)
    )
  )

  return unStakeApyEvent
}
