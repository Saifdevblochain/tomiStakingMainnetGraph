import {
  Initialized as InitializedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  claimed as claimedEvent,
  stakedAPY as stakedAPYEvent,
  unStakeAPY as unStakeAPYEvent
} from "../generated/tomiStaking/tomiStaking"
import {
  Initialized,
  OwnershipTransferred,
  claimed,
  stakedAPY,
  unStakeAPY
} from "../generated/schema"

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleclaimed(event: claimedEvent): void {
  let entity = new claimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.claimedBy = event.params.claimedBy
  entity.indexClaimed = event.params.indexClaimed
  entity.claimTime = event.params.claimTime
  entity.claimRewardAmount = event.params.claimRewardAmount
  entity.stakesInfo_startTime_ = event.params.stakesInfo.startTime_
  entity.stakesInfo_endTime_ = event.params.stakesInfo.endTime_
  entity.stakesInfo_stakeAmount = event.params.stakesInfo.stakeAmount
  entity.stakesInfo_stakeDuration = event.params.stakesInfo.stakeDuration
  entity.stakesInfo_stakeAPY = event.params.stakesInfo.stakeAPY
  entity.stakesInfo_lastClaimTime = event.params.stakesInfo.lastClaimTime
  entity.stakesInfo_stakedForAPY = event.params.stakesInfo.stakedForAPY

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlestakedAPY(event: stakedAPYEvent): void {
  let entity = new stakedAPY(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.index = event.params.index
  entity.staker = event.params.staker
  entity.amountStaked = event.params.amountStaked
  entity.stakeTime = event.params.stakeTime
  entity.lockPeriod = event.params.lockPeriod
  entity.APY = event.params.APY
  entity.stakesInfo_startTime_ = event.params.stakesInfo.startTime_
  entity.stakesInfo_endTime_ = event.params.stakesInfo.endTime_
  entity.stakesInfo_stakeAmount = event.params.stakesInfo.stakeAmount
  entity.stakesInfo_stakeDuration = event.params.stakesInfo.stakeDuration
  entity.stakesInfo_stakeAPY = event.params.stakesInfo.stakeAPY
  entity.stakesInfo_lastClaimTime = event.params.stakesInfo.lastClaimTime
  entity.stakesInfo_stakedForAPY = event.params.stakesInfo.stakedForAPY

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleunStakeAPY(event: unStakeAPYEvent): void {
  let entity = new unStakeAPY(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.unStaker = event.params.unStaker
  entity.unStakeTime = event.params.unStakeTime
  entity.unStakeIndex = event.params.unStakeIndex
  entity.stakesInfo_startTime_ = event.params.stakesInfo.startTime_
  entity.stakesInfo_endTime_ = event.params.stakesInfo.endTime_
  entity.stakesInfo_stakeAmount = event.params.stakesInfo.stakeAmount
  entity.stakesInfo_stakeDuration = event.params.stakesInfo.stakeDuration
  entity.stakesInfo_stakeAPY = event.params.stakesInfo.stakeAPY
  entity.stakesInfo_lastClaimTime = event.params.stakesInfo.lastClaimTime
  entity.stakesInfo_stakedForAPY = event.params.stakesInfo.stakedForAPY
  entity._reward = event.params._reward

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
