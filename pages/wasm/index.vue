<template>
    <div class="page-content header-smaller">
        <div class="main-body-content">
            <div class="cos-notice custom-page-title">
                <div class="row">
                    <div class="col-lg-4 col-md-12 col-sm-12">
                        <h2 class="page-title">
                        Wasm Contracts
                        </h2>
                    </div>
                    <div class="col-lg-8 col-md-12 col-sm-12">
                        <header-data />
                    </div>
                </div>
                <div class="main-md-content delegated-missed md-full">
                    <div class="row">
                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <section class="Section_container PopularContracts_container">
                                <div class="SectionHeader_sectionHeader">
                                    <h2 class="SectionHeader_sectionHeading">Popular Contracts</h2>
                                </div>
                                <div class="SectionContent_sectionContent">
                                    <section class="PopularContracts_cardContainer">
                                        <PopularItem
                                            v-for="contract in popular_contracts"
                                            :key="contract.contract_address" 
                                            :name="contract.label" 
                                            :contract_address="contract.contract_address" 
                                            :contract_version="contract.version" 
                                            :execute="contract.executed_count" 
                                            :instantiated_at="contract.instantiated_at" 
                                        />
                                    </section>
                                </div>
                            </section>
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
                                                    <nuxt-link class="box btn1" :to="{name: 'wasm-contract-address', params: { address: contract.contract_address }}">
                                                        {{ contract.contract_address | formatHashBlock }}
                                                    </nuxt-link>
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
                            <div class="cos-table-item tbl-delegations">
                                <div class="cos-item-content md-full">
                                    <CosTitle name="Codes" />
                                    <empty-table v-if="emptyCode" obj-name="Codes" />
                                    <div v-else class="cos-table-list">
                                        <div class="table-responsive">
                                            <table class="table table-striped table-bordered table-hover text-left table-delegation-account">
                                            <thead>
                                                <tr>
                                                    <th>Verified</th>
                                                    <th>Id</th>
                                                    <th>Tx Hash</th>
                                                    <th>Creator</th>
                                                    <th>Contract</th>
                                                    <th>Version</th>
                                                    <th>Instantiates</th>
                                                    <th>Created at</th>
                                                </tr>
                                            </thead>
                                            <tbody v-if="loaded.codes">
                                                <tr v-for="code in filteredRowCodes" :key="code.code_id">
                                                <td>
                                                    1
                                                </td>
                                                <td>
                                                    <nuxt-link class="box btn1" :to="{name: 'wasm-code-id', params: { id: code.code_id }}">
                                                        {{ code.code_id }}
                                                    </nuxt-link>
                                                </td>
                                                <td>
                                                    <nuxt-link v-if="code.txhash" class="box btn1" :to="{name: 'transactions-address', params: { address: code.txhash }}">
                                                        {{ code.txhash | formatHashBlock }}
                                                    </nuxt-link>
                                                </td>
                                                <td>
                                                    <nuxt-link class="box btn1" :to="{name: 'account-address', params: { address: code.creator }}">
                                                        {{ code.creator | formatHashBlock }}
                                                    </nuxt-link>
                                                </td>
                                                <td>
                                                    {{ code.contract }}
                                                </td>
                                                <td>
                                                    {{ code.version }}
                                                </td>
                                                <td>
                                                    {{ code.instantiate_count }}
                                                </td>
                                                <td>
                                                    {{ code.created_at | formatTime}}
                                                </td>
                                                </tr>
                                            </tbody>
                                            <tbody v-else>
                                                <tr v-for="i in 5" :key="i">
                                                <td colspan="9" class="td-skeleton">
                                                    <Skeleton />
                                                </td>
                                                </tr>
                                            </tbody>
                                            </table>
                                        </div>
                                        <div class="well">
                                            <div v-if="loaded.codes" class="pagination-wrapper">
                                            <pagination
                                                v-model="pagination.codes.page"
                                                :records="codes.length"
                                                :per-page="pagination.codes.per"
                                                :options="optionPaginate"
                                                @paginate="getCodesWithPage"
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
    </div>
