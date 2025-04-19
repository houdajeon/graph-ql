export const query = `
 {
  user {
    email
    country: attrs(path: "country")
    gender: attrs(path: "gender")
    city: attrs(path: "city")
    login
    auditRatio
    totalUp
    totalDown
    firstName
    lastName
  }

  maxLevelAmount: transaction_aggregate(
    where: { type: { _eq: "level" }, event: { object: { name: { _eq: "Module" } } } }
  ) {
    aggregate {
      max {
        amount
      }
    }
  }

  xpEvent41Total: transaction_aggregate(
    where: { eventId: { _eq: 41 }, type: { _eq: "xp" } }
  ) {
    aggregate {
      sum {
        amount
      }
    }
  }
   transaction (where: { type: { _regex: "skill_" } }){
            amount
            type
        }
}
    
`