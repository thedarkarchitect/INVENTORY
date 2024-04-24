import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req, res) {
	try {
		const { product, quantity, price } = await req.json();

		const data = await prisma.product.create({
			data: {
				name: product,
				qty: +quantity,
				price: +price,
			},
		});
		return NextResponse.json({ product: data });
	} catch (error) {
		return NextResponse.json({ message: "failed to fetch products" });
	}
}
