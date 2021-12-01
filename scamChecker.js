const Web3 = require("web3");

// var web3 = new Web3("https://main-light.eth.linkpool.io/");
var web3 = new Web3(
  "https://rinkeby.infura.io/v3/88e22c26c7044546aa10340c1d254288"
);

async function tokenInfo(tokenAddress) {
  let tokenName, tokenSymbol;
  try {
    tokenName = await web3.eth.call({
      to: tokenAddress,
      value: 0,
      gas: 150000,
      data: web3.eth.abi.encodeFunctionCall(
        {
          name: "name",
          type: "function",
          inputs: [],
        },
        []
      ),
    });
    tokenName = web3.eth.abi.decodeParameter("string", tokenName);

    tokenSymbol = await web3.eth.call({
      to: tokenAddress,
      value: 0,
      gas: 150000,
      data: web3.eth.abi.encodeFunctionCall(
        {
          name: "symbol",
          type: "function",
          inputs: [],
        },
        []
      ),
    });
    tokenSymbol = web3.eth.abi.decodeParameter("string", tokenSymbol);
  } catch (e) {
  } finally {
    return { tokenName, tokenSymbol };
  }
}

async function isScam(tokenAddress) {
  web3.extend({
    methods: [
      {
        name: "customCall",
        call: "eth_call",
        params: 3,
      },
    ],
  });

  let encodedAddress = web3.eth.abi.encodeParameter("address", tokenAddress);
  let contractFuncData = "0x14bd4404";
  let callData = contractFuncData + encodedAddress.substring(2);
  let val = 50000000000000000;

  let checkVal = await web3.customCall(
    {
      to: "0x7437C9adF84Bd71Df1e0EDE0A2aEB4B665E2E832",
      from: "0xda2788a7f69A0E94ec2B34c81aBB11D06307E3e7",
      value: "0x" + val.toString(16),
      gas: "0x" + (45000000).toString(16),
      data: callData,
    },
    "latest",
    {
      "0x7437C9adF84Bd71Df1e0EDE0A2aEB4B665E2E832": {
        code: "0x6080604052600436106100225760003560e01c806314bd44041461002e57600080fd5b3661002957005b600080fd5b61004161003c366004610164565b610072565b604080519687526020870195909552938501929092526060840152608083015260a082015260c00160405180910390f35b60008080808080337383eca643b7d71e38a430669ce17c53cb41e1d535146100cd5760405162461bcd60e51b815260206004820152600a6024820152694e6f74204f776e65722160b01b604482015260640160405180910390fd5b60405163052f510160e21b81526001600160a01b0388166004820152732b62c78a7a500212707cc5bb5f630d544b8cc5049081906314bd440490349060240160c06040518083038185885af115801561012a573d6000803e3d6000fd5b50505050506040513d601f19601f8201168201806040525081019061014f9190610194565b949d939c50919a509850965090945092505050565b60006020828403121561017657600080fd5b81356001600160a01b038116811461018d57600080fd5b9392505050565b60008060008060008060c087890312156101ad57600080fd5b865195506020870151945060408701519350606087015192506080870151915060a08701519050929550929550929556fea264697066735822122014f02283d0b18f54f5a490cea1aeea6c26e36bfcebe35c9fb4aa2d24908e0ac864736f6c634300080a0033",
      },
      "0xA848a59c784bF5c04E9aa4537be76dC7536BF33E": {
        code: "0x6080604052600436106100225760003560e01c806314bd44041461002e57610029565b3661002957005b600080fd5b61004860048036038101906100439190610ab7565b610063565b60405161005a96959493929190610e3a565b60405180910390f35b6000806000806000806100746100bf565b60008060006100838a346101f3565b92509250925060008060006100988d86610577565b9250925092508585858585859b509b509b509b509b509b5050505050505091939550919395565b737a250d5630b4cf539739df2c5dacb4c659f2488d6000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663c45a01556040518163ffffffff1660e01b815260040160206040518083038186803b15801561017957600080fd5b505afa15801561018d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101b19190610ae4565b600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b600080600080859050600030905060008611610244576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161023b90610d44565b60405180910390fd5b600061026473c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2896108b7565b905060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d06ca61f89846040518363ffffffff1660e01b81526004016102c4929190610d64565b60006040518083038186803b1580156102dc57600080fd5b505afa1580156102f0573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906103199190610b11565b60018151811061032c5761032b611068565b5b6020026020010151905060008473ffffffffffffffffffffffffffffffffffffffff166370a08231856040518263ffffffff1660e01b81526004016103719190610cc0565b60206040518083038186803b15801561038957600080fd5b505afa15801561039d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103c19190610b87565b905060005a905060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663b6f9de958b858789610708426104169190610f36565b6040518663ffffffff1660e01b81526004016104359493929190610d94565b6000604051808303818588803b15801561044e57600080fd5b505af1158015610462573d6000803e3d6000fd5b505050505060005a90506000818361047a9190610f8c565b90506000610519858a73ffffffffffffffffffffffffffffffffffffffff166370a082318b6040518263ffffffff1660e01b81526004016104bb9190610cc0565b60206040518083038186803b1580156104d357600080fd5b505afa1580156104e7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061050b9190610b87565b6109af90919063ffffffff16565b90506000811161055e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161055590610d04565b60405180910390fd5b8581839b509b509b505050505050505050509250925092565b6000806000808590506000309050600086116105c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105bf90610d44565b60405180910390fd5b60006105e88873c02aaa39b223fe8d0a0e5c4f27ead9083c756cc26108b7565b905060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663d06ca61f89846040518363ffffffff1660e01b8152600401610648929190610d64565b60006040518083038186803b15801561066057600080fd5b505afa158015610674573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f8201168201806040525081019061069d9190610b11565b6001815181106106b0576106af611068565b5b602002602001015190508373ffffffffffffffffffffffffffffffffffffffff1663095ea7b3737a250d5630b4cf539739df2c5dacb4c659f2488d8a6040518363ffffffff1660e01b8152600401610709929190610cdb565b602060405180830381600087803b15801561072357600080fd5b505af1158015610737573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061075b9190610b5a565b61079a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161079190610d24565b60405180910390fd5b60008373ffffffffffffffffffffffffffffffffffffffff1631905060005a905060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663791ac9478b858789610708426108099190610f36565b6040518663ffffffff1660e01b8152600401610829959493929190610de0565b600060405180830381600087803b15801561084357600080fd5b505af1158015610857573d6000803e3d6000fd5b5050505060005a90506000818361086e9190610f8c565b9050600061089c858973ffffffffffffffffffffffffffffffffffffffff16316109af90919063ffffffff16565b90508581839b509b509b505050505050505050509250925092565b60606000600267ffffffffffffffff8111156108d6576108d5611097565b5b6040519080825280602002602001820160405280156109045781602001602082028036833780820191505090505b509050838160008151811061091c5761091b611068565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050828160018151811061096b5761096a611068565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff16815250508091505092915050565b600081836109bd9190610f8c565b905092915050565b60006109d86109d384610ec0565b610e9b565b905080838252602082019050828560208602820111156109fb576109fa6110cb565b5b60005b85811015610a2b5781610a118882610aa2565b8452602084019350602083019250506001810190506109fe565b5050509392505050565b600081359050610a4481611166565b92915050565b600081519050610a5981611166565b92915050565b600082601f830112610a7457610a736110c6565b5b8151610a848482602086016109c5565b91505092915050565b600081519050610a9c8161117d565b92915050565b600081519050610ab181611194565b92915050565b600060208284031215610acd57610acc6110d5565b5b6000610adb84828501610a35565b91505092915050565b600060208284031215610afa57610af96110d5565b5b6000610b0884828501610a4a565b91505092915050565b600060208284031215610b2757610b266110d5565b5b600082015167ffffffffffffffff811115610b4557610b446110d0565b5b610b5184828501610a5f565b91505092915050565b600060208284031215610b7057610b6f6110d5565b5b6000610b7e84828501610a8d565b91505092915050565b600060208284031215610b9d57610b9c6110d5565b5b6000610bab84828501610aa2565b91505092915050565b6000610bc08383610bcc565b60208301905092915050565b610bd581610fc0565b82525050565b610be481610fc0565b82525050565b6000610bf582610efc565b610bff8185610f14565b9350610c0a83610eec565b8060005b83811015610c3b578151610c228882610bb4565b9750610c2d83610f07565b925050600181019050610c0e565b5085935050505092915050565b6000610c55601083610f25565b9150610c60826110eb565b602082019050919050565b6000610c78600f83610f25565b9150610c8382611114565b602082019050919050565b6000610c9b601a83610f25565b9150610ca68261113d565b602082019050919050565b610cba81610ffe565b82525050565b6000602082019050610cd56000830184610bdb565b92915050565b6000604082019050610cf06000830185610bdb565b610cfd6020830184610cb1565b9392505050565b60006020820190508181036000830152610d1d81610c48565b9050919050565b60006020820190508181036000830152610d3d81610c6b565b9050919050565b60006020820190508181036000830152610d5d81610c8e565b9050919050565b6000604082019050610d796000830185610cb1565b8181036020830152610d8b8184610bea565b90509392505050565b6000608082019050610da96000830187610cb1565b8181036020830152610dbb8186610bea565b9050610dca6040830185610bdb565b610dd76060830184610cb1565b95945050505050565b600060a082019050610df56000830188610cb1565b610e026020830187610cb1565b8181036040830152610e148186610bea565b9050610e236060830185610bdb565b610e306080830184610cb1565b9695505050505050565b600060c082019050610e4f6000830189610cb1565b610e5c6020830188610cb1565b610e696040830187610cb1565b610e766060830186610cb1565b610e836080830185610cb1565b610e9060a0830184610cb1565b979650505050505050565b6000610ea5610eb6565b9050610eb18282611008565b919050565b6000604051905090565b600067ffffffffffffffff821115610edb57610eda611097565b5b602082029050602081019050919050565b6000819050602082019050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b6000610f4182610ffe565b9150610f4c83610ffe565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610f8157610f80611039565b5b828201905092915050565b6000610f9782610ffe565b9150610fa283610ffe565b925082821015610fb557610fb4611039565b5b828203905092915050565b6000610fcb82610fde565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b611011826110da565b810181811067ffffffffffffffff821117156110305761102f611097565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f62757941637475616c4f7574203e203000000000000000000000000000000000600082015250565b7f417070726f7665204661696c65642e0000000000000000000000000000000000600082015250565b7f20494e53554646494349454e545f494e5055545f414d4f554e54000000000000600082015250565b61116f81610fc0565b811461117a57600080fd5b50565b61118681610fd2565b811461119157600080fd5b50565b61119d81610ffe565b81146111a857600080fd5b5056fea26469706673582212204706f303675430c27b6b437d0ee6c0422595ade8725eab0cd1e786218b66c50664736f6c63430008070033", // uniswap checker
      },
      "0xda2788a7f69A0E94ec2B34c81aBB11D06307E3e7": {
        balance: "0x" + (100000000000000000000).toString(16),
      },
    }
  );

  let decoded = web3.eth.abi.decodeParameters(
    ["uint256", "uint256", "uint256", "uint256", "uint256", "uint256"],
    checkVal
  );
  console.log({ checkVal });
  let buyExpectedOut = web3.utils.toBN(decoded[0]);
  let buyActualOut = web3.utils.toBN(decoded[1]);
  let buyGasUsed = web3.utils.toBN(decoded[2]);
  let sellExpectedOut = web3.utils.toBN(decoded[3]);
  let sellActualOut = web3.utils.toBN(decoded[4]);
  let sellGasUsed = web3.utils.toBN(decoded[5]);

  const buyFee =
    Math.round(((buyExpectedOut - buyActualOut) / buyExpectedOut) * 100 * 10) /
    10;
  const sellFee =
    Math.round(
      ((sellExpectedOut - sellActualOut) / sellExpectedOut) * 100 * 10
    ) / 10;
  // console.log("address", tokenAddress, "does not looks like a scam.");
  return {
    buyGasUsed,
    sellGasUsed,
    buyFee,
    sellFee,
  };
}

