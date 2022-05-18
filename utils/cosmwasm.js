import {CosmWasmClient} from "@cosmjs/cosmwasm-stargate";

const endpoint = process.env.RPC_URL

export class coswmwasmHelper {
    constructor(cosmWasmClient = null) {
        this.cosmwasmClient = cosmWasmClient
    }

    static async connect() {
        const cosmWasmClient = await CosmWasmClient.connect(endpoint)
        return new coswmwasmHelper(cosmWasmClient)
    }

    getCoswasmClient() {
        return this.cosmwasmClient;
    }

    getQueryClient() {
        return this.getCoswasmClient().forceGetQueryClient();
    }

    async getAllContractState(address, paginationKey) {
        const result = await this.getQueryClient().wasm.getAllContractState(address, paginationKey);
        return result;
    }
}