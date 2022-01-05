import { Contract } from '@ethersproject/contracts'
import { useContract } from './useContract'
import { config } from '../contracts/config'
import { useReadName } from './useReadName'

export function useSetName() {
  const nameRegister = useContract(config.contracts['nameRegister'])
//   const { updateAddressName } = useReadName()

    const setName = async (name: string) => {
        try { 
            if (!nameRegister) {
                throw new Error('Contract not found')
            }
            const tx = await nameRegister['setName'](name)
            return tx.wait()
        } catch (err: any) {
            const rpcMessage = err.message
                .substring(err.message.indexOf('execution reverted:') + 'execution reverted:'.length, err.message.indexOf('data') - 3)
            if (rpcMessage) {
                throw rpcMessage
            }
            throw err
        }
    }

  return setName
}