async function checkScam(address) {
  let result = {},
    error,
    _isScam = "UNKNOWN";
  try {
    result = await isScam(address);
    _isScam = "NO";
  } catch (e) {
    // console.error("ERR", e);
    if (e == "Error: Returned error: execution reverted") {
      _isScam = "UNKNOWN";
    } else {
      _isScam = "YES";
    }
    error = e;
  } finally {
    const { tokenName, tokenSymbol } = await tokenInfo(address);
    result["tokenName"] = tokenName || "-";
    result["tokenSymbol"] = tokenSymbol || "-";
    return { result, error, _isScam };
  }
}

async function getScamInfo(address) {
  let messageTpl;
  const { result, error, _isScam } = await checkScam(address);
  // console.log(_isScam, result, error);

  switch (_isScam) {
    case "NO":
      messageTpl = {
        title: "Scam Token Check Bot",
        description: `:white_check_mark: :white_check_mark: :white_check_mark: Not looks like a scam!`,
        color: 5439232,
        timestamp: new Date(),
        fields: [
          {
            name: "Address",
            value: address,
            inline: true,
          },
          {
            name: "Token Name",
            value: `${result.tokenName}(${result.tokenSymbol})`,
            inline: true,
          },
          {
            name: "Gas used for Buying",
            value: result.buyGasUsed.toString(),
            inline: true,
          },
          {
            name: "Gas used for Selling",
            value: result.sellGasUsed.toString(),
            inline: true,
          },
          {
            name: "Buy Fee",
            value: result.buyFee.toString(),
            inline: true,
          },
          {
            name: "Sell Fee",
            value: result.sellFee.toString(),
            inline: true,
          },
          {
            name: "-------------------",
            value:
              ":information_source: The result is obtained by simulate swap transaction on Uniswap V2, which requires liquidity on Uniswap V2 with Ethereum. \n" +
              "please consult [**@Traildesk**](https://twitter.com/traildesk) for more information. ",
          },
        ],
      };
      break;
    case "YES":
      messageTpl = {
        title: "Scam Token Check Bot",
        description: `:no_entry: :no_entry: :no_entry: Address ${address} is a scam, please run away from it!`,
        color: 16723200,
        timestamp: new Date(),
        fields: [
          {
            name: "Address",
            value: address,
            inline: true,
          },
          {
            name: "Token Name",
            value: `${result.tokenName}(${result.tokenSymbol})`,
            inline: true,
          },
          {
            name: "Reason",
            value: error,
          },
          {
            name: "-------------------",
            value:
              ":information_source: The result is obtained by simulate swap transaction on Uniswap V2, which requires liquidity on Uniswap V2 with Ethereum. \n" +
              "please consult [**@Traildesk**](https://twitter.com/traildesk) for more information. ",
          },
        ],
      };
      break;
    case "UNKNOWN":
    default:
      messageTpl = {
        title: "Scam Token Check Bot",
        description: `:grey_question: Unable to check address ${address}.`,
        color: 11381675,
        timestamp: new Date(),
        fields: [
          {
            name: "Address",
            value: address,
            inline: true,
          },
          {
            name: "Token Name",
            value: `${result.tokenName}(${result.tokenSymbol})`,
            inline: true,
          },
          {
            name: "Possible Reasons",
            value:
              "1. Invalid address \n" +
              "2. Token exists on a different chain\n" +
              "3. No liquidity paired with ETH on Uniswap V2",
          },
          {
            name: "-------------------",
            value:
              ":information_source: The result is obtained by simulate swap transaction on Uniswap V2, which requires liquidity on Uniswap V2 with Ethereum. \n" +
              "please consult [**@Traildesk**](https://twitter.com/traildesk) for more information. ",
          },
        ],
      };
      break;
  }
  console.log(messageTpl);
  return messageTpl;
}

module.exports.getScamInfo = getScamInfo;