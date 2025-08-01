// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;

// Import the existing ValidatorHelper contract
import "./ValidatorHelper.sol";

/**
 * @title ValidatorHelperFixed
 * @dev Fixed version of ValidatorHelper that caps block rewards properly
 * 
 * Key fixes:
 * 1. Cap block rewards at validator's secured amount
 * 2. Implement proper time-based reward distribution (365 days)
 * 3. Prevent unlimited reward accumulation
 */
contract ValidatorHelperFixed is ValidatorHelper {
    
    // Maximum reward multiplier (e.g., 100% = 1.0, 200% = 2.0)
    uint256 public maxRewardMultiplier = 100; // 100% of secured amount per year
    uint256 public constant MULTIPLIER_PRECISION = 100;
    
    // Blocks per year (assuming ~3 second block time)
    uint256 public constant BLOCKS_PER_YEAR = 10512000; // 365 * 24 * 60 * 60 / 3
    
    // Track when validators started earning rewards
    mapping(address => uint256) public rewardStartBlock;
    
    event RewardCapUpdated(uint256 newMultiplier);
    event ValidatorRewardStarted(address validator, uint256 startBlock);
    
    constructor() ValidatorHelper() {
        // Constructor inherits from ValidatorHelper
    }
    
    /**
     * @dev Override viewValidatorRewards to implement proper capping
     */
    function viewValidatorRewards(address validator) public view override returns(uint256 rewardAmount) {
        // Only approved validators can earn rewards
        if (!approvedForRewards[validator]) {
            return 0;
        }

        (, InterfaceValidator.Status validatorStatus, , , ,  ) = valContract.getValidatorInfo(validator);

        // if validator is jailed, non-exist, or created, then he will not get any rewards
        if(validatorStatus == InterfaceValidator.Status.Jailed || 
           validatorStatus == InterfaceValidator.Status.NotExist || 
           validatorStatus == InterfaceValidator.Status.Created ){
            return 0;
        }

        // Get validator's secured amount
        (uint256 securedAmount, , ) = valContract.getStakingInfo(validator, validator);
        if (securedAmount == 0) {
            return 0;
        }
        
        // Calculate maximum allowed rewards per year (e.g., 100% of secured amount)
        uint256 maxAnnualRewards = (securedAmount * maxRewardMultiplier) / MULTIPLIER_PRECISION;
        
        // Get validator's reward start block (when they were approved)
        uint256 startBlock = rewardStartBlock[validator];
        if (startBlock == 0) {
            startBlock = approvalTimestamp[validator] > 0 ? 
                block.number - ((block.timestamp - approvalTimestamp[validator]) / 3) : // Estimate blocks from timestamp
                lastRewardedBlock; // Fallback to lastRewardedBlock
        }
        
        // Calculate blocks since reward started
        uint256 blocksSinceStart = block.number > startBlock ? block.number - startBlock : 0;
        
        // Calculate time-based reward cap (pro-rated based on time elapsed)
        uint256 maxAllowedRewards = (maxAnnualRewards * blocksSinceStart) / BLOCKS_PER_YEAR;
        
        // Calculate raw block rewards using original formula
        uint256 rawBlockRewards = 0;
        if(rewardFund >= extraRewardsPerBlock && 
           address(this).balance > extraRewardsPerBlock && 
           validatorStatus != InterfaceValidator.Status.Unstaked) {
            
            uint256 totalApprovedValidators = approvedValidators.length;
            if(totalApprovedValidators > 0 && block.number > lastRewardedBlock) {
                rawBlockRewards = (block.number - lastRewardedBlock) * extraRewardsPerBlock / totalApprovedValidators;
            }
        }
        
        // Apply the cap: take minimum of raw rewards and max allowed
        uint256 cappedBlockRewards = rawBlockRewards > maxAllowedRewards ? maxAllowedRewards : rawBlockRewards;
        
        // Subtract already withdrawn rewards
        uint256 alreadyWithdrawn = totalProfitWithdrawn[validator];
        if (cappedBlockRewards > alreadyWithdrawn) {
            rewardAmount = cappedBlockRewards - alreadyWithdrawn;
        } else {
            rewardAmount = 0;
        }
        
        return rewardBalance[validator] + rewardAmount;
    }
    
    /**
     * @dev Override _setValidatorRewardApproval to track reward start block
     */
    function _setValidatorRewardApproval(address validator, bool approved) internal override {
        bool wasApproved = approvedForRewards[validator];
        
        // Call parent implementation
        super._setValidatorRewardApproval(validator, approved);
        
        // Track reward start block for new approvals
        if (approved && !wasApproved) {
            rewardStartBlock[validator] = block.number;
            emit ValidatorRewardStarted(validator, block.number);
        } else if (!approved && wasApproved) {
            rewardStartBlock[validator] = 0;
        }
    }
    
    /**
     * @dev Admin function to update maximum reward multiplier
     */
    function setMaxRewardMultiplier(uint256 newMultiplier) external onlyOwner {
        require(newMultiplier <= 500, "Multiplier cannot exceed 500% (5x)");
        maxRewardMultiplier = newMultiplier;
        emit RewardCapUpdated(newMultiplier);
    }
    
    /**
     * @dev Admin function to manually set reward start block for a validator
     */
    function setValidatorRewardStartBlock(address validator, uint256 startBlock) external onlyAdmin {
        require(approvedForRewards[validator], "Validator must be approved for rewards");
        require(startBlock <= block.number, "Start block cannot be in the future");
        rewardStartBlock[validator] = startBlock;
        emit ValidatorRewardStarted(validator, startBlock);
    }
    
    /**
     * @dev View function to get validator reward info
     */
    function getValidatorRewardInfo(address validator) external view returns (
        uint256 securedAmount,
        uint256 maxAnnualRewards,
        uint256 maxAllowedRewards,
        uint256 rawBlockRewards,
        uint256 cappedRewards,
        uint256 alreadyWithdrawn,
        uint256 availableRewards,
        uint256 rewardStartBlockNum
    ) {
        (securedAmount, , ) = valContract.getStakingInfo(validator, validator);
        maxAnnualRewards = (securedAmount * maxRewardMultiplier) / MULTIPLIER_PRECISION;
        
        uint256 startBlock = rewardStartBlock[validator];
        if (startBlock == 0) {
            startBlock = approvalTimestamp[validator] > 0 ? 
                block.number - ((block.timestamp - approvalTimestamp[validator]) / 3) :
                lastRewardedBlock;
        }
        
        uint256 blocksSinceStart = block.number > startBlock ? block.number - startBlock : 0;
        maxAllowedRewards = (maxAnnualRewards * blocksSinceStart) / BLOCKS_PER_YEAR;
        
        // Calculate raw rewards
        if(rewardFund >= extraRewardsPerBlock && approvedValidators.length > 0 && block.number > lastRewardedBlock) {
            rawBlockRewards = (block.number - lastRewardedBlock) * extraRewardsPerBlock / approvedValidators.length;
        }
        
        cappedRewards = rawBlockRewards > maxAllowedRewards ? maxAllowedRewards : rawBlockRewards;
        alreadyWithdrawn = totalProfitWithdrawn[validator];
        
        if (cappedRewards > alreadyWithdrawn) {
            availableRewards = cappedRewards - alreadyWithdrawn;
        }
        
        rewardStartBlockNum = startBlock;
        
        return (
            securedAmount,
            maxAnnualRewards,
            maxAllowedRewards,
            rawBlockRewards,
            cappedRewards,
            alreadyWithdrawn,
            availableRewards,
            rewardStartBlockNum
        );
    }
}
