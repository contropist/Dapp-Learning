const { expect } = require("chai");
const {network, config, ethers} = require('hardhat');

const networkAddressMapping = config.networkAddressMapping;

// check addressMapping has the network
if (!networkAddressMapping[network.name]) {
  throw new Error('network ' + network.name + ' dont config in the addressMapping, please add it');
}

const {
  daiAddress,
  wethAddress,
  usdcAddress,
  wbtcAddress,
 
  lendingPoolAddressesProviderAddress,
  wethGatewayAddress,

  augustusRegistryAddress
} = networkAddressMapping[network.name];

const augustusSwapAddrss = "0xDEF171Fe48CF0115B1d80b88dc8eAB59176FEe57";

// node ./scripts/psp.js 1 0x6B175474E89094C44Da98b954EedeAC495271d0F 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 40000000000000000000000 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 SELL 3 false 18 18
const daiToWethCalldata = "0xa94e78ef00000000000000000000000000000000000000000000000000000000000000200000000000000000000000006b175474e89094c44da98b954eedeac495271d0f000000000000000000000000000000000000000000000878678326eac9000000000000000000000000000000000000000000000000000000900d2812bac380c80000000000000000000000000000000000000000000000009481afe914fe5543000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001600000000000000000000000009abf798f5314bfd793a9e57a654bed35af4a1d600100000000000000000000000000000000000000000000000000000000031388000000000000000000000000000000000000000000000000000000000000072000000000000000000000000000000000000000000000000000000000664d31caf5dc14b49730462d965aaa5b3b217f9a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000002c0000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000baeeb4540f59d30e567a5b563cc0c4587edd936600000000000000000000000000000000000000000000000000000000000027100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000900000000000000000000000089b78cfa322f6c5de0abceecab66aee45393cc5a000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000a59649758aa4d66e25f08dd01271e891fe521990000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e8d4a51000000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000009be264469ef954c139da4a45cf76cbcc5e3a6a73000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000006000000000000000000000000e592427a0aece92de3edee1f18e0157c05861564000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000665617e9000000000000000000000000000000000000000000000000000000000000002ba0b86991c6218b36c1d19d4a2e9eb0ce3606eb480001f4c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

const wethToDaicallData = "0x2298207a0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000006b175474e89094c44da98b954eedeac495271d0f00000000000000000000000000000000000000000000000099229b2939673347000000000000000000000000000000000000000000000878678326eac900000000000000000000000000000000000000000000000000000094acc859bb7597b000000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009abf798f5314bfd793a9e57a654bed35af4a1d600100000000000000000000000000000000000000000000000000000000031388000000000000000000000000000000000000000000000000000000000000044000000000000000000000000000000000000000000000000000000000664d31e3465ef87ae96249559fb6f3056f9b72ce000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000e592427a0aece92de3edee1f18e0157c058615640000000000000000000000000000000000000000000000000000000000000144f28c0498000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000def171fe48cf0115b1d80b88dc8eab59176fee570000000000000000000000000000000000000000000000000000000066561803000000000000000000000000000000000000000000000878678326eac900000000000000000000000000000000000000000000000000000099229b293967334500000000000000000000000000000000000000000000000000000000000000426b175474e89094c44da98b954eedeac495271d0f000064a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480001f4c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000144000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

const depositEthInAave = async (_poolAddress, _userAddress, _amount) => {
  // console.log("isAddressable", _poolAddress, _userAddress, ethers.isAddressable(_poolAddress), ethers.isAddressable(_userAddress))
  const ethGateway = await ethers.getContractAt('IWrappedTokenGatewayV3', wethGatewayAddress)
  let metadata = {
    value: ethers.parseEther(_amount)
  }

  let ethDeposit = await ethGateway.depositETH(_poolAddress, _userAddress, 0, metadata)
  // console.log('eth deposit successfully');
}

const getLendingPool = async () => {

  const lendingPoolAddressesProvider = await ethers.getContractAt('IPoolAddressesProvider', lendingPoolAddressesProviderAddress)
  let lendingPoolAddress = await lendingPoolAddressesProvider['getPool']()
  let lendingPool = await ethers.getContractAt('IPool', lendingPoolAddress)

  return lendingPool
}

