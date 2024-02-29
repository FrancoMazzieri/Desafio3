const express = require('express')

const ProductManager = require('./ClasesProduct/productmanager.js')

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))


const productos = new ProductManager()

const leerProductos = productos.getProduct()

app.get('/products', async (req, res) => {
    let limit = parseInt(req.query.limit)

    if (!limit) return res.send(await leerProductos)

    let allProduct = await leerProductos

    let productLimit = allProduct.slice(0, limit)

    res.json(productLimit)
})
app.get('/products/:id', async (req, res) => {

    let id = +req.params.id

    let allProduct = await leerProductos

    let productById = allProduct.find(product => product.id === id)

    if (productById) {
        console.log(productById)
    } else {
        console.log("Not found")
    }

    res.json(productById)

})

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Expres por local host ${server.address().port}`)
})
server.on("Error", (error) => {
    console.log(`Error del servidor ${error}`)
})