</template>
<script>
import PopularItem from '~/components/wasm/PopularContractItem.vue'
import headerData from '@/components/header/Header.vue'
import CosTitle from '@/components/cos/CosTitle.vue'
import EmptyTable from '~/components/error/EmptyTable.vue'
import { mapActions } from 'vuex'
import helper from '~/utils/helper'

export default {
    filters: {
        formatTime (value) {
            return helper.convertTime(value)
        },
        formatHashBlock (value) {
            return helper.formatHash(value, 8, 8)
        },
    },
    components: {
        PopularItem,
        headerData,
        CosTitle,
        EmptyTable
    },
    data () {
        return {
            popular_contracts: [],
            contracts: [],
            codes: [],
            loaded: {
                contracts: false,
                codes: false
            },
            pagination: {
                contracts: {
                    page: 1,
                    per: 10,
                    offset: 0,
                    size: 50
                },
                codes: {
                    after: 0,
                    page: 1,
                    per: 10,
                    offset: 0,
                    size: 50
                }
            },
            optionPaginate: {
                chunk: 5
            },
        }
    },
    computed: {
        filteredRowContracts () {
            return this.contracts.filter((_, index) => {
                const { per, page } = this.pagination.contracts
                const from = (page - 1) * per
                const to = from + per
                if (index >= from && index < to) {
                    return true
                }
                return false
            })
        },
        filteredRowCodes () {
            return this.codes.filter((_, index) => {
                const { per, page } = this.pagination.codes
                const from = (page - 1) * per
                const to = from + per
                if (index >= from && index < to) {
                    return true
                }
                return false
            })
        },
        emptyContract () {
            return this.loaded.contracts && !this.contracts.length
        },
        emptyCode () {
            return this.loaded.codes && !this.codes.length
        },
    },
    mounted () {
        this.getPopularContracts()
        this.getContracts()
        this.getCodeData()
    },
    methods: {
        ...mapActions({
            getDataContracts: 'contracts/GET_DATA',
            getCodes: 'codes/GET_DATA'
        }),
        setPopularContracts (data) {
            this.popular_contracts = data
        },
        setContracts (data) {
            this.contracts = this.contracts.concat(data)
        },
        setCodes (data) {
            this.codes = this.codes.concat(data)
        },
        setLoadedContracts (value) {
            this.loaded.contracts = value
        },
        setLoadedCodes (value) {
            this.loaded.codes = value
        },
        setContractOffset () {
            this.pagination.contracts.offset += this.pagination.contracts.size
        },
        setCodeAfter () {
            this.pagination.codes.after = this.codes.slice(-1).pop().code_id;
        },
        getPopularContracts () {
            const params =  {
                offset: 0,
                size: 10
            }
            this.getDataContracts(params).then((data) => {
                this.setPopularContracts(data)
            }).catch(error => {
                console.log(error)
            })
        },
        getContracts () {
            const {offset, size} = this.pagination.contracts
            this.getDataContracts({offset, size}).then((data) => {
                this.setContracts(data)
                this.setLoadedContracts(true)
            }).catch(error => {
                console.log(error)
            })
        },
        getCodeData () {
            const {after, size} = this.pagination.codes
            this.getCodes({after, size}).then((data) => {
                this.setCodes(data)
                this.setLoadedCodes(true)
            }).catch(error => {
                console.log(error)
            })
        },
        getContractsWithPage (page) {
            const index = page * this.pagination.contracts.per
            if (!this.contracts[index]) { 
                this.setContractOffset()
                this.setLoadedContracts(false)
                this.getContracts()
            }
        },
        getCodesWithPage (page) {
            const index = page * this.pagination.codes.per
            if (!this.codes[index]) { 
                this.setCodeAfter()
                this.setLoadedCodes(false)
                this.getCodeData()
            }
        }
    }
}
</script>

<style scoped>
</style>