const getAToken = async (_asset) => {

  let lendingPool = await getLendingPool()
  let assetReserveData = await lendingPool['getReserveData'](_asset)
  let assetAToken = await ethers.getContractAt('IAToken', assetReserveData.aTokenAddress)

  return assetAToken
}

const getDebtToken = async (_asset, _interestRateMode, erc20=false) => {

  let lendingPool = await getLendingPool()

  let assetReserveData = await lendingPool['getReserveData'](_asset)
  let assetDebtToken

  if(_interestRateMode === 1) {
    let interface = erc20===true?'IERC20':'IStableDebtToken'
    assetDebtToken = await ethers.getContractAt(interface, assetReserveData.stableDebtTokenAddress)
  } else {
    let interface = erc20===true?'IERC20':'IVariableDebtToken'
    assetDebtToken = await ethers.getContractAt(interface, assetReserveData.variableDebtTokenAddress)
  }

  return assetDebtToken
}

const delegateCreditToTheApe = async (_asset, _interestRateMode = 2) => {

  let assetDebtToken = await getDebtToken(_asset, _interestRateMode)
  let assetDebtApproval = await assetDebtToken['approveDelegation'](aaveApe.target, ethers.MaxUint256)
}

const getParaSwapCalldata = (from, to, _amount, calldata) => {
  let paraswapCalldata = [
    augustusSwapAddrss,
    from,
    to,
    _amount,
    ethers.getBytes(calldata)
  ]
  return paraswapCalldata;
}


