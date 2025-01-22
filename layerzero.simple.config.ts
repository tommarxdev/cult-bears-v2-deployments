/* eslint-disable prettier/prettier */

import {EndpointId} from '@layerzerolabs/lz-definitions';
import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'
import {generateConnectionsConfig} from '@layerzerolabs/metadata-tools';
import {OAppEnforcedOption, OmniPointHardhat} from '@layerzerolabs/toolbox-hardhat';

const fujiContract: OmniPointHardhat = {
    eid: EndpointId.AVALANCHE_V2_TESTNET,
    contractName: 'CultBearsV2Avalanche',
}

const soneiumMinatoContract: OmniPointHardhat = {
    eid: EndpointId.MINATO_V2_TESTNET,
    contractName: 'CultBearsV2',
}

const EVM_ENFORCED_OPTIONS: OAppEnforcedOption[] = [
    {
      msgType: 1,
      optionType: ExecutorOptionType.LZ_RECEIVE,
      gas: 100_000,
      value: 0,
    },
    {
      msgType: 2,
      optionType: ExecutorOptionType.LZ_RECEIVE,
      gas: 100_000,
      value: 0,
    },
    {
      msgType: 2,
      optionType: ExecutorOptionType.COMPOSE,
      index: 0,
      gas: 100_000,
      value: 0,
    },
  ];

export default async function () {
  const connections = await generateConnectionsConfig([
    [
      fujiContract, // srcContract
      soneiumMinatoContract, // dstContract
      [['LayerZero Labs'], []], // [ requiredDVN[], [ optionalDVN[], threshold ] ]
      [6, 1], // [srcToDstConfirmations, dstToSrcConfirmations]
      [EVM_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS], // [enforcedOptionsSrcToDst, enforcedOptionsDstToSrc]
    ],
  ]);

  return {
    contracts: [{contract: fujiContract}, {contract: soneiumMinatoContract}],
    connections,
  };
}