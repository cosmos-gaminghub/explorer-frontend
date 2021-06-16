import gql from 'graphql-tag'

const api = {
  GET_VALIDATORS_QUERY: gql`
    query GET_VALIDATORS_QUERY {
      validators {
        moniker,
        voting_power,
        uptime,
        over_blocks,
        commission,
        operator_address,
        acc_address,
        jailed,
        status,
        website,
      }
    }`,
  GET_BLOCKS_QUERY: gql`
    query GET_BLOCKS_QUERY ($offset: Int!, $size: Int!) {
      blocks(offset:$offset, size:$size) {
        height,
        hash,
        proposer_addr,
        num_txs,
        time,
        moniker,
        operator_address
      }
    }`,
  GET_TRANSACTIONS_QUERY: gql`
    query GET_TRANSACTIONS_QUERY ($size: Int!) {
      txs(size:$size) {
        tx_hash,
        status,
        fee,
        height,
        timestamp,
        messages,
        logs,
        memo,
        gas_used,
        gas_wanted,
      }
    }`,
  SEARCH_TRANSACTIONS_QUERY: gql`
    query GET_TRANSACTIONS_QUERY ($size: Int!) {
      txs(size:$size) {
        tx_hash,
        status,
        fee,
        height,
        timestamp,
        messages,
        logs,
        memo,
        gas_used,
        gas_wanted,
      }
    }`,
  GET_NETWORK_STATUS_QUERY: gql`
    query GET_NETWORK_STATUS_QUERY {
      status {
        block_height,
        block_time,
        total_txs_num,
        bonded_tokens,
        total_supply_tokens {
          supply {
            denom,
            amount
          }
        }
      }
    }`,
  GET_INFLATION_QUERY: gql`
    query GET_INFLATION_QUERY {
      inflation {
        inflation
      }
    }`
}

export default api
