<template>
    <div class="page-content header-smaller">
        <div class="main-body-content">
            <not-found v-if="notFound" :obj-name="'Transaction'" />
            <div v-else class="cos-notice custom-page-title cos-transaction-detail">
                <div class="row">
                    <div class="col-lg-4 col-md-12 col-sm-12">
                    <h2 class="page-title">
                        WASM CONTRACT
                    </h2>
                    </div>
                    <div class="col-lg-8 col-md-12 col-sm-12">
                    <!-- <header-data /> -->
                    </div>
                </div>
                <div class="main-md-content transaction-detail-content">
                    <section class="Section_container PopularContracts_container">
                        <div class="SectionHeader_sectionHeader">
                            <h2 class="SectionHeader_sectionHeading">Contract Detail</h2>
                        </div>
                        <div class="SectionContent_sectionContent">
                            <ul class="content-contact-detail">
                                <ItemInfo label="Contract Name" :value="contract_detail.label" />
                                <ItemInfo label="Code ID" :value="contract_detail.code_id" />
                                <ItemInfo label="Contract" :value="contract_detail.contract" />
                                <ItemInfo label="Contract Address" :value="contract_detail.contract_address" />
                                <ItemInfo label="Creator" :value="contract_detail.creator" />
                                <ItemInfo label="Admin" :value="contract_detail.admin" />
                                <ItemInfo 
                                    label="Tx Hash" 
                                    :value="contract_detail.txhash" 
                                    type="link" 
                                    :route="{name: 'transactions-address', params: { address: contract_detail.txhash }}"
                                />
                                <ItemInfo label="Denom" :value="symbol" />
                                <ItemInfo label="Decimal" :value="contract_detail.messages | getDecimal" />
                                <ItemInfoJson label="Init Messages" :value="contract_detail.messages | getMsg" />
                                <ItemInfoJson label="Funds" :value="contract_detail.messages | getFunds" />
                                <ItemInfo label="Executes" :value="contract_detail.executed_count" />
                                <ItemInfo label="Last Executed At" :value="contract_detail.last_executed_at | formatTime" />
                                <ItemInfo label="Instantiated At" :value="contract_detail.instantiated_at | formatTime" />
                                <ItemInfoJson label="Token Info" :value="contract_detail.messages | getTokenInfo" />
                            </ul>
                        </div>
                    </section>
                    <section class="Section_container PopularContracts_container">
                        <div class="SectionHeader_sectionHeader">
                            <h2 class="SectionHeader_sectionHeading">Balances</h2>
                            <div class="cnt-search">
                                <span class="icon-search"><img src="search.svg" alt=""></span>
                                <input type="text" placeholder="Search Address">
                            </div>
                        </div>
                        <div class="SectionContent_sectionContent">
                            <div class="cnt-updateAt">
                                <b>Updated At:</b>
                                <span>2022-05-16 07:34:40</span>
                            </div>
                            <BalanceInfo v-for="(balance, index) in filteredRowBalances" :key="index" :address="balance.key" :value="balance.value" :symbol="symbol" />
                            <div class="well">
                                <div v-if="loaded.balances" class="pagination-wrapper">
                                <pagination
                                    v-model="pagination.balances.page"
                                    :records="balances.length"
                                    :per-page="pagination.balances.per"
                                    :options="optionPaginate"
                                    @paginate="getNextBalance"
                                />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="cos-table-item table-transactions">
                            <div class="cos-item-content">
                                <div class="cos-title">
                                <h3 class="title-cos">
                                    <span>Transactions</span>
                                </h3>
                                </div>
                                <empty-table v-if="loaded.txs && !txs.length" :obj-name="'Transactions'" />
                                <div v-else class="cos-table-list">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered table-hover text-left">
                                    <thead>
                                        <tr>
                                        <th>Tx Hash</th>
                                        <th>Type</th>
                                        <th class="text-center">
                                            Result
                                        </th>
                                        <th>Amount</th>
                                        <th>
                                            Fee
                                        </th>
                                        <th class="text-center">
                                            Height
                                        </th>
                                        <th class="text-center">
                                            Time
                                        </th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="loaded.txs">
                                        <tr v-for="tx in filteredRowTxs" :key="tx.tx_hash">
                                        <td>
                                            <nuxt-link class="box btn1" :to="{name: 'transactions-address', params: { address: tx.tx_hash }}">
                                            {{ tx.tx_hash | formatHash }}
                                            </nuxt-link>
                                        </td>
                                        <td><span class="box btn2">{{ tx.messages | getType }}</span></td>
                                        <td :class="'text-center ' + (!tx.status ? 'green' : 'red')">
                                            <span class="title">Result</span>
                                            {{ !tx.status ? 'Success' : 'Failed' }}
                                        </td>
                                        <AmountInfo :messages="tx.messages" :tx_hash="tx.tx_hash" :denom="current_denom"/>
                                        <td>
                                            <span class="title">Fee</span>
                                            {{ tx.fee | getFeeTx }} {{ current_denom }}
                                        </td>
                                        <td class="text-center">
                                            <span class="title">Height</span>
                                            <nuxt-link :to="{name: 'blocks-height', params: { height: tx.height }}">
                                            {{ tx.height }}
                                            </nuxt-link>
                                        </td>
                                        <td class="text-center">
                                            <span class="title">Time</span>
                                            {{ tx.timestamp | getTime }} ago
                                        </td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr v-for="i in 5" :key="i">
                                        <td colspan="7" class="td-skeleton">
                                            <Skeleton />
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                <div class="well">
                                    <div v-if="loaded.txs" class="pagination-wrapper">
                                    <pagination
                                        v-model="pagination.txs.page"
                                        :records="txs.length"
                                        :per-page="pagination.txs.per"
                                        :options="optionPaginate"
                                        @paginate="getNextTxs"
                                    />
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import NotFound from '@/components/error/NotFound.vue'
import ItemInfo from '@/components/wasm/ItemInfo.vue'
import ItemInfoJson from '@/components/wasm/ItemInfoJson.vue'
import BalanceInfo from '@/components/wasm/BalanceInfo.vue'
import EmptyTable from '@/components/error/EmptyTable.vue'
import AmountInfo from '@/components/elements/AmountInfo.vue'
import helper from '@/utils/helper'
import {coswmwasmHelper} from "@/utils/cosmwasm";

