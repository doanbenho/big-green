import { createServer } from 'miragejs'
import { content_products } from '../map-content/MapContent'


export const setupproducts = () => {
     let server = createServer()
     server.get("/api/products", { products: content_products})
}  
