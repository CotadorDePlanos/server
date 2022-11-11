const pool = require('./_database').pool

const list = async (city,type,minPeople,ageGroup) => {
    if(type === 'PF'){
        min_people = 1
    } 
    const res = await pool.query(
        `
        SELECT 
            o.name as operator_name,
            p.*,
            pl.age_group,
            pl.price,
            m.message
        FROM 
            plans p,
            plan_variant pl,
            operators o,
            messages m,
            message_operator mo
        WHERE p.id=pl.plan_id 
        AND p.city = $1
        AND p.type = $2
        AND p.min_people >= $3
        AND pl.age_group = ANY($4::age_group[])
        AND p.active = true
        AND o.id = p.operator_id
        AND o.active = true
        AND mo.operator_id = p.operator_id
        AND m.id = mo.message_id
        `
      , [city, type, minPeople, ageGroup])

    return res.rows
}

module.exports = {
    list,
}