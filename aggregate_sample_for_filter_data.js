Test.aggregate([{
    "$group": {
        "_id": {
            "from": "$from",
            "to": "$to"
        },
        "amount": {
            "$sum": "$amount"
        }
    }
}, {
    "$project": {
        "from": "$_id.from",
        "to": "$_id.to",
        "amount": 1,
        "_id": 0
    }
}])