describe("AaveApePlusV2", function () {

  beforeEach(async () => {

    const AaveApe = await ethers.getContractFactory("AaveApePlusV2");
    aaveApe = await AaveApe.deploy(lendingPoolAddressesProviderAddress, augustusRegistryAddress);
    const [user] = await ethers.getSigners();
    userAddress = user.address;
    const lendingpool = await getLendingPool();
    pooladdress = lendingpool.target;
  });

  describe("Address verification", function () {
    it("AUGUSTUS_REGISTRY", async function () {
      expect(await aaveApe.AUGUSTUS_REGISTRY()).to.equal(augustusRegistryAddress)
    })

    it("LENDING_POOL", async function () {
      const _lendingPoolAddressesProvider = await ethers.getContractAt('IPoolAddressesProvider', lendingPoolAddressesProviderAddress)
      _lendingPoolAddress = await _lendingPoolAddressesProvider['getPool']()
      expect(await aaveApe.LENDING_POOL()).to.equal(_lendingPoolAddress);
    })

  })

  describe("Going flash ape", function () {
    it("Revert if the user has no collateral", async function () {

      let paraswapCalldata = getParaSwapCalldata(
        daiAddress,
        wethAddress,
        1,
        daiToWethCalldata
      )

      await expect(aaveApe['flashApe'](wethAddress, daiAddress, 1, 2, paraswapCalldata)).to.be.reverted;

    })

    it("Revert if the user has not delegated credit to the Ape", async function () {

      await depositEthInAave(pooladdress, userAddress, "5")
      let borrowAmount = ethers.parseEther('40000') //borrow 40000 DAI

      let paraswapCalldata = getParaSwapCalldata(
        daiAddress,
        wethAddress,
        borrowAmount,
        daiToWethCalldata
      )

      await expect(aaveApe['flashApe'](wethAddress, daiAddress, borrowAmount, 2, paraswapCalldata)).to.be.reverted;
    })

    it("Succeeds flash ape, looooooooooooping", async function () {
      let interestRateMode = 2

      await depositEthInAave(pooladdress, userAddress, "5")
      await delegateCreditToTheApe(daiAddress, interestRateMode)

      let aToken = await getAToken(wethAddress)
      let debtToken = await getDebtToken(daiAddress, interestRateMode, true)

      let aBalanceBefore = await aToken.balanceOf(userAddress)
      let debtBalanceBefore = await debtToken.balanceOf(userAddress)

      let borrowAmount = ethers.parseEther('40000') //borrow 40000 DAI

      let paraswapCalldata = getParaSwapCalldata(
        daiAddress,
        wethAddress,
        borrowAmount,
        daiToWethCalldata
      )

      await expect(aaveApe['flashApe'](wethAddress, daiAddress, borrowAmount, interestRateMode, paraswapCalldata)).to.emit(aaveApe, 'Ape')

      let aBalanceAfter = await aToken.balanceOf(userAddress)
      let debtBalanceAfter = await debtToken.balanceOf(userAddress)

      expect(aBalanceAfter > aBalanceBefore)
      expect(debtBalanceAfter > debtBalanceBefore)
    })
  })

  
  describe("flash unwind an ape", function () {
    
    it("Revert if there is no collateral", async function () {
      let paraswapCalldata = getParaSwapCalldata(
        daiAddress,
        wethAddress,
        1,
        daiToWethCalldata
      )
      await expect(aaveApe['flashUnwind'](wethAddress, daiAddress, 1, 2, paraswapCalldata)).to.be.reverted;
    })

    it("Revert if there is no debt to repay", async function () {
      await depositEthInAave(pooladdress, userAddress, "5")

      let paraswapCalldata = getParaSwapCalldata(
        daiAddress,
        wethAddress,
        1,
        daiToWethCalldata
      )

      await expect(aaveApe['flashUnwind'](wethAddress, daiAddress, 1, 2, paraswapCalldata)).to.be.reverted;
    })

    it("Revert if the user has not given Aave Ape an allowance on the aToken", async function () {
      let interestRateMode = 2

      await depositEthInAave(pooladdress, userAddress, "5")
      await delegateCreditToTheApe(daiAddress, interestRateMode)

      let borrowAmount = ethers.parseEther('40000') //borrow 40000 DAI

      let paraswapCalldata = getParaSwapCalldata(
        daiAddress,
        wethAddress,
        borrowAmount,
        daiToWethCalldata
      )

      await aaveApe['flashApe'](wethAddress, daiAddress, borrowAmount, interestRateMode, paraswapCalldata)

      paraswapCalldata = getParaSwapCalldata(
        wethAddress,
        daiAddress,
        borrowAmount,
        wethToDaicallData
      )

      await expect(aaveApe['flashUnwind'](wethAddress, daiAddress, borrowAmount, interestRateMode, paraswapCalldata)).to.be.reverted;
    })

    it("Success if the user has debt, has approved and has enough collateral", async function () {

      let interestRateMode = 2

      await depositEthInAave(pooladdress, userAddress, "5")
      await delegateCreditToTheApe(daiAddress, interestRateMode)

      let borrowAmount = ethers.parseEther('40000')

      let paraswapCalldata = getParaSwapCalldata(
        daiAddress,
        wethAddress,
        borrowAmount,
        daiToWethCalldata
      )

      await aaveApe['flashApe'](wethAddress, daiAddress, borrowAmount, interestRateMode, paraswapCalldata)

      let aToken = await getAToken(wethAddress)
      let debtToken = await getDebtToken(daiAddress, interestRateMode, true)

      await aToken.approve(aaveApe.target, ethers.MaxUint256)

      let aBalanceBefore = await aToken.balanceOf(userAddress)
      let debtBalanceBefore = await debtToken.balanceOf(userAddress)
      
      paraswapCalldata = getParaSwapCalldata(
        wethAddress,
        daiAddress,
        borrowAmount,
        wethToDaicallData
      )

      await expect(aaveApe['flashUnwind'](wethAddress, daiAddress, borrowAmount, interestRateMode, paraswapCalldata)).to.emit(aaveApe, 'Ape');

      let aBalanceAfter = await aToken.balanceOf(userAddress)
      let debtBalanceAfter = await debtToken.balanceOf(userAddress)

      expect(aBalanceAfter < aBalanceBefore)
      expect(debtBalanceAfter === 0)
    })

    it("Success if vault not enough liqidity", async function () {

      let interestRateMode = 2

      let borrowAssetAddress = "0xf939e0a03fb07f59a73314e73794be0e57ac1b4e"; //crvUSD

      await depositEthInAave(pooladdress, userAddress, "5")
      await delegateCreditToTheApe(borrowAssetAddress, interestRateMode)

      let borrowAmount = ethers.parseEther('20000')

      let paraswapCalldata = getParaSwapCalldata(
        borrowAssetAddress,
        wethAddress,
        borrowAmount,
        "0xa94e78ef0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000f939e0a03fb07f59a73314e73794be0e57ac1b4e00000000000000000000000000000000000000000000043c33c193756480000000000000000000000000000000000000000000000000000046bd8c4552169d1500000000000000000000000000000000000000000000000048eda31551fcebd7000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001600000000000000000000000009abf798f5314bfd793a9e57a654bed35af4a1d60010000000000000000000000000000000000000000000000000000000003138800000000000000000000000000000000000000000000000000000000000008e000000000000000000000000000000000000000000000000000000000664d1354ec52d1f901374a419b031d7cce6645bb000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000002e0000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000009be264469ef954c139da4a45cf76cbcc5e3a6a73000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003000000000000000000000000390f3595bca2df7d23783dfd126427cceb997bf4000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000009be264469ef954c139da4a45cf76cbcc5e3a6a730000000000000000000000000000000000000000000000000000000000002710000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001c00000000000000000000000000000000000000000000000000000000000000006000000000000000000000000e592427a0aece92de3edee1f18e0157c058615640000000000000000000000000000000000000000000000000000000000000c8000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000006655f973000000000000000000000000000000000000000000000000000000000000002bdac17f958d2ee523a2206206994597c13d831ec7000064c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000001b81d678ffb9c0263b24a97847620c99d213eb140000000000000000000000000000000000000000000000000000000000001a9000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000006655f973000000000000000000000000000000000000000000000000000000000000002bdac17f958d2ee523a2206206994597c13d831ec70001f4c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
      )

      await aaveApe['flashApe'](wethAddress, borrowAssetAddress, borrowAmount, interestRateMode, paraswapCalldata)

      let aToken = await getAToken(wethAddress)
      let debtToken = await getDebtToken(borrowAssetAddress, interestRateMode, true)

      await aToken.approve(aaveApe.target, ethers.MaxUint256)

      let aBalanceBefore = await aToken.balanceOf(userAddress)
      let debtBalanceBefore = await debtToken.balanceOf(userAddress)
      
      let srcAmount = ethers.parseEther('6')
      paraswapCalldata = getParaSwapCalldata(
        wethAddress,
        borrowAssetAddress,
        srcAmount,
        "0x2298207a0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000f939e0a03fb07f59a73314e73794be0e57ac1b4e0000000000000000000000000000000000000000000000004b34d75f7609bc8a00000000000000000000000000000000000000000000043c33c193756480000000000000000000000000000000000000000000000000000049041434e9e6a82300000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000000000022000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009abf798f5314bfd793a9e57a654bed35af4a1d600100000000000000000000000000000000000000000000000000000000031388000000000000000000000000000000000000000000000000000000000000044000000000000000000000000000000000000000000000000000000000664d137d13f832929125404185495983e42962ad000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000e592427a0aece92de3edee1f18e0157c058615640000000000000000000000000000000000000000000000000000000000000144f28c0498000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000def171fe48cf0115b1d80b88dc8eab59176fee57000000000000000000000000000000000000000000000000000000006655f99d00000000000000000000000000000000000000000000043c33c19375648000000000000000000000000000000000000000000000000000004b34d75f7609bc880000000000000000000000000000000000000000000000000000000000000042f939e0a03fb07f59a73314e73794be0e57ac1b4e0001f4a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480001f4c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000144000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
      )

      await expect(aaveApe['flashUnwind'](wethAddress, borrowAssetAddress, borrowAmount, interestRateMode, paraswapCalldata)).to.emit(aaveApe, 'Ape');

      let aBalanceAfter = await aToken.balanceOf(userAddress)
      let debtBalanceAfter = await debtToken.balanceOf(userAddress)

      expect(aBalanceAfter < aBalanceBefore)
      expect(debtBalanceAfter === 0)
    })
  })

});
