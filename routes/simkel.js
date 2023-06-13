const express = require('express')
const router = express.Router()
const Simkel = require('../models/Simkel')


function result(succ, msg, details) {
    if (details) {
        return {
            success: succ,
            message: msg,
            data: details
        }
    } else {
        return {
            success: succ,
            message: msg,
        }
    }

}
router.get('/', async (req, res) => {
    try {
        const simkel = await Simkel.aggregate([{
                $lookup: {
                    from: 'user',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'userData'
                }
            },
            {
                $set: {
                    id: '$_id',
                    username: {
                        $arrayElemAt: ['$userData.username', 0]
                    },
                }

            },
            {
                $project: {
                    userData: 0,
                    _id: 0
                }
            }

        ]);
        if (simkel.length > 0) {
            res.status(200).json(result(1, 'Data Success', simkel))
        } else {
            res.status(404).json(result(0, 'Zero Data!'))
        }
    } catch (error) {
        res.status(500).json(result(0, error.message))
    }
})
router.post('/', async (req, res) => {
    const inputSimkel = new Simkel({
        namaBarang: req.body.namaBarang,
        harga: req.body.harga,
        desc: req.body.desc,
        user_id: req.body.user_id
    })
    try {
        const simkel = await inputSimkel.save()
        res.status(200).json(result(1, 'Tambah Barang Successful'))

    } catch (error) {
        res.status(500).json(result(0, error.message))
    }
})

router.put('/', async (req, res) => {
    const data = {
        id: req.body.id,
        namaBarang: req.body.namaBarang,
        harga: req.body.harga,
        desc: req.body.desc
    }
    try {
        const simkel = await Simkel.updateOne({
            _id: data.id,
        }, data)

        if (simkel.matchedCount > 0) {
            res.status(200).json(result(1, 'Updated Barang Success!'))
        } else {
            res.status(200).json(result(1, 'Updated Barang Failed!'))
        }

    } catch (error) {
        res.status(500).json(result(0, error.message))
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const simkel = await Simkel.deleteOne({
            _id: req.params.id
        })
        if (simkel.deletedCount > 0) {
            res.status(200).json(result(1, 'Deleted Barang Success!'))
        } else {
            res.status(200).json(result(0, 'Deleted Barang Failed!'))
        }
    } catch (error) {
        res.status(500).json(result(0, error.message))
    }

})
module.exports = router