import nameRegisterJson from '../contracts/NameRegister.json'
import { NetworkId } from '../connectors'

export interface IContract {
    json: any;
    address: {
        [chainId: string]: string
    }
}

export interface IConfig {
    contracts: { [contractName: string]: IContract }
}

export const config = {
    contracts: {
        nameRegister: {
            json: nameRegisterJson,
            address: {
                [NetworkId.Rinkeby]: '0xb517b4c83cc36c363207E2FB377c84d8c369d2b1'
            }
        }
    }
}