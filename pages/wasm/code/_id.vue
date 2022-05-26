<template>
    <div class="page-content header-smaller">
        <div class="main-body-content">
            <not-found v-if="notFound" :obj-name="'Transaction'" />
            <div v-else class="cos-notice custom-page-title cos-transaction-detail">
                <div class="row">
                    <div class="col-lg-4 col-md-12 col-sm-12">
                    <h2 class="page-title">
                        WASM CODE
                    </h2>
                    </div>
                    <div class="col-lg-8 col-md-12 col-sm-12">
                    <!-- <header-data /> -->
                    </div>
                </div>
                <div class="main-md-content transaction-detail-content">
                    <section class="Section_container PopularContracts_container">
                        <div class="SectionHeader_sectionHeader">
                            <h2 class="SectionHeader_sectionHeading">Code Detail</h2>
                        </div>
                        <div class="SectionContent_sectionContent">
                            <ul class="content-contact-detail">
                                <ItemInfo label="Code ID" :value="code_detail.code_id" />
                                <ItemInfo label="Creator" :value="code_detail.creator" type="link" :route="{name: 'account-address', params: { address: code_detail.creator }}"/>
                                <ItemInfo label="Tx Hash" :value="code_detail.txhash" type="link" :route="{name: 'transactions-address', params: { address: code_detail.txhash }}"/>
                                <ItemInfo label="Checksum" :value="code_detail.data_hash" />
                                <ItemInfo label="Contract" :value="code_detail.contract" />
                                <ItemInfo label="Version" :value="code_detail.version"/>
                                <ItemInfo label="Instantiates" :value="code_detail.instantiate_count" />
                                <ItemInfo label="Permission" :value="code_detail.permission" />
                                <ItemInfo label="Permitted Address" :value="code_detail.permitted_address" />
                                <ItemInfo label="Created At" :value="code_detail.created_at | formatTime" />
                            </ul>
                        </div>
                    </section>
                </div>
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <div class="cos-table-item tbl-delegations">
                            <div class="cos-item-content md-full">
                                <CosTitle name="Contracts" />
                                <empty-table v-if="emptyContract" obj-name="Contracts" />
                                <div v-else class="cos-table-list">
                                    <div class="table-responsive">
                                        <table class="table table-striped table-bordered table-hover text-left table-delegation-account">
                                        <thead>
                                            <tr>
                                                <th>Contract Name</th>
                                                <th>Contract</th>
                                                <th>
                                                    Contract Address
                                                </th>
                                                <th>
                                                    Tx Hashs
                                                </th>
                                                <th>
                                                    Creator
                                                </th>
                                                <th>
                                                    Executes
                                                </th>
                                                <th>
                                                    Instantiated At
                                                </th>
                                                <th>
                                                    Last Executed At
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="loaded.contracts">
                                            <tr v-for="(contract, index) in filteredRowContracts" :key="index">
                                            <td>
                                                {{ contract.label }}
                                            </td>
                                            <td>
                                                {{ contract.version }}
                                            </td>
                                            <td>
                                                {{ contract.contract_address | formatHashBlock }}
                                            </td>
                                            <td>
                                                <nuxt-link v-if="contract.txhash" class="box btn1" :to="{name: 'transactions-address', params: { address: contract.txhash }}">
                                                    {{ contract.txhash | formatHashBlock }}
                                                </nuxt-link>
                                            </td>
                                            <td>
                                                <nuxt-link class="box btn1" :to="{name: 'account-address', params: { address: contract.creator }}">
                                                    {{ contract.creator | formatHashBlock }}
                                                </nuxt-link>
                                            </td>
                                            <td>
                                                {{ contract.executed_count }}
                                            </td>
                                            <td>
                                                {{ contract.instantiated_at | formatTime }}
                                            </td>
                                            <td>
                                                {{ contract.last_executed_at | formatTime}}
                                            </td>
                                            </tr>
                                        </tbody>
                                        <tbody v-else>
                                            <tr v-for="i in 5" :key="i">
                                            <td colspan="8" class="td-skeleton">
                                                <Skeleton />
                                            </td>
                                            </tr>
                                        </tbody>
                                        </table>
                                    </div>
                                    <div class="well">
                                        <div v-if="loaded.contracts" class="pagination-wrapper">
                                        <pagination
                                            v-model="pagination.contracts.page"
                                            :records="contracts.length"
                                            :per-page="pagination.contracts.per"
                                            :options="optionPaginate"
                                            @paginate="getContractsWithPage"
                                        />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="cos-table-item table-transactions">
                            <div class="cos-item-content">
                                <CosTitle name="Transactions" />
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
import CosTitle from '@/components/cos/CosTitle.vue'

export default {
    components: {
        ItemInfo,
        ItemInfoJson,
        BalanceInfo,
        EmptyTable,
        NotFound,
        AmountInfo,
        CosTitle
    },
    filters: {
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
            code_detail: {},
            symbol: "",
            balances: [],
            txs: [],
            pagination: {
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
            id: this.$route.params.id,
            notFound: false,
        }
    },
    mounted() {
        this.getCodeDetailData()
        this.getCodeTransactionData()
    },
    methods: {
        ...mapActions({
            getCodeDetail: 'codes/GET_CODE_DETAIL',
            getContractTransaction: 'codes/GET_CODE_TRANSACTIONS'
        }),
        setCodeDetail (data) {
            this.code_detail = data
        },
        setNotFound (value) {
            this.notFound = value
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
        getCode () {
            return this.id
        },
        setTxsBefore () {
            this.pagination.txs.before = this.txs.slice(-1).pop().height;
        },
        getCodeDetailData () {
            this.getCodeDetail({code_id: this.getCode()}).then((data) => {
                this.setCodeDetail(data)
                this.setNotFound(false)
            }).catch(error => {
                console.log(error)
                this.setNotFound(true)
            })
        },
        getCodeTransactionData () {
            const {before, size} = this.pagination.txs
            this.setLoadedTxs(false)
            this.getContractTransaction({
                code_id: this.getCode(),
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
        getNextTxs (page) {
            const index = page * this.pagination.txs.per
            if (!this.txs[index]) {
                this.setTxsBefore()
                this.getCodeTransactionData()
            }
        }
    }
}
</script>
