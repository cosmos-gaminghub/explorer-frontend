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
                <!-- <div class="col-lg-8 col-md-12 col-sm-12">
                    <header-data />
                </div> -->
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
                                <empty-table v-if="loaded.contracts && !contracts.length" obj-name="Contracts" />
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
                                                <nuxt-link v-if="contract.txhash" class="box btn1" :to="{name: 'transactions-address', params: { userId: contract.txhash }}">
                                                     {{ contract.txhash }}
                                                </nuxt-link>
                                            </td>
                                            <td>
                                                <nuxt-link class="box btn1" :to="{name: 'account-address', params: { userId: contract.creator }}">
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
            loaded: {
                contracts: false
            },
            pagination: {
                contracts: {
                    page: 1,
                    per: 10
                },
            },
            optionPaginate: {
                chunk: 10
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
    },
    mounted () {
        this.getPopularContracts()
        this.getContracts()
    },
    methods: {
        ...mapActions({
            getDataContracts: 'contracts/GET_DATA',
        }),
        setPopularContracts (data) {
            this.popular_contracts = data
        },
        setContracts (data) {
            this.contracts = data
        },
        setLoadedContracts (value) {
            this.loaded.contracts = true
        },
        getPopularContracts () {
            const params =  {
                offset: 0,
                size: 8
            }
            this.getDataContracts(params).then((data) => {
                this.setPopularContracts(data)
            }).catch(error => {
                console.log(error)
            })
        },
        getContracts () {
            const params =  {
                offset: 0,
                size: 50
            }
            this.getDataContracts(params).then((data) => {
                this.setContracts(data)
                this.setLoadedContracts(true)
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style scoped>
</style>