export default {
    components: {
        ItemInfo,
        ItemInfoJson,
        BalanceInfo,
        EmptyTable,
        NotFound,
        AmountInfo
    },
    filters: {
        getDecimal (messages) {
            if (messages) {
                const message = messages.find(x => x["@type"] == "/cosmwasm.wasm.v1.MsgInstantiateContract")
                if (message && message.msg != undefined) {
                    return message.msg.decimals.toString()
                }
            }
            return ""
        },
        getSymbol (messages) {
            if (messages) {
                const message = messages.find(x => x["@type"] == "/cosmwasm.wasm.v1.MsgInstantiateContract")
                if (message && message.msg != undefined) {
                    return message.msg.symbol
                }
            }
            
            return ""
        },
        getMsg (messages) {
            if (messages) {
                const message = messages.find(x => x["@type"] == "/cosmwasm.wasm.v1.MsgInstantiateContract")
                if (message && message.msg != undefined) {
                    return message.msg
                }
                return {}
            }
            
            return {}
        },
        getFunds (messages) {
            if (messages) {
                const message = messages.find(x => x["@type"] == "/cosmwasm.wasm.v1.MsgInstantiateContract")
                if (message && message.funds) {
                    return message.funds
                }
            }
            return {}
        },
        getTokenInfo (messages) {
            if (messages) {
                const message = messages.find(x => x["@type"] == "/cosmwasm.wasm.v1.MsgInstantiateContract")
                if (message && message.msg != undefined) {
                    const {decimals, symbol, name} = message.msg
                    return {name, symbol, decimals}
                }
                return {}
            }
            return {}
        },
        formatTime (value) {
            return helper.convertTime(value)
        },
        convertNumber (value, isInt) {
            const total = parseFloat(value) / Math.pow(10, 6)
            if (isInt) {
                return helper.formatNumber(parseInt(total))
            } else {
                const decimal = (total.toFixed(6).toString()).split('.')
                return decimal[1]
            }
        },
        getFeeTx (value) {
            const totalAmount = helper.getFeeTx(value)
            return (totalAmount / Math.pow(10, 6)).toFixed(6)
        },
        formatHash (value) {
            return helper.formatHash(value, 6, 6)
        },
        getTime (value) {
            return helper.formatTime(value)
        },
        getType (value) {
            if (value) {
                const messages = JSON.parse(value)
                const [message] = messages
                const str = helper.getTypeTxFromStr(message["@type"])
                if (messages.length > 1) {
                    return str + " + " + (messages.length - 1)
                }
                return str
            }
        },
    },
    computed: {
        filteredRowBalances () {
            return this.balances.filter((_, index) => {
                const { per, page } = this.pagination.balances
                const from = (page - 1) * per
                const to = from + per
                if (index >= from && index < to) {
                    return true
                }
                return false
            })
        },
        filteredRowTxs () {
            return this.txs.filter((_, index) => {
                const { per, page } = this.pagination.txs
                const from = (page - 1) * per
                const to = from + this.pagination.txs.per
                if (index >= from && index < to) {
                    return true
                }
                return false
            })
        },
        current_denom () {
            return this.$store.state.network.current_network ? this.$store.state.network.current_network.denom : 'ATOM'
        }
    },
    data () {
        return {
            contract_detail: {},
            symbol: "",
            balances: [],
            txs: [],
            pagination: {
                balances: {
                    per: 10,
                    page: 1,
                    nextKey: new Uint8Array(),
                    total: null,
                },
                txs: {
                    before: 0,
                    size: 50,
                    per: 10,
                    page: 1
                },
            },
            loaded: {
                balances: false,
                txs: false,
            },
            optionPaginate: {
                chunk: 5
            },
            cosmwasmClient: null,
            address: this.$route.params.address,
            notFound: false,
        }
    },
    mounted() {
        this.getContractDetailData()
        this.getBalances()
        this.getContractTransactionData()
    },
    methods: {
        ...mapActions({
            getContractDetail: 'contracts/GET_CONTRACT_DETAIL',
            getContractTransaction: 'contracts/GET_CONTRACT_TRANSACTIONS'
        }),
        setContractDetail (data) {
            data.messages = JSON.parse(data.messages)
            this.contract_detail = data
        },
        setSymbol (data) {
            const { messages } = data
            if (messages) {
                const message = messages.find(x => x["@type"] == "/cosmwasm.wasm.v1.MsgInstantiateContract")
                if (message && message.msg != undefined) {
                    this.symbol =  message.msg.symbol
                }
            }
        },
        setBalanaces (data) {
            this.balances = this.balances.concat(data)
        },
        setNotFound (value) {
            this.notFound = value
        },
        async setCosmwasmClient() {
            this.cosmwasmClient = await coswmwasmHelper.connect()
        },
        setBalanacePagination (value) {
            this.pagination.balances.nextKey = value.nextKey
            this.pagination.balances.total = value.total
        },
        setLoadedBalance (value) {
            this.loaded.balances = value
        },
        setLoadedTxs (value) {
            this.loaded.txs = value
        },
        setTxsData (data) {
            this.txs = this.txs.concat(data)
        },
        incrementTxsPage () {
            this.pagination.txs.page += 1
        },
        getAddress () {
            return this.address
        },
        getCosmwasmClient () {
            return this.cosmwasmClient
        },
        setTxsBefore () {
            this.pagination.txs.before = this.txs.slice(-1).pop().height;
        },
        getContractDetailData () {
            this.getContractDetail({contract_address: this.getAddress()}).then((data) => {
                this.setContractDetail(data)
                this.setSymbol(data)
                this.setNotFound(false)
            }).catch(error => {
                console.log(error)
                this.setNotFound(true)
            })
        },
        getContractTransactionData () {
            const {before, size} = this.pagination.txs
            this.setLoadedTxs(false)
            this.getContractTransaction({
                acc_address: this.getAddress(),
                before,
                size
            }).then((data) => {
                this.setTxsData(data)
                this.setLoadedTxs(true)
            }).catch(error => {
                console.log(error)
                this.setLoadedTxs(true)
            })
        },
        async getBalances () {
            this.setLoadedBalance(false)
            if(! this.getCosmwasmClient()) {
                await this.setCosmwasmClient()
            }
            const {models, pagination} = await this.getCosmwasmClient().getAllContractState(this.getAddress(), this.pagination.balances.nextKey)
            this.setBalanaces(models)
            this.setBalanacePagination(pagination)
            this.setLoadedBalance(true)
        },
        getNextBalance (page) {
            const index = page * this.pagination.balances.per
            if (!this.balances[index]) {
                this.getBalances()
            }
        },
        getNextTxs (page) {
            const index = page * this.pagination.txs.per
            if (!this.txs[index]) {
                this.setTxsBefore()
                this.getContractTransactionData()
            }
        }
    }
}
</script>
