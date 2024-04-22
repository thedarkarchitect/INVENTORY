import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request){
    try{
        const products = await prisma.product.findMany();
        return NextResponse.json({product: products});
    } catch(error) {
        return NextResponse.json({message: "failed to fetch products"});
    }
    
}