var router = require('express').Router();
const plan = require('../database/plan');
const auth = require('../middleware/auth')


router.get('/list', auth, (req,res) => {
    plan.list()
    .then((result) => {
        console.log(result)
        res.status(201).send({
            message: `Found  plans`,
            result
        });
    })
    .catch((error) => {
        res.status(409).send({
            message: "Error listing plans",
            error,
        });
    });
});

        
router.post('/quote',  (req,res) => {
    const { city,type,peoples,tag } = req.body    
    const counts = {}
    const totals = {}

    for (const people of peoples) {
      counts[people] = counts[people] ? counts[people] + 1 : 1;
    }
  
    plan.quote(city,type,peoples.length,[...new Set(peoples)],tag)
    .then((result) => {
        result.forEach( (element) => {
            totals[element.age_group] = counts[element.age_group] * element.price
        })
        const values = Object.values(totals);

        const sum = values.reduce((accumulator, value) => {
            return accumulator + value;
        }, 0);  
        totals['total'] = sum

        res.status(201).send({
            message: `found plans`,
            result,
            totals
        });
    })
    .catch((error) => {
        res.status(500).send({
            message: "Error getting plans",
            error,
        });
    });
});

router.post('/normalize-age', (req,res) => {
    const { peoples } = req.body
    const counts = [18,23,28,33,38,43,48,53,58,59];
    
    const result = peoples.map(element => {
        let min = Math.min(...counts.filter( num => num >= element ));
        return min
    })
    res.status(200).send({
        result
    });
})

router.post('/inactive/:planId', auth, (req,res) => {
    plan.inactive(req.params.planId,req.body.status)
    .then((result) => {
        res.status(201).send({
            message: `plan status updated`
        });
    })
    .catch((error) => {
        res.status(409).send({
            message: "Error updating plan",
            error,
        });
    });
});

router.post('/create', auth, (req,res) => {
    const { plans } = req.body
    console.log('plans',plans)
    let string = ''
    plans.forEach( (e,i) => {
        let concat = `(${e.OPERATOR_ID},'${e.CITY}','${e.STATE}','${e.TYPE}','${e.NAME}','${e.ACCOMMODATION}',${e.MIN_PEOPLE},'${e.TAG}')`
        if(plans.length -1 !== i){ concat += ',' }
        string += concat
    });
    console.log('plan create',string)
    plan.create(string)
    .then((result) => {
        let string = ''
        result.forEach( (e,i) => {
            let concat = `
            (${e.id},'18',${plans[i].AG_18}),
            (${e.id},'23',${plans[i].AG_23}),
            (${e.id},'28',${plans[i].AG_28}),
            (${e.id},'33',${plans[i].AG_33}),
            (${e.id},'38',${plans[i].AG_38}),
            (${e.id},'43',${plans[i].AG_43}),
            (${e.id},'48',${plans[i].AG_48}),
            (${e.id},'53',${plans[i].AG_53}),
            (${e.id},'58',${plans[i].AG_58}),
            (${e.id},'59',${plans[i].AG_59})
            `
            if(plans.length -1 !== i){ concat += ',' }
            string += concat
        })
        console.log('plan variant create',string)

        plan.createVariant(string)
        .then(result =>{
            res.status(201).send({
                message: `plans created`
            });
        })
        .catch((error)=>{
            res.status(409).send({
                message: "Error creating variant",
                error,
            });
        })
    })
    // .catch((error) => {
    //     res.status(409).send({
    //         message: "Error updating plan",
    //         error,
    //     });
    // });
});

module.exports = router;