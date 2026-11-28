
import express from 'express'

// import { PrismaClient } from '../generated/client';
import {PrismaClient} from '@prisma/client'
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
// import {NextResponse} from 'next/server'

const adapter = new PrismaBetterSqlite3({
    url: "file:./db/project.db"
})
const prisma = new PrismaClient({adapter})

const app = express()

app.use(express.json())

app.post(`/signup`,async (req,res)=>{
    const {username, password, role} = req.body

    const result = await prisma.user.create({
        data: {
            username,
            password,
            role
        },
    })
    res.status(201).json(result)
})

app.get('/items',async(req,res)=>{
    const items = await prisma.item.findMany()
    res.status(200).json(items)
})

app.post(`/add-item`,async(req,res)=>{
    const { title, returned, username } = req.body

    const result = await prisma.item.create({
        data: {
            title,
            returned,
            username,
        },
    })
    res.status(201).json(result)
})

app.put('/change-name/item/:id',async (req,res)=>{
    const {id} = req.params
    const {title} = req.body

    try{
        const updatedItem = await prisma.item.update({
            where: { item_id: Number(id) || undefined },
            data: { title: title },
        })
        res.status(200).json(updatedItem)
    }catch(error){
        res.status(404).json({ error: `Item with ID ${id} does not exist in the database` })
    }
})

app.put(`/return-status/item/:id`, async (req, res) => {
  const { id } = req.params

  try {
    const itemData = await prisma.item.findUnique({
        where: { item_id: Number(id) },
    })

    const updatedItem = await prisma.item.update({
        where: { item_id: Number(id) || undefined },
        data: { returned: !itemData?.returned },
    })
    res.status(200).json(updatedItem)
  } catch (error) {
    res.status(404).json({ error: `Item with ID ${id} does not exist in the database` })
  }
})

app.delete(`/delete/item/:id`, async (req, res) => {
  const { id } = req.params
  const item = await prisma.item.delete({
    where: {
      item_id: Number(id),
    },
  })
  res.status(200).json(item)
})

app.listen(3001, () =>
  console.log('server started'),
)