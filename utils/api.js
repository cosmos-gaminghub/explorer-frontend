import gql from 'graphql-tag'

const api = {
  GET_VALIDATORS_QUERY: gql`
    query GET_VALIDATORS_QUERY {
      validators {
        moniker,
        voting_power,
        cumulative_share,
        uptime,
        over_blocks,
        commission,
        operator_address,
        acc_address,
        jailed,
        status,
        website,
        rank
      }
    }`,
  GET_VALIDATOR_DETAIL_QUERY: gql`
    query GET_VALIDATORS_QUERY ($operator_address: String!) {
      validator_detail (operator_address: $operator_address) {
        moniker,
        voting_power,
        cumulative_share,
        uptime,
        over_blocks,
        commission,
        operator_address,
        acc_address,
        jailed,
        status,
        website,
        rank,
        details
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
  GET_DELEGATIONS_QUERY: gql`
    query GET_DELEGATIONS_QUERY ($acc_address: String!) {
      delegations (acc_address: $acc_address) {
        moniker,
        delegator_address,
        validator_address,
        amount
      }
    }`,
  GET_PROPOSED_BLOCKS_QUERY: gql`
    query GET_PROPOSED_BLOCKS_QUERY ($before: Int!, $size: Int!, $operator_address: String!) {
      proposed_blocks(before:$before, size:$size, operator_address: $operator_address) {
        height,
        hash,
        proposer_addr,
        num_txs,
        time,
        moniker,
        operator_address,
        total_records
      }
    }`,
  GET_UPTIMES: gql`
    query GET_UPTIMES ($operator_address: String!) {
      uptimes (operator_address: $operator_address) {
        last_height,
        uptime {
          height,
          timestamp
        }
      }
    }`,
  GET_POWER_EVENT_QUERY: gql`
    query GET_POWER_EVENT_QUERY ($before: Int!, $size: Int!, $operator_address: String!) {
      power_events (before:$before, size:$size, operator_address: $operator_address) {
        height,
        tx_hash,
        timestamp,
        amount,
        type,,
        total_records
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
