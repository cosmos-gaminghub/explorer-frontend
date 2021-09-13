import gql from 'graphql-tag'

const api = {
  GET_VALIDATORS_QUERY: gql`
    query GET_VALIDATORS_QUERY {
      validators {
        moniker,
        image_url,
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
        total_missed_block
      }
    }`,
  GET_VALIDATOR_DETAIL_QUERY: gql`
    query GET_VALIDATORS_QUERY ($operator_address: String!) {
      validator_detail (operator_address: $operator_address) {
        moniker,
        image_url,
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
        details,
        total_missed_block
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
  GET_BLOCK_DETAIL: gql`
    query GET_BLOCK_DETAIL ($height: Int!) {
      block_detail (height: $height) {
        height,
        hash,
        proposer_addr,
        num_txs,
        time,
        moniker,
        operator_address,
        total_records,
      }
    }`,
  GET_BLOCK_TXS: gql`
    query GET_BLOCK_TXS ($height: Int!) {
      block_txs (height:$height) {
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
  GET_DELEGATIONS_QUERY: gql`
    query GET_DELEGATIONS_QUERY ($acc_address: String!) {
      delegations (acc_address: $acc_address) {
        moniker,
        delegator_address,
        validator_address,
        amount
      }
    }`,
  GET_REDELEGATIONS_QUERY: gql`
    query GET_REDELEGATIONS_QUERY ($acc_address: String!) {
      redelegations (acc_address: $acc_address) {
        redelegation_responses {
          redelegation {
            delegator_address,
            validator_dst_address,
            validator_src_address,
            moniker_src,
            moniker_dst,
            entries {
              creation_height,
              completion_time,
              initial_balance,
              shares_dst
            }
          },
          entries {
            redelegation_entry {
              creation_height,
              completion_time,
              initial_balance,
              shares_dst
            },
            balance
          }
        }
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
  GET_ACCOUNT_DETAIL_QUERY: gql`
    query GET_ACCOUNT_DETAIL_QUERY ($acc_address: String!) {
      account_detail(acc_address:$acc_address) {
        is_validator,
        operator_address
      }
    }`,
  GET_ACCOUNT_TRANSACTIONS_QUERY: gql`
    query GET_ACCOUNT_TRANSACTIONS_QUERY ($acc_address: String!, $before: Int!, $size: Int!) {
      account_transactions(acc_address:$acc_address, before: $before, size: $size) {
        tx_hash,
        status,
        fee,
        height,
        timestamp,
        messages,
        logs,
        memo,
        gas_used,
        gas_wanted
      }
    }`,
  GET_TRANSACTION_DETAIL_QUERY: gql`
    query GET_TRANSACTION_DETAIL_QUERY ($tx_hash: String!) {
      tx_detail(tx_hash: $tx_hash) {
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
        raw_log
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
        },
        timestamp
      }
    }`,
  GET_INFLATION_QUERY: gql`
    query GET_INFLATION_QUERY {
      inflation {
        inflation
      }
    }`,
  GET_REWARDS_QUERY: gql`
    query GET_REWARDS_QUERY ($acc_address: String!) {
      rewards (acc_address: $acc_address) {
        rewards {
          validator_address,
          reward {
            denom,
            amount
          }
        }
      }
    }`,
  GET_COMMISSION_QUERY: gql`
    query GET_COMMISSION_QUERY ($operator_address: String!) {
      commission (operator_address: $operator_address) {
        commission {
          commission {
            denom,
            amount
          }
        }
      }
    }`,
  GET_UNBONDINGS_QUERY: gql`
    query GET_UNBONDINGS_QUERY ($acc_address: String!) {
      unbonding (acc_address: $acc_address) {
        unbonding_responses {
          delegator_address,
          validator_address,
          moniker,
          entries {
            creation_height,
            completion_time,
            initial_balance,
            balance
          }
        }
      }
    }`,
  GET_BALANCES_QUERY: gql`
    query GET_BALANCES_QUERY ($acc_address: String!) {
      balances(acc_address:$acc_address) {
        balances {
          denom,
          amount
        }
      }
    }`,
  GET_PROPOSALS_QUERY: gql`
    query GET_PROPOSALS_QUERY {
      proposals {
        id,
        total_deposit {
          denom,
          amount
        },
        status,
        voting_start,
        voting_end,
        submit_time,
        tally {
          yes,
          abstain,
          no,
          no_with_veto
        },
        content {
         title,
          type,
          description,
          changes {
            key,
            value,
            subspace
          }
        },
        proposer
      }
    }`,
  GET_PROPOSAL_DETAIL_QUERY: gql`
    query GET_PROPOSAL_DETAIL_QUERY ($proposal_id: Int!) {
      proposal_detail (proposal_id: $proposal_id) {
        id,
        moniker,
        total_deposit {
          denom,
          amount
        },
        status,
        voting_start,
        voting_end,
        submit_time,
        tally {
          yes,
          abstain,
          no,
          no_with_veto
        },
        content {
         title,
          type,
          description,
          changes {
            key,
            value,
            subspace
          },
          amount {
            denom,
            amount
          },
          plan {
            name,
            time,
            height,
            info,
            upgraded_client_state
          }
        },
        proposer,
        deposit_end_time
      }
    }`,
  GET_DEPOSIT_QUERY: gql`
    query GET_DEPOSIT_QUERY ($proposal_id: Int!) {
      deposit (proposal_id: $proposal_id) {
        depositor,
        amount,
        tx_hash,
        time
      }
    }`,
  GET_VOTE_QUERY: gql`
    query GET_VOTE_QUERY ($before: Int!, $size: Int!, $proposal_id: Int!) {
      vote (
        before: $before,
        size: $size,
        proposal_id: $proposal_id
      ) {
        voter,
        option,
        tx_hash,
        time,
        moniker
      }
    }`,
  GET_PRICE_QUERY: gql`
    query GET_PRICE_QUERY {
      price (slug: "cosmos") {
        price,
        volume_24h,
        market_cap,
        percent_change_24h
      }
    }`,
  GET_STATS_QUERY: gql`
    query GET_STATS_QUERY {
       stats_assets {
        price,
        market_cap,
        volume_24h,
        timestamp
      }
    }`
}

export default api
