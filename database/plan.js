const pool = require('./_database').pool

const quote = async (city,type,peoples,ageGroup,tag = 'PRICE') => {
    if(type === 'PF'){
        peoples = 1
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
        ORDER BY
        CASE
          WHEN p.tag=$5 THEN 1
          ELSE 2
        END,name;
        `
      , [city, type, peoples, ageGroup,tag])

    return res.rows
}

const list = async () => {
    const res = await pool.query('SELECT * FROM plans')
    return res.rows
}

const inactive = async (planId,status) => {
    const res = await pool.query('UPDATE plans SET active = $2 WHERE id = $1',[planId,status])
    return res.rows[0]
}

const create = async (string) => {
    const res = await pool.query(
    `INSERT INTO plans (
        operator_id,
        city,
        state,
        type,
        name,
        accommodation,
        min_people,
        tag
    ) 
    VALUES ${string} RETURNING *`)
    return res.rows
}

const createVariant = async (string) => {
    const res = await pool.query(`INSERT INTO plan_variant (plan_id, age_group, price) VALUES ${string} RETURNING *`)
    return res.rows
}

module.exports = {
    list,
    quote,
    inactive,
    create,
    createVariant
}