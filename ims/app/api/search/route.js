import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request) {
	const query = request.nextUrl.searchParams.get("query"); // this is collecting parameter from url where the query is "query" parameter
    
	try {
		const results = await prisma.product.findMany({ //query to search db where the parameter value exits
			where: {
				OR: [
					{ name: { contains: query, mode: "insensitive" } }
                ]
			},
		});
        
        return NextResponse.json({ success: true, products: results})
	} catch (error) {
		return NextResponse.json({ message: "failed to fetch product/products" });
	}
}
