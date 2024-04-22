import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request){
    try{
        const { name, quantity, price } = req.body
        const product = await prisma.product.create({
            data:{
                name: name,
                qty: +quantity,
                price: +price
            }
        });
        return NextResponse.json({product: product});
    } catch(error) {
        return NextResponse.json({message: "failed to fetch products"});
    }
    
}