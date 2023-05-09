import {BigInt} from '@graphprotocol/graph-ts'
import {
  Initialized as InitializedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  claimed as claimedEvent,
  stakedAPY as stakedAPYEvent,
  unStakeAPY as unStakeAPYEvent
} from "../generated/tomiStaking/tomiStaking"
import {stakeData,
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
  let id_ = event.params.claimedBy.toHexString();
  let stakesDataLoad = stakeData.load(id_);
  if(stakesDataLoad){
    stakesDataLoad.allRewards = stakesDataLoad.allRewards.minus(event.params.claimRewardAmount);
    stakesDataLoad.save();
  }
}

export function handlestakedAPY(event: stakedAPYEvent): void {
  let entity = new stakedAPY(
    event.params.staker.toHexString().concat(event.params.index.toString())
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


  // let id = event.params.staker.toHexString();
  let stakesload = stakeData.load( event.params.staker.toHexString() );
  if(stakesload){
    stakesload.allStakes.plus(event.params.amountStaked);
    if(event.params.stakesInfo.stakeAPY.equals(BigInt.fromI32(6))){
      let y= event.params.amountStaked.times(event.params.stakesInfo.stakeAPY).div(BigInt.fromI32(100));
      let z=  y.div(BigInt.fromI32(2));
      stakesload.allRewards.plus(z);
    }else{
      let z= event.params.amountStaked.times(event.params.stakesInfo.stakeAPY).div(BigInt.fromI32(100));
      stakesload.allRewards.plus(z);
    }
    stakesload.save();
  }else{
    let stakesload = new stakeData(
      event.params.staker.toHexString()
    );
    let z = BigInt.fromI32(0);
    if(event.params.stakesInfo.stakeAPY.equals(BigInt.fromI32(6))){
      let y= event.params.amountStaked.times(event.params.stakesInfo.stakeAPY).div(BigInt.fromI32(100));
      z=  y.div(BigInt.fromI32(2));
    }else{
      z = event.params.amountStaked.times(event.params.stakesInfo.stakeAPY).div(BigInt.fromI32(100));
    }
    stakesload.allStakes = event.params.amountStaked;
    stakesload.allRewards = z;
    stakesload.availableToClaim = BigInt.fromI32(0);
    stakesload.save();
  }
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

  let id_ = event.params.unStaker.toHexString();
  let stakesInfo = stakeData.load(id_);
  if(stakesInfo){
    stakesInfo.allStakes = stakesInfo.allStakes.minus(event.params.stakesInfo.stakeAmount);
    stakesInfo.save();
  }

  let id= event.params.unStaker.toHexString().concat(event.params.unStakeIndex.toString())
  let toLoadstakedAPY= stakedAPY.load(id)
  if(toLoadstakedAPY){
    toLoadstakedAPY.stakesInfo_stakedForAPY = event.params.stakesInfo.stakedForAPY
    toLoadstakedAPY.save()
  }

}
